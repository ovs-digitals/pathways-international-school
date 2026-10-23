import { useMemo, useState } from "react";
import { ArrowRight, Award, BriefcaseBusiness, CheckCircle2, Clock, Sparkles, Users } from "lucide-react";
import { PageHero, Reveal, SectionHeading, TiltCard, Typewriter } from "./Motion";
import { CONTACT } from "./siteData";

const HR_EMAIL = CONTACT.hrEmail;

const DEPARTMENTS = ["All", "Teaching", "Administration", "Student Support", "IT & Systems"];

const JOBS = [
  {
    id: "tch-math-01",
    title: "Mathematics Teacher",
    department: "Teaching",
    location: "Campus",
    type: "Full-time",
    experience: "2+ years",
    summary: "Deliver engaging lessons aligned with the British curriculum, track progress and collaborate with the subject team.",
    responsibilities: [
      "Plan and deliver well-structured lessons and assessments",
      "Differentiate instruction to support diverse learners",
      "Maintain accurate records and communicate with parents",
      "Participate in training, events and academic planning",
    ],
    requirements: [
      "Bachelor's degree (Master's preferred)",
      "Experience with British / International curriculum is a plus",
      "Strong classroom management and communication skills",
    ],
  },
  {
    id: "adm-front-01",
    title: "Front Desk & Admissions Coordinator",
    department: "Administration",
    location: "Campus",
    type: "Full-time",
    experience: "1–3 years",
    summary: "Support admissions enquiries, manage front desk operations and coordinate parent communications.",
    responsibilities: [
      "Handle walk-ins, calls and email enquiries professionally",
      "Support admissions documentation and data entry",
      "Coordinate meetings, tours and follow-ups",
      "Maintain confidentiality and accurate records",
    ],
    requirements: [
      "Excellent written and spoken English",
      "Comfortable with CRM / Sheets and admin workflows",
      "Professional, proactive and organised",
    ],
  },
  {
    id: "sup-coun-01",
    title: "Student Counsellor",
    department: "Student Support",
    location: "Campus",
    type: "Full-time",
    experience: "3+ years",
    summary: "Provide student wellbeing support and counselling, and help build a safe learning environment.",
    responsibilities: [
      "Conduct counselling sessions and referrals",
      "Support safeguarding and wellbeing initiatives",
      "Coordinate with parents and teachers on student plans",
      "Deliver workshops on wellbeing and study skills",
    ],
    requirements: [
      "Relevant degree / certification in counselling or psychology",
      "School counselling experience preferred",
      "Strong empathy, ethics and confidentiality",
    ],
  },
  {
    id: "it-sys-01",
    title: "IT Support Officer",
    department: "IT & Systems",
    location: "Campus",
    type: "Full-time",
    experience: "2+ years",
    summary: "Maintain IT systems, resolve tickets and support staff with devices, networking and classroom technology.",
    responsibilities: [
      "Provide L1 / L2 support for staff and labs",
      "Maintain network, printers and classroom AV",
      "Document fixes and manage inventory",
      "Support cybersecurity and backups",
    ],
    requirements: [
      "Hands-on experience with Windows / Mac and basic networking",
      "Strong troubleshooting and customer service",
      "Certifications (e.g. CompTIA) are a plus",
    ],
  },
];

const perks = [
  { icon: Award, title: "Professional Environment", text: "A respectful culture with clear processes and real support.", image: "/senior.webp" },
  { icon: Sparkles, title: "Growth & Training", text: "Ongoing development and upskilling opportunities.", image: "/curriculam.webp" },
  { icon: Users, title: "Supportive Team", text: "Collaborative planning, mentoring and shared resources.", image: "/community.webp" },
  { icon: CheckCircle2, title: "Impactful Work", text: "Make a measurable difference in learners' lives.", image: "/seniorstudent.webp" },
];

const steps = [
  { title: "Find your role", text: "Review the role details and confirm you meet the requirements." },
  { title: "Send your application", text: "Use the form below — then attach your CV and cover letter to the email." },
  { title: "Interview", text: "Shortlisted candidates are invited for an interview and / or demonstration." },
  { title: "Welcome aboard", text: "Final selection, onboarding and the start of your Pathways journey." },
];

const faqs = [
  { q: "Do you accept applications if there are no open roles?", a: "Yes. Email your CV to HR. We keep a talent pool and contact candidates when a suitable vacancy opens." },
  { q: "What documents should I submit?", a: "A current CV and a brief cover letter. For teaching roles we may request qualification and experience letters during shortlisting." },
  { q: "How long does shortlisting take?", a: "Timelines vary by role and volume. If shortlisted, you will be contacted to schedule an interview." },
];

