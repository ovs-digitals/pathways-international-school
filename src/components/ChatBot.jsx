import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Send, X } from "lucide-react";
import { openApply } from "./ApplyModal";
import { API } from "./portal/DemoStore";
import { FALLBACK, QUICK, answerById, answerFor } from "./chatKnowledge";
import { waLinkTo } from "./siteData";

/* Pathways Assistant — the website robot.
   Answers instantly from chatKnowledge.js. If the server has AI switched on
   (ANTHROPIC_API_KEY in .env), typed questions go to the AI, which uses the same facts. */

const KEY = "pw_chat_v1";
const WA = waLinkTo("Assalam o Alaikum, I have a question about Pathways International School.");
const WELCOME = { from: "bot", text: "Assalam o Alaikum! 👋 I'm the **Pathways Assistant**.\nAsk me anything about fees, programmes, admissions, scholarships or exam registration — in English or Roman Urdu.", chips: true };

export function RobotIcon({ className = "h-8 w-8" }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <line x1="32" y1="6" x2="32" y2="14" stroke="#C9A44C" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="6" r="4" fill="#C9A44C" />
      <rect x="10" y="14" width="44" height="34" rx="12" fill="#ffffff" />
      <rect x="15" y="20" width="34" height="20" rx="9" fill="#17365D" />
      <circle cx="25" cy="30" r="4" fill="#E9CF86"><animate attributeName="r" values="4;4;0.6;4;4" keyTimes="0;0.45;0.5;0.55;1" dur="4s" repeatCount="indefinite" /></circle>
      <circle cx="39" cy="30" r="4" fill="#E9CF86"><animate attributeName="r" values="4;4;0.6;4;4" keyTimes="0;0.45;0.5;0.55;1" dur="4s" repeatCount="indefinite" /></circle>
      <rect x="4" y="25" width="6" height="12" rx="3" fill="#C9A44C" />
      <rect x="54" y="25" width="6" height="12" rx="3" fill="#C9A44C" />
      <path d="M24 54h16a4 4 0 0 1 4 4v2H20v-2a4 4 0 0 1 4-4Z" fill="#ffffff" />
      <rect x="27" y="48" width="10" height="6" fill="#ffffff" />
    </svg>
  );
}

/* **bold**, *italic* and line breaks */
function Rich({ text }) {
  return text.split("\n").map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, k) =>
        part.startsWith("**") ? <b key={k} className="font-bold text-navy-900">{part.slice(2, -2)}</b>
        : part.startsWith("*") && part.length > 2 ? <i key={k}>{part.slice(1, -1)}</i>
        : part
      )}
    </Fragment>
  ));
}

