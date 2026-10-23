import { ArrowRight, BookOpen, FileCheck, Globe2, GraduationCap, PenLine, Plane } from "lucide-react";
import { PageHero } from "./Motion";
import { openApply } from "./ApplyModal";
import { WHATSAPP_LINK, WhatsAppIcon } from "./WhatsAppButton";

/* International University Placement Programme — airy layout */
const ASSOCIATIONS = [
  {
    name: "UCAS", tag: "United Kingdom", logo: "partners/ucas.webp",
    text: "As a UCAS Registered Centre, we support students with UK university applications, course selection, personal statements, academic references and admission requirements.",
  },
  {
    name: "AusPak International", tag: "Study Abroad", logo: "partners/auspak-intl.webp",
    text: "Through our partnership with AusPak International, students get professional admission counselling, application assistance and study visa guidance for Australia and other destinations.",
  },
];

const PROVIDES = [
  [GraduationCap, "University & Course Selection", "Choosing the right country, university and course."],
  [BookOpen, "UCAS Applications & References", "Complete UCAS support with academic references."],
  [FileCheck, "Academic & Career Counselling", "Guidance that matches your strengths and goals."],
  [PenLine, "Personal Statement & Documents", "Writing help and a full documentation check."],
  [Plane, "Study Visa & Applications", "Step-by-step help with visa and university forms."],
  [Globe2, "Pre-Departure Support", "Everything you need before you fly."],
];

const DESTINATIONS = ["United Kingdom", "Australia", "Canada", "Worldwide"];

export default function UniversityPlacementPage() {
  return (
    <main className="bg-white text-slate-900">
      <PageHero eyebrow="Pathways International School" title="International University" accent="Placement Programme" image="seniorstudents.webp"
        text="Your pathway to global universities." />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-3xl font-semibold leading-snug text-navy-900 md:text-4xl">
            We go beyond the classroom — <span className="italic text-gold-600">all the way to university.</span>
          </p>
          <p className="mt-6 text-base leading-8 text-slate-600">
            Our enrolled and registered students get dedicated support for international university admissions, study abroad opportunities and visa guidance.
          </p>
          <span className="gold-rule mt-8" />
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-10 md:grid-cols-2">
          {ASSOCIATIONS.map((a) => (
            <article key={a.name} className="group">
              <div className="grid h-52 place-items-center rounded-[2rem] bg-[#f6f8fc] p-10 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-navy-950/10">
                <img src={a.logo} alt={`${a.name} logo`} className="max-h-32 max-w-full object-contain" loading="lazy" />
              </div>
              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-gold-700">{a.tag}</p>
              <h2 className="mt-1 text-2xl font-bold text-navy-900">{a.name}</h2>
              <p className="mt-3 text-base leading-8 text-slate-600">{a.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#f6f8fc] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">What our programme provides</p>
            <h2 className="mt-3 text-3xl font-bold text-navy-900 md:text-4xl">From choosing a course to boarding the plane</h2>
          </div>
          <div className="mt-14 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {PROVIDES.map(([Icon, title, text]) => (
              <div key={title} className="group text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-gold-700 shadow-md ring-8 ring-white/60 transition duration-300 group-hover:bg-navy-800 group-hover:text-gold-400">
                  <Icon className="h-7 w-7" />
                </span>
                <h3 className="mt-6 text-lg font-bold text-navy-900">{title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="navy-pattern px-4 py-20 text-center text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold-300">{DESTINATIONS.join("  ·  ")}</p>
          <h2 className="mt-6 text-3xl font-bold md:text-5xl">From School Education to <span className="text-gold-400">Global Opportunities.</span></h2>
          <p className="mt-4 text-lg text-white/75">Your Future. Our Guidance. Global Possibilities.</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <button type="button" onClick={openApply} className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 transition hover:bg-gold-400">
              Apply now <ArrowRight className="h-4 w-4" />
            </button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-95">
              <WhatsAppIcon className="h-5 w-5" /> Ask about placement
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}