import { useState } from "react";
import { INTAKE_YEAR } from "./RefundPolicy";
import {
  ArrowRight, BookOpen, BriefcaseBusiness, CalendarDays, Check, Clock, FlaskConical, Globe2, GraduationCap, Laptop, Send, Sparkles, Users, Wallet,
} from "lucide-react";
import { AGES, A_LEVEL_SUBJECTS, FEES, IGCSE_COMPULSORY, IGCSE_STREAMS, pkr, waLinkTo } from "./siteData";

// Website-only: the form opens WhatsApp to Admissions with all details + roadmap (no server needed).
const waTo = (text) => waLinkTo(text);

/* ======================================================================
   IGCSE / O Levels — 2 years, 3 terms.
   Shown on the home page and the IGCSE page. The admission form sends the
   request (with the student's roadmap) to Admissions and emails the student.
====================================================================== */

const Y = INTAKE_YEAR;   // changes by itself every August for the new batch
export const TERMS = [
  { no: 1, name: "Term 1", from: `${Y}-09`, to: `${Y + 1}-06`, months: 10, subjects: ["Mathematics (Part 1)", "Physics", "English", "Islamic Studies"] },
  { no: 2, name: "Term 2", from: `${Y + 1}-07`, to: `${Y + 1}-11`, months: 5, subjects: ["Biology", "Mathematics (Part 2)"] },
  { no: 3, name: "Term 3", from: `${Y + 1}-12`, to: `${Y + 2}-06`, months: 7, subjects: ["Urdu", "Pakistan Studies", "Chemistry"] },
];
export const PROGRAMME_SPAN = `Sep ${Y} – Jun ${Y + 2}`;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const mm = (ym) => MONTHS[Number(ym.slice(5)) - 1];   // month only — terms run the same months every year
const mon = (ym, short) => { const m = MONTHS[Number(ym.slice(5)) - 1]; return `${short ? m.slice(0, 3) : m} ${ym.slice(0, 4)}`; };
const shift = (ym, y) => `${Number(ym.slice(0, 4)) + y}${ym.slice(4)}`;
export function roadmap(start) {
  return [0, 1, 2].map((k) => {
    const t = TERMS[(start - 1 + k) % 3]; const wrap = start - 1 + k >= 3;
    const from = wrap ? shift(t.from, 2) : t.from; const to = wrap ? shift(t.to, 2) : t.to;
    return { ...t, name: `Term ${k + 1}`, from, to, step: k + 1 };   // numbered for the student: Term 1, 2, 3
  });
}

const COMPULSORY = IGCSE_COMPULSORY;
const STREAM_ICONS = { Science: FlaskConical, IT: Laptop, Business: BriefcaseBusiness, Humanities: Globe2 };
const STREAMS = IGCSE_STREAMS.map((x) => ({ ...x, icon: STREAM_ICONS[x.key] || Globe2 }));

const field = "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-gold-400 focus:ring-4 focus:ring-gold-100";

