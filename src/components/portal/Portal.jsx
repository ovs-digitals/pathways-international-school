import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  ArrowRight, Award, Send, BadgeCheck, Bell, BookOpen, Check, ClipboardCheck, Clock, Download, FileText, GraduationCap,
  LayoutDashboard, Lock, MapPin, Play, RotateCcw, Search, ShieldCheck, ShoppingCart, Sparkles, Truck, Upload, User, Users, Wallet, X,
} from "lucide-react";
import {
  ADMISSIONS_WHATSAPP, API, CENTRES, SESSIONS, MAX_ATTEMPTS, PACKAGES, PASS_MARK, REG_FEE, PROGRAMS, STAFF, approved, average, boardTimetable, requested, feeFor, fileUrl, levelOf, passed, pastPapersFor, useDemo, waLink,
} from "./DemoStore";
import { MOCK_MINUTES, questionsFor } from "./MockBank";
import { paperFor } from "./MockPaper";
import ExamPicker from "./ExamPicker";
import { DEFAULT_SERIES, loadSeries, saveDemoSeries } from "../examSeries";
import {
  Btn, Card, Datesheet, DocsPanel, Empty, ExamResultCard, Eyebrow, Field, Ghost, Gold, MockRunner, PaperBreakdown, PaperPill, PaperRunner,
  FilePreview, PaperViewer, PaymentModal, Primary, ResultCard, Shell, StudentBadge, Tracker, dmy, downloadPastPaper, downloadResult, downloadSOE, openDoc, fmt, inputCls, pkr, readFiles,
} from "./PortalKit";

const ROLE_LABEL = { admissions: "Admissions Portal", exams: "Exams Portal", admin: "Admin Portal" };

/* ============================ LOGIN ============================ */
export function GoogleButton({ onClick, label = "Continue with Google" }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:border-gold-300 hover:shadow-md">
      <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" /><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" /><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" /><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" /></svg>
      {label}
    </button>
  );
}

/* Real Google sign-in (live mode, when the school's Google client id is set on the server) */
function GoogleSignIn({ clientId, onCredential }) {
  const box = useRef(null);
  useEffect(() => {
    if (!clientId) return undefined;
    let gone = false;
    const init = () => {
      if (gone || !window.google?.accounts?.id || !box.current) return;
      window.google.accounts.id.initialize({ client_id: clientId, callback: (r) => onCredential(r.credential) });
      window.google.accounts.id.renderButton(box.current, { theme: "outline", size: "large", shape: "pill", text: "continue_with", width: box.current.offsetWidth || 360 });
    };
    if (window.google?.accounts?.id) init();
    else {
      const sc = document.createElement("script");
      sc.src = "https://accounts.google.com/gsi/client"; sc.async = true; sc.onload = init;
      document.head.appendChild(sc);
    }
    return () => { gone = true; };
  }, [clientId]); // eslint-disable-line
  return <div ref={box} className="flex min-h-[44px] w-full justify-center" />;
}

function LoginSteps() {
  const steps = ["Register", "Mock tests", "60% result", "Approval & fee", "SOE & exams"];
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % steps.length), 1800); return () => clearInterval(t); }, []); // eslint-disable-line
  return (
    <div className="relative mt-4 flex items-center gap-1.5">
      {steps.map((st, k) => (
        <div key={st} className="flex-1">
          <div className={`h-1.5 rounded-full transition-all duration-700 ${k <= i ? "bg-gold-400" : "bg-white/15"}`} />
          <p className={`mt-2 text-center text-[10px] font-bold uppercase tracking-wider transition ${k === i ? "text-gold-300" : "text-white/40"}`}>{st}</p>
        </div>
      ))}
    </div>
  );
}