export default function CareersPage() {
  const [dept, setDept] = useState("All");
  const [activeId, setActiveId] = useState(JOBS[0].id);
  const [openFaq, setOpenFaq] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", position: JOBS[0].title, message: "" });

  const jobs = useMemo(() => JOBS.filter((j) => dept === "All" || j.department === dept), [dept]);
  const active = jobs.find((j) => j.id === activeId) || jobs[0];
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function choose(job) {
    setActiveId(job.id);
    setForm((f) => ({ ...f, position: job.title }));
  }

  function submit(e) {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Position: ${form.position}`,
      "",
      form.message,
      "",
      "(CV and cover letter attached)",
    ].join("\n");
    window.location.href = `mailto:${HR_EMAIL}?subject=${encodeURIComponent(`Job Application: ${form.position}`)}&body=${encodeURIComponent(body)}`;
  }

  const field =
    "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-gold-400 focus:ring-4 focus:ring-gold-100";

  return (
    <main className="overflow-hidden bg-[#f6f8fc] text-slate-900">
      <PageHero eyebrow="Careers at Pathways" title="Build a career that" accent="shapes futures." image="/seniorstudents.webp">
        <p className="font-serif text-2xl text-white/90 md:text-3xl">
          <Typewriter words={["Teach.", "Inspire.", "Grow.", "Make an impact."]} className="italic text-gold-400" />
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="#openings" className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25">
            View Openings <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#apply" className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white transition hover:border-gold-400 hover:text-gold-300">
            Apply Directly
          </a>
        </div>
      </PageHero>

      {/* ================= PERKS ================= */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Why Join Us" title="A place where" accent="educators thrive." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map(({ icon: Icon, title, text, image }, i) => (
              <Reveal key={title} variant="up" delay={i * 0.1}>
                <TiltCard className="group relative h-72 overflow-hidden rounded-3xl shadow-xl shadow-navy-950/10">
                  <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-900/60 to-navy-900/10 transition duration-500 group-hover:via-navy-900/80" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-gold-500 text-navy-900 transition group-hover:-translate-y-1">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 font-serif text-xl font-semibold">{title}</h3>
                    <p className="mt-1 max-h-0 overflow-hidden text-sm leading-6 text-white/80 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                      {text}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OPENINGS ================= */}
      <section id="openings" className="scroll-mt-28 bg-white py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Current Openings" title="Find your" accent="next role." />

          <Reveal variant="up" className="mt-10 flex flex-wrap justify-center gap-2">
            {DEPARTMENTS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDept(d)}
                className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                  dept === d ? "bg-navy-700 text-gold-300 shadow-lg shadow-navy-950/20" : "bg-slate-100 text-slate-600 hover:bg-gold-100 hover:text-navy-800"
                }`}
              >
                {d}
              </button>
            ))}
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-3">
              {jobs.map((job, i) => {
                const on = active && job.id === active.id;
                return (
                  <Reveal key={job.id} variant="left" delay={i * 0.08}>
                    <button
                      type="button"
                      onClick={() => choose(job)}
                      className={`group relative w-full overflow-hidden rounded-2xl border p-5 text-left transition ${
                        on ? "border-gold-400 bg-navy-700 text-white shadow-xl shadow-navy-950/20" : "border-slate-100 bg-slate-50 hover:border-gold-300 hover:bg-white hover:shadow-lg"
                      }`}
                    >
                      <span className={`absolute inset-y-0 left-0 w-1.5 bg-gold-500 transition ${on ? "opacity-100" : "opacity-0 group-hover:opacity-60"}`} />
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className={`text-base font-bold ${on ? "text-white" : "text-navy-800"}`}>{job.title}</p>
                          <p className={`mt-1 text-xs ${on ? "text-gold-300" : "text-slate-500"}`}>
                            {job.department} · {job.location} · {job.type}
                          </p>
                        </div>
                        <ArrowRight className={`mt-1 h-5 w-5 shrink-0 transition group-hover:translate-x-1 ${on ? "text-gold-400" : "text-slate-300"}`} />
                      </div>
                    </button>
                  </Reveal>
                );
              })}
              {jobs.length === 0 && (
                <p className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-600">No roles in this department right now — send your CV to HR.</p>
              )}
            </div>

            {active && (
              <div key={active.id} className="panel-in rounded-3xl bg-[#f6f8fc] p-7 ring-1 ring-slate-100 sm:p-9">
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-full bg-navy-700 px-3 py-1 text-xs font-bold text-gold-300">{active.department}</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-bold text-navy-700 ring-1 ring-slate-200">
                    <BriefcaseBusiness className="h-3.5 w-3.5" /> {active.type}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-800">
                    <Clock className="h-3.5 w-3.5" /> {active.experience}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-3xl font-semibold text-navy-800">{active.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{active.summary}</p>
                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {[
                    ["Responsibilities", active.responsibilities],
                    ["Requirements", active.requirements],
                  ].map(([label, list]) => (
                    <div key={label} className="rounded-2xl bg-white p-5 shadow-sm">
                      <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-700">{label}</p>
                      <ul className="mt-3 space-y-2.5">
                        {list.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm leading-6 text-slate-700">
                            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <a
                  href="#apply"
                  className="btn-shimmer mt-7 inline-flex items-center gap-2 rounded-full bg-navy-700 px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition hover:bg-gold-500 hover:text-navy-900"
                >
                  Apply for this role <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= HOW TO APPLY (stepper) ================= */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Hiring Process" title="Simple, fast" accent="and fair." />
          <div className="relative mt-14 grid gap-8 md:grid-cols-4">
            <Reveal variant="left" className="absolute left-[12%] right-[12%] top-7 hidden h-0.5 origin-left bg-gradient-to-r from-gold-400 via-navy-300 to-gold-400 md:block">
              <span />
            </Reveal>
            {steps.map((s, i) => (
              <Reveal key={s.title} variant="zoom" delay={0.15 * i} className="relative text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border-2 border-gold-400 bg-navy-700 font-serif text-xl font-semibold text-gold-300 shadow-lg shadow-navy-950/25">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-serif text-xl font-semibold text-navy-800">{s.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= APPLY FORM ================= */}
      <section id="apply" className="scroll-mt-28 navy-pattern relative overflow-hidden py-16 text-white md:py-24">
        <div aria-hidden className="blob absolute -right-20 top-10 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <Reveal variant="left">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400">Apply</p>
            <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight md:text-5xl">
              Ready to join <span className="italic text-gold-400">our team?</span>
            </h2>
            <p className="mt-5 text-base leading-7 text-white/75">
              Complete the form and press send. Your email app opens with everything filled in — just
              attach your CV and cover letter.
            </p>
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.06] p-5 text-sm text-white/80">
              Prefer email? Write to <a href={`mailto:${HR_EMAIL}`} className="font-bold text-gold-300 underline-offset-4 hover:underline">{HR_EMAIL}</a>
            </div>
          </Reveal>

          <Reveal variant="right">
            <form onSubmit={submit} className="grid gap-4 rounded-3xl bg-white p-7 text-slate-900 shadow-2xl sm:grid-cols-2 sm:p-9">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">Full Name</span>
                <input required value={form.name} onChange={set("name")} className={field} placeholder="e.g. Ali Ahmed" />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">Phone</span>
                <input required value={form.phone} onChange={set("phone")} className={field} placeholder="03XX XXXXXXX" />
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">Position</span>
                <select value={form.position} onChange={set("position")} className={field}>
                  {JOBS.map((j) => (
                    <option key={j.id}>{j.title}</option>
                  ))}
                  <option>General Application</option>
                </select>
              </label>
              <label className="block sm:col-span-2">
                <span className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-navy-700">About You</span>
                <textarea
                  required
                  value={form.message}
                  onChange={set("message")}
                  className={`${field} min-h-[130px]`}
                  placeholder="Briefly describe your experience, qualifications and why you want to join Pathways."
                />
              </label>
              <button
                type="submit"
                className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-8 py-4 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25 transition hover:from-gold-300 hover:to-gold-400 sm:col-span-2 sm:w-fit"
              >
                Send Application <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="FAQs" title="Good to" accent="know." />
          <div className="mt-10 space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <Reveal key={f.q} variant="up" delay={i * 0.08}>
                  <div className={`overflow-hidden rounded-2xl border transition ${open ? "border-gold-300 bg-white shadow-lg" : "border-slate-100 bg-white/60"}`}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                      <span className="text-base font-bold text-navy-800">{f.q}</span>
                      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg font-bold transition duration-300 ${open ? "rotate-45 bg-gold-500 text-navy-900" : "bg-navy-700 text-gold-400"}`}>+</span>
                    </button>
                    <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="px-6 pb-5 text-sm leading-7 text-slate-600">{f.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