function load() {
  try { const m = JSON.parse(sessionStorage.getItem(KEY)); if (Array.isArray(m) && m.length) return m; } catch (e) { /* storage blocked */ }
  return [WELCOME];
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState(load);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [ai, setAi] = useState(false);
  const [hint, setHint] = useState(false);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { try { sessionStorage.setItem(KEY, JSON.stringify(msgs.slice(-40))); } catch (e) { /* ignore */ } }, [msgs]);
  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [msgs, typing, open]);
  useEffect(() => { if (open && inputRef.current && window.innerWidth >= 640) inputRef.current.focus(); }, [open]);

  // small "Ask me" bubble a few seconds after the page opens
  useEffect(() => {
    const a = setTimeout(() => setHint(true), 6000);
    const b = setTimeout(() => setHint(false), 16000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  // is the AI switched on at the server? (only on the live site)
  useEffect(() => {
    if (!API || !open) return;
    let off = false;
    fetch(`${API}/chat/status`).then((r) => (r.ok ? r.json() : null)).then((j) => { if (!off && j && j.ai) setAi(true); }).catch(() => {});
    return () => { off = true; };
  }, [open]);

  const reply = (it) => setMsgs((m) => [...m, { from: "bot", text: it.answer, links: it.links, chips: it.chips }]);

  const askLocal = (q) => {
    setTyping(true);
    setTimeout(() => { setTyping(false); reply(answerFor(q)); }, 550);
  };

  const askAi = async (q, history) => {
    setTyping(true);
    try {
      const r = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.filter((x) => x.text).slice(-10).map((x) => ({ role: x.from === "user" ? "user" : "assistant", content: x.text })) }),
      });
      if (!r.ok) throw new Error("ai");
      const j = await r.json();
      const local = answerFor(q);
      setTyping(false);
      setMsgs((m) => [...m, { from: "bot", text: j.reply, links: local.id !== "fallback" ? local.links : FALLBACK.links }]);
    } catch (e) {
      setTyping(false);
      reply(answerFor(q));
    }
  };

  const send = (text) => {
    const q = (text ?? input).trim();
    if (!q || typing) return;
    setInput("");
    const history = [...msgs, { from: "user", text: q }];
    setMsgs(history);
    if (ai) askAi(q, history); else askLocal(q);
  };

  const quick = (label, id) => {
    if (typing) return;
    setMsgs((m) => [...m, { from: "user", text: label.replace(/^\S+\s/, "") }]);
    setTyping(true);
    setTimeout(() => { setTyping(false); reply(answerById(id)); }, 450);
  };

  const action = (l) => {
    if (l.action === "apply") { setOpen(false); openApply(); }
    else if (l.action === "whatsapp") window.open(WA, "_blank", "noopener");
  };

  const lastBot = msgs.length - 1 - [...msgs].reverse().findIndex((m) => m.from === "bot");

  return (
    <>
      {/* launcher (sits above the WhatsApp button) */}
      {!open && (
        <div className="fixed bottom-24 right-5 z-[61] flex items-center gap-3 sm:bottom-[6.5rem] sm:right-7">
          {hint && (
            <button type="button" onClick={() => { setHint(false); setOpen(true); }} className="pw-chat-pop hidden rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-left text-sm font-semibold text-navy-800 shadow-xl shadow-navy-950/20 ring-1 ring-slate-100 sm:block">
              Hi! Need help? <span className="text-gold-700">Ask me 👋</span>
            </button>
          )}
          <button type="button" onClick={() => { setHint(false); setOpen(true); }} aria-label="Open Pathways Assistant chat"
            className="pw-chat-bob group relative grid h-14 w-14 place-items-center rounded-full bg-navy-800 shadow-xl shadow-navy-950/40 ring-2 ring-gold-400 transition hover:scale-110">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold-400 opacity-20" />
            <RobotIcon className="relative h-9 w-9" />
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22c55e]" />
          </button>
        </div>
      )}

      {/* chat window */}
      {open && (
        <div role="dialog" aria-label="Pathways Assistant"
          className="pw-chat-open fixed inset-x-2 bottom-2 z-[70] flex max-h-[min(640px,calc(100vh-1rem))] flex-col overflow-hidden rounded-3xl bg-[#f6f8fc] shadow-2xl shadow-navy-950/40 ring-1 ring-navy-900/10 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:w-[380px]">
          <div className="relative flex items-center gap-3 bg-gradient-to-r from-navy-900 to-navy-700 px-4 py-3.5 text-white">
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 ring-1 ring-gold-400/50"><RobotIcon className="h-8 w-8" /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-bold">Pathways Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] text-white/70"><span className="h-2 w-2 rounded-full bg-[#4ade80]" /> Online · replies instantly</p>
            </div>
            <button type="button" onClick={() => { setMsgs([WELCOME]); }} className="rounded-full px-2 py-1 text-[11px] font-semibold text-white/70 transition hover:bg-white/10 hover:text-white">New chat</button>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="grid h-8 w-8 place-items-center rounded-full transition hover:bg-white/10"><X className="h-5 w-5" /></button>
          </div>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-3.5 py-4" style={{ minHeight: 260 }}>
            {msgs.map((m, i) => m.from === "user" ? (
              <div key={i} className="flex justify-end">
                <p className="max-w-[80%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-navy-800 px-3.5 py-2.5 text-sm leading-6 text-white shadow-sm">{m.text}</p>
              </div>
            ) : (
              <div key={i} className="flex items-end gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-800"><RobotIcon className="h-5 w-5" /></span>
                <div className="max-w-[85%]">
                  <div className="rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-6 text-slate-700 shadow-sm ring-1 ring-slate-100"><Rich text={m.text} /></div>
                  {m.links && m.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {m.links.map((l) => l.to ? (
                        <Link key={l.label} to={l.to} onClick={() => { if (window.innerWidth < 640) setOpen(false); }} className="rounded-full border border-navy-200 bg-white px-3 py-1 text-xs font-semibold text-navy-800 transition hover:border-gold-400 hover:bg-gold-50">{l.label} →</Link>
                      ) : (
                        <button key={l.label} type="button" onClick={() => action(l)} className={`rounded-full px-3 py-1 text-xs font-bold transition ${l.action === "whatsapp" ? "bg-[#25D366] text-white hover:bg-[#1fb457]" : "bg-gold-500 text-navy-900 hover:bg-gold-400"}`}>{l.label}</button>
                      ))}
                    </div>
                  )}
                  {m.chips && i === lastBot && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5">
                      {QUICK.map(([label, id]) => (
                        <button key={id} type="button" onClick={() => quick(label, id)} className="rounded-full bg-navy-50 px-3 py-1.5 text-xs font-semibold text-navy-800 ring-1 ring-navy-100 transition hover:bg-gold-100 hover:ring-gold-300">{label}</button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex items-end gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-800"><RobotIcon className="h-5 w-5" /></span>
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3.5 shadow-sm ring-1 ring-slate-100">
                  {[0, 1, 2].map((d) => <span key={d} className="pw-chat-dot h-2 w-2 rounded-full bg-navy-400" style={{ animationDelay: `${d * 0.15}s` }} />)}
                </div>
              </div>
            )}
          </div>

          {msgs.length > 1 ? (
            <div className="flex gap-1.5 overflow-x-auto border-t border-slate-200/70 bg-white px-3 py-2 [scrollbar-width:none]">
              {QUICK.map(([label, id]) => (
                <button key={id} type="button" onClick={() => quick(label, id)} className="shrink-0 rounded-full bg-navy-50 px-2.5 py-1 text-[11px] font-semibold text-navy-800 ring-1 ring-navy-100 transition hover:bg-gold-100">{label}</button>
              ))}
            </div>
          ) : null}

          <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 border-t border-slate-200/70 bg-white px-3 py-3">
            <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value.slice(0, 400))} placeholder="Type your question…"
              className="min-w-0 flex-1 rounded-full border border-slate-200 bg-[#f6f8fc] px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-gold-400 focus:bg-white focus:ring-4 focus:ring-gold-100" />
            <button type="submit" disabled={!input.trim() || typing} aria-label="Send"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-800 text-gold-400 transition hover:bg-navy-700 disabled:opacity-40"><Send className="h-4 w-4" /></button>
          </form>
          <p className="bg-white pb-2 text-center text-[10px] text-slate-400">For final confirmation, please contact Admissions.</p>
        </div>
      )}
    </>
  );
}