export function PortalLogin() {
  const demo = useDemo();
  const nav = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  if (demo.session) return <Navigate to={demo.session.type === "student" ? "/portal/student" : `/portal/${demo.session.role}`} replace />;
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr("");
    try {
      const s = await demo.login(u, p);
      if (!s) return setErr("Incorrect username or password.");
      nav(s.type === "student" ? "/portal/student" : `/portal/${s.role}`);
    } catch (x) { setErr(x.message || "Could not log in."); }
    finally { setBusy(false); }
  };
  const google = async (credential) => {
    setErr("");
    try {
      const r = await demo.loginGoogle(credential);
      if (r.needsSignup) {
        try { sessionStorage.setItem("pw_google", JSON.stringify({ email: r.email, name: r.name, token: r.signupToken })); } catch (x) { /* ignore */ }
        nav("/private-candidates/signup");
        return;
      }
      nav(r.type === "student" ? "/portal/student" : `/portal/${r.role}`);
    } catch (x) { setErr(x.message || "Google sign-in failed."); }
  };
  const quick = (s) => { setU(s.username); setP(s.password); setErr(""); };
  return (
    <div className="min-h-screen bg-[#f6f8fc] text-slate-700">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="navy-pattern relative hidden h-screen overflow-hidden p-10 lg:sticky lg:top-0 text-white lg:flex lg:flex-col">
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full border border-gold-500/25" />
          <div aria-hidden className="blob pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
          <Link to="/" className="relative"><img src="/logo.webp" alt="Pathways International School" className="h-12 w-auto" /></Link>
          <div className="relative mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Pathways Portal</p>
            <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight xl:text-5xl">One login for <span className="italic text-gold-400">every step</span> of your journey.</h1>
          </div>
          <div className="relative mx-auto mt-8 w-full max-w-md flex-1">
            <div aria-hidden className="absolute -right-3 -top-3 h-[88%] w-[92%] rounded-[2rem] border-2 border-gold-500/60" />
            <div className="relative h-[88%] w-[92%] overflow-hidden rounded-[2rem] shadow-2xl shadow-navy-950/60">
              <img src="/hero-students.webp" alt="" className="kenburns h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
            </div>
            <div className="soft-float absolute -left-6 top-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-navy-800 shadow-2xl">
              <span className="grid h-11 w-11 place-items-center rounded-full border-4 border-[#34d399] font-serif text-sm font-bold">88%</span>
              <div><p className="text-sm font-bold">Mock test checked</p><p className="text-[11px] text-slate-500">Mathematics · instantly</p></div>
            </div>
            <div className="soft-float absolute -right-2 top-1/2 flex items-center gap-2 rounded-2xl bg-navy-900/90 px-4 py-3 ring-1 ring-gold-500/40 backdrop-blur [animation-delay:1.2s]">
              <BadgeCheck className="h-5 w-5 text-gold-400" /><span className="text-xs font-semibold">Statement of Entry issued</span>
            </div>
            <div className="soft-float absolute bottom-[16%] left-4 flex items-center gap-2 rounded-2xl bg-gold-500 px-4 py-2.5 text-navy-900 shadow-xl [animation-delay:2.4s]">
              <Wallet className="h-4 w-4" /><span className="text-xs font-bold">Fee paid · Easypaisa</span>
            </div>
          </div>
          <LoginSteps />
        </div>
        <div className="flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {!API && <span className="mb-4 inline-flex rounded bg-gold-100 px-2 py-0.5 text-[11px] font-bold text-gold-900">DEMO · no real data or payments</span>}
            <Link to="/" className="lg:hidden"><img src="/logo.webp" alt="" className="mx-auto h-12 w-auto rounded bg-navy-700 p-1" /></Link>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-navy-800">Log in</h2>
            <p className="mt-1 text-sm text-slate-500">Students and staff use the same login page.</p>
            <form onSubmit={submit} className="mt-8 space-y-4">
              <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">{API ? "Email" : "Username"}</span>
                <div className="relative"><User className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" /><input value={u} onChange={(e) => setU(e.target.value)} type={API ? "email" : "text"} autoComplete={API ? "email" : "username"} className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-100" placeholder={API ? "you@example.com" : "your.username"} /></div></label>
              <label className="block"><span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">Password</span>
                <div className="relative"><Lock className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" /><input type="password" autoComplete="current-password" value={p} onChange={(e) => setP(e.target.value)} className="w-full rounded-2xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-100" placeholder="••••••••" /></div></label>
              {err && <p className="rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700">{err}</p>}
              <button disabled={busy} className="btn-shimmer w-full rounded-full bg-navy-700 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-navy-900 disabled:opacity-60">{busy ? "Logging in…" : "Log in"}</button>
            </form>
            <div className="my-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div>
            {API && demo.pub?.googleClientId ? <GoogleSignIn clientId={demo.pub.googleClientId} onCredential={google} />
              : <GoogleButton onClick={() => setErr(API ? "Google sign-in will be switched on once the school's Google account is connected. Please use your email and password." : "Demo: in the live portal this signs you in with your Google account. Use a demo account below for now.")} />}
            {!API && <div className="mt-8 rounded-2xl border border-gold-200 bg-gold-50 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-gold-800">Demo accounts — click to fill</p>
              <div className="mt-3 grid gap-2">
                {[{ username: "zain.4", password: "demo123", name: "Student — approved, ready to pay" }, { username: "ayesha.1", password: "demo123", name: "Student — all steps done" }, ...STAFF].map((s) => (
                  <button key={s.username} type="button" onClick={() => quick(s)} className="flex items-center justify-between gap-2 rounded-xl bg-white px-4 py-2.5 text-left text-sm transition hover:ring-2 hover:ring-gold-300">
                    <span className="font-semibold text-navy-800">{s.name}</span><span className="font-mono text-xs text-slate-500">{s.username} / {s.password}</span>
                  </button>
                ))}
              </div>
            </div>}
            <p className="mt-6 text-center text-sm text-slate-500">New private candidate? <Link to="/private-candidates/signup" className="font-bold text-navy-700 hover:text-gold-700">Sign up here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================ STUDENT ============================ */
export function StudentPortal() {
  const demo = useDemo();
  const [tab, setTab] = useState("overview");
  const [running, setRunning] = useState(null);
  const [script, setScript] = useState(null);
  const [scriptMode, setScriptMode] = useState("mock");
  const [revNote, setRevNote] = useState("");
  const [pay, setPay] = useState(null); // { kind, amount, title, ... }
  const [regNote, setRegNote] = useState("");
  useEffect(() => { if (tab === "overview" && demo.session?.id) demo.markRead(`student:${demo.session.id}`); }, [tab]); // eslint-disable-line
  if (!demo.session || demo.session.type !== "student") return <Navigate to="/portal" replace />;
  const c = demo.db.candidates.find((x) => x.id === demo.session.id);
  if (!c) return <Navigate to="/portal" replace />;

  const ok = passed(c);
  const avg = average(c.mock.marks);
  const atts = c.mock.attempts || {};
  const done = c.subjects.filter((s) => atts[s]).length;
  const myNotes = demo.db.notifications.filter((n) => n.role === `student:${c.id}`);
  const papers = pastPapersFor(c.subjects);
  const left = c.papers.quota - c.papers.used.length;
  const full = c.program !== "mock";
  const fee = feeFor(c);
  const tt = c.soe?.timetable || [];
  const appeared = tt.filter((r) => r.att === "appeared").length;
  const absent = tt.filter((r) => r.att === "absent").length;
  const nextPaper = tt.find((r) => !r.att);
  const level = levelOf(c.qualification);
  const pending = !!c.regRequest && !c.approved;
  const go = (t) => { setRunning(null); setTab(t); };
  const runPaper = running && paperFor(c.qualification, running);
  const feeGate = API && !c.regFee;
  const wa = demo.db.contact?.whatsapp || ADMISSIONS_WHATSAPP;
  const bcDue = c.bcFeeDue; const bcWaiting = bcDue?.stage === "awaiting_verification";

  const nav = [
    { key: "overview", label: "Dashboard", icon: LayoutDashboard, count: myNotes.filter((n) => !n.read).length },
    { key: "exams", label: "My exams (basket)", icon: ShoppingCart },
    { key: "mock", label: "Mock tests", icon: ClipboardCheck, count: c.subjects.length - done },
    { key: "result", label: "Result cards", icon: Award },
    { key: "script", label: "My scripts", icon: Search },
    ...(full ? [
      { key: "fees", label: "BC registration & fee", icon: Wallet, count: ok && !bcWaiting && (!c.regRequest || (c.approved && !c.paid)) ? 1 : 0 },
      { key: "exam", label: "SOE & venue", icon: GraduationCap },
    ] : [{ key: "fees", label: "BC exam registration", icon: Wallet }]),
    { key: "papers", label: "Past papers", icon: BookOpen },
    { key: "docs", label: "My documents", icon: FileText },
    { key: "profile", label: "My details", icon: User },
  ];

  const nextStep = done < c.subjects.length ? ["Take your mock tests", `${c.subjects.length - done} of ${c.subjects.length} still to do. Your paper is checked as soon as you submit.`, "mock", "Start mock tests"]
    : !ok ? [`Re-sit to reach ${PASS_MARK}%`, `Retake any subject below ${PASS_MARK}% to unlock British Council registration.`, "mock", "Go to mock tests"]
    : !full ? ["You passed! Register for the British Council exam", "Add British Council exam registration to your programme.", "fees", "Register now"]
    : !c.regRequest ? ["Request British Council registration", "Send your request — the admin approves it, then you pay the fee.", "fees", "Request now"]
    : pending ? ["Waiting for admin approval", "Admin and Admissions have been notified. Payment opens as soon as it is approved.", "fees", "View status"]
    : !c.paid ? ["Approved — pay your British Council fee", `Total ${pkr(fee.total)} by card, Easypaisa or JazzCash.`, "fees", "Pay now"]
    : !c.soe ? ["Your Statement of Entry is on its way", "We have registered your entry. Your SOE appears here as soon as the British Council issues it.", "exam", "View status"]
    : c.examResult ? ["Your exam results are here", "Open Result cards to see your Statement of Results.", "result", "View results"]
    : (c.soe.fileId || c.soe.data) ? ["Your Statement of Entry is here", "Open it to see your exam dates, centre and candidate number.", "exam", "View SOE"]
    : nextPaper ? ["Your next paper", `${nextPaper.subject} ${nextPaper.paper} (${nextPaper.code}) · ${dmy(nextPaper.date)} · ${nextPaper.time}`, "exam", "View datesheet"]
    : ["All papers done", "Your results will be uploaded here by the Exams department.", "result", "Result cards"];

  return (
    <Shell title="Student Portal" profile={<StudentBadge c={c} />} nav={nav} active={tab} setActive={go}>
      <PaymentModal open={!!pay} onClose={() => setPay(null)} {...(pay || { amount: 0, title: "" })} onPaid={(m, slip) => pay.onPaid(m, slip)} />

      {feeGate && <RegFeeGate c={c} onPay={(m) => setPay({ amount: c.regFeeDue?.amount ?? REG_FEE, title: "Pathways registration fee", initial: m, methods: ["Card", "Easypaisa", "JazzCash", "Bank transfer"], note: "Your mock tests are now open.", onPaid: (mm, slip) => demo.payRegistration(mm, slip) })} />}

      {!feeGate && tab === "overview" && (
        <div className="space-y-6">
          <div className="navy-pattern relative overflow-hidden rounded-3xl p-6 text-white shadow-xl sm:p-8">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-gold-500/25" />
            <p className="text-sm text-white/70">Welcome back,</p>
            <h2 className="font-serif text-3xl font-semibold sm:text-4xl">{c.first} {c.last}</h2>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-gold-500 px-3 py-1 text-navy-900">{level}</span>
              <span className="rounded-full bg-white/10 px-3 py-1">{c.session}</span>
              {c.location && <span className="rounded-full bg-white/10 px-3 py-1"><MapPin className="mr-1 inline h-3 w-3" />{c.location}</span>}
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold">{PROGRAMS[c.program || "full"].short}</span>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-white/[0.08] p-4">
              <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-400">Next step</p><p className="mt-1 font-semibold">{nextStep[0]}</p><p className="text-sm text-white/65">{nextStep[1]}</p></div>
              <Gold onClick={() => go(nextStep[2])}>{nextStep[3]} <ArrowRight className="h-4 w-4" /></Gold>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Mock tests done", `${done} / ${c.subjects.length}`, ClipboardCheck, "mock"],
              ["Mock average", avg === null ? "—" : `${avg}%`, Award, "result", avg !== null && (avg >= PASS_MARK ? "text-[#059669]" : "text-red-600")],
              ["Papers appeared", c.soe ? `${appeared} / ${tt.length}` : "—", BadgeCheck, "exam"],
              [full ? "British Council fee" : "Programme", full ? (c.paid ? "Paid" : c.approved ? "Pay now" : pending ? "Pending" : ok ? "Request" : "Locked") : "Mock only", Wallet, "fees", pending || (c.approved && !c.paid) ? "text-gold-700" : c.paid ? "text-[#059669]" : ""],
            ].map(([k, v, Icon, t, cls]) => (
              <button key={k} type="button" onClick={() => go(t)} className="rounded-3xl bg-white p-5 text-left shadow-lg shadow-navy-950/5 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:ring-gold-300">
                <div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{k}</p><Icon className="h-5 w-5 text-gold-600" /></div>
                <p className={`mt-3 font-serif text-3xl font-semibold ${cls || "text-navy-800"}`}>{v}</p>
              </button>
            ))}
          </div>

          <Card><Eyebrow>Your journey</Eyebrow><div className="mt-4"><Tracker c={c} /></div></Card>

          <Card className="overflow-hidden p-0">
            <div className="flex flex-wrap items-center justify-between gap-2 px-6 pt-6"><Eyebrow>My subjects & papers</Eyebrow>
              <button type="button" onClick={() => go("exams")} className="inline-flex items-center gap-1.5 rounded-full bg-navy-50 px-3 py-1.5 text-xs font-bold text-navy-700 hover:bg-gold-100"><ShoppingCart className="h-3.5 w-3.5" /> {c.subjects.length} exam{c.subjects.length > 1 ? "s" : ""} in my basket</button>
              {c.soe && <span className="text-xs text-slate-500"><b className="text-[#047857]">{appeared}</b> appeared · <b className="text-red-600">{absent}</b> absent · <b>{tt.length - appeared - absent}</b> upcoming</span>}</div>
            <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-navy-700 text-xs uppercase tracking-wider text-white"><tr><th className="px-5 py-3">Subject</th><th className="px-5 py-3">Mock test</th>{full && <><th className="px-5 py-3">Exam papers</th><th className="px-5 py-3">Grade</th></>}</tr></thead>
              <tbody>{c.subjects.map((s) => {
                const a = atts[s]; const rows = tt.filter((r) => r.subject === s);
                return (
                  <tr key={s} className="border-t border-slate-100 align-top odd:bg-slate-50/60">
                    <td className="px-5 py-3.5 font-semibold text-navy-800">{s}</td>
                    <td className="px-5 py-3.5">{a ? <span className={`font-bold ${a.pct >= PASS_MARK ? "text-[#059669]" : "text-red-600"}`}>{a.pct}% <span className="text-xs font-normal text-slate-500">({a.score}/{a.total})</span></span>
                      : <button type="button" onClick={() => { setTab("mock"); setRunning(s); }} className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-900 hover:bg-gold-200"><Play className="h-3 w-3" /> Start</button>}</td>
                    {full && <td className="px-5 py-3.5">{rows.length ? <div className="space-y-1.5">{rows.map((r, k) => <div key={k} className="flex flex-wrap items-center gap-2"><span className="font-mono text-[11px] text-slate-500">{r.code}</span><PaperPill r={r} /><span className="text-[11px] text-slate-400">{dmy(r.date)}</span></div>)}</div> : <span className="text-xs text-slate-400">After SOE</span>}</td>}
                    {full && <td className="px-5 py-3.5">{c.examResult?.grades[s] ? <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-700 font-serif font-bold text-gold-300">{c.examResult.grades[s]}</span> : <span className="text-xs text-slate-400">—</span>}</td>}
                  </tr>
                );
              })}</tbody>
            </table></div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="relative overflow-hidden">
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gold-100" />
              <div className="relative">
                <Sparkles className="h-7 w-7 text-gold-600" />
                <p className="mt-3 font-serif text-2xl font-semibold text-navy-800">Want to study with us?</p>
                <p className="mt-1 text-sm text-slate-600">After your exams you can join Pathways as a regular student — for a full programme or just one subject.</p>
                {c.regular?.status === "approved" ? (
                  <div className="mt-4 rounded-2xl bg-[#ecfdf5] p-4 text-sm text-[#065f46] ring-1 ring-[#a7f3d0]">
                    <p className="flex items-center gap-2 font-bold"><Check className="h-4 w-4" /> Your request is approved!</p>
                    <p className="mt-1">Kindly contact Admissions on WhatsApp <b>{wa}</b>{c.regular.reply ? ` — ${c.regular.reply}` : ""}.</p>
                    <a href={waLink(wa)} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white shadow hover:brightness-95">Chat on WhatsApp</a>
                  </div>
                ) : c.regular && c.regular.status !== "declined" ? <p className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gold-50 px-4 py-2 text-sm font-semibold text-gold-900 ring-1 ring-gold-200"><Clock className="h-4 w-4" /> Request sent — waiting for Admissions to approve.</p> : (
                  <div className="mt-4">{c.regular?.status === "declined" && <p className="mb-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Your last request was not accepted: {c.regular.reply}. You can send a new request.</p>}<div className="flex flex-col gap-2 sm:flex-row"><input value={regNote} onChange={(e) => setRegNote(e.target.value)} className={inputCls} placeholder="Which subject(s)? e.g. A Level Physics" /><Primary onClick={() => demo.requestRegular(c.id, regNote)}>Become regular</Primary></div></div>
                )}
              </div>
            </Card>
            <Card>
              <Eyebrow>Updates for you</Eyebrow>
              {myNotes.length === 0 && <p className="mt-3 text-sm text-slate-500">No updates yet.</p>}
              {myNotes.slice(0, 5).map((n) => <p key={n.id} className="border-b border-slate-100 py-3 text-sm text-slate-700 last:border-0"><span className="mr-2 text-xs text-slate-400">{fmt(n.at)}</span>{n.text}</p>)}
            </Card>
          </div>
        </div>
      )}

      {!feeGate && tab === "mock" && (running ? (runPaper
        ? <PaperRunner key={running} c={c} paper={runPaper} onExit={() => setRunning(null)} onResult={() => go("result")} />
        : <MockRunner key={running} c={c} subject={running} onExit={() => setRunning(null)} onResult={() => go("result")} />) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-4 rounded-3xl bg-gold-50 p-5 ring-1 ring-gold-200">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-500 text-navy-900"><Sparkles className="h-6 w-6" /></span>
            <div className="min-w-0 flex-1"><p className="font-bold text-navy-800">Mock tests for your subjects — 3 attempts each</p><p className="text-sm text-slate-600">Sit each test when you are ready. Read the paper on screen, write your answers in the answer sheet and submit — the system checks your paper and shows your marks straight away. Score {PASS_MARK}% or more on average to register for the British Council exam.</p></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {c.subjects.map((s) => {
              const a = atts[s]; const paper = paperFor(c.qualification, s);
              const tries = a?.tries || 0; const best = a ? a.best ?? a.pct : 0;
              const canRetake = a && tries < MAX_ATTEMPTS;
              return (
                <div key={s} className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:ring-gold-300">
                  <div className="flex items-start justify-between gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-700 text-gold-400"><BookOpen className="h-6 w-6" /></span>
                    {a ? <span className={`rounded-full px-3 py-1 text-xs font-bold ${best >= PASS_MARK ? "bg-[#d1fae5] text-[#065f46]" : "bg-red-100 text-red-700"}`}>{best >= PASS_MARK ? "Passed" : "Below 60%"}</span>
                      : <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-900">3 attempts</span>}
                  </div>
                  <p className="mt-4 font-serif text-xl font-semibold text-navy-800">{s}</p>
                  {paper ? <p className="mt-1 text-xs text-slate-500"><b className="text-navy-700">{paper.code} {paper.mock}</b> · {paper.title} · {paper.total} marks · <Clock className="inline h-3.5 w-3.5" /> 1 h 45 min</p>
                    : <p className="mt-1 flex items-center gap-3 text-xs text-slate-500"><span>{questionsFor(c.qualification, s).length} questions</span><span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {MOCK_MINUTES} min</span><span>{level}</span></p>}
                  {a ? (
                    <div className="mt-5">
                      <div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Best score</p><p className={`font-serif text-4xl font-semibold ${best >= PASS_MARK ? "text-[#059669]" : "text-red-600"}`}>{best}%</p></div><p className="text-right text-xs text-slate-500">Last: {a.score}/{a.total}{a.paper && <><br />{a.reviewed ? "Reviewed by teacher" : "Teacher review pending"}</>}</p></div>
                      <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-gradient-to-r from-navy-700 to-gold-500" style={{ width: `${best}%` }} /><span className="absolute top-0 h-full w-0.5 bg-red-400" style={{ left: "60%" }} /></div>
                      <div className="mt-3 flex items-center gap-1.5">{Array.from({ length: MAX_ATTEMPTS }, (_, k) => { const h = (a.history || [])[k]; return <span key={k} title={h ? `Attempt ${k + 1}: ${h.pct}%` : `Attempt ${k + 1}`} className={`flex-1 rounded-md py-1 text-center text-[10px] font-bold ${h ? (h.pct >= PASS_MARK ? "bg-[#d1fae5] text-[#065f46]" : "bg-red-50 text-red-600") : "bg-slate-100 text-slate-400"}`}>{h ? `${h.pct}%` : `#${k + 1}`}</span>; })}</div>
                      <p className="mt-1 text-[11px] text-slate-500">Attempt {tries} of {MAX_ATTEMPTS} — your best score counts.</p>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {canRetake ? <Ghost className="px-3 py-2 text-xs" onClick={() => setRunning(s)}><RotateCcw className="h-4 w-4" /> Try again ({MAX_ATTEMPTS - tries} left)</Ghost> : <span className="grid place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-400">All attempts used</span>}
                        <Btn className="bg-navy-50 px-3 py-2 text-xs text-navy-700 hover:bg-gold-100" onClick={() => { setScript(s); setTab("script"); }}><FileText className="h-4 w-4" /> My script</Btn>
                      </div>
                    </div>
                  ) : <Gold className="mt-5 w-full" onClick={() => setRunning(s)}><Play className="h-4 w-4" /> {paper ? "Open paper" : "Start test"}</Gold>}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {!feeGate && tab === "exams" && <MyExams c={c} />}

      {!feeGate && tab === "script" && (
        <div className="mb-5 flex flex-wrap gap-2 rounded-2xl bg-white p-1.5 shadow-sm ring-1 ring-slate-100 sm:inline-flex">
          {[["mock", "Mock test scripts"], ["exam", `British Council exam scripts (${(c.examScripts || []).length})`]].map(([k, l]) => (
            <button key={k} type="button" onClick={() => setScriptMode(k)} className={`rounded-xl px-4 py-2 text-sm font-bold transition ${scriptMode === k ? "bg-navy-700 text-gold-300" : "text-navy-700 hover:bg-slate-50"}`}>{l}</button>
          ))}
        </div>
      )}
      {!feeGate && tab === "script" && scriptMode === "exam" && (
        !(c.examScripts || []).length ? <Empty icon={FileText}>When your marked British Council exam papers come back, the Exams department uploads them here — like a checked private paper. You can view and download each one.</Empty> : (
          <div className="grid gap-4 lg:grid-cols-2">
            {c.examScripts.map((sc) => (
              <Card key={sc.id}>
                <div className="flex items-start gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-700 text-gold-400"><FileText className="h-6 w-6" /></span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] font-bold text-gold-700">{sc.code}</p>
                    <p className="font-serif text-xl font-semibold text-navy-800">{sc.subject} · {sc.paper}</p>
                    <p className="text-xs text-slate-500">Marked script from the British Council · uploaded {fmt(sc.at)}</p>
                  </div>
                  {sc.marks && <span className="shrink-0 rounded-xl bg-[#ecfdf5] px-3 py-2 text-center font-serif text-lg font-bold text-[#065f46]">{sc.marks}</span>}
                </div>
                <div className="mt-4"><FilePreview fileId={sc.fileId} data={sc.data} name={sc.file} title={`${sc.subject} ${sc.paper}`} /></div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Gold onClick={() => openDoc({ name: sc.file, data: sc.data, fileId: sc.fileId })}><Download className="h-4 w-4" /> Open / download script</Gold>
                </div>
              </Card>
            ))}
          </div>
        )
      )}
      {!feeGate && tab === "script" && scriptMode === "mock" && (() => {
        const done2 = c.subjects.filter((x) => atts[x]);
        if (!done2.length) return <Empty icon={Search}>Your marked scripts appear here after you sit a mock test. You can check every answer here.</Empty>;
        const sub = script && atts[script] ? script : done2[0]; const a = atts[sub]; const paper = paperFor(c.qualification, sub);
        const rr = a.reviewRequest;
        return (
          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">{done2.map((x) => <button key={x} type="button" onClick={() => { setScript(x); setRevNote(""); }} className={`rounded-full px-4 py-2 text-sm font-bold transition ${x === sub ? "bg-navy-700 text-gold-300" : "bg-white text-navy-700 ring-1 ring-slate-200 hover:ring-gold-300"}`}>{x}</button>)}</div>
            <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
              <div className="space-y-4">
                <Card className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div><Eyebrow>Your marked script · attempt {a.tries || 1}</Eyebrow><p className="mt-1 font-serif text-2xl font-semibold text-navy-800">{sub} — {a.score}/{a.total} ({a.pct}%)</p></div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${a.reviewed ? "bg-[#d1fae5] text-[#065f46]" : "bg-gold-100 text-gold-900"}`}>{a.reviewed ? "Teacher-checked" : paper ? "Auto-marked" : "Auto-checked (MCQ)"}</span>
                </Card>
                {paper ? (
                  <div className="grid gap-4 2xl:grid-cols-2"><ScriptPaper paper={paper} /><Card className="max-h-[78vh] overflow-y-auto"><PaperBreakdown paper={paper} attempt={a} /></Card></div>
                ) : (
                  <Card className="space-y-3">{questionsFor(c.qualification, sub).map((q, k) => { const mine = (a.answers || [])[k]; const key = a.key ? a.key[k] : q[2]; const right = mine === key; return (
                    <div key={k} className={`rounded-2xl border p-4 text-sm ${right ? "border-[#a7f3d0] bg-[#ecfdf5]" : "border-red-200 bg-red-50/60"}`} dir={sub === "Urdu" ? "rtl" : "ltr"}>
                      <p className="font-semibold text-navy-800">{k + 1}. {q[0]}</p>
                      <p className={`mt-1 ${right ? "text-[#047857]" : "text-red-700"}`}>Your answer: {mine === null || mine === undefined ? "not answered" : q[1][mine]}</p>
                      {!right && q[1][key] !== undefined && <p className="text-[#047857]">Correct answer: <b>{q[1][key]}</b></p>}
                    </div>); })}</Card>
                )}
              </div>
              <div className="space-y-4 self-start">
                <Card>
                  <Eyebrow>Checked by the Exams team</Eyebrow>
                  <p className="mt-2 text-sm text-slate-600">{a.reviewed ? "A teacher has checked this script. Any change to your marks shows here." : "Your written answers are checked by the Exams team. Updated marks appear here automatically — no request needed."}</p>
                </Card>
                <Card>
                  <Eyebrow>All attempts</Eyebrow>
                  <div className="mt-3 space-y-2">{(a.history || []).map((h, k) => <div key={k} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2 text-sm"><span className="text-slate-600">Attempt {k + 1} · {fmt(h.at)}</span><b className={h.pct >= PASS_MARK ? "text-[#059669]" : "text-red-600"}>{h.pct}%</b></div>)}</div>
                  <p className="mt-2 text-[11px] text-slate-500">Best score counts on your result card. {MAX_ATTEMPTS} attempts per subject.</p>
                </Card>
              </div>
            </div>
          </div>
        );
      })()}

      {!feeGate && tab === "result" && (
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="space-y-3">
            <Eyebrow>1 · Mock test result card</Eyebrow>
            {c.mock.published ? <ResultCard c={c} onDownload={() => downloadResult(c)} />
              : <Empty icon={Award}>Your mock result card is created automatically when you finish all {c.subjects.length} mock tests ({done} done so far).</Empty>}
            {Object.entries(atts).filter(([, a]) => a.paper).map(([s, a]) => (
              <details key={s} className="rounded-3xl bg-white p-5 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100">
                <summary className="cursor-pointer font-bold text-navy-800">{s} paper — marks per question ({a.score}/{a.total})</summary>
                <div className="mt-4"><PaperBreakdown paper={paperFor(c.qualification, s)} attempt={a} /></div>
              </details>
            ))}
          </div>
          <div className="space-y-3">
            <Eyebrow>2 · British Council exam result card</Eyebrow>
            {c.examResult ? <ExamResultCard c={c} /> : <Empty icon={GraduationCap}>Your British Council exam result card will appear here once the Exams department uploads your Statement of Results.</Empty>}
          </div>
        </div>
      )}

      {!feeGate && tab === "fees" && (
        !ok ? <Empty icon={Lock}>British Council exam registration unlocks after you score {PASS_MARK}% or above in your mock tests.</Empty>
        : !full ? (
          <Card className="max-w-2xl">
            <Eyebrow>You passed — {avg}%</Eyebrow>
            <p className="mt-2 font-serif text-3xl font-semibold text-navy-800">Register for the British Council exam</p>
            <p className="mt-2 text-sm text-slate-600">Your programme is currently <b>Mock Test only</b>. Add British Council exam registration and sit your {level} exams as a regular candidate.</p>
            <Gold className="mt-6" onClick={() => demo.setProgram(c.id, "full")}><ArrowRight className="h-4 w-4" /> Add BC exam registration</Gold>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="overflow-hidden p-0">
              <div className="px-6 pt-6"><Eyebrow>British Council exam fee — {c.session}</Eyebrow></div>
              <table className="mt-4 w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-6 py-3">Item</th><th className="px-6 py-3 text-right">Amount</th></tr></thead>
                <tbody>
                  {fee.rows.map((r) => <tr key={r.subject} className="border-t border-slate-100"><td className="px-6 py-3">{level} {r.subject} — British Council entry</td><td className="px-6 py-3 text-right font-semibold">{pkr(r.amount)}</td></tr>)}
                  {fee.service > 0 && <tr className="border-t border-slate-100"><td className="px-6 py-3">Pathways registration & handling</td><td className="px-6 py-3 text-right font-semibold">{pkr(fee.service)}</td></tr>}
                  <tr className="border-t-2 border-navy-700 bg-navy-50"><td className="px-6 py-4 font-bold text-navy-800">Total</td><td className="px-6 py-4 text-right font-serif text-2xl font-semibold text-navy-800">{pkr(fee.total)}</td></tr>
                </tbody>
              </table>
              <p className="px-6 py-4 text-xs text-slate-500">{API ? "Fee per subject as set by Pathways for this exam series. Late entries may carry a late fee." : "Sample amounts for the demo. The British Council publishes the real fees for each exam series. Late entries may carry a late fee."}</p>
            </Card>
            <Card>
              <div className="mb-5 grid grid-cols-3 gap-2">
                {[["1", "Request", !!c.regRequest || c.approved], ["2", "Admin approval", c.approved], ["3", "Pay fee", c.paid]].map(([n, l, on], i) => (
                  <div key={n} className={`rounded-xl px-2 py-2 text-center text-[11px] font-bold ${on ? "bg-navy-700 text-gold-300" : (i === 0 && !c.regRequest) || (i === 1 && c.regRequest && !c.approved) || (i === 2 && c.approved && !c.paid) ? "bg-gold-100 text-gold-900 ring-2 ring-gold-400" : "bg-slate-100 text-slate-400"}`}>{on ? "✓" : n} · {l}</div>
                ))}
              </div>
              {c.paid ? (
                <div className="flex items-center gap-3 rounded-2xl bg-[#ecfdf5] p-4 text-[#065f46]"><BadgeCheck className="h-7 w-7" /><div><p className="font-bold">Fee paid — {pkr(c.feePaid)}</p><p className="text-xs">via {c.payMethod} · {fmt(c.paidAt)}. Your SOE will appear under "SOE & datesheet".</p></div></div>
              ) : c.approved && bcWaiting ? (
                <div className="flex items-center gap-3 rounded-2xl bg-gold-50 p-4 text-gold-900 ring-1 ring-gold-200"><Clock className="h-7 w-7" /><div><p className="font-bold">Bank slip received — {pkr(bcDue.amount)}</p><p className="text-xs">Admissions is checking your slip. You will get a notification as soon as it is verified.</p></div></div>
              ) : c.approved ? (
                <>
                  <div className="flex items-center gap-3 rounded-2xl bg-[#ecfdf5] p-3 text-sm font-semibold text-[#065f46]"><BadgeCheck className="h-5 w-5" /> Approved by admin — you can pay now</div>
                  {bcDue?.status === "failed" && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Your last slip could not be verified: {bcDue.note}. Please pay again or upload a clear slip.</p>}
                  <p className="mb-3 mt-4 text-sm font-bold text-navy-800">Choose how to pay {pkr(fee.total)}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {[["Card", "bg-navy-700", "Debit / credit card"], ["Easypaisa", "bg-[#1fa84f]", "Mobile wallet"], ["JazzCash", "bg-[#c8102e]", "Mobile wallet"], ["Bank transfer", "bg-slate-600", "Upload paid slip"]].map(([m, bg, sub]) => (
                      <button key={m} type="button" onClick={() => setPay({ amount: fee.total, title: "British Council exam fee", initial: m, methods: ["Card", "Easypaisa", "JazzCash", "Bank transfer"], note: "Admin, Admissions and the Exams team have been notified.", onPaid: (mm, slip) => demo.pay(c.id, mm, slip) })}
                        className="group rounded-2xl border-2 border-slate-100 p-4 text-left transition hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-lg">
                        <span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${bg}`}><Wallet className="h-5 w-5" /></span>
                        <span className="mt-3 block font-bold text-navy-800">{m}</span><span className="block text-xs text-slate-500">{sub}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : c.regRequest ? (
                <div>
                  <div className="flex items-center gap-3 rounded-2xl bg-gold-50 p-4 text-gold-900 ring-1 ring-gold-200"><Clock className="h-7 w-7" /><div><p className="font-bold">Waiting for admin approval</p><p className="text-xs">Requested {fmt(c.regRequest.at)}</p></div></div>
                  <p className="mt-4 text-sm text-slate-600">Admin and Admissions have been sent an email and a WhatsApp message. As soon as the admin approves, the payment options (Card, Easypaisa, JazzCash, bank) open here.</p>
                </div>
              ) : (
                <>
                  <Eyebrow>Register for the British Council exam</Eyebrow>
                  {c.regNote && <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Previous request not approved: {c.regNote}</p>}
                  <p className="mb-5 mt-2 text-sm text-slate-600">Send your registration request first. The admin checks your details and approves — then you pay the fee here by card, Easypaisa or JazzCash. No payment is taken before approval.</p>
                  <Gold className="w-full py-3.5 uppercase tracking-wider" onClick={() => demo.requestRegistration(c.id)}>Request registration</Gold>
                </>
              )}
            </Card>
          </div>
        )
      )}

      {!feeGate && tab === "exam" && (
        !approved(c) ? <Empty icon={GraduationCap}>{c.approved ? "Your registration is approved — pay the British Council fee and your Statement of Entry and datesheet will appear here." : pending ? "Your registration is waiting for admin approval." : "Your Statement of Entry and the official datesheet appear here after admin approval and fee payment."}</Empty>
        : !c.soe ? <Empty icon={Clock}>Fee paid. We have registered your entry with the British Council — your Statement of Entry and the official datesheet appear here as soon as they are issued.</Empty>
        : (c.soe.fileId || c.soe.data) ? (
          <div className="space-y-6">
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><Eyebrow>Your Statement of Entry — {c.session}</Eyebrow><p className="mt-1 text-xs text-slate-500">This is the exact file from the British Council, uploaded by the Exams department · {fmt(c.soe.issuedAt)}</p></div>
                <Gold onClick={() => window.open(c.soe.fileId ? fileUrl(c.soe.fileId, true) : c.soe.data, "_blank", "noopener")}><Download className="h-4 w-4" /> Download</Gold>
              </div>
              <div className="mt-4"><FilePreview fileId={c.soe.fileId} data={c.soe.data} name={c.soe.file} title="Statement of Entry" tall /></div>
            </Card>
            {(appeared > 0 || absent > 0) && <Card><Eyebrow>Attendance</Eyebrow><p className="mt-2 text-sm"><b className="text-[#047857]">{appeared}</b> appeared · <b className="text-red-600">{absent}</b> absent</p></Card>}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card><Eyebrow>Candidate number</Eyebrow><p className="mt-2 font-mono text-2xl font-bold text-navy-800">{c.soe.candidateNo}</p></Card>
              <Card className="md:col-span-2"><Eyebrow>Exam centre & venue</Eyebrow><p className="mt-2 font-bold text-navy-800">{c.soe.centre}</p>
                <a href={`https://www.google.com/maps?q=${encodeURIComponent(c.soe.venue)}`} target="_blank" rel="noreferrer" className="mt-1 inline-flex items-center gap-1 text-sm text-slate-600 hover:text-gold-700"><MapPin className="h-4 w-4 text-gold-600" /> {c.soe.venue}</a></Card>
              <Card><Eyebrow>Papers</Eyebrow><p className="mt-2 text-sm"><b className="text-[#047857]">{appeared}</b> appeared</p><p className="text-sm"><b className="text-red-600">{absent}</b> absent</p><p className="text-sm"><b>{tt.length - appeared - absent}</b> upcoming</p></Card>
            </div>
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><Eyebrow>Official datesheet — {c.session}</Eyebrow><p className="mt-1 text-xs text-slate-500">As issued by the exam board through the British Council. We don't make the timetable — we share it exactly as it comes.</p></div>
                <Gold onClick={() => downloadSOE(c)}><Download className="h-4 w-4" /> Download SOE</Gold>
              </div>
              <div className="mt-4"><Datesheet rows={tt} att /></div>
              <p className="mt-3 text-xs text-slate-500">SOE file: {c.soe.file} · received {fmt(c.soe.issuedAt)}</p>
            </Card>
          </div>
        )
      )}

      {!feeGate && tab === "papers" && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            {PACKAGES.map((p) => (
              <div key={p.id} className={`relative rounded-3xl p-6 ring-1 transition hover:-translate-y-1 ${p.tag ? "bg-navy-700 text-white ring-gold-400" : "bg-white ring-slate-100"}`}>
                {p.tag && <span className="absolute right-5 top-5 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-900">{p.tag}</span>}
                <p className={`text-xs font-bold uppercase tracking-wider ${p.tag ? "text-gold-300" : "text-gold-700"}`}>{p.label}</p>
                <p className={`mt-2 font-serif text-4xl font-semibold ${p.tag ? "text-white" : "text-navy-800"}`}>{p.papers} <span className="text-lg">{p.papers === 1 ? "paper" : "papers"}</span></p>
                <p className={`mt-1 text-2xl font-bold ${p.tag ? "text-gold-300" : "text-navy-700"}`}>{pkr(p.price)}</p>
                <Btn onClick={() => setPay({ amount: p.price, title: `${p.papers}-paper package`, methods: API ? ["Card", "Easypaisa", "JazzCash", "Bank transfer"] : undefined, onPaid: (m, slip) => demo.buyPackage(c.id, p.id, m, slip) })} className={`mt-5 w-full ${p.tag ? "bg-gold-500 text-navy-900 hover:bg-gold-400" : "bg-navy-700 text-white hover:bg-gold-500 hover:text-navy-900"}`}>Buy package</Btn>
              </div>
            ))}
          </div>
          {c.packageDue?.stage === "awaiting_verification" && <p className="rounded-2xl bg-gold-50 p-4 text-sm font-semibold text-gold-900 ring-1 ring-gold-200">Your bank slip for {pkr(c.packageDue.amount)} is being checked by Admissions. Your downloads open as soon as it is verified.</p>}
          <Card>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow>Past papers for your subjects</Eyebrow>
              <span className={`rounded-full px-4 py-1.5 text-sm font-bold ${left > 0 ? "bg-[#ecfdf5] text-[#047857]" : "bg-slate-100 text-slate-500"}`}>{left} download{left === 1 ? "" : "s"} left</span>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {papers.map((p) => { const have = c.papers.used.includes(p.id); return (
                <div key={p.id} className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold-50 text-gold-700"><BookOpen className="h-5 w-5" /></span>
                  <div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold text-navy-800">{p.title}</p><p className="text-xs text-slate-500">{p.series}</p></div>
                  <Btn disabled={!have && left <= 0} onClick={async () => { if (!have && (await demo.usePaper(c.id, p.id)) === false) return; downloadPastPaper(p); }} className={have ? "text-[#047857] hover:bg-[#ecfdf5]" : "bg-navy-700 text-white hover:bg-gold-500 hover:text-navy-900"}>
                    {have ? <><Check className="h-4 w-4" /> Again</> : <><Download className="h-4 w-4" /> Get</>}
                  </Btn>
                </div>
              ); })}
            </div>
          </Card>
        </div>
      )}

      {!feeGate && tab === "docs" && <DocsPanel c={c} by="student" />}
      {tab === "profile" && <FormDetails c={c} />}
    </Shell>
  );
}

/* Student's exam basket — same "Choose your exams" screens as sign-up */
function MyExams({ c }) {
  const demo = useDemo();
  const init = () => ({ body: "Pearson Edexcel", qualification: c.qualification, session: c.session, location: c.location || "", subjects: c.subjects, program: c.program, already: c.already || "" });
  const [f, setF] = useState(init);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const locked = !!(c.regRequest || c.approved || c.paid);
  const changed = f.session !== c.session || f.location !== (c.location || "") || f.subjects.join("|") !== c.subjects.join("|");
  const save = async () => {
    if (!f.location) return setErr("Please choose your exam location.");
    if (!f.subjects.length) return setErr("Keep at least one exam in your basket.");
    setErr(""); setBusy(true);
    try { await demo.updateExams(c.id, f); } finally { setBusy(false); }
  };
  return (
    <div className="space-y-5">
      <Card className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Eyebrow>My exams</Eyebrow>
          <p className="mt-1 font-serif text-2xl font-semibold text-navy-800">{c.subjects.length} exam{c.subjects.length > 1 ? "s" : ""} in your basket</p>
          <p className="text-sm text-slate-500">{c.session}{c.location ? ` · ${c.location}` : ""} · Pearson Edexcel</p>
        </div>
        {locked
          ? <p className="max-w-sm rounded-2xl bg-gold-50 p-3 text-xs text-gold-900 ring-1 ring-gold-200"><Lock className="mr-1 inline h-3.5 w-3.5" /> Your British Council registration is requested, so the basket is locked. To change an exam, contact Admissions.</p>
          : <p className="max-w-sm text-xs text-slate-500">Add or remove exams any time before you request British Council registration. Mock tests follow your basket.</p>}
      </Card>
      {changed && !locked && (
        <div className="sticky top-2 z-20 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-navy-700 p-4 text-white shadow-xl">
          <p className="text-sm font-semibold">You have changed your basket — save it to update your portal.</p>
          <div className="flex gap-2">
            <Btn className="bg-white/10 px-4 py-2 text-xs text-white hover:bg-white/20" onClick={() => { setF(init()); setErr(""); }}>Undo</Btn>
            <Gold disabled={busy} onClick={save}><Check className="h-4 w-4" /> {busy ? "Saving…" : "Save my exams"}</Gold>
          </div>
        </div>
      )}
      {err && <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{err}</p>}
      <Card><ExamPicker key={c.subjects.join("|") + c.session + c.location} f={f} setF={setF} portal locked={locked} /></Card>
    </div>
  );
}

/* Full registration-form details (student + staff) */
function FormDetails({ c, compact }) {
  const g = c.guardian || {}; const col = c.collector || {};
  const groups = [
    ["Candidate", [["Name", `${c.first} ${c.last}`], ["Candidate ID", c.id], ...(API ? [] : [["Username", c.username]]), ["Date of birth", c.dob], ["Gender", c.gender === "M" ? "Male" : c.gender === "F" ? "Female" : "—"], ["First time as regular candidate", c.firstTime], ["ID", `${c.idType || "—"} · ${c.idNumber || "—"}`], ["ID expiry", c.idExpiry], ["Previous candidate no.", c.candidateNo], ["UCI", c.uci]]],
    ["Contact & address", [["Email", c.email], ["Mobile", c.phone], ["Address", c.address], ["City / Zip", `${c.city || "—"} ${c.zip || ""}`], ["Nearest landmark", c.landmark], ["Country", c.country]]],
    ["Exam entry", [["Level", levelOf(c.qualification)], ["Qualification", c.qualification], ["Programme", PROGRAMS[c.program || "full"].label], ["Exam session", c.session], ["Exam location", c.location], ["Option codes & subjects", c.optionList || c.subjects.join(", ")], ["Subjects already taken", c.already]]],
    ["Guardian & collector", [["Guardian", `${g.first || "—"} ${g.last || ""} (${g.relation || "—"})`], ["Guardian phone", g.phone], ["Collecting the minor", c.collectorType], ["Collector", `${col.first || "—"} ${col.last || ""} (${col.relation || "—"})`], ["Collector phone", col.phone]]],
  ];
  return (
    <div className={`grid gap-5 ${compact ? "" : "xl:grid-cols-2"}`}>
      {groups.map(([t, rows]) => (
        <Card key={t} className={compact ? "p-4 shadow-none" : ""}>
          <Eyebrow>{t}</Eyebrow>
          <dl className="mt-3 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {rows.map(([k, v]) => <div key={k} className={String(v || "").length > 40 ? "sm:col-span-2" : ""}><dt className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{k}</dt><dd className="mt-0.5 text-sm font-semibold text-navy-800">{v || "—"}</dd></div>)}
          </dl>
        </Card>
      ))}
    </div>
  );
}

/* ============================ STAFF ============================ */
function Status({ c }) {
  const done = Object.keys(c.mock.attempts || {}).length;
  const st = API && !c.regFee ? (c.regFeeDue?.stage === "awaiting_verification" ? ["bg-gold-100 text-gold-900", "Slip to verify"] : ["bg-slate-100 text-slate-600", "Registration fee due"])
    : c.examResult ? ["bg-[#d1fae5] text-[#065f46]", "Results uploaded"]
    : c.soe ? ["bg-[#d1fae5] text-[#065f46]", "SOE issued"]
    : c.paid ? ["bg-navy-100 text-navy-800", "Fee paid · awaiting SOE"]
    : c.approved ? ["bg-navy-50 text-navy-700", "Approved · fee due"]
    : c.regRequest ? ["bg-gold-100 text-gold-900", "Needs approval"]
    : c.mock.published ? (passed(c) ? ["bg-navy-50 text-navy-700", `Passed ${average(c.mock.marks)}%`] : ["bg-red-100 text-red-700", `Below 60% (${average(c.mock.marks)}%)`])
    : done ? ["bg-gold-50 text-gold-800", `Mock ${done}/${c.subjects.length} done`]
    : ["bg-slate-100 text-slate-600", "New registration"];
  return <span className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-bold ${st[0]}`}>{st[1]}</span>;
}

const GRADES = { IGCSE: ["9", "8", "7", "6", "5", "4", "3", "2", "1", "U"], "A Levels": ["A*", "A", "B", "C", "D", "E", "U"] };

function CandidateDetail({ c, role, start = "summary" }) {
  const demo = useDemo();
  const [sub, setSub] = useState(start);
  const [soe, setSoe] = useState({ centre: 0, no: c.candidateNo || "", file: null });
  const [trk, setTrk] = useState("");
  const [reason, setReason] = useState("");
  const [grades, setGrades] = useState({});
  const [sor, setSor] = useState(null);
  const [review, setReview] = useState(null); // { subject, marks }
  const [scr, setScr] = useState({ row: 0, marks: "", file: null });
  const canExams = role === "exams" || role === "admin";
  const canUpload = role === "exams";   // SOE, result cards and scripts: Exams team only
  const sheet = c.soe?.timetable || boardTimetable(c);
  const isAdmin = role === "admin";
  const fee = feeFor(c);
  const tabs = [["summary", "Summary"], ["form", "Form"], ["mock", "Mock"], ["pay", "Payment"], ["exam", "SOE"], ["results", "Results"], ["docs", `Docs (${c.docs.length})`]];

  return (
    <div>
      <div className="flex items-start justify-between gap-3"><div><h3 className="font-serif text-2xl font-semibold text-navy-800">{c.first} {c.last}</h3><p className="text-xs text-slate-500">{c.id} · {c.email} · {c.phone}</p></div><Status c={c} /></div>
      <div className="mt-4 flex gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1">
        {tabs.map(([k, l]) => <button key={k} type="button" onClick={() => setSub(k)} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-bold transition ${sub === k ? "bg-white text-navy-800 shadow" : "text-slate-500"}`}>{l}</button>)}
      </div>
      <div key={sub} className="panel-in mt-5">
        {sub === "summary" && (
          <div className="space-y-4 text-sm text-slate-700">
            <Tracker c={c} />
            <div className="flex flex-wrap gap-2 text-xs font-bold"><span className="rounded-full bg-gold-500 px-3 py-1 text-navy-900">{levelOf(c.qualification)}</span><span className="rounded-full bg-navy-50 px-3 py-1 text-navy-700">{PROGRAMS[c.program || "full"].short}</span><span className="rounded-full bg-slate-100 px-3 py-1">{c.session}</span></div>
            <p><b>Subjects:</b> {c.optionList || c.subjects.join(", ")}</p>
            <p><b>Location:</b> {c.city}, {c.country}</p>
            <p><b>British Council fee:</b> {c.paid ? `${pkr(c.feePaid)} paid via ${c.payMethod}` : c.approved ? `Approved — ${pkr(fee.total)} due` : c.regRequest ? "Registration request waiting for approval" : `Not requested yet (${pkr(fee.total)})`} · <b>Past paper downloads:</b> {c.papers.used.length}/{c.papers.quota}</p>
            {c.regular && <RegularBox c={c} role={role} />}
          </div>
        )}

        {sub === "form" && <FormDetails c={c} compact />}

        {sub === "mock" && (
          <div className="space-y-5">
            {review ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between"><Eyebrow>Review {review.subject} paper</Eyebrow><span className="font-bold text-navy-800">{Object.values(review.marks).reduce((a, b) => a + Number(b || 0), 0)} / {c.mock.attempts[review.subject].total}</span></div>
                <PaperBreakdown paper={paperFor(c.qualification, review.subject)} attempt={{ answers: c.mock.attempts[review.subject].answers, partMarks: review.marks }} edit onChange={(id, v) => setReview((r) => ({ ...r, marks: { ...r.marks, [id]: v } }))} />
                <div className="flex gap-2"><Primary onClick={() => { demo.reviewPaper(c.id, review.subject, review.marks); setReview(null); }}>Save reviewed marks</Primary><Btn onClick={() => setReview(null)} className="text-slate-500 hover:bg-slate-100">Cancel</Btn></div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto rounded-2xl ring-1 ring-slate-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-navy-700 text-xs uppercase tracking-wider text-white"><tr><th className="px-4 py-3">Subject</th><th className="px-4 py-3">Score</th><th className="px-4 py-3">Time</th><th className="px-4 py-3">Marking</th></tr></thead>
                    <tbody>{c.subjects.map((s) => { const a = (c.mock.attempts || {})[s]; return (
                      <tr key={s} className="border-t border-slate-100 odd:bg-slate-50/60"><td className="px-4 py-3 font-semibold text-navy-800">{s}</td>
                        <td className="px-4 py-3">{a ? <b className={a.pct >= PASS_MARK ? "text-[#059669]" : "text-red-600"}>{a.score}/{a.total} · {a.pct}%</b> : <span className="text-slate-400">Not taken yet</span>}</td>
                        <td className="px-4 py-3">{a ? `${a.mins} min · try ${a.tries || 1}/${MAX_ATTEMPTS}` : "—"}{a?.reviewRequest?.status === "requested" && <p className="mt-1 max-w-[220px] text-[11px] text-gold-800">"{a.reviewRequest.note || "Please re-check"}"</p>}</td>
                        <td className="px-4 py-3">{!a ? "—" : a.paper ? (canExams ? <Btn onClick={() => setReview({ subject: s, marks: { ...a.partMarks } })} className="bg-gold-100 px-3 py-1 text-xs text-gold-900 hover:bg-gold-200">{a.reviewRequest?.status === "requested" ? "Script review requested" : a.reviewed ? "Reviewed · edit" : `Review (${a.review} written)`}</Btn> : a.reviewed ? "Reviewed" : "Auto-marked") : a.reviewRequest?.status === "requested" && canExams ? <Btn onClick={() => demo.resolveReview(c.id, s)} className="bg-gold-100 px-3 py-1 text-xs text-gold-900 hover:bg-gold-200">Script review requested · confirm marks</Btn> : "Auto (MCQ)"}</td></tr>
                    ); })}</tbody>
                  </table>
                </div>
                <p className="text-xs text-slate-500">Students sit mock tests (up to 3 attempts) in their portal. Papers are marked automatically against the mark scheme; the Exams team reviews written answers.</p>
                {c.mock.published && <ResultCard c={c} onDownload={() => downloadResult(c)} />}
              </>
            )}
          </div>
        )}

        {sub === "pay" && (
          <div className="space-y-4 text-sm">
            <div className="rounded-2xl bg-slate-50 p-4"><p><b>Fee:</b> {pkr(fee.total)} ({c.subjects.length} × {pkr(fee.per)}) · Registration fee: {c.regFee ? `${pkr(c.regFee.amount)} paid via ${c.regFee.method}` : "—"}</p>
              <p className="mt-1"><b>Status:</b> {c.paid ? `Paid via ${c.payMethod} on ${fmt(c.paidAt)}` : c.approved ? `Approved ${fmt(c.approvedAt)} — waiting for the student to pay` : c.regRequest ? `Registration requested ${fmt(c.regRequest.at)} — needs admin approval` : "Student has not requested registration yet"}</p></div>
            {requested(c) && (isAdmin ? (
              <div className="rounded-2xl border border-gold-200 bg-gold-50 p-4">
                <Eyebrow>Approve registration</Eyebrow>
                <p className="mt-1 text-xs text-slate-600">After approval the student can pay the fee in their portal.</p>
                <div className="mt-3 flex flex-wrap gap-2"><Primary onClick={() => demo.approveRegistration(c.id)}><Check className="h-4 w-4" /> Approve</Primary></div>
                <div className="mt-3 flex gap-2"><input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason, if not approving" className={inputCls} /><Btn disabled={!reason} onClick={() => demo.rejectRegistration(c.id, reason)} className="bg-red-50 text-red-700 hover:bg-red-100"><X className="h-4 w-4" /> Reject</Btn></div>
              </div>
            ) : <p className="rounded-xl bg-gold-50 p-3 text-xs text-gold-900">Waiting for the admin to approve this registration.</p>)}
            {c.docs.filter((d) => d.cat === "Fee slip" || d.cat === "Fee receipt").map((d) => <p key={d.id} className="text-xs"><FileText className="mr-1 inline h-3.5 w-3.5" /> {d.name} <span className="text-slate-400">({d.cat})</span></p>)}
          </div>
        )}

        {sub === "exam" && (
          <div className="space-y-5">
            {c.soe ? (
              <>
                <div className="grid gap-3 text-sm sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-4"><Eyebrow>Candidate no.</Eyebrow><p className="mt-1 font-mono text-lg font-bold text-navy-800">{c.soe.candidateNo}</p></div><div className="rounded-2xl bg-slate-50 p-4"><Eyebrow>Centre</Eyebrow><p className="mt-1 font-bold text-navy-800">{c.soe.centre}</p><p className="text-xs text-slate-500">{c.soe.venue}</p></div></div>
                <Datesheet rows={c.soe.timetable} att onMark={canExams ? (i, v) => demo.markAttendance(c.id, i, v) : undefined} />
                {canExams && <p className="text-xs text-slate-500">Mark each paper Appeared or Absent — the student sees it on their dashboard.</p>}
                <Gold onClick={() => downloadSOE(c)}><Download className="h-4 w-4" /> Download SOE</Gold>
              </>
            ) : !approved(c) ? <p className="text-sm text-slate-500">{c.approved ? "Approved — waiting for the student to pay the fee." : c.regRequest ? "Registration waiting for admin approval." : passed(c) ? "Passed — the student has not requested registration yet." : "Exam registration opens after a 60%+ mock result, admin approval and fee payment."}</p> : canUpload ? (
              <div className="space-y-3 rounded-2xl border border-slate-100 p-4">
                <Eyebrow>Upload the SOE from the British Council</Eyebrow>
                <p className="text-xs text-slate-500">The Statement of Entry and timetable come from the board. Upload the SOE file, and the official timetable for this candidate's subjects is attached automatically.</p>
                <select value={soe.centre} onChange={(e) => setSoe((s) => ({ ...s, centre: Number(e.target.value) }))} className={inputCls}>{CENTRES.map((ct, i) => <option key={i} value={i}>{ct.name}</option>)}</select>
                <input placeholder="Candidate no. (from SOE)" value={soe.no} onChange={(e) => setSoe((s) => ({ ...s, no: e.target.value }))} className={inputCls} />
                <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-200 p-3 text-center text-sm hover:border-gold-400"><Upload className="mx-auto h-5 w-5 text-gold-600" /><span className="font-bold text-navy-800">{soe.file ? soe.file.name : "Upload SOE file (PDF)"}</span>
                  <input type="file" className="hidden" onChange={(e) => readFiles(e.target.files, (f) => setSoe((s) => ({ ...s, file: f })))} /></label>
                <details className="text-xs"><summary className="cursor-pointer font-bold text-navy-700">Preview timetable from the board ({boardTimetable(c).length} papers)</summary><div className="mt-2"><Datesheet rows={boardTimetable(c)} /></div></details>
                <Primary className="w-full" disabled={!soe.no} onClick={() => demo.issueSOE(c.id, soe.centre, soe.no, soe.file)}>Publish SOE & notify student</Primary>
              </div>
            ) : <p className="text-sm text-slate-500">Fee paid — the Exams team uploads the SOE.</p>}
          </div>
        )}

        {sub === "results" && c.paid && canUpload && (
          <div className="mb-5 space-y-3 rounded-2xl border border-slate-100 p-4">
            <Eyebrow>Marked exam scripts (from the British Council)</Eyebrow>
            {(c.examScripts || []).map((sc) => <p key={sc.id} className="flex items-center gap-2 text-xs"><FileText className="h-3.5 w-3.5 text-navy-700" /> <b>{sc.subject} {sc.paper}</b> · {sc.file} {sc.marks && `· ${sc.marks}`}{sc.bcReview && <span className="rounded bg-gold-100 px-1.5 font-bold text-gold-900">BC review requested</span>}</p>)}
            <div className="grid gap-2 sm:grid-cols-[1fr_110px]">
              <select value={scr.row} onChange={(e) => setScr((x) => ({ ...x, row: Number(e.target.value) }))} className={inputCls}>{sheet.map((r, i) => <option key={i} value={i}>{r.code} · {r.subject} {r.paper}</option>)}</select>
              <input value={scr.marks} onChange={(e) => setScr((x) => ({ ...x, marks: e.target.value }))} placeholder="Marks e.g. 62/80" className={inputCls} />
            </div>
            <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-200 p-3 text-center text-sm hover:border-gold-400"><Upload className="mx-auto h-5 w-5 text-gold-600" /><span className="font-bold text-navy-800">{scr.file ? scr.file.name : "Upload marked script (PDF)"}</span>
              <input type="file" className="hidden" onChange={(e) => readFiles(e.target.files, (f) => setScr((x) => ({ ...x, file: f })))} /></label>
            <Primary className="w-full" disabled={API && !scr.file} onClick={async () => { await demo.uploadExamScript(c.id, sheet[scr.row], scr.file, scr.marks); setScr({ row: 0, marks: "", file: null }); }}>Upload script & notify student</Primary>
          </div>
        )}
        {sub === "results" && (
          c.examResult ? <ExamResultCard c={c} /> : !c.paid ? <p className="text-sm text-slate-500">Exam results can be uploaded after the British Council fee is paid.</p> : canUpload ? (
            <div className="space-y-3 rounded-2xl border border-slate-100 p-4">
              <Eyebrow>Upload British Council exam results</Eyebrow>
              {c.subjects.map((s) => (
                <label key={s} className="flex items-center justify-between gap-3 text-sm"><span className="font-semibold text-navy-800">{s}</span>
                  <select value={grades[s] || ""} onChange={(e) => setGrades((g) => ({ ...g, [s]: e.target.value }))} className="w-28 rounded-xl border border-slate-200 px-3 py-1.5"><option value="">Grade</option>{GRADES[levelOf(c.qualification)].map((g) => <option key={g}>{g}</option>)}</select></label>
              ))}
              <label className="block cursor-pointer rounded-xl border-2 border-dashed border-slate-200 p-3 text-center text-sm hover:border-gold-400"><Upload className="mx-auto h-5 w-5 text-gold-600" /><span className="font-bold text-navy-800">{sor ? sor.name : "Upload Statement of Results (PDF)"}</span>
                <input type="file" className="hidden" onChange={(e) => readFiles(e.target.files, setSor)} /></label>
              <Primary className="w-full" disabled={!c.subjects.every((s) => grades[s])} onClick={() => demo.publishExamResults(c.id, grades, sor)}>Publish exam result card</Primary>
            </div>
          ) : <p className="text-sm text-slate-500">Results not uploaded yet (Exams department).</p>
        )}

        {sub === "docs" && <DocsPanel c={c} by="staff" />}
      </div>
    </div>
  );
}

/* Exams team: drop many files at once — each is matched to a student by the file name
   (candidate ID, candidate number or full name) and sent to the right place in their portal. */
const KINDS = { soe: "SOE (exam sheet)", result: "Result card", script: "Marked script" };
const norm = (t) => ` ${String(t || "").toLowerCase().replace(/\.[a-z0-9]+$/, "").replace(/[^a-z0-9]+/g, " ").trim()} `;
function guessKind(n) {
  if (/ (soe|entry|statement of entry|admit|datesheet|exam sheet) /.test(n)) return "soe";
  if (/ (result|results|sor|statement of results|grade|grades) /.test(n)) return "result";
  if (/ (script|scripts|marked|paper|p1|p2|p3) /.test(n)) return "script";
  return "";
}
function guessStudent(n, list) {
  // best match wins; if two students match equally (same name), nobody is picked — staff chooses
  let best = null; let score = 0; let tie = false;
  for (const c of list) {
    const first = norm(c.first).trim(); const last = norm(c.last).trim();
    let sc = 0;
    if (n.includes(norm(c.id))) sc = 100;
    else if (c.soe?.candidateNo && n.includes(norm(c.soe.candidateNo))) sc = 90;
    else if (n.includes(` ${first} ${last} `)) sc = 80;
    else if (first && last && n.includes(` ${first} `) && n.includes(` ${last} `)) sc = 70;
    if (sc > score) { score = sc; best = c; tie = false; } else if (sc && sc === score) tie = true;
  }
  return tie ? { tie: true } : best;
}
function guessPaper(n, rows) {
  const byCode = rows.findIndex((r) => r.code && r.code !== "—" && n.includes(norm(r.code)));
  if (byCode >= 0) return byCode;
  const num = (n.match(/ (?:paper|p) ?([1-4]) /) || [])[1];
  const subj = rows.map((r, i) => [r, i]).filter(([r]) => n.includes(norm(r.subject)));
  if (subj.length === 1) return subj[0][1];
  if (num) { const hit = subj.find(([r]) => r.paper === `Paper ${num}`); if (hit) return hit[1]; }
  return -1;
}

function BulkUpload({ all }) {
  const demo = useDemo();
  const ready = all.filter((c) => c.paid);   // fee paid → uploads allowed
  const [rows, setRows] = useState([]);
  const [busy, setBusy] = useState(false);
  const sheetOf = (c) => (c ? c.soe?.timetable || boardTimetable(c) : []);
  const add = (files) => readFiles(files, (f) => setRows((list) => {
    const n = norm(f.name); const g = guessStudent(n, ready); const c = g?.tie ? null : g;
    return [...list, { key: Math.random().toString(36).slice(2), file: f, id: c?.id || "", same: !!g?.tie, kind: guessKind(n) || (c ? "script" : ""), paper: c ? guessPaper(n, sheetOf(c)) : -1, status: "" }];
  }));
  const set = (key, patch) => setRows((list) => list.map((r) => (r.key === key ? { ...r, ...patch } : r)));
  const okRow = (r) => !!(r.id && r.kind && (r.kind !== "script" || r.paper >= 0) && (API ? r.file.file : true));
  const todo = rows.filter((r) => r.status !== "done");
  const go = async () => {
    const send = todo.filter(okRow);
    if (!send.length) return;
    setBusy(true);
    const res = await demo.bulkUpload(send.map((r) => ({ id: r.id, kind: r.kind, file: r.file, row: sheetOf(ready.find((c) => c.id === r.id))[r.paper] })));
    setRows((list) => list.map((r) => { const i = send.indexOf(r); return i < 0 ? r : { ...r, status: res?.[i]?.ok ? "done" : "error", error: res?.[i]?.error }; }));
    setBusy(false);
  };
  return (
    <Card>
      <Eyebrow>Bulk upload — SOE, result cards & scripts</Eyebrow>
      <p className="mt-1 text-xs text-slate-500">Drop all the files from the British Council at once. Each file is matched to the student by its name and goes straight to the right place: SOE → "SOE & venue", result card → "Result cards", script → "My scripts". Only students who have paid the British Council fee are listed.</p>
      <p className="mt-2 rounded-xl bg-slate-50 px-3 py-2 text-[11px] text-slate-600">Name files like: <b>Ali Khan SOE.pdf</b> · <b>PC-2026-0001 result.pdf</b> · <b>Ali Khan 4MA1 1H script.pdf</b>. If two students have the same name, use the candidate ID (PC-…) or candidate number in the file name — otherwise the file waits for you to choose.</p>
      <label className="mt-4 block cursor-pointer rounded-2xl border-2 border-dashed border-slate-200 p-6 text-center hover:border-gold-400">
        <Upload className="mx-auto h-7 w-7 text-gold-600" /><span className="mt-1 block font-bold text-navy-800">Choose files (PDF or images) — many at once</span>
        <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp" className="hidden" onChange={(e) => { add(e.target.files); e.target.value = ""; }} />
      </label>
      {ready.length === 0 && <p className="mt-3 text-sm text-gold-800">No student has paid the British Council fee yet, so there is nobody to upload to.</p>}
      {rows.length > 0 && (
        <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-navy-700 text-xs uppercase tracking-wider text-white"><tr><th className="px-3 py-2">File</th><th className="px-3 py-2">Student</th><th className="px-3 py-2">Goes to</th><th className="px-3 py-2">Paper</th><th className="px-3 py-2" /></tr></thead>
          <tbody>{rows.map((r) => {
            const c = ready.find((x) => x.id === r.id); const sheet = sheetOf(c);
            return (
              <tr key={r.key} className={`border-t border-slate-100 ${r.status === "done" ? "bg-[#ecfdf5]" : !okRow(r) ? "bg-gold-50" : ""}`}>
                <td className="max-w-[200px] truncate px-3 py-2 font-semibold text-navy-800" title={r.file.name}><FileText className="mr-1 inline h-3.5 w-3.5" />{r.file.name}</td>
                <td className="px-3 py-2"><select disabled={r.status === "done"} value={r.id} onChange={(e) => set(r.key, { id: e.target.value, paper: -1 })} className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
                  <option value="">{r.same ? "— same name: choose by ID —" : "— not matched, choose —"}</option>{ready.map((x) => <option key={x.id} value={x.id}>{x.first} {x.last} · {x.id}</option>)}</select></td>
                <td className="px-3 py-2"><select disabled={r.status === "done"} value={r.kind} onChange={(e) => set(r.key, { kind: e.target.value })} className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
                  <option value="">— choose —</option>{Object.entries(KINDS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}</select></td>
                <td className="px-3 py-2">{r.kind === "script" ? <select disabled={r.status === "done" || !c} value={r.paper} onChange={(e) => set(r.key, { paper: Number(e.target.value) })} className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs">
                  <option value={-1}>— choose paper —</option>{sheet.map((p, i) => <option key={i} value={i}>{p.code} · {p.subject} {p.paper}</option>)}</select> : <span className="text-xs text-slate-400">—</span>}</td>
                <td className="whitespace-nowrap px-3 py-2 text-xs">{r.status === "done" ? <b className="text-[#047857]">✓ Sent</b> : r.status === "error" ? <span className="text-red-600" title={r.error}>✗ {r.error}</span>
                  : <button type="button" onClick={() => setRows((l) => l.filter((x) => x.key !== r.key))} className="text-slate-400 hover:text-red-600"><X className="h-4 w-4" /></button>}</td>
              </tr>
            );
          })}</tbody>
        </table></div>
      )}
      {todo.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate-500">{todo.filter(okRow).length} ready · {todo.filter((r) => !okRow(r)).length} need a student / type / paper</p>
          <Primary disabled={busy || !todo.some(okRow)} onClick={go}><Upload className="h-4 w-4" /> {busy ? "Uploading…" : `Upload ${todo.filter(okRow).length} file(s) to student portals`}</Primary>
        </div>
      )}
    </Card>
  );
}

/* Staff dashboard: students grouped by exam session */
function SessionBoard({ all, open }) {
  const names = [...new Set([...SESSIONS, ...all.map((c) => c.session).filter(Boolean)])];
  const [pick, setPick] = useState(() => names.find((sn) => all.some((c) => c.session === sn)) || names[0]);
  const inSession = (sn) => all.filter((c) => c.session === sn);
  const list = inSession(pick);
  return (
    <Card>
      <Eyebrow>Registered students by exam session</Eyebrow>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {names.map((sn) => {
          const on = sn === pick; const n = inSession(sn).length;
          return (
            <button key={sn} type="button" onClick={() => setPick(sn)} className={`rounded-2xl p-4 text-left transition ${on ? "bg-navy-700 text-white shadow-lg" : "bg-slate-50 text-navy-800 ring-1 ring-slate-100 hover:ring-gold-300"}`}>
              <p className={`text-xs font-bold uppercase tracking-wider ${on ? "text-gold-300" : "text-slate-400"}`}>{sn}</p>
              <p className="mt-1 text-3xl font-extrabold">{n}</p>
              <p className={`text-xs ${on ? "text-white/70" : "text-slate-500"}`}>student{n === 1 ? "" : "s"}</p>
            </button>
          );
        })}
      </div>
      <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[640px] text-left text-xs">
        <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500"><tr><th className="px-3 py-2.5">Student</th><th className="px-3 py-2.5">Level</th><th className="px-3 py-2.5">Subjects</th><th className="px-3 py-2.5">Exam city</th><th className="px-3 py-2.5">Status</th></tr></thead>
        <tbody>
          {list.map((c) => (
            <tr key={c.id} onClick={() => open(c.id)} className="cursor-pointer border-t border-slate-100 hover:bg-gold-50">
              <td className="px-3 py-2"><p className="text-[13px] font-bold text-navy-800">{c.first} {c.last}</p><p className="text-[11px] text-slate-500">{c.id}</p></td>
              <td className="px-3 py-2 font-semibold text-gold-700">{levelOf(c.qualification)}</td>
              <td className="px-3 py-2 text-slate-600">{c.subjects.join(", ")}</td>
              <td className="px-3 py-2 text-slate-600">{c.location || "—"}</td>
              <td className="px-3 py-2"><Status c={c} /></td>
            </tr>
          ))}
          {list.length === 0 && <tr><td colSpan={5} className="px-4 py-6 text-center text-slate-500">No student has registered for {pick} yet.</td></tr>}
        </tbody>
      </table></div>
    </Card>
  );
}

/* Staff dashboard: every student's fees in one table */
function FeeTable({ all, open }) {
  const [q, setQ] = useState("");
  const pill = (t, cls) => <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-1 text-[11px] font-bold ${cls}`}>{t}</span>;
  const PAID = "bg-[#d1fae5] text-[#065f46]"; const DUE = "bg-red-100 text-red-700"; const WAIT = "bg-gold-100 text-gold-900"; const NONE = "bg-slate-100 text-slate-500";
  const rows = all.filter((c) => `${c.first} ${c.last} ${c.id}`.toLowerCase().includes(q.toLowerCase())).map((c) => {
    const reg = c.regFee ? ["Paid", PAID, c.regFee.amount, c.regFee.method] : c.regFeeDue?.stage === "awaiting_verification" ? ["Slip to verify", WAIT, c.regFeeDue.amount] : ["Pending", DUE, c.regFeeDue?.amount ?? REG_FEE];
    const fee = feeFor(c);
    const bc = c.paid ? ["Paid", PAID, c.feePaid, c.payMethod] : c.bcFeeDue?.stage === "awaiting_verification" ? ["Slip to verify", WAIT, c.bcFeeDue.amount] : c.approved ? ["Pending", DUE, c.bcFeeDue?.amount ?? fee.total] : ["Not due yet", NONE, fee.total];
    const pp = (c.papers?.purchases || []).reduce((a, x) => a + (x.amount || 0), 0);
    const paid = (c.regFee ? c.regFee.amount : 0) + (c.paid ? c.feePaid || 0 : 0) + pp;
    const pending = (c.regFee ? 0 : reg[2] || 0) + (!c.paid && c.approved ? bc[2] || 0 : 0);
    return { c, reg, bc, pp, paid, pending };
  });
  const tot = rows.reduce((a, r) => ({ paid: a.paid + r.paid, pending: a.pending + r.pending }), { paid: 0, pending: 0 });
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
        <div><Eyebrow>Fees — who paid what</Eyebrow><p className="mt-1 text-xs text-slate-500">Received <b className="text-[#047857]">{pkr(tot.paid)}</b> · Pending <b className="text-red-600">{pkr(tot.pending)}</b></p></div>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2"><Search className="h-4 w-4 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search student" className="w-40 text-sm outline-none" /></div>
      </div>
      <div className="overflow-x-auto"><table className="w-full min-w-[820px] text-left text-sm">
        <thead className="bg-navy-700 text-xs uppercase tracking-wider text-white"><tr><th className="px-4 py-3">Student</th><th className="px-4 py-3">Registration fee</th><th className="px-4 py-3">British Council fee</th><th className="px-4 py-3">Past papers</th><th className="px-4 py-3 text-right">Paid</th><th className="px-4 py-3 text-right">Pending</th></tr></thead>
        <tbody>{rows.map(({ c, reg, bc, pp, paid, pending }) => (
          <tr key={c.id} onClick={() => open(c.id, "pay")} className="cursor-pointer border-t border-slate-100 align-top odd:bg-slate-50/60 hover:bg-gold-50">
            <td className="px-4 py-3"><p className="font-bold text-navy-800">{c.first} {c.last}</p><p className="text-xs text-slate-500">{c.id} · {levelOf(c.qualification)} · {c.session}</p></td>
            <td className="px-4 py-3">{pill(reg[0], reg[1])}<p className="mt-1 text-xs text-slate-500">{pkr(reg[2])}{reg[3] ? ` · ${reg[3]}` : ""}</p></td>
            <td className="px-4 py-3">{pill(bc[0], bc[1])}<p className="mt-1 text-xs text-slate-500">{pkr(bc[2])}{bc[3] ? ` · ${bc[3]}` : ""}</p></td>
            <td className="px-4 py-3 text-xs text-slate-600">{pp ? pkr(pp) : "—"}</td>
            <td className="px-4 py-3 text-right font-bold text-[#047857]">{pkr(paid)}</td>
            <td className="px-4 py-3 text-right font-bold text-red-600">{pending ? pkr(pending) : "—"}</td>
          </tr>
        ))}
        {rows.length === 0 && <tr><td colSpan={6} className="px-4 py-6 text-center text-slate-500">No students yet.</td></tr>}
        </tbody>
      </table></div>
    </Card>
  );
}

export function StaffPortal({ role }) {
  const demo = useDemo();
  const [tab, setTab] = useState("dashboard");
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(null);
  const [selTab, setSelTab] = useState("summary");
  useEffect(() => { if (tab === "inbox") demo.markRead(role); }, [tab]); // eslint-disable-line
  if (!demo.session || demo.session.type !== "staff" || (demo.session.role !== role && demo.session.role !== "admin")) return <Navigate to="/portal" replace />;

  const all = demo.db.candidates;
  const inbox = demo.db.notifications.filter((n) => n.role === role);
  const unread = inbox.filter((n) => !n.read).length;
  const list = all.filter((c) => `${c.first} ${c.last} ${c.id} ${c.email}`.toLowerCase().includes(q.toLowerCase()));
  const pendingPay = all.filter(requested);
  const regularReqs = all.filter((c) => c.regular && (c.regular.status || "requested") === "requested");
  // mock papers with written answers the Exams team has not checked yet (or an older student request)
  const scriptReqs = all.flatMap((c) => Object.entries(c.mock.attempts || {}).filter(([, a]) => (a.paper && !a.reviewed) || a.reviewRequest?.status === "requested").map(([sub, a]) => ({ c, sub, a })));
  const bcScripts = all.filter((c) => c.soe);
  const nav = [
    { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { key: "candidates", label: role === "exams" ? "Candidates & exams" : "Candidates", icon: Users },
    ...(role !== "exams" ? [{ key: "approvals", label: "Approvals", icon: ShieldCheck, count: pendingPay.length + regularReqs.length }] : []),
    ...(role !== "admissions" ? [{ key: "reviews", label: role === "exams" ? "Upload SOE / results / scripts" : "Scripts", icon: Upload, count: scriptReqs.length }] : []),
    ...(role !== "admissions" ? [{ key: "sheets", label: "Exam sheets & centres", icon: GraduationCap }] : []),
    ...(API && role !== "exams" ? [{ key: "payments", label: "Payments to verify", icon: Wallet, count: (demo.db.slips || []).length }] : []),
    ...(role === "admin" ? [{ key: "prices", label: "Fees & prices", icon: Wallet }] : []),
    ...(API && role === "admin" ? [{ key: "staff", label: "Staff accounts", icon: Users }] : []),
    { key: "inbox", label: "Notifications", icon: Bell, count: unread },
  ];
  const revenue = {
    fees: all.reduce((a, c) => a + (c.paid ? c.feePaid || 0 : 0), 0),
    reg: all.reduce((a, c) => a + (c.regFee?.amount || 0), 0),
    papers: all.reduce((a, c) => a + c.papers.purchases.reduce((x, p) => x + p.amount, 0), 0),
  };
  const stats = [
    ["Registrations", all.length, Users], ["Mock tests done", all.filter((c) => c.mock.published).length, ClipboardCheck],
    [`Passed ${PASS_MARK}%+`, all.filter(passed).length, Award], ["SOE issued", all.filter((c) => c.soe).length, GraduationCap],
  ];
  const bell = (
    <button type="button" onClick={() => setTab("inbox")} className="relative grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-navy-700">
      <Bell className="h-5 w-5" />{unread > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">{unread}</span>}
    </button>
  );
  const s = sel && all.find((c) => c.id === sel);
  const open = (id, t = "summary") => { setSel(id); setSelTab(t); setTab("candidates"); };

  const approvalsList = (
    <div className="space-y-3">
      {pendingPay.length === 0 && <p className="text-sm text-slate-500">No registration requests waiting for approval.</p>}
      {pendingPay.map((c) => (
        <div key={c.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-gold-200 bg-gold-50/60 p-4">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 text-navy-900"><Wallet className="h-5 w-5" /></span>
          <div className="min-w-0 flex-1"><p className="font-bold text-navy-800">{c.first} {c.last} <span className="text-xs font-normal text-slate-500">{c.id}</span></p><p className="text-xs text-slate-600">Mock average {average(c.mock.marks)}% · {c.subjects.length} subject(s) · {c.session} · fee {pkr(feeFor(c).total)} · requested {fmt(c.regRequest.at)}</p></div>
          {role === "admin" ? <Primary onClick={() => demo.approveRegistration(c.id)}><Check className="h-4 w-4" /> Approve</Primary> : <span className="text-xs font-semibold text-gold-800">Waiting for admin</span>}
          <Ghost className="px-3 py-1.5 text-xs" onClick={() => open(c.id)}>Open file</Ghost>
        </div>
      ))}
    </div>
  );

  return (
    <Shell title={ROLE_LABEL[role]} subtitle={demo.session.name} nav={nav} active={tab} setActive={setTab} bell={bell}>
      {tab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map(([k, v, Icon]) => (<Card key={k}><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{k}</p><Icon className="h-5 w-5 text-gold-600" /></div><p className="mt-3 font-serif text-4xl font-semibold text-navy-800">{v}</p></Card>))}
          </div>
          <SessionBoard all={all} open={open} />
          {role !== "exams" && <FeeTable all={all} open={open} />}
          {role !== "exams" && pendingPay.length > 0 && <Card><div className="mb-4 flex items-center justify-between"><Eyebrow>Registrations waiting for approval</Eyebrow><span className="rounded-full bg-red-500 px-2.5 text-xs font-bold text-white">{pendingPay.length}</span></div>{approvalsList}</Card>}
          <Card>
            <Eyebrow>Latest notifications</Eyebrow>
            {inbox.slice(0, 6).map((n) => <button key={n.id} type="button" onClick={() => n.cid && open(n.cid)} className="block w-full border-b border-slate-100 py-3 text-left text-sm text-slate-700 last:border-0 hover:text-navy-800"><span className="mr-2 text-xs text-slate-400">{fmt(n.at)}</span>{n.text}</button>)}
            {inbox.length === 0 && <p className="mt-3 text-sm text-slate-500">No notifications yet. Sign up as a new student to see them arrive here.</p>}
          </Card>
        </div>
      )}

      {tab === "candidates" && (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.25fr]">
          <Card className="self-start overflow-hidden p-0">
            <div className="flex items-center gap-2 border-b border-slate-100 p-4"><Search className="h-4 w-4 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, ID or email" className="w-full text-sm outline-none" /></div>
            <div className="overflow-x-auto"><table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Candidate</th><th className="px-4 py-3">Status</th></tr></thead>
              <tbody>{list.map((c) => (
                <tr key={c.id} onClick={() => setSel(c.id)} className={`cursor-pointer border-t border-slate-100 transition hover:bg-gold-50 ${sel === c.id ? "bg-navy-50" : ""}`}>
                  <td className="px-4 py-3"><p className="font-bold text-navy-800">{c.first} {c.last}{c.sample && <span className="ml-2 rounded bg-slate-100 px-1.5 text-[10px] text-slate-500">sample</span>}</p><p className="text-xs text-slate-500">{c.id} · <b className="text-gold-700">{levelOf(c.qualification)}</b> · {c.subjects.length} subjects · {c.program === "mock" ? "Mock only" : "Mock → BC"}</p></td>
                  <td className="px-4 py-3"><Status c={c} /></td>
                </tr>))}</tbody>
            </table></div>
          </Card>
          <Card>{s ? <CandidateDetail key={s.id + selTab} c={s} role={role} start={selTab} /> : <p className="text-sm text-slate-500">Select a candidate to see their file and take action.</p>}</Card>
        </div>
      )}

      {tab === "approvals" && (
        <div className="max-w-4xl space-y-6">
          <Card><Eyebrow>British Council registration</Eyebrow><div className="mt-4">{approvalsList}</div></Card>
          <Card>
            <Eyebrow>Become a regular student</Eyebrow>
            <div className="mt-4 space-y-3">
              {regularReqs.length === 0 && <p className="text-sm text-slate-500">No requests from students who want to join as regular students.</p>}
              {regularReqs.map((c) => <RegularBox key={c.id} c={c} role={role} onOpen={() => open(c.id)} />)}
            </div>
          </Card>
        </div>
      )}

      {tab === "prices" && <div className="space-y-6"><PriceSettings /><div className="max-w-4xl"><ExamSeriesSettings /></div></div>}
      {tab === "payments" && <SlipList open={open} />}
      {tab === "staff" && <StaffAccounts />}

      {tab === "reviews" && (
        <div className="max-w-5xl space-y-5">
          {role === "exams" && <BulkUpload all={all} />}
          <Card>
            <Eyebrow>Mock scripts to check</Eyebrow>
            <p className="mt-1 text-xs text-slate-500">Written answers are marked automatically first. Open a script, check it and save the marks — the student sees the update straight away.</p>
            {scriptReqs.length === 0 && <p className="mt-4 text-sm text-slate-500">All mock scripts are checked.</p>}
            {scriptReqs.map(({ c, sub, a }) => (
              <div key={c.id + sub} className="flex flex-wrap items-center gap-4 border-b border-slate-100 py-4 last:border-0">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 text-navy-900"><Search className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1"><p className="font-bold text-navy-800">{c.first} {c.last} · {sub} <span className="text-xs font-normal text-slate-500">{a.score}/{a.total} ({a.pct}%)</span></p>
                  <p className="text-xs text-slate-600">{c.id} · attempt {a.tries || 1}{a.reviewRequest?.status === "requested" ? ` · student note: "${a.reviewRequest.note || "Please re-check"}"` : ""}</p></div>
                <Ghost className="px-3 py-1.5 text-xs" onClick={() => open(c.id, "mock")}>Open & check</Ghost>
              </div>
            ))}
          </Card>
          <Card>
            <Eyebrow>British Council exam scripts</Eyebrow>
            <p className="mt-1 text-xs text-slate-500">When the marked papers come back from the British Council, upload each one to the student's portal.</p>
            {bcScripts.length === 0 && <p className="mt-4 text-sm text-slate-500">No candidate has an SOE yet.</p>}
            {bcScripts.map((c) => (
              <div key={c.id} className="flex flex-wrap items-center gap-4 border-b border-slate-100 py-4 last:border-0">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-700 text-gold-300"><Upload className="h-5 w-5" /></span>
                <div className="min-w-0 flex-1"><p className="font-bold text-navy-800">{c.first} {c.last} <span className="text-xs font-normal text-slate-500">{c.id}</span></p>
                  <p className="text-xs text-slate-600">{(c.examScripts || []).length} of {(c.soe.timetable || []).length} scripts uploaded</p></div>
                <Ghost className="px-3 py-1.5 text-xs" onClick={() => open(c.id, "results")}>Upload scripts</Ghost>
              </div>
            ))}
          </Card>
        </div>
      )}

      {tab === "sheets" && (
        <Card className="overflow-hidden p-0">
          <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-navy-700 text-xs uppercase tracking-wider text-white"><tr><th className="px-4 py-3">Candidate</th><th className="px-4 py-3">Mock</th><th className="px-4 py-3">Candidate no.</th><th className="px-4 py-3">Exam centre / venue</th><th className="px-4 py-3">Papers</th><th className="px-4 py-3">Downloads</th></tr></thead>
            <tbody>{all.map((c) => (
              <tr key={c.id} className="border-t border-slate-100 align-top odd:bg-slate-50/60">
                <td className="px-4 py-3"><button type="button" onClick={() => open(c.id)} className="text-left font-bold text-navy-800 hover:text-gold-700">{c.first} {c.last}</button><p className="text-xs text-slate-500">{c.id} · {levelOf(c.qualification)} · {c.session}</p></td>
                <td className="px-4 py-3">{c.mock.published ? <span className={passed(c) ? "font-bold text-[#059669]" : "font-bold text-red-600"}>{average(c.mock.marks)}%</span> : <span className="text-slate-400">—</span>}</td>
                <td className="px-4 py-3 font-mono">{c.soe?.candidateNo || <span className="text-slate-400">—</span>}</td>
                <td className="px-4 py-3">{c.soe ? <><p className="font-semibold text-navy-800">{c.soe.centre}</p><p className="text-xs text-slate-500">{c.soe.venue}</p></> : <span className="text-slate-400">Not issued</span>}</td>
                <td className="px-4 py-3">{c.soe ? <span className="whitespace-nowrap text-xs"><b className="text-[#047857]">{c.soe.timetable.filter((r) => r.att === "appeared").length}</b> appeared · <b className="text-red-600">{c.soe.timetable.filter((r) => r.att === "absent").length}</b> absent · {c.soe.timetable.length} total</span> : "—"}</td>
                <td className="px-4 py-3"><div className="flex flex-wrap gap-1">
                  {c.mock.published && <Btn onClick={() => downloadResult(c)} className="bg-slate-100 px-3 py-1 text-xs text-navy-700 hover:bg-gold-100">Mock result</Btn>}
                  {c.soe && <Btn onClick={() => downloadSOE(c)} className="bg-slate-100 px-3 py-1 text-xs text-navy-700 hover:bg-gold-100">SOE</Btn>}
                </div></td>
              </tr>))}</tbody>
          </table></div>
        </Card>
      )}

      {tab === "inbox" && (
        <Card className="max-w-3xl">
          {inbox.length === 0 && <p className="text-sm text-slate-500">No notifications yet.</p>}
          {inbox.map((n) => (
            <button key={n.id} type="button" onClick={() => n.cid && open(n.cid)} className="flex w-full gap-4 border-b border-slate-100 py-4 text-left last:border-0">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-navy-700 text-gold-400"><Bell className="h-5 w-5" /></span>
              <div><p className="text-sm text-navy-800">{n.text}</p><p className="mt-1 text-xs text-slate-400">{fmt(n.at)}{API ? "" : " · also sent by email / WhatsApp in the real system"}</p></div>
            </button>
          ))}
        </Card>
      )}
    </Shell>
  );
}

function ScriptPaper({ paper }) {
  const [pg, setPg] = useState(1);
  return <PaperViewer paper={paper} page={pg} setPage={setPg} />;
}

function PriceSettings() {
  const demo = useDemo();
  const [st, setSt] = useState(() => JSON.parse(JSON.stringify(demo.db.settings)));
  const [saved, setSaved] = useState(false);
  const num = (path) => (e) => { const v = e.target.value.replace(/[^\d]/g, ""); setSaved(false); setSt((x) => { const y = JSON.parse(JSON.stringify(x)); const k = path.split("."); let o = y; k.slice(0, -1).forEach((p) => { o = o[p]; }); o[k[k.length - 1]] = v; return y; }); };
  const row = (label, path, hint) => {
    const v = path.split(".").reduce((o, k) => o?.[k], st);
    return (
      <label key={path} className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 py-3 last:border-0">
        <span><span className="block text-sm font-semibold text-navy-800">{label}</span>{hint && <span className="block text-xs text-slate-500">{hint}</span>}</span>
        <span className="flex items-center gap-2"><span className="text-xs font-bold text-slate-400">PKR</span><input inputMode="numeric" value={v} onChange={num(path)} className="w-32 rounded-xl border border-slate-200 px-3 py-2 text-right text-sm font-bold text-navy-800 outline-none focus:border-gold-400 focus:ring-4 focus:ring-gold-100" /></span>
      </label>
    );
  };
  return (
    <div className="max-w-4xl space-y-5">
      <p className="rounded-2xl bg-gold-50 p-4 text-sm text-gold-900 ring-1 ring-gold-200">Change any amount here and press Save — the new price shows everywhere in the portal straight away (sign-up form, fee page, packages). Payments already made keep their old amount.</p>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card><Eyebrow>Registration & British Council fee</Eyebrow><div className="mt-2">
          {row("Registration fee", "reg", "Paid at sign-up")}
          {row("BC exam fee — IGCSE", "bcIgcse", "Per subject")}
          {row("BC exam fee — A Levels (IAL)", "bcAlevel", "Per subject")}
        </div></Card>
        <Card><Eyebrow>Past paper packages</Eyebrow><div className="mt-2">
          {row("1 past paper", "pk.p1")}
          {row("5 past papers", "pk.p5")}
          {row("8 past papers", "pk.p8")}
        </div></Card>
      </div>
      <div className="flex items-center gap-3"><Gold onClick={async () => { const r = await demo.saveSettings(st); if (!API || r) setSaved(true); }}><Check className="h-4 w-4" /> Save prices</Gold>{saved && <span className="text-sm font-semibold text-[#047857]">Saved — new prices are live.</span>}</div>
      {API && <div className="grid gap-5 lg:grid-cols-2"><BankSettings /><ContactSettings /></div>}
    </div>
  );
}

/* ============================ LIVE MODE ONLY ============================ */
function RegFeeGate({ c, onPay }) {
  const due = c.regFeeDue;
  const waiting = due?.stage === "awaiting_verification";
  return (
    <Card className="mx-auto max-w-2xl text-center">
      <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gold-500 text-navy-900"><Wallet className="h-8 w-8" /></span>
      <p className="mt-4 font-serif text-3xl font-semibold text-navy-800">{waiting ? "Your slip is being checked" : "Pay your registration fee"}</p>
      <p className="mx-auto mt-2 max-w-lg text-sm text-slate-600">{waiting
        ? `We received your bank slip for ${pkr(due.amount)}. Admissions will verify it shortly — your mock tests open as soon as it is verified.`
        : `Your form is saved (${c.id}). Pay the ${pkr(due?.amount ?? REG_FEE)} registration fee to open your mock tests and the rest of your portal.`}</p>
      {due?.status === "failed" && <p className="mx-auto mt-4 max-w-lg rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">Your last slip could not be verified: {due.note}. Please pay again.</p>}
      {!waiting && (
        <div className="mx-auto mt-6 grid max-w-lg grid-cols-2 gap-3">
          {[["Card", "bg-navy-700", "Debit / credit card"], ["Easypaisa", "bg-[#1fa84f]", "Mobile wallet"], ["JazzCash", "bg-[#c8102e]", "Mobile wallet"], ["Bank transfer", "bg-slate-600", "Upload paid slip"]].map(([m, bg, sub]) => (
            <button key={m} type="button" onClick={() => onPay(m)} className="rounded-2xl border-2 border-slate-100 p-4 text-left transition hover:-translate-y-0.5 hover:border-gold-400 hover:shadow-lg">
              <span className={`grid h-10 w-10 place-items-center rounded-xl text-white ${bg}`}><Wallet className="h-5 w-5" /></span>
              <span className="mt-3 block font-bold text-navy-800">{m}</span><span className="block text-xs text-slate-500">{sub}</span>
            </button>
          ))}
        </div>
      )}
    </Card>
  );
}

function SlipList({ open }) {
  const demo = useDemo();
  const [notes, setNotes] = useState({});
  const slips = demo.db.slips || [];
  return (
    <Card className="max-w-4xl">
      <p className="mb-4 text-sm text-slate-600">Bank slips uploaded by students. Check the amount and reference against the bank statement, then mark it received — or reject it with a reason (the student is told and can upload again).</p>
      {slips.length === 0 && <p className="text-sm text-slate-500">No slips waiting.</p>}
      {slips.map((p) => (
        <div key={p.id} className="border-b border-slate-100 py-4 last:border-0">
          <div className="flex flex-wrap items-center gap-4">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 text-navy-900"><Wallet className="h-5 w-5" /></span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-navy-800">{p.candidateName} <span className="text-xs font-normal text-slate-500">{p.candidateId}</span></p>
              <p className="text-xs text-slate-600">{p.label} · <b>{pkr(p.amount)}</b>{p.reference ? ` · ref ${p.reference}` : ""} · {fmt(p.createdAt)}</p>
            </div>
            <Btn onClick={() => window.open(fileUrl(p.slipFileId), "_blank", "noopener")} className="bg-slate-100 px-3 py-1.5 text-xs text-navy-700 hover:bg-gold-100"><FileText className="h-4 w-4" /> View slip</Btn>
            <Ghost className="px-3 py-1.5 text-xs" onClick={() => open(p.candidateId)}>Open file</Ghost>
          </div>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <Primary onClick={() => demo.verifySlip(p.id, true)}><Check className="h-4 w-4" /> Received — mark paid</Primary>
            <input value={notes[p.id] || ""} onChange={(e) => setNotes((n) => ({ ...n, [p.id]: e.target.value }))} placeholder="Reason, if rejecting (e.g. amount does not match)" className={inputCls} />
            <Btn disabled={!notes[p.id]} onClick={() => demo.verifySlip(p.id, false, notes[p.id])} className="bg-red-50 text-red-700 hover:bg-red-100"><X className="h-4 w-4" /> Reject</Btn>
          </div>
        </div>
      ))}
    </Card>
  );
}

function StaffAccounts() {
  const demo = useDemo();
  const [list, setList] = useState(null);
  const [f, setF] = useState({ name: "", email: "", role: "admissions", password: "" });
  const reload = () => demo.listStaff().then(setList).catch((e) => demo.say(e.message));
  useEffect(() => { reload(); }, []); // eslint-disable-line
  const add = async () => { const r = await demo.addStaff(f); if (r) { setF({ name: "", email: "", role: "admissions", password: "" }); reload(); } };
  const [pw, setPw] = useState({ current: "", next: "" });
  return (
    <div className="grid max-w-5xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
      <Card className="overflow-hidden p-0">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500"><tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Role</th><th className="px-4 py-3">Status</th></tr></thead>
          <tbody>{(list || []).map((u) => (
            <tr key={u.id} className="border-t border-slate-100">
              <td className="px-4 py-3"><p className="font-bold text-navy-800">{u.name}</p><p className="text-xs text-slate-500">{u.email}</p></td>
              <td className="px-4 py-3"><select value={u.role} onChange={async (e) => { await demo.updateStaff(u.id, { role: e.target.value }); reload(); }} className="rounded-lg border border-slate-200 px-2 py-1 text-xs">{["admissions", "exams", "admin"].map((r) => <option key={r}>{r}</option>)}</select></td>
              <td className="px-4 py-3"><Btn onClick={async () => { await demo.updateStaff(u.id, { isActive: !u.is_active }); reload(); }} className={`px-3 py-1 text-xs ${u.is_active ? "bg-[#ecfdf5] text-[#047857]" : "bg-red-50 text-red-700"}`}>{u.is_active ? "Active" : "Disabled"}</Btn></td>
            </tr>))}</tbody>
        </table>
        {!list && <p className="p-4 text-sm text-slate-500">Loading…</p>}
      </Card>
      <div className="space-y-6">
        <Card className="space-y-3">
          <Eyebrow>Add a staff member</Eyebrow>
          <Field label="Full name"><input className={inputCls} name="staff-full-name" autoComplete="off" placeholder="e.g. Ali Raza" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} /></Field>
          <Field label="Staff member's email"><input className={inputCls} type="email" name="staff-new-email" autoComplete="off" placeholder="e.g. ali@gmail.com" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} /></Field>
          <select className={inputCls} value={f.role} onChange={(e) => setF({ ...f, role: e.target.value })}><option value="admissions">Admissions</option><option value="exams">Exams</option><option value="admin">Admin</option></select>
          <Field label="First password"><input className={inputCls} type="password" name="staff-new-password" autoComplete="new-password" placeholder="8+ characters" value={f.password} onChange={(e) => setF({ ...f, password: e.target.value })} /></Field>
          {f.name.includes("@") && <p className="rounded-xl bg-gold-50 px-3 py-2 text-xs font-semibold text-gold-900">The name looks like an email — put the email in the email box.</p>}
          {(list || []).some((u) => u.email.toLowerCase() === f.email.trim().toLowerCase()) && <p className="rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">{f.email} already has an account (see the list). Your browser may have filled it in — type the new staff member's email.</p>}
          <Primary className="w-full" disabled={!f.name || !f.email || f.password.length < 8} onClick={add}>Create account</Primary>
          <p className="text-xs text-slate-500">Share the email and first password with the staff member; they can change it after logging in.</p>
        </Card>
        <Card className="space-y-3">
          <Eyebrow>Change my password</Eyebrow>
          <input className={inputCls} type="password" autoComplete="current-password" placeholder="Current password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} />
          <input className={inputCls} type="password" autoComplete="new-password" placeholder="New password (8+ characters)" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} />
          <Primary className="w-full" disabled={pw.next.length < 8} onClick={async () => { await demo.changePassword(pw.current, pw.next); setPw({ current: "", next: "" }); }}>Change password</Primary>
        </Card>
      </div>
    </div>
  );
}

function BankSettings() {
  const demo = useDemo();
  const [b, setB] = useState(null);
  useEffect(() => { demo.getBank().then(setB).catch(() => setB({ bank: "", accountTitle: "", accountNumber: "", iban: "", branch: "" })); }, []); // eslint-disable-line
  if (!b) return null;
  const fld = (k, label) => <Field label={label}><input className={inputCls} value={b[k] || ""} onChange={(e) => setB({ ...b, [k]: e.target.value })} /></Field>;
  return (
    <Card className="space-y-3">
      <Eyebrow>Bank account for bank-transfer payments</Eyebrow>
      <p className="text-xs text-slate-500">Students see these details when they choose “Bank transfer”, then upload their paid slip. Admissions verifies each slip under “Payments to verify”.</p>
      <div className="grid gap-3 sm:grid-cols-2">{fld("bank", "Bank name")}{fld("accountTitle", "Account title")}{fld("accountNumber", "Account number")}{fld("iban", "IBAN")}{fld("branch", "Branch (optional)")}</div>
      <Gold onClick={() => demo.saveBank({ ...b, branch: b.branch || "" })}><Check className="h-4 w-4" /> Save bank account</Gold>
    </Card>
  );
}

/* "Become a regular student" request — Admissions / Admin approve it, the student gets the WhatsApp number */
function RegularBox({ c, role, onOpen }) {
  const demo = useDemo();
  const [reason, setReason] = useState("");
  const st = c.regular.status || "requested";
  const can = role === "admissions" || role === "admin";
  return (
    <div className={`rounded-2xl p-4 text-sm ring-1 ${st === "approved" ? "bg-[#ecfdf5] ring-[#a7f3d0]" : st === "declined" ? "bg-red-50 ring-red-100" : "bg-gold-50/60 ring-gold-200"}`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-gold-500 text-navy-900"><Sparkles className="h-5 w-5" /></span>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-navy-800">{c.first} {c.last} <span className="text-xs font-normal text-slate-500">{c.id} · {c.phone || c.email}</span></p>
          <p className="text-xs text-slate-600">Wants to become a regular student: <b>{c.regular.note || "—"}</b> · {fmt(c.regular.at)}</p>
          {st !== "requested" && <p className="mt-1 text-xs font-semibold">{st === "approved" ? "Approved — WhatsApp number sent to the student" : `Declined: ${c.regular.reply}`}{c.regular.decidedAt ? ` · ${fmt(c.regular.decidedAt)}` : ""}</p>}
        </div>
        {onOpen && <Ghost className="px-3 py-1.5 text-xs" onClick={onOpen}>Open file</Ghost>}
      </div>
      {st === "requested" && can && (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Primary onClick={() => demo.approveRegular(c.id)}><Check className="h-4 w-4" /> Approve & send WhatsApp no.</Primary>
          <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Reason, if not accepting" className={inputCls} />
          <Btn disabled={!reason} onClick={() => demo.declineRegular(c.id, reason)} className="bg-red-50 text-red-700 hover:bg-red-100"><X className="h-4 w-4" /> Decline</Btn>
        </div>
      )}
    </div>
  );
}

/* Admin: British Council registration windows shown on the website's exam page */
function ExamSeriesSettings() {
  const demo = useDemo();
  const [list, setList] = useState(null);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    const withBoth = (x) => {   // always offer an A Level and an IGCSE series to edit
      const l = x?.length ? [...x] : [];
      if (!l.some((y) => /A Level|IAL/i.test(y.title))) l.unshift(DEFAULT_SERIES[0]);
      if (!l.some((y) => /GCSE/i.test(y.title))) l.push(DEFAULT_SERIES[1]);
      return l;
    };
    (API ? demo.getExamSeries() : loadSeries()).then((x) => setList(withBoth(x))).catch(() => setList(withBoth(null)));
  }, []); // eslint-disable-line
  if (!list) return null;
  const up = (si, fn) => { setSaved(false); setList((l) => l.map((x, i) => (i === si ? fn(x) : x))); };
  const save = async () => {
    const clean = list.map((x) => ({ title: x.title.trim(), stages: x.stages.filter((st) => st.label.trim()) }));
    if (API) await demo.saveExamSeries(clean); else saveDemoSeries(clean);
    setSaved(true);
  };
  return (
    <Card className="space-y-5">
      <div>
        <Eyebrow>Exam session dates (website)</Eyebrow>
        <p className="mt-1 text-xs text-slate-500">These dates show on the British Council Exam Registration page. Copy them from the British Council school-exams site whenever a new series opens. Leave a date empty to show “TBA”.</p>
      </div>
      {list.map((x, si) => (
        <div key={si} className="space-y-3 rounded-2xl border border-slate-200 p-4">
          <div className="flex gap-2">
            <input className={inputCls} value={x.title} onChange={(e) => up(si, (y) => ({ ...y, title: e.target.value }))} placeholder="e.g. Edexcel · International A Level · January 2027" />
            <Btn className="shrink-0 bg-red-50 px-3 text-xs text-red-700 hover:bg-red-100" onClick={() => { setSaved(false); setList((l) => l.filter((_, i) => i !== si)); }}>Remove</Btn>
          </div>
          {x.stages.map((st, k) => (
            <div key={k} className="grid grid-cols-[1fr_170px_auto] gap-2">
              <input className={inputCls} value={st.label} onChange={(e) => up(si, (y) => ({ ...y, stages: y.stages.map((z, j) => (j === k ? { ...z, label: e.target.value } : z)) }))} placeholder="Stage name" />
              <input type="date" className={inputCls} value={st.date} onChange={(e) => up(si, (y) => ({ ...y, stages: y.stages.map((z, j) => (j === k ? { ...z, date: e.target.value } : z)) }))} />
              <button type="button" aria-label="Remove stage" onClick={() => up(si, (y) => ({ ...y, stages: y.stages.filter((_, j) => j !== k) }))} className="px-2 text-slate-400 hover:text-red-600"><X className="h-4 w-4" /></button>
            </div>
          ))}
          {x.stages.length < 6 && <button type="button" onClick={() => up(si, (y) => ({ ...y, stages: [...y.stages, { label: "", date: "" }] }))} className="text-xs font-bold text-navy-700 hover:text-gold-700">+ Add stage</button>}
        </div>
      ))}
      <div className="flex flex-wrap items-center gap-3">
        {list.length < 6 && <Btn className="bg-navy-50 px-4 py-2 text-xs text-navy-700 hover:bg-gold-100" onClick={() => { setSaved(false); setList((l) => [...l, { title: "", stages: [{ label: "Reg. window opens", date: "" }, { label: "Normal", date: "" }, { label: "Late stage 1", date: "" }, { label: "Late stage 2", date: "" }] }]); }}>+ Add another exam series</Btn>}
        <Gold onClick={save}><Check className="h-4 w-4" /> Save dates</Gold>
        {saved && <span className="text-xs font-bold text-[#047857]">Saved — the website shows the new dates.</span>}
      </div>
    </Card>
  );
}

function ContactSettings() {
  const demo = useDemo();
  const [c, setC] = useState(null);
  useEffect(() => { demo.getContact().then(setC).catch(() => setC({ whatsapp: ADMISSIONS_WHATSAPP })); }, []); // eslint-disable-line
  if (!c) return null;
  return (
    <Card className="space-y-3">
      <Eyebrow>Admissions WhatsApp number</Eyebrow>
      <p className="text-xs text-slate-500">Students see this number (with a “Chat on WhatsApp” button) when Admissions approves their request to become a regular student.</p>
      <Field label="WhatsApp number"><input className={inputCls} value={c.whatsapp} onChange={(e) => setC({ whatsapp: e.target.value })} placeholder="+92 3XX XXXXXXX" /></Field>
      <Gold onClick={() => demo.saveContact(c)}><Check className="h-4 w-4" /> Save number</Gold>
    </Card>
  );
}

/* Website admission form → Admissions (live mode) */
const ADM_STATUS = { new: ["New", "bg-gold-100 text-gold-900"], contacted: ["Contacted", "bg-navy-50 text-navy-700"], enrolled: ["Enrolled", "bg-[#d1fae5] text-[#065f46]"], closed: ["Closed", "bg-slate-100 text-slate-500"] };
const FEE_STATUS = { unpaid: ["Fee not paid", "bg-slate-100 text-slate-600"], slip: ["Slip to verify", "bg-gold-100 text-gold-900"], paid: ["Fee paid", "bg-[#d1fae5] text-[#065f46]"] };
function AdmissionRequests() {
  const demo = useDemo();
  const [q, setQ] = useState("");
  const [notes, setNotes] = useState({});
  const list = (demo.db.admissionRequests || []).filter((a) => `${a.ref} ${a.studentName} ${a.fatherName} ${a.phone} ${a.email}`.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-4">
      <Card className="flex items-center gap-3 py-3"><Search className="h-4 w-4 text-slate-400" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, phone, email or ADM number" className="w-full text-sm outline-none" /></Card>
      {list.length === 0 && <Card><p className="text-sm text-slate-500">No admission requests yet. They arrive here from the “Apply now” form on the website.</p></Card>}
      {list.map((a) => (
        <Card key={a.id} className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="font-mono text-xs font-bold text-gold-700">{a.ref} · {fmt(a.at)}</p>
              <p className="font-serif text-2xl font-semibold text-navy-800">{a.studentName}</p>
              <p className="text-sm text-slate-600">Father: <b>{a.fatherName}</b> · <a href={`tel:${a.phone}`} className="font-semibold text-navy-700">{a.phone}</a> · <a href={waLink(a.phone)} target="_blank" rel="noreferrer" className="font-semibold text-[#128C7E]">WhatsApp</a> · <a href={`mailto:${a.email}`} className="text-navy-700">{a.email}</a></p>
              <p className="mt-1 text-sm text-slate-600">{a.programme === "IGCSE" ? "IGCSE / O Levels" : a.programme}{a.stream ? ` · ${a.stream} stream` : ""}{a.startTerm ? ` · starts Term ${a.startTerm}` : ""}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${ADM_STATUS[a.status][1]}`}>{ADM_STATUS[a.status][0]}</span>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${FEE_STATUS[a.feeStatus][1]}`}>{FEE_STATUS[a.feeStatus][0]} · {pkr(a.fee)}{a.payMethod ? ` · ${a.payMethod}` : ""}</span>
            </div>
          </div>
          {a.roadmap?.length > 0 && (
            <div className="grid gap-2 sm:grid-cols-3">{a.roadmap.map((t) => (
              <div key={t.step} className={`rounded-2xl p-3 text-xs ${t.step === 1 ? "bg-navy-700 text-white" : "bg-slate-50 text-slate-600"}`}>
                <p className={`font-bold ${t.step === 1 ? "text-gold-300" : "text-navy-800"}`}>{t.step}. {t.name} · {t.label}</p>
                <p className="mt-1">{t.subjects.join(", ")}</p>
              </div>))}</div>
          )}
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
            <select value={a.status} onChange={(e) => demo.updateAdmission(a.id, { status: e.target.value }, "Status updated.")} className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-navy-800">
              {Object.entries(ADM_STATUS).map(([k, [l]]) => <option key={k} value={k}>{l}</option>)}
            </select>
            {a.slipFileId && <Btn onClick={() => window.open(fileUrl(a.slipFileId), "_blank", "noopener")} className="bg-slate-100 px-3 py-2 text-xs text-navy-700 hover:bg-gold-100"><FileText className="h-4 w-4" /> View slip{a.payRef ? ` · ${a.payRef}` : ""}</Btn>}
            {a.feeStatus !== "paid" && <Primary className="px-4 py-2 text-xs" onClick={() => demo.updateAdmission(a.id, { fee: "paid" }, "Admission fee marked as paid.")}><Check className="h-4 w-4" /> {a.feeStatus === "slip" ? "Slip OK — mark paid" : "Paid at office — mark paid"}</Primary>}
            {a.feeStatus === "slip" && <Btn onClick={() => demo.updateAdmission(a.id, { fee: "unpaid" }, "Slip rejected.")} className="bg-red-50 px-4 py-2 text-xs text-red-700 hover:bg-red-100"><X className="h-4 w-4" /> Reject slip</Btn>}
          </div>
          <div className="flex gap-2">
            <input value={notes[a.id] ?? a.staffNote} onChange={(e) => setNotes((n) => ({ ...n, [a.id]: e.target.value }))} placeholder="Notes for the team (e.g. called on 18 Oct, visiting on Monday)" className={inputCls} />
            <Btn disabled={(notes[a.id] ?? a.staffNote) === a.staffNote} onClick={() => demo.updateAdmission(a.id, { staffNote: notes[a.id] }, "Note saved.")} className="bg-navy-700 px-4 text-xs text-white hover:bg-gold-500 hover:text-navy-900">Save</Btn>
          </div>
        </Card>
      ))}
    </div>
  );
}

function AdmissionFeeSettings() {
  const demo = useDemo();
  const [a, setA] = useState(null);
  useEffect(() => { demo.getAdmissionFee().then(setA).catch(() => setA({ igcseFee: 30000, alevelFee: 30000 })); }, []); // eslint-disable-line
  if (!a) return null;
  const num = (k) => (e) => setA({ ...a, [k]: Number(e.target.value.replace(/\D/g, "")) || 0 });
  return (
    <Card className="space-y-3">
      <Eyebrow>Admission fee (website “Apply now” form)</Eyebrow>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="IGCSE / O Levels (PKR)"><input inputMode="numeric" className={inputCls} value={a.igcseFee} onChange={num("igcseFee")} /></Field>
        <Field label="A Levels (PKR)"><input inputMode="numeric" className={inputCls} value={a.alevelFee} onChange={num("alevelFee")} /></Field>
      </div>
      <Gold onClick={() => demo.saveAdmissionFee(a)}><Check className="h-4 w-4" /> Save admission fee</Gold>
    </Card>
  );
}
