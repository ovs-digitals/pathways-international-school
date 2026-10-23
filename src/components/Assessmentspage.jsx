import { Award, Check, ClipboardCheck } from "lucide-react";
import { PageHero } from "./Motion";

/* About → Assessments & Examinations — calm two-column + timeline */
const INTERNAL = ["Quizzes", "Class tests", "Monthly assessments", "Term examinations", "Mock examinations", "Academic progress reviews"];
const PHILOSOPHY = ["Learn Online", "Assess Physically or Online", "Improve Continuously", "Perform Internationally"];

export default function AssessmentsPage() {
  return (
    <main className="bg-white text-slate-900">
      <PageHero eyebrow="About Pathways" title="Assessments &" accent="Examinations" image="st-stream-science.webp"
        text="Assessment is a central part of the Pathways Hybrid Learning Model." />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-3xl font-semibold leading-snug text-navy-900 md:text-4xl">
            Students study online — and their progress is checked through <span className="italic text-gold-600">supervised physical &amp; online assessments.</span>
          </p>
          <span className="gold-rule mt-8" />
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-50 text-gold-700"><ClipboardCheck className="h-6 w-6" /></span>
            <h2 className="mt-5 text-2xl font-bold text-navy-900">Internal Assessment</h2>
            <p className="mt-1 text-sm font-semibold text-gold-700">Online and physical</p>
            <ul className="mt-6 grid gap-x-6 gap-y-4 sm:grid-cols-2">
              {INTERNAL.map((x) => (
                <li key={x} className="flex items-center gap-3 text-base text-slate-700">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-navy-800 text-gold-300"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>{x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm leading-7 text-slate-500">These assessments help teachers identify weaknesses, monitor progress and determine examination readiness.</p>
          </div>

          <div className="rounded-[2rem] bg-[#f6f8fc] p-8 md:p-10">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-navy-800 text-gold-400"><Award className="h-6 w-6" /></span>
            <h2 className="mt-5 text-2xl font-bold text-navy-900">External Examinations</h2>
            <p className="mt-1 text-sm font-semibold text-gold-700">IGCSE · IAL · other awarding bodies</p>
            <p className="mt-6 text-base leading-8 text-slate-600">
              Final IGCSE, IAL and other awarding-body examinations are conducted according to the requirements of the relevant awarding organisation and approved examination arrangements.
            </p>
          </div>
        </div>
      </section>

      <section className="navy-pattern px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Our assessment philosophy</p>
          <div className="relative mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <span aria-hidden className="absolute left-[12%] right-[12%] top-7 hidden h-px bg-gradient-to-r from-gold-500/0 via-gold-500/60 to-gold-500/0 lg:block" />
            {PHILOSOPHY.map((x, i) => (
              <div key={x} className="relative">
                <span className={`mx-auto grid h-14 w-14 place-items-center rounded-full text-lg font-bold ${i === PHILOSOPHY.length - 1 ? "bg-gold-500 text-navy-900" : "bg-navy-900 text-gold-300 ring-1 ring-gold-500/50"}`}>{i + 1}</span>
                <p className="mt-4 text-lg font-semibold">{x}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}