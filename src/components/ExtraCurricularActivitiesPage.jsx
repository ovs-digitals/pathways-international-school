import React from "react";

// Pathways International School — Extra Curricular Activities Page
// Matches your screenshot layout:
// - Hero banner with title + short line
// - Content section: text left, large image right
// TailwindCSS required

export default function ExtraCurricularActivitiesPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO */}
      <header className="relative">
        <div className="relative h-[300px] md:h-[420px] overflow-hidden">
          <img
            src="/images/eca/hero.jpg"
            alt="Extra Curricular Activities"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-semibold text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  Pathways International School
                </p>
                <h1 className="mt-5 font-serif text-4xl md:text-6xl text-white">
                  Extra Curricular Activities
                </h1>
                <p className="mt-4 text-sm md:text-lg text-white/90 leading-6">
                  We believe education is about opening doors to young minds.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid items-start gap-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-12 md:p-10">
          {/* Text */}
          <div className="md:col-span-7">
            <div className="space-y-5 text-sm md:text-base leading-7 text-slate-700">
              <p>
                We are proud to highlight Pathways International School’s involvement in a wide range of extracurricular
                activities—designed to promote active learning, confidence, teamwork, and personal growth. We aim to
                provide every child with skills needed to thrive in a fast-evolving world.
              </p>

              <p>
                Across our campus, you’ll see the vibrant energy of students engaged in meaningful activities.
                We understand that childhood is a critical period for social development through friendships and play,
                which is just as important as academic progress. Our goal is to deliver a well-rounded education while
                offering diverse opportunities for exploration.
              </p>

              <p>
                Activities may include programs in public speaking, drama, languages, arts & craft, music, science clubs,
                scouting, cooking, robotics, and community initiatives. Students also participate in competitions and
                events that build resilience and a growth mindset.
              </p>

              <p>
                School celebrations, exhibitions, and showcase events provide students with platforms to demonstrate
                their creativity, leadership, and commitment—while adding an element of fun.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
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
            <div className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-lg">
              <img
                src="/stageperformance.webp"
                alt="Students performing"
                className="h-80 w-full object-cover md:h-[560px] hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="text-sm font-semibold text-white">Student showcases</p>
                <p className="text-xs text-white/90">Confidence • Creativity • Community</p>
              </div>
            </div>

            {/* <div className="mt-4 rounded-2xl bg-emerald-50 p-4 text-sm text-slate-700 ring-1 ring-emerald-100">
              <p className="font-semibold text-slate-900">Quick edit</p>
              <p className="mt-1">
                Replace images:
                <span className="ml-2 font-mono text-xs">/images/eca/hero.jpg</span> and
                <span className="ml-2 font-mono text-xs">/images/eca/featured.jpg</span>
              </p>
            </div> */}
          </div>
        </div>
      </section>

      
    </main>
  );
}
