import React from "react";

// Pathways International School — Curriculum Overview Page
// TailwindCSS required.
// Replace image paths and copy with your final content.

export default function CurriculumOverviewPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO */}
      <header className="relative">
        {/* Background image */}
        <div className="relative h-[320px] md:h-[420px] overflow-hidden">
          <img
            src="/curriculam.webp"
            alt="Students learning at Pathways International School"
            className="h-full w-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />

          {/* Hero content */}
          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl items-end px-4 pb-10 md:pb-14">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-green-100/90 px-3 py-1 text-xs font-semibold text-green-900">
                  <span className="h-2 w-2 rounded-full bg-green-600" />
                  Pathways International School
                </p>
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
                  Curriculum Overview
                </h1>
                <p className="mt-3 text-sm leading-6 text-white/90 md:text-base">
                  When schools hold and enforce high expectations, students respond.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-12 md:gap-10 md:p-10">
          {/* Left: Text */}
          <div className="md:col-span-7">
            <div className="space-y-5 text-sm leading-7 text-slate-700 md:text-base">
              <p>
                At <span className="font-semibold text-slate-900">Pathways International School</span>, our curriculum
                is designed to deliver high-quality academics with a strong focus on character, communication, and
                confidence. We believe learning should be meaningful—building skills that support students both inside
                and outside the classroom.
              </p>

              <p>
                Our approach encourages curiosity, critical thinking, creativity, and collaboration. Students engage in a
                balanced learning experience that blends core subject mastery with real-world connections.
              </p>

              <p>
                From the early years to upper grades, we offer a structured pathway that supports academic progress,
                personal growth, and leadership development. Technology, project-based learning, and continuous feedback
                help students stay motivated and future-ready.
              </p>

              <p>
                Beyond academics, we nurture essential life skills such as self-management, teamwork, resilience, and a
                positive “can-do” mindset—preparing students for higher education and a successful life.
              </p>
            </div>

            {/* Small highlights */}
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Strong academic foundation",
                "Critical thinking & problem-solving",
                "Communication & confidence",
                "Character and values-based learning",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-green-50 p-4 ring-1 ring-green-100"
                >
                  <div className="mt-1 h-8 w-8 rounded-xl bg-green-100 ring-1 ring-green-200 flex items-center justify-center">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
                  </div>
                  <p className="text-sm font-medium text-slate-800">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/application-process"
                className="rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Admissions
              </a>
              <a
                href="/contact"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-green-800 ring-1 ring-green-200 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-300"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Right: Image */}
          <div className="md:col-span-5">
            <div className="relative overflow-hidden rounded-3xl bg-slate-100 ring-1 ring-slate-200">
              <img
                src="/cuuriculam_side.webp"
                alt="Student engaged in hands-on learning"
                className="h-80 w-full object-cover md:h-[520px]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                <p className="text-sm font-semibold text-white">Learning by doing</p>
                <p className="text-xs text-white/90">Hands-on activities that build skills & confidence</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700 ring-1 ring-slate-200">
              <p className="font-semibold text-slate-900">Quick edit</p>
              <p className="mt-1">
                Replace images:
                <span className="ml-2 font-mono text-xs">/images/curriculum/hero.jpg</span> and
                <span className="ml-2 font-mono text-xs">/images/curriculum/side.jpg</span>
              </p>
            </div>
          </div>
        </div>
      </section>

     
    </main>
  );
}
