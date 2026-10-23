import { CalendarDays, Check, Clock, GraduationCap, Users } from "lucide-react";
import ProgramFees from "./ProgramFees";
import { AGES, FEES } from "./siteData";

/* Pre-IGCSE — same layout as the IGCSE and A Level pages */
const TERMS = [
  { no: 1, name: "Term 1", from: "September", to: "June", note: "Core foundation", subjects: ["Mathematics (Part 1)", "English", "Computer Science (Part 1)", "Biology", "Islamic Studies"] },
  { no: 2, name: "Term 2", from: "July", to: "November", note: "Advanced foundation", subjects: ["Mathematics (Part 2)", "Chemistry", "Physics", "Computer Science (Part 2)"] },
];

export default function PreIGCSEProgram() {
  return (
    <main className="bg-[#f6f8fc] text-slate-900">
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-navy-950 text-white lg:min-h-[600px]">
        <img data-rv="1" src="st-young-learner.webp" alt="" className="absolute inset-y-0 right-0 h-full w-full object-cover lg:w-[62%]" style={{ objectPosition: "50% 22%", WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 28%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 28%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,24,44,.97) 0%, rgba(10,24,44,.92) 38%, rgba(14,33,57,.55) 62%, rgba(14,33,57,.05) 100%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-200 backdrop-blur">Foundation Programme · Before IGCSE</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Pre-IGCSE Program</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
            Pre-IGCSE programme is designed for young and talented students to build a strong foundational understanding of each subject, based on the Pearson Edexcel approved syllabus, before progressing to any mainstream International GCSE programme.
          </p>
        </div>
      </section>

      <section className="px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[["Eligibility Criteria", "Grade 5 to 6, or Pre-IGCSE Foundation Course", GraduationCap], ["Age", AGES.preIgcse, Users], ["Program Duration", "1 Year", Clock], ["Terms", "2 Terms", CalendarDays]].map(([k, v, Icon]) => (
              <div key={k} className="rounded-2xl bg-white p-4 shadow-md shadow-navy-950/5 ring-1 ring-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700"><Icon className="h-4 w-4" />{k}</div>
                <p className="mt-2 font-semibold text-navy-800">{v}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-700 text-[11px] uppercase tracking-wider text-white"><tr><th className="px-5 py-2.5">Term</th><th className="px-5 py-2.5">Session</th><th className="px-5 py-2.5">Subjects</th></tr></thead>
              <tbody>{TERMS.map((t) => (
                <tr key={t.no} className="border-t border-slate-100 odd:bg-slate-50/60">
                  <td className="whitespace-nowrap px-5 py-2.5 text-base font-semibold text-navy-800">{t.name}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 font-semibold text-navy-700">{t.from} – {t.to}<span className="block text-xs font-medium text-slate-500">Every year</span></td>
                  <td className="whitespace-nowrap px-5 py-2.5"><span className="rounded-full bg-gold-100 px-3 py-1 text-sm font-bold text-gold-900">{t.subjects.length} subjects</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </section>

      {/* subjects of each term */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Pre-IGCSE · Subjects</p>
            <h2 className="mt-3 text-3xl font-extrabold text-navy-900 md:text-5xl">Two terms. <span className="text-gold-600">One strong foundation.</span></h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {TERMS.map((t) => (
              <div key={t.no} className="navy-pattern rounded-2xl p-5 text-white shadow-xl">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-lg font-extrabold">{t.name}</p>
                  <p className="text-sm font-semibold text-gold-300">{t.from} – {t.to} · {t.subjects.length} subjects</p>
                </div>
                <ul className="mt-4 grid gap-2">
                  {t.subjects.map((s) => (
                    <li key={s} className="flex items-center gap-2.5 rounded-xl bg-white/[0.07] px-3 py-2 text-sm font-semibold ring-1 ring-white/10">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-navy-900"><Check className="h-3 w-3" strokeWidth={3} /></span>{s}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProgramFees programme="Pre-IGCSE" monthly={FEES.monthly.preIgcse} />
    </main>
  );
}