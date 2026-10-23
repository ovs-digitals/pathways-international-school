import { PageHero } from "./Motion";

/* About → Accreditation & Affiliations — calm, airy rows */
const ITEMS = [
  {
    logo: "partners/punjab.webp", note: "EMIS 341525675 (Female) · 341525697 (Male)",
    title: "School Education Department, Punjab", sub: "Registered / Recognised School",
    text: "Registered with the School Education Department, Government of Punjab, ensuring compliance with required academic, administrative and institutional standards.",
  },
  {
    logo: "partners/pearson-edexcel.webp", mono: true, note: "Approved Online Centre 97911",
    title: "Pearson Edexcel", sub: "Approved Online Centre",
    text: "We are an approved Pearson Edexcel online centre, authorised to deliver internationally recognised qualifications. This approval ensures that our academic delivery, assessment standards and operational processes meet global benchmarks.",
  },
  {
    logo: "partners/olevels.webp", note: "Pearson Edexcel Approved Online Centre 96933",
    title: "OLevels Virtual School", sub: "Complete K12 School for the Whole Family",
    text: "Through our collaboration with OLevels Virtual School we offer structured academic pathways for Early Years, iPrimary, iSecondary, IGCSE and International A Levels, ensuring continuity, quality teaching and academic excellence.",
  },
  {
    logo: "partners/bc-logo.webp", note: "",
    title: "British Council", sub: "Affiliation & Engagement",
    text: "Our association with the British Council reflects our commitment to quality education, global best practices and internationally aligned teaching and learning approaches.",
  },
  {
    logo: "partners/auspak-intl.webp", note: "",
    title: "AusPak International", sub: "International Education & Student Support Partner",
    text: "AusPak International supports our international outreach, student facilitation and global education services, helping learners access opportunities across multiple education systems.",
  },
  {
    logo: "partners/ucas.webp", note: "",
    title: "UCAS", sub: "Approved Centre · Universities and Colleges Admissions Service, UK",
    text: "As a UCAS-approved centre, we support students with official guidance and processes for UK university applications. This affiliation enables our learners to confidently apply to top universities in the UK and beyond.",
  },
];

export default function AccreditationPage() {
  return (
    <main className="bg-white text-slate-900">
      <PageHero eyebrow="About Pathways" title="Accreditation &" accent="Affiliations" image="hero-students.webp" pos="50% 45%"
        text="Recognised in Pakistan and connected worldwide — the bodies and partners that stand behind a Pathways education." />

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">Six names. One standard.</p>
            <h2 className="mt-3 text-3xl font-bold leading-tight text-navy-900 md:text-4xl">Recognised by the people who set the standard</h2>
            <span className="gold-rule mt-6" />
          </div>

          <div className="mt-16 space-y-20">
            {ITEMS.map((it, i) => (
              <article key={it.title} className={`grid items-center gap-8 md:gap-14 ${i % 2 ? "md:grid-cols-[1fr_260px]" : "md:grid-cols-[260px_1fr]"}`}>
                <div className={`flex flex-col items-center ${i % 2 ? "md:order-last" : ""}`}>
                  <div className="grid h-44 w-full place-items-center rounded-[2rem] bg-[#f6f8fc] p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy-950/10">
                    <img src={it.logo} alt={`${it.title} logo`} className={`max-h-24 max-w-full object-contain ${it.mono ? "brightness-0 opacity-85" : ""}`} loading="lazy" />
                  </div>
                  {it.note && <p className="mt-3 text-center text-xs font-medium text-slate-400">{it.note}</p>}
                </div>
                <div>
                  <p className="font-serif text-5xl font-semibold leading-none text-gold-200">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-2xl font-bold text-navy-900">{it.title}</h3>
                  <p className="mt-2 inline-flex rounded-full bg-gold-50 px-3 py-1 text-xs font-semibold text-gold-800">{it.sub}</p>
                  <p className="mt-4 max-w-xl text-base leading-8 text-slate-600">{it.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}