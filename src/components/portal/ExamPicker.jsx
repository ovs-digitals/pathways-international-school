import { useState } from "react";
import { ArrowLeft, Check, MapPin, Search, ShoppingCart } from "lucide-react";
import { BC_FEE, EXAM_LOCATIONS, PROGRAMS, SESSIONS, SUBJECTS, boardTimetable, levelKey } from "./DemoStore";

/* Step 1 of sign-up, laid out like the British Council school-exams site:
   country → awarding body → level → session → location → subjects → search → basket. */

export const QUALS = { IGCSE: "International GCSE", IAL: "International Advanced Level" };
const BODIES = ["Pearson Edexcel"];

const pkr = (n) => `PKR ${Number(n || 0).toLocaleString("en-US")}`;
const dmy = (iso) => iso.split("-").reverse().join("/");
const codeOf = (q, s) => (SUBJECTS[q]?.[s] || ["—"])[0];
const nameOf = (q, s) => (codeOf(q, s) !== "—" ? `${codeOf(q, s)} - ${s.toUpperCase()}` : s.toUpperCase());
export const optionListFor = (q, list) => list.map((s, i) => `${i + 1}. ${codeOf(q, s) !== "—" ? codeOf(q, s) + " " : ""}${s}`).join(", ");

const box = "w-full appearance-none rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-12 pr-14 text-[15px] text-slate-800 outline-none transition focus:border-navy-700";

function Pick({ label, value, onChange, options, placeholder, icon: Icon = Search }) {
  return (
    <label className="panel-in block">
      <span className="mb-2 block text-lg text-navy-800">{label}</span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
        <select className={`${box} ${value ? "" : "text-slate-400"}`} value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="" disabled>{placeholder}</option>
          {options.map(([v, l]) => <option key={v} value={v} className="text-slate-800">{l}</option>)}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 grid w-12 place-items-center rounded-r-xl bg-navy-700 text-gold-300">
          <svg viewBox="0 0 12 16" className="h-4 w-3 fill-current"><path d="M6 0l6 6H0zM6 16L0 10h12z" /></svg>
        </span>
      </span>
    </label>
  );
}

/* portal: used inside the student portal (level fixed, no programme box)
   locked: entry already sent to the British Council — basket is read-only */
