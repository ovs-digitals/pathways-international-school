import PakistanMap from "./PakistanMap";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Globe2,
  GraduationCap,
  Handshake,
  MapPin,
  MonitorPlay,
  Phone,
  School,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { openApply } from "./ApplyModal";
import FlipCard from "./FlipCard";
import OfficeLocations from "./OfficeLocations";
import { WHATSAPP_LINK, WhatsAppIcon } from "./WhatsAppButton";
import { ADDRESS, LOWEST_MONTHLY, pkr, waLinkTo } from "./siteData";




// Only the three official logos are shown
const partners = [
  {
    label: "Pearson Edexcel",
    image: "partners/pearson-edexcel.webp",
    monochrome: true,
    detail: "Approved Centre No. 97911",
  },
  {
    label: "Government of Punjab",
    image: "partners/punjab.webp",
    detail: "Licensed by School Education Dept.",
  },
  {
    label: "Olevels Virtual School",
    image: "partners/olevels.webp",
    detail: "A project of Olevels Virtual School, UK",
  },
];

const tagline = [
  "Expert Teachers",
  "Zero-Tuition Policy",
  "Study From Anywhere",
  "Flexible Timings",
  "Affordable Fees",
];

const promises = [
  {
    icon: Globe2,
    title: "A Fully Online School",
    image: "community.webp",
    text: "Live online classes, recorded lessons and teachers who know you by name — a complete school on your screen, with full regular-student status.",
  },
  {
    icon: ShieldCheck,
    title: "Zero-Tuition Policy",
    image: "senior.webp",
    text: "Everything is taught properly in class, so there is no need for extra tuition or private coaching.",
  },
  {
    icon: BookOpenCheck,
    title: "Your School Travels With You",
    image: "curriculam.webp",
    text: "At home, in another city or on your travels — your classes, notes and teachers go wherever you go.",
  },
];

const programs = [
  {
    no: "01",
    title: "Pre-IGCSE",
    subtitle: "Foundation Programme",
    image: "teacherwithstudents.webp",
    text: "Build the subject foundations needed to move confidently into IGCSE / O Levels.",
    facts: ["1 Year", "2 Terms", "Foundation"],
    points: ["Mathematics, English & Sciences", "Computer Science & Islamic Studies", "Smooth progression into IGCSE"],
    to: "/pre-igcse",
  },
  {
    no: "02",
    title: "IGCSE / O Levels",
    subtitle: "International GCSE",
    image: "o_level.webp",
    text: "A globally recognised qualification that opens doors to leading colleges and universities.",
    facts: ["2 Years", "3 Terms", "Pearson Edexcel"],
    to: "/igcse",
    featured: true,
  },
  {
    no: "03",
    title: "A Levels",
    subtitle: "International AS & A2",
    image: "seniorstudent.webp",
    text: "Advanced subject depth with personal mentoring and university-ready preparation.",
    facts: ["AS + A2", "Regular", "Self-Paced"],
    to: "/international-as-levels",
  },
];

const steps = [
  { icon: CheckCircle2, title: "Register", text: "Apply as a regular student or join as a private candidate from anywhere." },
  { icon: MonitorPlay, title: "Learn", text: "Attend live classes with experienced, internationally minded teachers." },
  { icon: ClipboardCheck, title: "Practise", text: "Complete assignments and Pathways mock tests with detailed feedback." },
  { icon: GraduationCap, title: "Sit Exams", text: "Appear in official international examinations fully prepared." },
  { icon: Award, title: "Qualify", text: "Earn recognised certificates and unlock your next step." },
];

const privateBenefits = [
  "Enrol as a regular student",
  "Register for exams in any city of Pakistan",
  "Complete our mock test",
  "Score 60% to qualify",
];

