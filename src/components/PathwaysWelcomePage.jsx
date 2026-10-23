import { Link } from "react-router-dom";
import { ArrowRight, Award, Handshake, Quote, ShieldCheck, Sparkles, Users } from "lucide-react";
import { PageHero, Reveal, SectionHeading, TiltCard, Typewriter } from "./Motion";

const values = [
  {
    icon: Handshake,
    title: "Respect & Empathy",
    text: "We practise kindness, respect and compassion in every interaction — building a caring school community.",
    image: "community.webp",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    text: "We encourage honesty and strong moral character, empowering students to make the right choices.",
    image: "senior.webp",
  },
  {
    icon: Award,
    title: "Excellence",
    text: "We set high standards in learning and personal growth, supporting every student to achieve their best.",
    image: "o_level.webp",
  },
  {
    icon: Users,
    title: "Responsibility",
    text: "We promote accountability, self-discipline and teamwork — so students grow into dependable leaders.",
    image: "seniorstudents.webp",
  },
];

const programmes = [
  { to: "/pre-igcse", label: "Pre-IGCSE" },
  { to: "/igcse", label: "IGCSE / O Levels" },
  { to: "/international-as-levels", label: "International AS Levels" },
  { to: "/international-a2-levels", label: "International A2 Levels" },
  { to: "/private-candidates", label: "British Council Exam Registration (IGCSE / A Levels)" },
];

const howWeTeach = [
  "Meaningful classroom routines",
  "Student leadership opportunities",
  "Collaborative projects",
  "Assemblies & school events",
];

