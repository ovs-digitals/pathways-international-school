export default function EarlyYearsInformationPage() {
  const pathways = [
    "Cambridge International Early Years",
    "Pearson Edexcel UK iPrimary and iSecondary",
    "Cambridge Pre-IGCSE, IGCSE, O Levels, and A Levels",
    "Pearson Edexcel IGCSE and International A Levels",
  ];

  const curriculumAreas = [
    "Communication, language & literacy",
    "Mathematics",
    "Creative expression",
    "Personal, social & emotional development",
    "Physical development (Aerobic exercise)",
    "Understanding the world",
    "Urdu language & literacy",
    "Islamic Education",
  ];

  const programmes = [
    {
      code: "EY1",
      title: "Nursery",
      age: "Ages 3 to 3.5",
      description:
        "A warm, nurturing start built around structured play, guided exploration, storytelling, sensory activities, music, movement, and hands-on learning.",
      outcome:
        "Children begin building confidence, curiosity, independence, communication skills, creativity, coordination, and early numeracy awareness.",
    },
    {
      code: "EY2",
      title: "Lower KG",
      age: "Ages 3.5 to 4",
      description:
        "A more structured yet engaging stage that strengthens early literacy, numeracy, communication, and social development through purposeful play.",
      outcome:
        "Students develop stronger language skills, reading readiness, number understanding, problem-solving ability, and active participation.",
    },
    {
      code: "EY3",
      title: "Upper KG",
      age: "Ages 4.5 to 5",
      description:
        "A school-readiness stage designed to consolidate foundational learning and prepare children for a confident transition into formal iPrimary education.",
      outcome:
        "Learners move from early exploration to guided academic readiness with stronger literacy, numeracy, communication, and independent learning habits.",
    },
  ];

  const accreditations = [
    {
      title: "UK Registered Company",
      detail: "Registered company structure supporting transparency, compliance, and international credibility.",
      badge: "Company Registration",
    },
    {
      title: "Pearson Edexcel Approved Centre",
      detail: "Centre No. 97911",
      badge: "Pearson Edexcel",
    },
    {
      title: "Sharjah Research, Technology and Innovation Park",
      detail: "Licensed education entity in the United Arab Emirates.",
      badge: "SRTIP Licensed",
    },
    {
      title: "Cambridge International Education",
      detail: "Internationally recognised academic pathways from Early Years onward.",
      badge: "Cambridge",
    },
    {
      title: "British Council Affiliation",
      detail: "Commitment to international education standards and best practices.",
      badge: "British Council",
    },
    {
      title: "UCAS Approved Centre",
      detail: "Approved Centre Number: 44041",
      badge: "UCAS",
    },
  ];

  const feeRows = [
    {
      programme: "Early Year-1 to Early Year-3",
      admission: "PKR 30,000",
      monthly: "PKR 25,000",
    },
  ];

  const contacts = [
    { label: "UK", value: "+44 7462 296681" },
    { label: "PAK", value: "+92 327 7771 123" },
  ];

  const websites = ["pathwaysinternationalschool.edu.pk"];

  const socialLinks = ["Facebook", "Instagram", "LinkedIn", "YouTube"];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-white blur-3xl" />
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-lime-200 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-emerald-200 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                Pathways International School • Cambridge International Early Years
              </div>
              <h1 className="max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                Early Years Education Information Page
              </h1>
              <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50 md:text-lg">
                A clean, parent-friendly overview of Pathways International School Cambridge International Early Years programmes,
                designed to present Nursery, Lower KG, and Upper KG in a modern blue and white website theme.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#programmes"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow-lg shadow-emerald-950/20 transition hover:-translate-y-0.5"
                >
                  Explore Programmes
                </a>
                <a
                  href="#contact"
                  className="rounded-2xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
                >
                  Contact Admissions
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {programmes.map((item) => (
                <div
                  key={item.code}
                  className="rounded-3xl border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-100">
                    {item.code}
                  </div>
                  <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
                  <p className="mt-1 text-sm text-emerald-100">{item.age}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm">
            <div className="mb-4 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
              Introduction
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              International early education with a strong academic foundation
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              Pathways International School is presented as a Pearson Edexcel-approved
              K–12 institution with local and international recognition. Its Early Years stream is
              designed to nurture curiosity, confidence, creativity, and essential early literacy and numeracy
              skills through carefully structured learning models.
            </p>
          </div>

          <div className="rounded-[2rem] bg-emerald-50 p-8">
            <div className="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              Academic Pathways
            </div>
            <div className="space-y-3">
              {pathways.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-emerald-100 bg-white px-4 py-4 text-sm font-medium text-slate-700 shadow-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="programmes" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              Our Programmes
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Three stages of Cambridge Early Years learning
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-600">
              Each level supports age-appropriate development through guided activities, purposeful play,
              communication building, numeracy readiness, creativity, and personal growth.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {programmes.map((item) => (
              <article
                key={item.code}
                className="group rounded-[2rem] border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="inline-flex rounded-2xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white">
                  {item.code}
                </div>
                <h3 className="mt-5 text-2xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm font-medium text-emerald-700">{item.age}</p>
                <p className="mt-5 text-sm leading-7 text-slate-600">{item.description}</p>
                <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm leading-7 text-slate-700">
                  {item.outcome}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] bg-emerald-700 p-8 text-white shadow-xl">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50">
              Curriculum Areas
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Holistic learning across key development areas
            </h2>
            <p className="mt-4 text-base leading-8 text-emerald-50">
              The curriculum is structured to help children make connections across multiple areas of learning,
              supporting both academic growth and personal development.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {curriculumAreas.map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-3 w-3 rounded-full bg-emerald-500" />
                  <p className="text-sm font-semibold leading-7 text-slate-700">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
              Accreditation & Affiliations
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Built on trust, recognition, and international standards
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {accreditations.map((item) => (
              <div key={item.title} className="rounded-[2rem] border border-emerald-100 bg-white p-6 shadow-sm">
                <div className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-emerald-800">
                  {item.badge}
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
              Fee Structure
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">Simple fee overview</h2>
            <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200">
              <div className="grid grid-cols-3 bg-emerald-700 text-center text-sm font-semibold text-white">
                <div className="px-3 py-4">Programme</div>
                <div className="px-3 py-4">Admission Fee</div>
                <div className="px-3 py-4">Monthly Fee</div>
              </div>
              {feeRows.map((row) => (
                <div key={row.programme} className="grid grid-cols-3 border-t border-slate-200 bg-white text-center text-sm text-slate-700">
                  <div className="px-3 py-4 font-semibold">{row.programme}</div>
                  <div className="px-3 py-4">{row.admission}</div>
                  <div className="px-3 py-4">{row.monthly}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-emerald-700 to-green-800 p-8 text-white shadow-xl">
            <div className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-50">
              Why Parents Choose Pathways
            </div>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-emerald-50">
              <li>Structured learning with age-appropriate teaching approaches</li>
              <li>International pathways that continue beyond Early Years</li>
              <li>Focus on literacy, numeracy, confidence, creativity, and well-being</li>
              <li>British curriculum positioning with recognised affiliations</li>
              <li>Clear progression from EY1 to EY3 before transition to iPrimary</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-slate-900 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
            <div>
              <div className="inline-flex rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-semibold text-emerald-200">
                Contact Us
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Your international classroom is waiting for you
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
                Book a free consultation with an academic advisor and learn more about admissions,
                programme fit, and the best pathway for your child.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                {contacts.map((item) => (
                  <div key={item.label} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-bold">Websites</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  {websites.map((site) => (
                    <p key={site}>{site}</p>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
                <h3 className="text-lg font-bold">Follow Us</h3>
                <div className="mt-4 space-y-3 text-sm text-slate-300">
                  {socialLinks.map((item) => (
                    <p key={item}>{item}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