export default function ExamPicker({ f, setF, portal, locked }) {
  const [view, setView] = useState(f.subjects.length || locked ? "basket" : "search");
  const [picked, setPicked] = useState(f.subjects);
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(f.subjects.length ? f.subjects : []);

  const setBasket = (list) => setF((x) => ({ ...x, subjects: list, optionList: optionListFor(x.qualification, list) }));
  const inBasket = (s) => f.subjects.includes(s);
  const toggleBasket = (s) => setBasket(inBasket(s) ? f.subjects.filter((y) => y !== s) : [...f.subjects, s]);
  const price = f.qualification ? BC_FEE[levelKey(f.qualification)] : 0;
  const all = f.qualification ? Object.keys(SUBJECTS[f.qualification]) : [];
  const list = all.filter((s) => nameOf(f.qualification, s).toLowerCase().includes(q.trim().toLowerCase()));
  const dates = (s) => boardTimetable({ qualification: f.qualification, subjects: [s], session: f.session });

  const setQual = (v) => { setF((x) => ({ ...x, qualification: v, subjects: [], optionList: "" })); setPicked([]); setShown([]); };
  const ready = f.body && f.qualification && f.session && f.location;

  const Header = (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-slate-100 px-4 py-3">
      <span className="text-sm text-slate-600">Pakistan · <b className="text-navy-800">Schools exam registration</b></span>
      <button type="button" onClick={() => setView("basket")} disabled={locked}
        className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition ${view === "basket" ? "bg-navy-700 text-white" : "bg-white text-navy-800 ring-1 ring-slate-200 hover:ring-gold-400"}`}>
        <ShoppingCart className="h-4 w-4" /> {f.subjects.length} - Proceed to basket
      </button>
    </div>
  );

  const examCard = (s, basket) => {
    const on = inBasket(s);
    return (
      <div key={s} className="panel-in rounded-2xl bg-white p-6 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100 sm:p-7">
        <h3 className="text-lg font-bold uppercase tracking-wide text-slate-700">{s} — {codeOf(f.qualification, s) !== "—" ? codeOf(f.qualification, s) : "School-assessed"}</h3>
        <dl className="mt-4 grid grid-cols-[110px_1fr] gap-y-1.5 text-[15px]">
          <dt className="text-slate-500">Level:</dt><dd className="font-bold text-slate-700">{QUALS[f.qualification]}</dd>
          <dt className="text-slate-500">Code:</dt><dd className="font-bold text-slate-700">{codeOf(f.qualification, s)}</dd>
          <dt className="text-slate-500">Type:</dt><dd className="font-bold text-slate-700">Standard</dd>
          {basket && <><dt className="text-slate-500">Board:</dt><dd className="font-bold text-slate-700">{f.body}</dd>
            <dt className="text-slate-500">Location:</dt><dd className="font-bold text-slate-700">{f.location}</dd>
            <dt className="text-slate-500">Session:</dt><dd className="font-bold text-slate-700">{f.session}</dd></>}
        </dl>
        <div className="mt-5 divide-y divide-slate-100 border-y border-slate-100">
          {dates(s).map((r) => (
            <div key={r.code + r.paper} className="grid grid-cols-[1fr_auto_auto] gap-4 py-2.5 text-[15px] text-slate-600">
              <span>{s.toUpperCase()} — {r.paper.toUpperCase()} {r.code !== "—" && <span className="text-slate-400">({r.code})</span>}</span>
              <span className="tabular-nums">{dmy(r.date)}</span>
              <span className="w-8 text-right">{r.session === "Morning" ? "AM" : "PM"}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-[15px] text-slate-500">Price: <b className="ml-3 text-xl text-slate-700">{pkr(price)}</b></p>
        {!locked && <button type="button" onClick={() => toggleBasket(s)}
          className={`mt-4 rounded-full px-7 py-3 text-sm font-bold text-white shadow transition ${on ? (basket ? "bg-red-600 hover:bg-red-700" : "bg-orange-600 hover:bg-orange-700") : "bg-green-700 hover:bg-green-800"}`}>
          {on ? (basket ? "Remove" : "Remove from basket") : "Add to basket"}
        </button>}
      </div>
    );
  };

  /* ---------------- basket ---------------- */
  if (view === "basket") {
    const total = price * f.subjects.length;
    return (
      <div className="mt-6 space-y-5">
        {Header}
        <h3 className="font-serif text-3xl font-semibold text-navy-800">Exam basket</h3>
        {f.subjects.length === 0 ? (
          <div className="rounded-2xl bg-[#eaf1f9] p-8 text-center">
            <p className="text-lg font-semibold text-navy-800">Your basket is empty</p>
            <button type="button" onClick={() => setView("search")} className="mt-4 rounded-full bg-navy-700 px-6 py-3 text-sm font-bold text-white">Search for exams</button>
          </div>
        ) : (
          <div className="space-y-5 rounded-2xl bg-[#eaf1f9] p-4 sm:p-7">
            <p className="text-2xl font-bold text-navy-800">You have {f.subjects.length} exam{f.subjects.length > 1 ? "s" : ""} in your basket</p>
            {f.subjects.map((s) => examCard(s, true))}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy-700 p-5 text-white">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">British Council exam fee · total</p>
                <p className="mt-1 text-xs text-white/70">Paid later — after your mock test (60%+) and admin approval. Today you only pay the Pathways registration fee.</p></div>
              <p className="font-serif text-3xl font-semibold text-gold-300">{pkr(total)}</p>
            </div>
            {!locked && <button type="button" onClick={() => setView("search")} className="inline-flex items-center gap-2 text-sm font-bold text-navy-700 hover:text-gold-700"><ArrowLeft className="h-4 w-4" /> Add more exams</button>}
          </div>
        )}
        {!portal && <><div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(PROGRAMS).map(([k, pr]) => (
            <button key={k} type="button" onClick={() => setF((x) => ({ ...x, program: k }))}
              className={`rounded-2xl border-2 p-4 text-left transition ${f.program === k ? "border-navy-700 bg-navy-50" : "border-slate-100 hover:border-gold-300"}`}>
              <span className="block text-sm font-bold text-navy-800">{f.program === k ? "✓ " : ""}{pr.label}</span>
              <span className="mt-1 block text-xs text-slate-500">{k === "full" ? "Mock test first, then register for the British Council exam once you score 60%+." : "Just the mock tests. You can add exam registration later."}</span>
            </button>
          ))}
        </div>
        <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">Subjects already taken</span>
          <textarea className="min-h-[70px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-gold-400" value={f.already}
            onChange={(e) => setF((x) => ({ ...x, already: e.target.value }))} placeholder="e.g. 2: English, Urdu" /></label></>}
      </div>
    );
  }

  /* ---------------- search ---------------- */
  return (
    <div className="mt-6 space-y-6">
      {Header}
      <div className="space-y-6 rounded-2xl bg-[#eaf1f9] p-5 sm:p-8">
        <div>
          <h3 className="font-serif text-3xl font-semibold text-navy-800">Search for exams</h3>
          <div className="mt-4 border-l-4 border-orange-500 pl-4 text-sm text-slate-600">
            <p className="font-bold text-slate-700">Notice</p>
            Candidates are responsible for the subjects and papers they choose. Please check each option code before you continue.
          </div>
        </div>
        <Pick label="Country / territory" value="Pakistan" onChange={() => {}} options={[["Pakistan", "Pakistan"]]} placeholder="Pakistan" icon={MapPin} />
        <Pick label="Awarding body" value={f.body} onChange={(v) => setF((x) => ({ ...x, body: v }))} options={BODIES.map((b) => [b, b])} placeholder="Select awarding body" />
        {f.body && <Pick label="Qualification level" value={f.qualification} onChange={portal ? () => {} : setQual} options={portal ? [[f.qualification, QUALS[f.qualification]]] : Object.entries(QUALS)} placeholder="Select qualification level" />}
        {f.qualification && <Pick label="Exam session" value={f.session} onChange={(v) => setF((x) => ({ ...x, session: v }))} options={SESSIONS.map((s) => [s, s])} placeholder="Select exam session" />}
        {f.qualification && f.session && <Pick label="Location" value={f.location} onChange={(v) => setF((x) => ({ ...x, location: v }))} options={EXAM_LOCATIONS.map((c) => [c, c])} placeholder="Select location" icon={MapPin} />}

        {ready && (
          <div className="panel-in">
            <span className="mb-2 block text-lg text-navy-800">Subjects</span>
            <div className="overflow-hidden rounded-xl border-2 border-slate-200 bg-white focus-within:border-navy-700">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input className="w-full py-3.5 pl-12 pr-4 text-[15px] outline-none" value={q} onChange={(e) => setQ(e.target.value)}
                  placeholder={picked.length ? picked.map((s) => nameOf(f.qualification, s)).join(", ") : "Select subjects"} />
              </div>
              <ul className="max-h-64 overflow-y-auto border-t border-slate-100">
                {list.map((s) => { const on = picked.includes(s); return (
                  <li key={s}><button type="button" onClick={() => setPicked(on ? picked.filter((y) => y !== s) : [...picked, s])}
                    className={`flex w-full items-center gap-3 border-b border-slate-100 px-5 py-3 text-left text-[15px] transition ${on ? "bg-navy-700 text-white" : "text-slate-700 hover:bg-[#eaf1f9]"}`}>
                    <span className={`grid h-5 w-5 shrink-0 place-items-center rounded border ${on ? "border-gold-400 bg-gold-400 text-navy-900" : "border-slate-300"}`}>{on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}</span>
                    {nameOf(f.qualification, s)}
                  </button></li>
                ); })}
                {list.length === 0 && <li className="px-5 py-3 text-sm text-slate-400">No subject matches “{q}”.</li>}
              </ul>
            </div>
            <div className="mt-6 flex flex-wrap gap-4">
              <button type="button" disabled={!picked.length} onClick={() => { setShown(picked); setQ(""); }}
                className="min-w-[220px] rounded-full border-2 border-navy-700 bg-white px-8 py-3.5 text-base font-bold text-navy-700 transition hover:bg-navy-50 disabled:opacity-40">Search</button>
            </div>
          </div>
        )}

        {ready && shown.length > 0 && (
          <div className="space-y-5 border-t-4 border-dotted border-slate-300 pt-6">
            <button type="button" onClick={() => setView("basket")} className="min-w-[220px] rounded-full bg-green-700 px-8 py-3.5 text-base font-bold text-white shadow-lg transition hover:bg-green-800">Go to basket</button>
            {shown.filter((s) => all.includes(s)).map((s) => examCard(s, false))}
          </div>
        )}
      </div>
      {f.subjects.length > 0 && (
        <button type="button" onClick={() => setView("basket")} className="flex w-full items-center justify-between rounded-2xl bg-navy-700 px-5 py-4 text-left text-white">
          <span className="flex items-center gap-2 text-sm font-bold"><ShoppingCart className="h-5 w-5 text-gold-300" /> {f.subjects.length} exam{f.subjects.length > 1 ? "s" : ""} in your basket</span>
          <span className="flex items-center gap-1 text-sm font-bold text-gold-300">Proceed to basket →</span>
        </button>
      )}
    </div>
  );
}
