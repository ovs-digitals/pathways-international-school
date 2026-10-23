import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ClipboardCheck,
  Clock,
  FileText,
  GraduationCap,
  Users,
  Wallet,
} from "lucide-react";
import { PageHero, Reveal, SectionHeading, TiltCard } from "./Motion";
import { WHATSAPP_LINK, WhatsAppIcon } from "./WhatsAppButton";

const steps = [
  {
    icon: FileText,
    title: "Submit the application",
    short: "Application form + documents",
    text: "Fill out and submit the application of admission form. Please provide accurate parent/guardian contact details (phone numbers and email addresses) and scanned copies of the required documents.",
    image: "hero-bg3.webp",
  },
  {
    icon: ClipboardCheck,
    title: "Entrance test & interview",
    short: "Scheduled after submission",
    text: "After you submit the application, you receive a schedule for an entrance test and an interview with the applicant and parents.",
    image: "st-stream-science.webp",
  },
  {
    icon: Wallet,
    title: "Pay the processing fee",
    short: "Non-refundable, per application",
    text: "After the entrance test and interview, a non-refundable application processing fee is paid for each application. Paying the fee does not by itself guarantee admission.",
    image: "st-stream-it.webp",
  },
  {
    icon: BadgeCheck,
    title: "Offer & confirmation",
    short: "Welcome to Pathways",
    text: "Once an offer is made, the confirmation formalities are shared with parents, and your child is ready to begin their Pathways journey.",
    image: "seniorstudents.webp",
  },
];

const routes = [
  {
    icon: Clock,
    tag: "Subject to seats",
    title: "Current academic year",
    points: [
      "Applicants receive a schedule for an entrance test, followed by an interview with parents.",
      "Parents are notified if and when a vacancy opens to confirm admission.",
    ],
  },
  {
    icon: CalendarDays,
    tag: "Upcoming year",
    title: "Next academic year",
    points: [
      "Applications are accepted each year for the upcoming academic year at various class levels.",
      "Availability updates are posted on the website regularly.",
    ],
  },
  {
    icon: Users,
    tag: "First come, first served",
    title: "The waiting list",
    points: [
      "A waiting list is maintained on a first-come, first-served basis.",
      "It is valid only until the end of the academic year selected on the application and does not carry forward.",
    ],
  },
];

const ageExamples = [
  { cls: "Class V", when: "Next academic year (starts in August)", from: 9.4, to: 10.3 },
  { cls: "Class VII", when: "Current academic year (applying in November)", from: 11.4, to: 12.3 },
];

const programs = [
  { title: "Pre-IGCSE", text: "Foundation programme", image: "st-young-learner.webp", to: "/pre-igcse" },
  { title: "IGCSE / O Levels", text: "Two-year programme", image: "senior.webp", to: "/igcse" },
  { title: "A Levels", text: "International AS & A2", image: "senior.webp", to: "/international-as-levels" },
];

