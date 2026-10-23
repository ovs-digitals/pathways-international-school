import { Award, ClipboardCheck, FileText, MessageCircle, MonitorPlay, TrendingUp } from "lucide-react";
import { PageHero } from "./Motion";

/* About → Student Academic Monitoring — open, airy layout */
const ITEMS = [
  [MonitorPlay, "Attendance Monitoring", "Participation in scheduled online lessons is recorded and reviewed."],
  [FileText, "Coursework", "Classwork, homework and assignments are regularly evaluated."],
  [ClipboardCheck, "Physical / Online Assessments", "Scheduled quizzes and examinations, completed under supervision at the campus and online."],
  [TrendingUp, "Progress Reports", "Academic performance is reviewed throughout the programme."],
  [MessageCircle, "Parent Communication", "Parents receive guidance on performance, attendance and areas that need improvement."],
  [Award, "Examination Readiness", "Mock examinations and academic reviews show whether a student is ready for external exams."],
];

export default function AcademicMonitoringPage() {
  return (
    <main className="bg-white text-slate-900">
      <PageHero eyebrow="About Pathways" title="Student Academic" accent="Monitoring" image="curriculam.webp"
        text="Every student's academic journey is followed closely — online, on campus and at home." />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-3xl font-semibold leading-snug text-navy-900 md:text-4xl">
            “Flexibility should never mean a <span className="italic text-gold-600">lack of accountability.</span>”
          </p>
          <p className="mt-6 text-base leading-8 text-slate-600">
            At Pathways International School, every student's academic journey is monitored through a combination of six simple checks.
          </p>
          <span className="gold-rule mt-8" />
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map(([Icon, title, text], i) => (
            <div key={title} className="group text-center">
              <span className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold-50 text-gold-700 ring-8 ring-gold-50/50 transition duration-300 group-hover:bg-navy-800 group-hover:text-gold-400">
                <Icon className="h-7 w-7" />
                <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-navy-800 text-[10px] font-bold text-white">{i + 1}</span>
              </span>
              <h2 className="mt-6 text-lg font-bold text-navy-900">{title}</h2>
              <p className="mx-auto mt-2 max-w-xs text-sm leading-7 text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="navy-pattern px-4 py-16 text-center text-white sm:px-6 lg:px-8">
        <p className="text-3xl font-bold md:text-4xl">Flexible Learning. <span className="text-gold-400">Structured Progress.</span></p>
      </section>
    </main>
  );
}