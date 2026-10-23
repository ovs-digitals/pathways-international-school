import React from "react";

// Pathways International School — Beyond the Classroom Page
// Professional layout with alternating image/text sections
// Sections:
// 1) Community Service
// 2) Excursions & Field Trips
// 3) Sports
// 4) Beyond the Classroom (closing section)
// TailwindCSS required

const sections = [
  {
    title: "Community Service",
    description: `At Pathways International School, we are committed to nurturing empathy, compassion, and social responsibility at every level. Our students actively contribute their time and efforts through meaningful initiatives including charity drives, awareness campaigns, and outreach programs.

Through structured community service programs, students engage with partner organizations, participate in literacy and welfare projects, and gain exposure to real-world challenges. These experiences foster leadership, civic responsibility, and a deep understanding of social impact.` ,
    image: "/community.webp",
    reverse: false,
  },
  {
    title: "Excursions & Field Trips",
    description: `We offer students enriching opportunities to explore learning beyond the classroom through carefully curated visits and educational trips. From local heritage sites to international experiences, these excursions broaden perspectives and encourage experiential learning.

Field trips strengthen classroom concepts while building teamwork, independence, and confidence. Students benefit not only academically but socially, as shared experiences create lasting bonds and meaningful memories.` ,
    image: "/outdooractivity.webp",
    reverse: true,
  },
  {
    title: "Sports",
    description: `Sports play a vital role in holistic development at Pathways International School. We promote physical fitness, discipline, and teamwork through structured sports programs and competitive events.

Students participate in a variety of sports including futsal, basketball, cricket, athletics, and more. Regular competitions and school-wide sporting events cultivate resilience, leadership, and a spirit of healthy competition.` ,
    image: "/sports.webp",
    reverse: false,
  },
];

export default function BeyondClassroomPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO */}
      <header className="relative">
        <div className="relative h-[320px] md:h-[420px] overflow-hidden">
          <img
            src="/images/beyond/hero.jpg"
            alt="Beyond the Classroom"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto max-w-7xl px-4">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-semibold text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  Pathways International School
                </p>
                <h1 className="mt-4 font-serif text-4xl md:text-6xl text-white">
                  Beyond the Classroom
                </h1>
                <p className="mt-4 text-sm md:text-lg text-white/90 leading-6">
                  Stretching horizons, building character, and inspiring lifelong growth through meaningful experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT SECTIONS */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-20 space-y-20">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`grid items-center gap-10 md:grid-cols-12 ${
              section.reverse ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`md:col-span-6 ${
                section.reverse ? "md:order-2" : "md:order-1"
              }`}
            >
              <div className="relative overflow-hidden rounded-3xl shadow-lg ring-1 ring-slate-200">
                <img
                  src={section.image}
                  alt={section.title}
                  className="h-80 w-full object-cover md:h-[420px] hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>

            {/* Text */}
            <div
              className={`md:col-span-6 ${
                section.reverse ? "md:order-1" : "md:order-2"
              }`}
            >
              <h2 className="font-serif text-3xl md:text-5xl text-slate-900">
                {section.title}
              </h2>
              <div className="mt-4 h-1 w-20 bg-emerald-600 rounded-full" />
              <p className="mt-6 whitespace-pre-line text-sm md:text-base leading-7 text-slate-700">
                {section.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Closing Section */}
      <section className="bg-emerald-700 py-16 text-white text-center">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="font-serif text-3xl md:text-5xl">
            Learning Beyond Limits
          </h2>
          <p className="mt-6 text-emerald-100 leading-7 text-sm md:text-base">
            At Pathways International School, education extends far beyond textbooks. Through community engagement,
            exploration, sports, and cultural enrichment, we prepare students to become confident, compassionate, and
            capable leaders of tomorrow.
          </p>
        </div>
      </section>

      
    </main>
  );
}