export default function AdmissionsPage() {
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const timer = useRef(null);

  // gently cycle through the steps until the visitor interacts
  useEffect(() => {
    if (!auto) return;
    timer.current = setInterval(() => setActive((a) => (a + 1) % steps.length), 4500);
    return () => clearInterval(timer.current);
  }, [auto]);

  const pick = (i) => {
    setAuto(false);
    setActive(i);
  };
  const step = steps[active];
  const StepIcon = step.icon;

  return (
    <main className="overflow-hidden bg-[#f6f8fc] text-slate-900">
      <PageHero
        eyebrow="Admissions & Eligibility"
        title="Your child's journey"
        accent="starts here."
        image="hero-bg2.webp"
        text="A clear, fair and transparent admissions journey, with our team guiding your family at every step."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <a
            href="#process"
            className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25"
          >
            See the 4 steps <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-[#25D366]/30 transition hover:bg-[#1fb457]"
          >
            <WhatsAppIcon className="h-5 w-5" /> Ask admissions
          </a>
        </div>
      </PageHero>

      {/* ================= 4-STEP INTERACTIVE PROCESS ================= */}
      <section id="process" className="scroll-mt-28 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="How to apply" title="Four simple steps" accent="to join Pathways." />

          {/* stepper */}
          <Reveal variant="up" className="relative mt-14">
            <div className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-1 rounded-full bg-slate-200 md:block">
              <div
                className="h-full rounded-full bg-gradient-to-r from-navy-700 via-gold-500 to-gold-400 transition-all duration-700"
                style={{ width: `${(active / (steps.length - 1)) * 100}%` }}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-4">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const on = i === active;
                const done = i < active;
                return (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => pick(i)}
                    className="group relative flex items-center gap-4 rounded-2xl p-3 text-left transition md:flex-col md:text-center"
                  >
                    <span
                      className={`relative grid h-16 w-16 shrink-0 place-items-center rounded-full border-4 transition duration-500 ${
                        on
                          ? "scale-110 border-gold-400 bg-navy-700 text-gold-300 shadow-xl shadow-navy-950/30"
                          : done
                          ? "border-gold-300 bg-gold-500 text-navy-900"
                          : "border-white bg-white text-slate-400 shadow-md group-hover:text-navy-700"
                      }`}
                    >
                      {on && <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/30" />}
                      <Icon className="relative h-7 w-7" />
                    </span>
                    <span>
                      <span className={`block font-serif text-sm italic ${on ? "text-gold-700" : "text-slate-400"}`}>Step {i + 1}</span>
                      <span className={`block text-base font-bold ${on ? "text-navy-800" : "text-slate-600"}`}>{s.title}</span>
                      <span className="block text-xs text-slate-500">{s.short}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* detail panel */}
          <div key={active} className="panel-in mt-10 grid overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy-950/10 ring-1 ring-slate-100 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-64">
              <img src={step.image} alt="" className="kenburns absolute inset-0 h-full w-full object-cover object-[50%_25%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 to-transparent" />
              <span className="absolute bottom-5 left-5 font-serif text-7xl font-semibold italic text-white/90">0{active + 1}</span>
            </div>
            <div className="p-8 sm:p-10">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-700 text-gold-400">
                <StepIcon className="h-7 w-7" />
              </span>
              <h3 className="mt-5 font-serif text-3xl font-semibold text-navy-800">{step.title}</h3>
              <p className="mt-4 text-base leading-8 text-slate-600">{step.text}</p>
              <div className="mt-7 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => pick((active + steps.length - 1) % steps.length)}
                  className="rounded-full border-2 border-navy-700 px-5 py-2 text-xs font-bold uppercase tracking-wider text-navy-700 transition hover:bg-navy-700 hover:text-white"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => pick((active + 1) % steps.length)}
                  className="rounded-full bg-navy-700 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-navy-900"
                >
                  {active === steps.length - 1 ? "Start again" : "Next step →"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ADMISSION ROUTES ================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="When can you join?" title="Three ways" accent="into Pathways." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {routes.map(({ icon: Icon, ...r }, i) => (
              <Reveal key={r.title} variant="up" delay={i * 0.12}>
                <TiltCard className="group relative h-full overflow-hidden rounded-3xl bg-[#f6f8fc] p-7 ring-1 ring-slate-100">
                  <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold-100 transition duration-700 group-hover:scale-[3]" />
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-700 text-gold-400 transition group-hover:rotate-6">
                        <Icon className="h-7 w-7" />
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-gold-800 shadow-sm">{r.tag}</span>
                    </div>
                    <h3 className="mt-6 font-serif text-2xl font-semibold text-navy-800">{r.title}</h3>
                    <ul className="mt-4 space-y-3">
                      {r.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-sm leading-6 text-slate-600">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-gold-500" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section className="navy-pattern relative overflow-hidden py-16 text-white md:py-24">
        <div aria-hidden className="blob absolute -right-20 top-10 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
          <Reveal variant="left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Eligibility</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-5xl">
              The right class <span className="italic text-gold-400">for the right age.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              To be eligible, an applicant must fall within the appropriate age range for the desired class at
              the time of admission. Not sure where your child fits? Our team will guide you.
            </p>
          </Reveal>
          <div className="space-y-5">
            {ageExamples.map((a, i) => (
              <Reveal key={a.cls} variant="right" delay={i * 0.15}>
                <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-serif text-2xl font-semibold text-white">{a.cls}</h3>
                    <span className="text-xs font-semibold text-gold-300">{a.when}</span>
                  </div>
                  <div className="relative mt-6 h-3 rounded-full bg-white/10">
                    <div
                      className="absolute h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500 shadow-[0_0_20px_rgba(201,164,76,.6)]"
                      style={{ left: `${((a.from - 8) / 6) * 100}%`, width: `${((a.to - a.from) / 6) * 100}%` }}
                    />
                  </div>
                  <div className="mt-2 flex justify-between text-[11px] text-white/40">
                    {[8, 9, 10, 11, 12, 13, 14].map((n) => (
                      <span key={n}>{n} yrs</span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-white/80">
                    Age between <b className="text-gold-300">{a.from}</b> and <b className="text-gold-300">{a.to}</b> years
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROGRAMMES ================= */}
      <section id="programs" className="scroll-mt-28 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Now admitting" title="Choose your" accent="programme." />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {programs.map((p, i) => (
              <Reveal key={p.title} variant="zoom" delay={i * 0.12}>
                <Link to={p.to} className="group relative block h-80 overflow-hidden rounded-3xl shadow-xl shadow-navy-950/10">
                  <img src={p.image} alt="" className="h-full w-full object-cover object-[50%_25%] transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/30 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <GraduationCap className="h-8 w-8 text-gold-400 transition group-hover:-translate-y-1" />
                    <h3 className="mt-3 font-serif text-2xl font-semibold">{p.title}</h3>
                    <p className="text-sm text-white/75">{p.text}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-300">
                      View programme <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal variant="up" className="mt-8 text-center">
            <Link to="/private-candidates" className="inline-flex items-center gap-2 text-sm font-bold text-navy-700 hover:text-gold-700">
              Preparing on your own? Join as a private candidate <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="zoom" className="gold-border">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[1.4rem] bg-navy-800 p-8 text-white md:flex-row md:items-center md:p-12">
              <div>
                <h2 className="font-serif text-3xl font-semibold">Ready to apply?</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-white/70">
                  Admissions are subject to seat availability and eligibility. Message our team to receive the
                  application form and the documents list.
                </p>
              </div>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-shimmer inline-flex shrink-0 items-center gap-2 rounded-full bg-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 transition hover:bg-gold-400"
              >
                <WhatsAppIcon className="h-5 w-5" /> Start your application
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}