export default function PathwaysWelcomePage() {
  return (
    <main className="overflow-hidden bg-[#f6f8fc] text-slate-900">
      <PageHero
        eyebrow="About Pathways"
        title="Welcome to"
        accent="Pathways International School."
        image="community.webp"
        text="A friendly, supportive learning community where students grow into confident, responsible and globally minded individuals."
      >
        <p className="font-serif text-2xl text-white/90 md:text-3xl">
          <Typewriter words={["Excellence.", "Character.", "Global learning.", "Lifelong curiosity."]} className="italic text-gold-400" />
        </p>
      </PageHero>

      {/* ================= CEO'S MESSAGE ================= */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-navy-800 text-white shadow-2xl shadow-navy-950/20 ring-1 ring-gold-500/30">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/15 blur-3xl" />
            <div aria-hidden className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="relative grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[0.75fr_1.25fr] lg:p-12">
              <Reveal variant="left" className="relative mx-auto w-full max-w-[19rem]">
                <div className="absolute -inset-3 rotate-3 rounded-[1.8rem] border-2 border-gold-400/50" />
                <div className="relative overflow-hidden rounded-[1.6rem] bg-white ring-4 ring-gold-500/70">
                  <img src="ceo-waqar-hussain.webp" alt="Waqar Hussain, CEO" className="aspect-[4/5] w-full object-cover object-top" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy-950/95 via-navy-900/70 to-transparent px-5 pb-4 pt-14 text-center">
                    <div className="font-serif text-xl font-semibold">Waqar Hussain</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-400">Chief Executive Officer</div>
                  </div>
                </div>
              </Reveal>

              <Reveal variant="right">
                <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300">
                  <Quote className="h-3.5 w-3.5" /> Message from our CEO
                </p>
                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight md:text-[2.6rem]">
                  Quality education should <span className="italic text-gold-400">have no boundaries.</span>
                </h2>
                <div className="mt-5 space-y-4 text-[15px] leading-7 text-white/80">
                  <p>
                    Talent exists in every city of Pakistan, yet too many students are held back by distance,
                    rigid timetables and the cost of academies and private tuition. At{" "}
                    <strong className="text-white">Pathways International School</strong>, we set out to remove
                    those barriers — our students learn as fully regular students with experienced teachers,
                    structured courses and exam-style mock tests, wherever they live.
                  </p>
                  <p>
                    As a <strong className="text-white">Pearson Edexcel approved centre (Centre No. 97911)</strong>,
                    we focus on academic excellence and on preparing students for university and future success.
                  </p>
                </div>
                <blockquote className="mt-6 rounded-2xl border-l-4 border-gold-500 bg-white/[0.07] px-5 py-4 font-serif text-lg italic leading-relaxed text-white">
                  “Every learner deserves a world-class education — affordable, flexible and focused on their
                  hidden potential.”
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold-400" />
                  <div>
                    <div className="font-serif text-2xl italic text-gold-300">Waqar Hussain</div>
                    <div className="text-xs font-semibold text-white/60">CEO · Pathways International School &amp; Olevels Virtual School</div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="navy-pattern relative overflow-hidden py-20 text-white md:py-28">
        <div aria-hidden className="blob absolute -left-20 top-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal variant="zoom">
            <Sparkles className="mx-auto h-10 w-10 text-gold-400" />
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Our Mission</p>
          </Reveal>
          <Reveal variant="blur" delay={0.15}>
            <p className="mt-6 font-serif text-2xl leading-relaxed md:text-4xl md:leading-snug">
              “To provide high-quality education that goes beyond the classroom — developing well-rounded,
              open-minded learners grounded in strong values, essential life skills and
              <span className="italic text-gold-400"> academic excellence.</span>”
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= VALUES ================= */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Our Values"
            title="The character behind"
            accent="every success."
            text="Values we instil from the very first day — helping students become responsible, respectful and confident contributors to society."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: Icon, title, text, image }, i) => (
              <Reveal key={title} variant="up" delay={i * 0.12}>
                <TiltCard className="group h-full overflow-hidden rounded-3xl bg-white shadow-xl shadow-navy-950/10 ring-1 ring-slate-100">
                  <div className="relative h-40 overflow-hidden">
                    <img src={image} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                    <span className="absolute -bottom-6 left-6 grid h-12 w-12 place-items-center rounded-xl bg-gold-500 text-navy-900 shadow-lg ring-4 ring-white transition group-hover:-translate-y-1">
                      <Icon className="h-6 w-6" />
                    </span>
                  </div>
                  <div className="p-6 pt-9">
                    <h3 className="font-serif text-xl font-semibold text-navy-800">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= HOW WE TEACH VALUES ================= */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <Reveal variant="left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">How We Teach Values</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-navy-800 md:text-4xl">
              Values are lived, <span className="italic text-gold-600">not just taught.</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-slate-600">
              Character is built every day — through routines, leadership, teamwork and the way our
              community treats one another.
            </p>
            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {howWeTeach.map((h, i) => (
                <Reveal key={h} as="li" variant="up" delay={0.1 * i} className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm font-semibold text-navy-800">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-navy-700 font-serif text-xs text-gold-400">{i + 1}</span>
                  {h}
                </Reveal>
              ))}
            </ul>
          </Reveal>
          <Reveal variant="zoom" className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img src="stageperformance.webp" alt="" className="h-64 w-full rounded-3xl object-cover shadow-xl" loading="lazy" />
              <img src="sports.webp" alt="" className="mt-10 h-64 w-full rounded-3xl object-cover shadow-xl" loading="lazy" />
            </div>
            <div className="soft-float absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-5 py-2 text-xs font-bold uppercase tracking-widest text-navy-900 shadow-xl">
              Excellence · Character · Community
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================= PROGRAMMES ================= */}
      <section className="navy-pattern relative overflow-hidden py-16 text-white md:py-20">
        <div aria-hidden className="blob absolute -right-20 top-0 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="blur" className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Explore</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">Find your programme</h2>
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {programmes.map((p, i) => (
              <Reveal key={p.to} variant="up" delay={i * 0.06}>
                <Link
                  to={p.to}
                  className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] px-6 py-5 font-semibold backdrop-blur transition hover:border-gold-400 hover:bg-gold-500 hover:text-navy-900"
                >
                  {p.label}
                  <ArrowRight className="h-5 w-5 text-gold-400 transition group-hover:translate-x-1 group-hover:text-navy-900" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <Reveal variant="zoom" className="gold-border">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[1.4rem] bg-navy-800 p-8 text-white md:flex-row md:items-center md:p-12">
              <div>
                <h2 className="font-serif text-3xl font-semibold">Ready to begin your pathway?</h2>
                <p className="mt-2 text-white/70">Explore our programmes or speak with our admissions team.</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/igcse" className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-bold uppercase tracking-wider text-navy-900 transition hover:bg-gold-400">
                  Our Programmes <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}