export default function HomeLandingPage() {
  return (
    <main className="bg-[#f6f8fc] text-slate-950">
      {/* ================= KEY FACTS STRIP ================= */}
      <section className="relative z-10 -mt-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-slate-200 rounded-2xl bg-white px-2 py-5 shadow-2xl shadow-navy-950/10 ring-1 ring-slate-100 md:grid-cols-5 md:divide-x">
          {[
            [ShieldCheck, "Pearson Edexcel", "Centre No. 97911"],
            [Users, "Expert", "Teachers"],
            [Wallet, `From PKR ${pkr(LOWEST_MONTHLY)}`, "/ month"],
            [MonitorPlay, "Live Online", "Interactive Classes"],
            [GraduationCap, "University", "Pathways"],
          ].map(([Icon, a, b]) => (
            <div key={a} className="flex items-center gap-3 px-4 py-2.5 md:justify-center">
              <Icon className="h-9 w-9 shrink-0 text-gold-600" strokeWidth={1.6} />
              <p className="text-[13px] font-extrabold uppercase leading-5 tracking-wide text-navy-800">{a}<span className="block font-bold text-navy-700/80">{b}</span></p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= READY TO START ================= */}
      <section className="px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-white p-6 shadow-xl shadow-navy-950/5 ring-1 ring-slate-100 md:flex-row md:items-center md:p-8">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-navy-50 text-navy-700 ring-8 ring-navy-50/50"><GraduationCap className="h-10 w-10" /></span>
          <div className="min-w-0 flex-1">
            <h2 className="font-serif text-2xl font-semibold text-navy-800 md:text-3xl">Ready to start your IGCSE / A Level journey?</h2>
            <p className="mt-1 text-base text-slate-600">Admissions are now open — <b className="text-navy-800">aaj hi apply karein!</b></p>
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm font-semibold text-navy-700">
              {["Simple process", "Expert guidance", "Support at every step"].map((t) => <span key={t} className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-gold-600" />{t}</span>)}
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:w-72">
            <button type="button" onClick={openApply} className="inline-flex items-center justify-between rounded-xl bg-navy-700 px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-navy-900">Start your application <ArrowRight className="h-4 w-4" /></button>
            <Link to="/application-process" className="inline-flex items-center justify-between rounded-xl border-2 border-navy-700 px-5 py-3 text-sm font-bold uppercase tracking-wider text-navy-700 transition hover:border-gold-500 hover:bg-gold-50">Check your eligibility <ArrowRight className="h-4 w-4" /></Link>
            <a href={waLinkTo()} target="_blank" rel="noreferrer" className="text-center text-xs font-semibold text-slate-500 hover:text-[#128C7E]">Have questions? Chat with Admissions on WhatsApp →</a>
          </div>
        </div>
      </section>


      {/* ================= RECOGNITION ================= */}
      <section className="relative z-10 mt-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gold-200/70 bg-white p-6 shadow-2xl shadow-navy-950/10 md:p-8">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-10 bg-gold-400" />
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gold-700">
              Recognised &amp; Affiliated
            </p>
            <span className="h-px w-10 bg-gold-400" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {partners.map((partner) => (
              <div
                key={partner.label}
                className="group flex flex-col items-center rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-5 text-center transition hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-lg hover:shadow-navy-950/10"
              >
                <div className="flex h-20 w-full items-center justify-center">
                  <img
                    src={partner.image}
                    alt={`${partner.label} logo`}
                    className={`max-h-16 max-w-[85%] object-contain ${partner.monochrome ? "brightness-0 opacity-85" : ""}`}
                    loading="lazy"
                  />
                </div>
                <div className="mt-3 text-sm font-bold text-navy-800">{partner.label}</div>
                <div className="mt-1 text-xs text-slate-500">{partner.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PROGRAMMES ================= */}
      <section id="programs" className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              Our Programmes
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-800 md:text-5xl">
              Choose Your Pathway
            </h2>
            <span className="gold-rule mt-5" />
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Three clear stages, one connected journey — from foundation
              to university-ready international qualifications.
            </p>
          </div>

          {/* Pathway timeline: one connected journey */}
          <div className="relative mt-16">
            {/* the line that joins the steps (across on desktop, down on mobile) */}
            <div className="absolute left-7 top-7 bottom-7 w-[3px] rounded-full bg-gradient-to-b from-gold-300 via-gold-500 to-navy-700 lg:left-[16.66%] lg:right-[16.66%] lg:top-7 lg:bottom-auto lg:h-[3px] lg:w-auto lg:bg-gradient-to-r" />
            <ol className="relative grid gap-10 lg:grid-cols-3 lg:gap-8">
              {programs.map((p, i) => (
                <li key={p.title} className="relative pl-20 lg:pl-0 lg:text-center">
                  {/* step dot */}
                  <div className="absolute left-0 top-0 lg:static lg:mx-auto lg:w-fit">
                    <span className={`relative grid h-14 w-14 place-items-center rounded-full font-serif text-xl font-semibold shadow-xl ring-8 ring-[#f6f8fc] ${p.featured ? "bg-gold-500 text-navy-900" : "bg-navy-700 text-gold-300"}`}>
                      {p.no}
                      {p.featured && <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/40" />}
                    </span>
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-gold-700 lg:mt-5">Step {i + 1} · {p.subtitle}</p>
                  <article className={`group mt-3 flex flex-col overflow-hidden rounded-3xl bg-white text-left shadow-xl shadow-navy-950/10 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${p.featured ? "ring-2 ring-gold-400" : "ring-1 ring-slate-100 hover:ring-gold-300"}`}>
                    <div className="relative h-36 overflow-hidden">
                      <img src={p.image} alt={p.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-900/20 to-transparent" />
                      {p.featured && <span className="absolute right-4 top-4 rounded-full bg-gold-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-navy-900">Most Popular</span>}
                      <h3 className="absolute bottom-3 left-5 right-5 font-serif text-2xl font-semibold text-white">{p.title}</h3>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex flex-wrap gap-2">
                        {p.facts.map((f) => <span key={f} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-semibold text-navy-700">{f}</span>)}
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">{p.text}</p>
                      {p.links && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {p.links.map((l) => (
                            <Link key={l.label} to={l.to} className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-navy-800 transition hover:border-gold-400 hover:bg-gold-50">{l.label}</Link>
                          ))}
                        </div>
                      )}
                      <Link to={p.to} className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold text-navy-700 transition hover:text-gold-700">
                        View programme <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                  {i < programs.length - 1 && <ArrowRight className="absolute -right-6 top-5 hidden h-5 w-5 text-gold-500 lg:block" />}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================= TAGLINE RIBBON ================= */}
      <section className="mt-14 overflow-hidden border-y border-gold-500/30 bg-navy-800 py-4">
        <div className="pathways-marquee flex w-max gap-10 whitespace-nowrap">
          {[...tagline, ...tagline, ...tagline, ...tagline].map((t, i) => (
            <span key={i} className="flex items-center gap-10 font-serif text-lg italic text-white/90">
              {t}
              <span className="text-gold-400">✦</span>
            </span>
          ))}
        </div>
      </section>

      {/* ================= PROMISES ================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
                The Pathways Promise
              </p>
              <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-navy-800 md:text-5xl">
                Education that fits your life — not the other way round.
              </h2>
            </div>
            <p className="max-w-xl text-base leading-8 text-slate-600 lg:justify-self-end">
              Real teachers, a real timetable and a real report card — minus
              the academy fees, the tuition bills and the daily commute. The
              whole school, wherever you are.
            </p>
          </div>

          <p className="mt-10 text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
            Hover or tap a card to flip it
          </p>
          <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {promises.map(({ icon: Icon, title, text, image }, i) => (
              <FlipCard
                key={title}
                label={title}
                className="h-80"
                front={
                  <div className="relative h-full w-full">
                    <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/95 via-navy-900/45 to-navy-900/10" />
                    <span className="absolute right-5 top-4 font-serif text-5xl font-semibold italic text-white/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-500 text-navy-900 shadow-lg">
                        <Icon className="h-6 w-6" strokeWidth={1.9} />
                      </span>
                      <h3 className="mt-4 font-serif text-2xl font-semibold text-white">{title}</h3>
                      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold-300">Tap to read more ↻</p>
                    </div>
                  </div>
                }
                back={
                  <div className="navy-pattern flex h-full w-full flex-col justify-center p-8 text-white ring-2 ring-inset ring-gold-500/50 rounded-3xl">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-gold-400/60 text-gold-400">
                      <Icon className="h-6 w-6" strokeWidth={1.9} />
                    </span>
                    <h3 className="mt-5 font-serif text-2xl font-semibold text-gold-400">{title}</h3>
                    <p className="mt-3 text-base leading-7 text-white/85">{text}</p>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
              Your Journey
            </p>
            <h2 className="mt-3 font-serif text-3xl font-semibold text-navy-800 md:text-4xl">
              How Pathways Works
            </h2>
            <span className="gold-rule mt-5" />
          </div>

          <div className="relative mt-12 grid gap-8 md:grid-cols-5">
            <div className="absolute left-[10%] right-[10%] top-8 hidden border-t-2 border-dashed border-gold-300 md:block" />
            {steps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="relative text-center">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-gold-400 bg-navy-700 text-gold-300 shadow-lg shadow-navy-950/20 transition hover:scale-110">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <div className="mt-4 font-serif text-lg font-semibold italic text-gold-600">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-1 text-sm font-bold uppercase tracking-wide text-navy-800">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <PakistanMap />

      {/* ================= A DAY AT PATHWAYS (online) ================= */}
      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Your school, online</p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-900 md:text-4xl">A day at Pathways — <span className="text-gold-600">from your home</span></h2>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [MonitorPlay, "Live classes", "Join your teacher in real time, ask questions, take part."],
              [BookOpenCheck, "Recorded lessons", "Missed a class? Watch it again any time."],
              [ClipboardCheck, "Tests & feedback", "Regular tests, marked work and clear feedback."],
              [Users, "Parents in the loop", "Attendance, results and updates for parents."],
            ].map(([Icon, t, d], i) => (
              <div key={t} className="group relative overflow-hidden rounded-2xl bg-white p-4 shadow-md shadow-navy-950/5 ring-1 ring-slate-100 transition hover:-translate-y-1 hover:ring-gold-300">
                <span className="absolute right-3 top-2 text-3xl font-black text-navy-50">{String(i + 1).padStart(2, "0")}</span>
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-navy-700 text-gold-300 transition group-hover:bg-gold-500 group-hover:text-navy-900"><Icon className="h-5 w-5" /></span>
                <p className="mt-3 font-extrabold text-navy-900">{t}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LIVE CLASSES ACROSS PAKISTAN ================= */}
      <section className="mt-14 overflow-hidden bg-navy-800 py-10 text-white">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-300">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" /></span>
            Live now · online interactive classes
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">Pakistan's first online <span className="italic text-gold-400">live interactive</span> school</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">Real teachers, real-time classes and a full school timetable — for students all over Pakistan.</p>
        </div>
        <div className="mt-7 border-y border-white/10 bg-white/[0.04] py-4">
          <div className="pathways-marquee flex w-max gap-10 whitespace-nowrap">
            {[0, 1, 2, 3].flatMap((k) => ["Live Interactive Classes", "Pearson Edexcel Centre", "IGCSE / O Levels", "International A Levels", "Mock Tests & Feedback", "Recorded Lessons", "Expert Teachers", "Affordable Fees"].map((c) => (
              <span key={c + k} className="inline-flex items-center gap-3 text-lg font-semibold text-white/90">
                <span className="h-2 w-2 rounded-full bg-gold-400" />{c}
              </span>
            )))}
          </div>
        </div>
      </section>

      {/* ================= OFFICES ================= */}
      <OfficeLocations eyebrow="Visit us" title="Our location" />

      {/* ================= FEATURE STRIP ================= */}
      <section className="border-y border-slate-200 bg-white py-9">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <Feature icon={<School className="h-10 w-10 shrink-0 text-gold-500" strokeWidth={1.6} />} title="A Project of Olevels Virtual School" />
          <Feature icon={<Handshake className="h-10 w-10 shrink-0 text-gold-500" strokeWidth={1.6} />} title="In Partnership with AusPak International" />
          <Feature icon={<Users className="h-10 w-10 shrink-0 text-gold-500" strokeWidth={1.6} />} title="Students from all over Pakistan" />
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="navy-pattern relative overflow-hidden py-16 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-[1fr_auto] md:items-center lg:px-8">
          <div>
            <h2 className="font-serif text-3xl font-semibold text-gold-400 md:text-4xl">
              Your Pathway Starts Here
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75">
              No academy. No extra tuition. No boundaries. Take the first step
              toward a world-class education and a global future.
            </p>
            <div className="mt-4 flex items-start gap-2 text-sm leading-6 text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" />
              <span>
                {ADDRESS}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              to="/application-process"
              className="rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-center text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25 transition hover:from-gold-300 hover:to-gold-400"
            >
              Apply For Admission
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-gold-400 hover:text-gold-300"
            >
              <Phone className="h-4 w-4" />
              Speak To An Advisor
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="flex items-center gap-4 border-slate-200 md:border-r md:pr-6 md:last:border-r-0">
      {icon}
      <p className="text-sm font-semibold leading-6 text-navy-800">{title}</p>
    </div>
  );
}