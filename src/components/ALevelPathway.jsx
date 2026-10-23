import { useState } from "react";
import { CalendarDays, Check } from "lucide-react";
import { AdmissionForm, A_LEVEL_SUBJECTS } from "./IgcsePathway";

/* International A Levels: pick 3 subjects, 2 terms.
   Term 1 = Unit 1 of each subject, Term 2 = Unit 2. */
const SUBJECTS = A_LEVEL_SUBJECTS;
export const alTerms = (units) => [
  { no: 1, name: "Term 1", from: "September", to: "June", unit: units[0] },
  { no: 2, name: "Term 2", from: "July", to: "November", unit: units[1] },
];

export default function ALevelPathway({ level = "International AS Levels", units = ["Unit 1", "Unit 2"] }) {
  const TERMS = alTerms(units);
  const [picked, setPicked] = useState([]);
  const toggle = (s) => setPicked((l) => (l.includes(s) ? l.filter((x) => x !== s) : l.length < 3 ? [...l, s] : l));
  const shown = [...picked, "", "", ""].slice(0, 3);
  return (
    <section className="bg-[#f6f8fc] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">{level} · Pearson Edexcel</p>
          <h2 className="mt-3 text-3xl font-extrabold text-navy-900 md:text-5xl">Choose 3 subjects. <span className="text-gold-600">Finish in 2 terms.</span></h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600">Every student studies 3 subjects. In Term 1 you take {units[0]} of all three; in Term 2 you take {units[1]} of the same three subjects.</p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* subject picker */}
          <div className="self-start rounded-2xl bg-white p-5 shadow-lg shadow-navy-950/5 ring-1 ring-slate-100">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Subjects offered</p>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${picked.length === 3 ? "bg-[#d1fae5] text-[#065f46]" : "bg-gold-100 text-gold-900"}`}>{picked.length} / 3 selected</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {SUBJECTS.map((s) => {
                const on = picked.includes(s); const full = !on && picked.length >= 3;
                return (
                  <button key={s} type="button" onClick={() => toggle(s)} disabled={full}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${on ? "bg-navy-700 text-white shadow-lg" : full ? "bg-slate-50 text-slate-300" : "bg-slate-100 text-slate-700 hover:bg-gold-100"}`}>
                    {on && <Check className="h-4 w-4 text-gold-300" strokeWidth={3} />}{s}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-slate-500">Pick any 3 — tap a subject again to remove it.</p>
          </div>

          {/* two-term plan */}
          <div className="navy-pattern rounded-2xl p-5 text-white shadow-xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-300"><CalendarDays className="h-4 w-4" /> Your plan</p>
            <div className="mt-5 space-y-4">
              {TERMS.map((t) => (
                <div key={t.no} className="rounded-xl bg-white/[0.07] p-3 ring-1 ring-white/10">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="text-lg font-extrabold">{t.name}</p>
                    <p className="text-sm font-semibold text-gold-300">{t.from} – {t.to} <span className="text-xs font-medium text-white/60">· every year</span></p>
                  </div>
                  <ul className="mt-3 grid gap-2">
                    {shown.map((s, k) => (
                      <li key={k} className="flex items-center justify-between rounded-xl bg-white/[0.06] px-3 py-1.5 text-sm">
                        <span className={s ? "font-semibold" : "italic text-white/40"}>{s || `Subject ${k + 1}`}</span>
                        <span className="rounded-full bg-gold-500 px-2.5 py-0.5 text-[11px] font-bold text-navy-900">{t.unit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* admission form — the 3 chosen subjects go with it */}
        <div id="a-level-apply" className="mt-6 scroll-mt-28"><AdmissionForm programme="A Levels" aSubjects={picked} aLevel={level} units={units} /></div>
      </div>
    </section>
  );
}