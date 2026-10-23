import React from "react";

// Pathways International School — Primary Section Page
// Inspired by your screenshot:
// - Hero banner with heading + short line
// - Content area: text left, photo right
// - Team section with 3 profiles
// - Activities section with image grid
// TailwindCSS required.

const team = [
  {
    name: "[Team Member 1]",
    title: "Primary Coordinator",
    image: "/images/primary/team-1.jpg",
  },
  {
    name: "[Team Member 2]",
    title: "Administrative Coordinator",
    image: "/images/primary/team-2.jpg",
  },
  {
    name: "[Team Member 3]",
    title: "Academic Coordinator",
    image: "/images/primary/team-3.jpg",
  },
];

const activities = [
  { src: "/activity1.webp", alt: "Activity 1" },
  { src: "/activity2.webp", alt: "Activity 2" },
  { src: "/activity3.webp", alt: "Activity 3" },
  { src: "/activity4.webp", alt: "Activity 4" },
  { src: "/activity5.webp", alt: "Activity 5" },
  { src: "/activity6.webp", alt: "Activity 6" },
];

export default function PrimarySectionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO */}
      <header className="relative">
        <div className="relative h-[280px] md:h-[380px] overflow-hidden">
          <img
            src="/teacherwithstudents.webp"
            alt="Primary students"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl items-end px-4 pb-10 md:pb-14">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-semibold text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  Pathways International School
                </p>
                <h1 className="mt-4 font-serif text-4xl md:text-6xl text-white">
                  Primary Section
                </h1>
                <p className="mt-3 text-sm md:text-lg text-white/90 leading-6">
                  These are the years when children acquire the bricks and mortar of a solid education.
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
                At <span className="font-semibold text-slate-900">Pathways International School</span>, the Primary
                Section is designed to make learning meaningful, engaging, and joyful. Our curriculum builds strong
                foundations in literacy, numeracy, and inquiry—while nurturing confidence, character, and communication.
              </p>
              <p>
                Students explore a wide range of learning experiences through classroom activities, co-curricular
                opportunities, and projects that encourage creativity and teamwork. We aim to develop critical thinking
                and problem-solving skills in every child.
              </p>
              <p>
                Our teachers create a safe and caring environment where each learner feels valued and supported. Along
                with academics, we focus on positive habits, values, and social-emotional growth.
              </p>
              <p>
                Through a balance of structured learning and hands-on activities, students grow into responsible,
                independent learners—ready for the next stage of their educational journey.
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
                src="/primaryclassroom.webp"
                alt="Primary classroom activity"
                className="h-80 w-full object-cover md:h-[520px] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="text-sm font-semibold text-white">Learning together</p>
                <p className="text-xs text-white/90">Collaboration • Creativity • Confidence</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900">Primary Section Team</h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-600" />
        </div>

        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {team.map((m) => (
            <div
              key={m.name}
              className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200"
            >
              <div className="mx-auto h-28 w-28 overflow-hidden rounded-full ring-2 ring-emerald-200">
                <img src={m.image} alt={m.name} className="h-full w-full object-cover" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold text-slate-900">{m.name}</h3>
              <p className="mt-1 text-sm text-slate-600">{m.title}</p>
              <div className="mx-auto mt-4 h-px w-16 bg-emerald-200" />
              <p className="mt-4 text-sm leading-6 text-slate-700">
                Dedicated to supporting students’ academic growth, wellbeing, and a positive learning environment.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900">Activities</h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-600" />
          <p className="mt-4 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            Our activities strengthen confidence, teamwork, and creativity—helping students learn beyond textbooks.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
          {activities.map((a) => (
            <div
              key={a.src}
              className="relative overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-sm"
            >
              <img
                src={a.src}
                alt={a.alt}
                className="h-44 w-full object-cover md:h-56 hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          ))}
        </div>
      </section>

      
    </main>
  );
}
