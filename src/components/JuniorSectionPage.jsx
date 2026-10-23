import React from "react";

// Pathways International School — Junior Section Page
// Matches your screenshot layout:
// - Hero/banner with title + short line on image
// - Main content: text left, photo right
// - Junior Section Team (grid of profiles)
// TailwindCSS required.

const team = [
  {
    name: "Sehr Ali",
    title: "Director of Planning and Coordination",
    image: "/images/junior/team-sehr.jpg",
  },
  {
    name: "Maria Umar",
    title: "Academic Coordinator",
    image: "/images/junior/team-maria.jpg",
  },
  {
    name: "Subhi Naqvi",
    title: "Junior Academic Adviser",
    image: "/images/junior/team-subhi.jpg",
  },
  {
    name: "Saba Husain",
    title: "Administrative Coordinator",
    image: "/images/junior/team-saba.jpg",
  },
  {
    name: "[Team Member 5]",
    title: "[Role / Title]",
    image: "/images/junior/team-5.jpg",
  },
  {
    name: "[Team Member 6]",
    title: "[Role / Title]",
    image: "/images/junior/team-6.jpg",
  },
];

export default function JuniorSectionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO */}
      <header className="relative">
        <div className="relative h-[280px] md:h-[390px] overflow-hidden">
          <img
            src="/juniorstudents.webp"
            alt="Junior Section"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl items-start px-4 pt-10 md:pt-14">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-semibold text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  Pathways International School
                </p>
                <h1 className="mt-4 font-serif text-4xl md:text-6xl text-white">
                  Junior Section
                </h1>
                <p className="mt-3 text-sm md:text-lg text-white/90 leading-6">
                  Students acquire knowledge, skills, habits and ideals that will serve as the foundation of learning and
                  character through their lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* INTRO CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-12 md:gap-10 md:p-10">
          {/* Text */}
          <div className="md:col-span-7">
            <div className="space-y-4 text-sm md:text-base leading-7 text-slate-700">
              <p>
                At <span className="font-semibold text-slate-900">Pathways International School</span>, the Junior
                Section nurtures curiosity, creativity, and critical thinking. We encourage students to grow, explore, and
                thrive through a balanced academic and co-curricular experience.
              </p>
              <p>
                Throughout the year, students participate in a diverse range of activities that promote holistic
                development. Our educators design learning experiences that are engaging, enriching, and tailored to
                individual needs.
              </p>
              <p>
                We support our teachers through professional development, reflective feedback, and collaborative
                guidance—so students benefit from innovative strategies and best practices.
              </p>
              <p>
                Our curriculum helps students become confident, independent learners, equipped with knowledge, skills,
                and adaptability for future success.
              </p>
              <p className="font-semibold text-emerald-800">
                “Together, we inspire excellence, foster growth, and nurture the leaders of tomorrow.”
              </p>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="/admissions"
                className="rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                Admissions
              </a>
              <a
                href="/contact"
                className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm">
              <img
                src="/juniorstudents.webp"
                alt="Junior students activity"
                className="h-80 w-full object-cover md:h-[520px] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="text-sm font-semibold text-white">Learning with confidence</p>
                <p className="text-xs text-white/90">Curiosity • Creativity • Character</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900">Junior Section Team</h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-600" />
        </div>

        <div className="mt-10 grid gap-7 sm:grid-cols-2 md:grid-cols-4">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200"
            >
              <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-emerald-200">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold text-slate-900">{m.name}</h3>
              <p className="mt-1 text-xs text-slate-600">{m.title}</p>
              <div className="mx-auto mt-4 h-px w-14 bg-emerald-200" />
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Supporting student growth through strong academics, guidance, and a nurturing environment.
              </p>
            </div>
          ))}
        </div>
      </section>

      
    </main>
  );
}
