import { CalendarDays, Clock, GraduationCap, Users } from "lucide-react";
import ALevelPathway, { alTerms } from "./ALevelPathway";
import ProgramFees from "./ProgramFees";
import { AGES, FEES } from "./siteData";

/* International AS Levels and International A2 Levels (one page each) */
const LEVELS = {
  AS: {
    title: "International AS Levels", eyebrow: "International A Levels · Year 1", image: "hero-bg1.webp", pos: "50% 30%", units: ["Unit 1", "Unit 2"],
    eligibility: "IGCSE / O Levels with 5 subjects including Mathematics and English, or Matric with 60% marks",
    text: "International AS Level represents the first stage of the International A Level qualification and is designed for students preparing for university-level academic progression. Pathways delivers International AS Level through a structured hybrid (Online & Campus Based) system.",
  },
  A2: {
    title: "International A2 Levels", eyebrow: "International A Levels · Year 2", image: "st-stream-humanities.webp", pos: "50% 42%", units: ["Unit 3", "Unit 4"],
    eligibility: "International AS Level completed in the same 3 subjects",
    text: "International A2 represents the advanced stage of the International A Level pathway. Students build on the knowledge acquired during AS Level and develop deeper subject understanding, analytical skills and independent academic ability. Pathways delivers International A2 Level through a structured hybrid (Online & Campus Based) system.",
  },
};

export default function ALevelPage({ level = "AS" }) {
  const L = LEVELS[level];
  const terms = alTerms(L.units);
  return (
    <main className="bg-[#f6f8fc] text-slate-900">
      <section className="relative flex min-h-[520px] items-center overflow-hidden bg-navy-950 text-white lg:min-h-[600px]">
        <img data-rv="1" src={L.image} alt="" className="absolute inset-y-0 right-0 h-full w-full object-cover object-top lg:w-[62%]" style={{ objectPosition: L.pos, WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 28%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 28%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,24,44,.97) 0%, rgba(10,24,44,.92) 38%, rgba(14,33,57,.55) 62%, rgba(14,33,57,.05) 100%)" }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-gold-200 backdrop-blur">{L.eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{L.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">{L.text}</p>
        </div>
      </section>

      <section className="px-4 pb-6 pt-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[["Eligibility Criteria", L.eligibility, GraduationCap], ["Age", AGES.aLevels, Users], ["Program Duration", "1 Year", Clock], ["Terms", "2 Terms", CalendarDays]].map(([k, v, Icon]) => (
              <div key={k} className="rounded-2xl bg-white p-4 shadow-md shadow-navy-950/5 ring-1 ring-slate-100">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700"><Icon className="h-4 w-4" />{k}</div>
                <p className="mt-2 font-semibold text-navy-800">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 overflow-hidden rounded-2xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-700 text-[11px] uppercase tracking-wider text-white"><tr><th className="px-5 py-2.5">Term</th><th className="px-5 py-2.5">Session</th><th className="px-5 py-2.5">Subjects</th></tr></thead>
              <tbody>{terms.map((t) => (
                <tr key={t.no} className="border-t border-slate-100 odd:bg-slate-50/60">
                  <td className="whitespace-nowrap px-5 py-2.5 text-base font-semibold text-navy-800">{t.name}</td>
                  <td className="whitespace-nowrap px-5 py-2.5 font-semibold text-navy-700">{t.from} – {t.to}<span className="block text-xs font-medium text-slate-500">Every year</span></td>
                  <td className="whitespace-nowrap px-5 py-2.5"><span className="rounded-full bg-gold-100 px-3 py-1 text-sm font-bold text-gold-900">3 subjects · {t.unit}</span></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </section>

      <ALevelPathway level={L.title} units={L.units} />
      <ProgramFees programme={L.title} monthly={FEES.monthly.aLevels} />
    </main>
  );
}