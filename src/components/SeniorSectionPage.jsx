import React from "react";

// Pathways International School — Senior Section Page
// Matches your screenshot layout:
// - Hero banner with title + short line
// - Intro section: text left, image right
// - Senior Section Team: 3 cards on first row, 1 on second row (left) like sample
// TailwindCSS required.

const teamTopRow = [
  {
    name: "Uzma Yahya",
    title: "Director Studies",
    image: "/images/senior/team-uzma.jpg",
  },
  {
    name: "Seemeen Aman",
    title: "Coordinator Student Affairs",
    image: "/images/senior/team-seemeen.jpg",
  },
  {
    name: "Zarqa Khalid",
    title: "Coordinator Administrative Affairs",
    image: "/images/senior/team-zarqa.jpg",
  },
];

const teamBottomRow = [
  {
    name: "Rabiya Salman",
    title: "Administrative Manager",
    image: "/images/senior/team-rabiya.jpg",
  },
];

export default function SeniorSectionPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO */}
      <header className="relative">
        <div className="relative h-[280px] md:h-[390px] overflow-hidden">
          <img
            src="/community.webp"
            alt="Senior Section"
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
                  Senior Section
                </h1>
                <p className="mt-3 text-sm md:text-lg text-white/90 leading-6">
                  We maintain high expectations and offer a quality education.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-12 md:gap-10 md:p-10">
          {/* Text */}
          <div className="md:col-span-7">
            <div className="space-y-4 text-sm md:text-base leading-7 text-slate-700">
              <p>
                <span className="font-semibold text-slate-900">Building a foundation for a lifelong journey of learning.</span>
              </p>
              <p>
                At Pathways International School, the Senior Section develops students into confident young adults who
                strive to attain the highest standards in their endeavours. Our approach places students at the centre of
                the learning experience, guided by a genuine passion and commitment to their growth.
              </p>
              <p>
                These years have the greatest impact on a student’s future. We help students master essential skills and
                develop strong character through academic rigor, mentorship, and purposeful opportunities.
              </p>
              <p>
                Our rigorous programs and enrichment activities, along with a supportive environment, allow students to
                discover what they enjoy and pursue their goals.
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
                src="/seniorstudents.webp"
                alt="Senior students activity"
                className="h-80 w-full object-cover md:h-[520px] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="text-sm font-semibold text-white">Leadership in action</p>
                <p className="text-xs text-white/90">Excellence • Confidence • Growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-5xl text-slate-900">Senior Section Team</h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-600" />
        </div>

        {/* Top row: 3 members */}
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          {teamTopRow.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </div>

        {/* Bottom row: 1 member aligned to left (like screenshot) */}
        <div className="mt-10 grid gap-7 md:grid-cols-3">
          <TeamCard member={teamBottomRow[0]} />
          <div className="hidden md:block" />
          <div className="hidden md:block" />
        </div>
      </section>

      
    </main>
  );
}

function TeamCard({ member }) {
  return (
    <div className="rounded-3xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-200">
      <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-2 ring-emerald-200">
        <img src={member.image} alt={member.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="mt-5 font-serif text-xl font-bold text-slate-900">{member.name}</h3>
      <p className="mt-1 text-xs text-slate-600">{member.title}</p>
      <div className="mx-auto mt-4 h-px w-14 bg-emerald-200" />
      <p className="mt-4 text-sm leading-6 text-slate-700">
        Supporting students through strong academics, guidance, and a positive school culture.
      </p>
    </div>
  );
}