export default function IgcsePathway({ intro = true, id = "igcse-pathway" }) {
  const [stream, setStream] = useState("Science");
  const s = STREAMS.find((x) => x.key === stream);

  return (
    <section id={id} className="bg-[#f6f8fc] py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {intro && (
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["IGCSE / O Levels", "International GCSE", "A world-recognised qualification taken at the end of secondary school (Grades 9–10). Pearson Edexcel IGCSE is accepted by colleges and universities in Pakistan and abroad — equivalent to Matric.", GraduationCap],
              ["A Levels", "International AS & A2", "The next step after IGCSE: two advanced years of 3 subjects that lead directly to university — equivalent to FSc / Intermediate, recognised worldwide.", BookOpen],
            ].map(([title, sub, text, Icon]) => (
              <div key={title} className="flex gap-4 rounded-3xl bg-white p-6 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-navy-700 text-gold-400"><Icon className="h-6 w-6" /></span>
                <div><p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-700">{sub}</p><p className="font-serif text-2xl font-semibold text-navy-800">{title}</p><p className="mt-1 text-sm leading-6 text-slate-600">{text}</p></div>
              </div>
            ))}
          </div>
        )}

        {/* ---------- header ---------- */}
        <div className={`${intro ? "mt-14" : ""} text-center`}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">IGCSE / O Levels</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-800 md:text-5xl">Complete 2-Years Academic Pathway</h2>
          <span className="gold-rule mt-5" />
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Eligibility Criteria", "Grade 7 or 8 with British Curriculum or its equivalent qualification", GraduationCap],
            ["Age", AGES.igcse, Users],
            ["Program Duration", "2 Years", Clock],
            ["Terms", "3 Terms", CalendarDays],
          ].map(([k, v, Icon]) => (
            <div key={k} className="rounded-2xl bg-white p-4 shadow-md shadow-navy-950/5 ring-1 ring-slate-100">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700"><Icon className="h-4 w-4" />{k}</div>
              <p className="mt-2 font-semibold text-navy-800">{v}</p>
            </div>
          ))}
        </div>

        {/* ---------- all terms in one table ---------- */}
        <div className="mt-12 overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] text-left text-sm">
              <thead className="bg-navy-700 text-[11px] uppercase tracking-wider text-white">
                <tr><th className="px-5 py-2.5">Term</th><th className="px-5 py-2.5">Session</th><th className="px-5 py-2.5">Subjects</th></tr>
              </thead>
              <tbody>{TERMS.map((x) => (
                <tr key={x.no} className="border-t border-slate-100 align-top odd:bg-slate-50/60">
                  <td className="whitespace-nowrap px-5 py-2.5 font-serif text-base font-semibold text-navy-800">{x.name}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 font-semibold text-navy-700">{MONTHS[Number(x.from.slice(5)) - 1]} – {MONTHS[Number(x.to.slice(5)) - 1]}<span className="block text-xs font-medium text-slate-500">Every year</span></td>
                  <td className="whitespace-nowrap px-5 py-2.5"><span className="rounded-full bg-gold-100 px-3 py-1 text-sm font-bold text-gold-900">{x.subjects.length} subjects</span></td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ---------- subjects ---------- */}
        <div className="mt-14 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Compulsory subjects</p>
            <p className="mt-1 text-sm text-slate-600">Every student studies these.</p>
            <ul className="mt-4 space-y-2">{COMPULSORY.map((x) => (
              <li key={x} className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-navy-800"><Check className="h-4 w-4 text-gold-600" />{x}</li>
            ))}</ul>
          </div>
          <div className="rounded-3xl bg-white p-6 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Elective subjects</p>
            <p className="mt-1 text-sm text-slate-600">First choose your stream, then see its subjects.</p>
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {STREAMS.map(({ key, icon: Icon }) => (
                <button key={key} type="button" onClick={() => setStream(key)}
                  className={`flex flex-col items-center gap-1.5 rounded-2xl border-2 px-2 py-3 text-sm font-bold transition ${stream === key ? "border-navy-700 bg-navy-50 text-navy-800" : "border-slate-100 text-slate-600 hover:border-gold-300"}`}>
                  <Icon className="h-5 w-5" />{key}
                </button>
              ))}
            </div>
            <div key={stream} className="panel-in mt-5 rounded-2xl bg-navy-700 p-5 text-white">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">{s.key} · {s.tag}</p>
              <div className="mt-3 flex flex-wrap gap-2">{s.subjects.map((x) => <span key={x} className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold">{x}</span>)}</div>
            </div>
          </div>
        </div>

        <AdmissionForm />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- form */
export { A_LEVEL_SUBJECTS };

/* aSubjects: when the A Level page already picked the 3 subjects, it passes them in */
export function AdmissionForm({ inModal, programme = "IGCSE", aSubjects, aLevel = "International AS & A2", units = ["Unit 1", "Unit 2"] }) {
  const [f, setF] = useState({ studentName: "", fatherName: "", phone: "", email: "", programme, stream: "Science", startTerm: 1, subjects: [] });
  const subs = aSubjects || f.subjects;
  const toggleSub = (s) => setF((x) => ({ ...x, subjects: x.subjects.includes(s) ? x.subjects.filter((y) => y !== s) : x.subjects.length < 3 ? [...x.subjects, s] : x.subjects }));
  const [err, setErr] = useState("");
  const [done, setDone] = useState(null);
  const set = (k) => (e) => setF((x) => ({ ...x, [k]: e.target.value }));
  const plan = f.programme === "IGCSE" ? roadmap(Number(f.startTerm)) : [];

  const message = (d) => {
    const line = "━━━━━━━━━━━━━━━━━━";
    const st = STREAMS.find((x) => x.key === d.stream);
    const start = d.plan[0];
    const now = new Date().toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
    return [
      line,
      "📝 *ADMISSION FORM*",
      "*Pathways International School*",
      line,
      "",
      "👤 *STUDENT DETAILS*",
      `▪ Student Name: ${d.studentName.trim()}`,
      `▪ Father's Name: ${d.fatherName.trim()}`,
      `▪ Contact No: ${d.phone.trim()}`,
      `▪ Email: ${d.email.trim()}`,
      "",
      "🎓 *PROGRAMME*",
      `▪ Programme: ${d.programme === "IGCSE" ? "IGCSE / O Levels (2 Years · 3 Terms)" : "A Levels"}`,
      ...(d.programme === "IGCSE" ? [
        `▪ Elective Stream: ${d.stream}${st ? ` (${st.subjects.join(", ")})` : ""}`,
        `▪ Joining Session: ${start.name} (${mm(start.from)} – ${mm(start.to)})`,
        "",
        "🗺 *ROADMAP*",
        ...d.plan.map((t) => `${t.step}. *${t.name}* · ${mm(t.from)} – ${mm(t.to)}`),
      ] : [
        `▪ Level: ${aLevel} (2 terms)`,
        `▪ Subjects: ${d.subs.join(", ")}`,
        `▪ Term 1: ${units[0]} of each subject · Term 2: ${units[1]}`,
      ]),
      "",
      `💳 *Admission Fee:* PKR ${pkr(FEES.admission)}`,
      line,
      `Sent from the website · ${now}`,
    ].join("\n");
  };

  const submit = (e) => {
    e.preventDefault();
    if (f.studentName.trim().length < 2 || f.fatherName.trim().length < 2) return setErr("Please enter the student's and father's name.");
    if (f.phone.replace(/\D/g, "").length < 10) return setErr("Please enter a valid contact number.");
    if (!/^\S+@\S+\.\S+$/.test(f.email)) return setErr("Please enter a valid email.");
    if (f.programme === "A Levels" && subs.length !== 3) return setErr("Please choose your 3 A Level subjects.");
    setErr("");
    const d = { ...f, plan, subs };
    window.open(waTo(message(d)), "_blank", "noopener");
    setDone(d);
  };

  if (done) {
    return (
      <div className={`panel-in ${inModal ? "" : "mt-14 "}overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy-950/10 ring-1 ring-slate-100`}>
        <div className="navy-pattern px-6 py-8 text-center text-white sm:px-10">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-500 text-navy-900"><Check className="h-8 w-8" strokeWidth={3} /></span>
          <p className="mt-4 font-serif text-3xl font-semibold">Thank you, {done.studentName.split(" ")[0]}!</p>
          <p className="mt-1 text-white/75">Press <b>Send</b> in WhatsApp — your details{done.plan.length ? " and roadmap" : ""} go straight to our Admissions team.</p>
          <a href={waTo(message(done))} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-2.5 text-sm font-bold text-white hover:brightness-95">WhatsApp did not open? Click here</a>
        </div>
        <div className="p-6 sm:p-10">
          {done.plan.length > 0 && <><p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Your roadmap</p><Roadmap steps={done.plan} /></>}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gold-50 p-5 ring-1 ring-gold-200">
            <div><p className="text-xs font-bold uppercase tracking-wider text-gold-800">Admission fee</p><p className="font-serif text-3xl font-semibold text-navy-800">PKR {pkr(FEES.admission)}</p></div>
            <a href={waTo(`Assalam o Alaikum, I want to pay the admission fee for ${done.studentName} (${done.programme}). Please share the payment details.`)} target="_blank" rel="noreferrer"
              className="btn-shimmer inline-flex items-center gap-2 rounded-full bg-navy-700 px-7 py-3 text-sm font-bold uppercase tracking-wider text-white hover:bg-gold-500 hover:text-navy-900"><Wallet className="h-4 w-4" /> Pay now</a>
          </div>
          <button type="button" onClick={() => setDone(null)} className="mt-5 text-xs font-semibold text-slate-500 hover:text-navy-700">← Fill the form again</button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={`${inModal ? "" : "mt-14 "}overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy-950/10 ring-1 ring-slate-100`}>
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="p-6 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Apply now</p>
          <h3 className="mt-2 font-serif text-3xl font-semibold text-navy-800">Start your admission</h3>
          <p className="mt-1 text-sm text-slate-600">Fill in this short form — you will see your roadmap straight away, and your details go to our Admissions team on WhatsApp.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label><Lbl>Student name</Lbl><input className={field} value={f.studentName} onChange={set("studentName")} autoComplete="off" /></label>
            <label><Lbl>Father's name</Lbl><input className={field} value={f.fatherName} onChange={set("fatherName")} autoComplete="off" /></label>
            <label><Lbl>Contact number</Lbl><input className={field} value={f.phone} onChange={set("phone")} placeholder="+92 3XX XXXXXXX" /></label>
            <label><Lbl>Email</Lbl><input type="email" className={field} value={f.email} onChange={set("email")} placeholder="you@example.com" /></label>
            <label><Lbl>Programme</Lbl><select className={field} value={f.programme} onChange={set("programme")}><option value="IGCSE">IGCSE / O Levels</option><option value="A Levels">International AS & A2 Levels</option></select></label>
            {f.programme === "A Levels" && !aSubjects && (
              <div className="sm:col-span-2"><Lbl>Choose your 3 subjects ({f.subjects.length}/3)</Lbl>
                <div className="flex flex-wrap gap-2">{A_LEVEL_SUBJECTS.map((s) => { const on = f.subjects.includes(s); const full = !on && f.subjects.length >= 3; return (
                  <button key={s} type="button" disabled={full} onClick={() => toggleSub(s)} className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${on ? "bg-navy-700 text-white" : full ? "bg-slate-50 text-slate-300" : "bg-slate-100 text-slate-700 hover:bg-gold-100"}`}>{on ? "✓ " : ""}{s}</button>
                ); })}</div>
              </div>
            )}
            {f.programme === "A Levels" && aSubjects && (
              <div className="sm:col-span-2 rounded-2xl bg-navy-50 px-4 py-3 text-sm text-navy-800"><b>Your subjects:</b> {aSubjects.length ? aSubjects.join(", ") : "choose 3 subjects above"}</div>
            )}
            {f.programme === "IGCSE" && <label><Lbl>Elective stream</Lbl><select className={field} value={f.stream} onChange={set("stream")}>{STREAMS.map((x) => <option key={x.key} value={x.key}>{x.key}</option>)}</select></label>}
            {f.programme === "IGCSE" && (
              <div className="sm:col-span-2"><Lbl>Which session do you want to join?</Lbl>
                <div className="grid grid-cols-3 gap-2">{TERMS.map((x) => (
                  <button key={x.no} type="button" onClick={() => setF((y) => ({ ...y, startTerm: x.no }))}
                    className={`rounded-2xl border-2 px-2 py-2.5 text-center text-sm font-bold transition ${Number(f.startTerm) === x.no ? "border-navy-700 bg-navy-50 text-navy-800" : "border-slate-100 text-slate-600 hover:border-gold-300"}`}>
                    {x.name}<span className="block text-[10px] font-semibold text-slate-500">{MONTHS[Number(x.from.slice(5)) - 1].slice(0, 3)} – {MONTHS[Number(x.to.slice(5)) - 1].slice(0, 3)}</span>
                  </button>
                ))}</div>
              </div>
            )}
          </div>
          {err && <p className="mt-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700">{err}</p>}
          <button className="btn-shimmer mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25">
            <Send className="h-4 w-4" /> Send my admission request
          </button>
        </div>
        <div className="navy-pattern p-6 text-white sm:p-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">Your roadmap</p>
          {plan.length ? <>
            <p className="mt-1 text-sm text-white/70">Joining in <b className="text-gold-300">{mm(TERMS[f.startTerm - 1].from)}</b> — your terms in order (same months every year):</p>
            <Roadmap steps={plan} dark />
          </> : (
            <div className="mt-4 space-y-3">
              {[`Term 1 · ${units[0]}`, `Term 2 · ${units[1]}`].map((t) => (
                <div key={t} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                  <p className="font-bold text-gold-300">{t}</p>
                  <p className="mt-1 text-sm text-white/80">{subs.length ? subs.join(" · ") : "Choose your 3 subjects"}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

function Roadmap({ steps, dark }) {
  return (
    <ol className="mt-4 space-y-3">
      {steps.map((t, i) => (
        <li key={t.step} className={`relative flex gap-4 rounded-2xl p-4 ${dark ? "bg-white/[0.07]" : "bg-slate-50 ring-1 ring-slate-100"}`}>
          <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full font-bold ${i === 0 ? "bg-gold-500 text-navy-900" : dark ? "bg-white/15 text-white" : "bg-navy-700 text-gold-300"}`}>{t.step}</span>
          <div className="min-w-0">
            <p className={`font-bold ${dark ? "text-white" : "text-navy-800"}`}>{t.name} <span className={`text-xs font-semibold ${dark ? "text-gold-300" : "text-gold-700"}`}>· {mm(t.from)} – {mm(t.to)}</span>{i === 0 && <span className="ml-2 rounded bg-gold-500 px-1.5 py-0.5 text-[10px] font-bold text-navy-900">START</span>}</p>
          </div>
          {i < steps.length - 1 && <ArrowRight className={`absolute -bottom-3 left-7 h-4 w-4 rotate-90 ${dark ? "text-gold-400" : "text-gold-600"}`} />}
        </li>
      ))}
    </ol>
  );
}

const Lbl = ({ children }) => <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">{children}</span>;