import React from "react";

// Pathways International School — Early Years Page
// Replicates the feel of your screenshots:
// 1) "We've got fun covered!" collage grid
// 2) "Our Programs" + Nursery section (centered heading + age + paragraph + image row)
// 3) Kindergarten hero banner + two-column section with image + text
// TailwindCSS required.

const funPhotos = [
  { src: "/artactivity.webp", alt: "Art activity" },
  { src: "/outdooractivity.webp", alt: "Outdoor play" },
  { src: "/happystudent.webp", alt: "Happy student" },
  { src: "/sandplay.webp", alt: "Sand play" },
  { src: "/groupactivity.webp", alt: "Group activity" },
  { src: "/stageperformance.webp", alt: "Stage performance" },
  { src: "/craftwork.webp", alt: "Craft work" },
];

export default function EarlyYearsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* =====================
          SECTION: FUN COVERED
          ===================== */}
      <section className="mx-auto max-w-7xl px-4 pt-12 md:pt-16">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl tracking-tight text-slate-900">
            We&apos;ve got fun covered!
          </h2>
          <p className="mt-4 text-sm md:text-base text-slate-600 max-w-2xl mx-auto">
            In Early Years at Pathways International School, children learn through play, exploration, and hands-on
            experiences that build confidence, curiosity, and joy.
          </p>
          <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-emerald-600" />
        </div>

        {/* Collage grid (like screenshot) */}
        <div className="mt-10 grid grid-cols-12 gap-4">
          {/* Top row (4 images) */}
          <div className="col-span-12 md:col-span-3">
            <PhotoCard photo={funPhotos[0]} className="h-56 md:h-64" />
          </div>
          <div className="col-span-12 md:col-span-3">
            <PhotoCard photo={funPhotos[1]} className="h-56 md:h-64" />
          </div>
          <div className="col-span-12 md:col-span-4">
            <PhotoCard photo={funPhotos[2]} className="h-56 md:h-64" />
          </div>
          <div className="col-span-12 md:col-span-2">
            <PhotoCard photo={funPhotos[3]} className="h-56 md:h-64" />
          </div>

          {/* Bottom row (3 images) */}
          <div className="col-span-12 md:col-span-5">
            <PhotoCard photo={funPhotos[4]} className="h-56 md:h-60" />
          </div>
          <div className="col-span-12 md:col-span-4">
            <PhotoCard photo={funPhotos[5]} className="h-56 md:h-60" />
          </div>
          <div className="col-span-12 md:col-span-3">
            <PhotoCard photo={funPhotos[6]} className="h-56 md:h-60" />
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <InfoMini
            title="Nursery (2.4 – 3.3 years)"
            text="Children begin their school journey with gentle routines, playful learning, social connection, and creativity—laying the foundation for confident growth."
          />
          <InfoMini
            title="Kindergarten (3.4 – 5.3 years)"
            text="As children grow, we strengthen early literacy and numeracy through theme-based activities, hands-on learning, and guided discovery."
          />
        </div>
      </section>

      {/* =====================
          SECTION: OUR PROGRAMS / NURSERY
          ===================== */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-18">
        <div className="text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-slate-900">Our Programs</h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-emerald-600" />
        </div>

        <div className="mt-12 mx-auto max-w-4xl text-center">
          {/* Center image */}
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm">
            <img
              src="/nurserystudent.webp"
              alt="Nursery students"
              className="h-64 w-full object-cover"
            />
          </div>

          <h3 className="mt-10 font-serif text-4xl md:text-5xl text-slate-900">Nursery</h3>
          <p className="mt-2 text-sm md:text-base text-slate-600">(2.4 – 3.3 years)</p>

          <p className="mt-6 text-sm md:text-base leading-7 text-slate-700">
            Our Nursery is a cheerful and safe space thoughtfully designed to provide a fun-filled learning experience.
            Children are gently introduced to school routines in a secure, stimulating environment. They explore
            creativity, build social connections, and develop early skills that support their growth and prepare them for
            the next stage.
          </p>

          {/* Bottom images row */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm">
              <img
                src="/nursaryactivity.webp"
                alt="Nursery activity"
                className="h-64 w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200 shadow-sm">
              <img
                src="/nurserycraft.webp"
                alt="Nursery craft"
                className="h-64 w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================
          SECTION: KINDERGARTEN HERO + CONTENT
          ===================== */}
      <header className="relative">
        <div className="relative h-[280px] md:h-[380px] overflow-hidden">
          <img
            src="/juniorstudents.webp"
            alt="Kindergarten classroom"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-transparent" />

          <div className="absolute inset-0">
            <div className="mx-auto flex h-full max-w-7xl items-center px-4">
              <div className="max-w-2xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-semibold text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  Early Years
                </p>
                <h2 className="mt-4 text-4xl md:text-6xl font-serif text-white">Kindergarten Section</h2>
                <p className="mt-3 text-sm md:text-lg text-white/90 leading-6">
                  Students acquire knowledge, skills, habits and ideals that will serve as the foundation of learning and
                  character throughout their lives.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 md:grid-cols-12 md:p-10">
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200">
              <img
                src="/teacherwithstudents.webp"
                alt="Teacher with students"
                className="h-80 w-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-7 flex flex-col justify-center">
            <p className="text-slate-600 text-sm md:text-base">
              The early years are by far the most important in a child’s life as far as learning goes.
            </p>
            <div className="mt-6 space-y-4 text-sm md:text-base leading-7 text-slate-700">
              <p>
                When children first join Pathways International School, they come with unique personalities and learning
                styles. Some are chatty, some are shy, and some take time to feel comfortable.
              </p>
              <p>
                Our role is to nurture confidence, communication, and independence—while building strong early literacy
                and numeracy. Through play-based routines and purposeful activities, children learn to express ideas,
                collaborate with peers, and develop a love for learning.
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
        </div>
      </section>

      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} Pathways International School. All rights reserved.
      </footer>
    </main>
  );
}

function PhotoCard({ photo, className = "h-60" }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ring-1 ring-slate-200 shadow-sm ${className}`}>
      <img
        src={photo.src}
        alt={photo.alt}
        className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
    </div>
  );
}

function InfoMini({ title, text }) {
  return (
    <div className="rounded-3xl bg-emerald-50 p-6 ring-1 ring-emerald-100">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-10 w-10 rounded-2xl bg-emerald-100 ring-1 ring-emerald-200 flex items-center justify-center">
          <span className="h-3 w-3 rounded-full bg-emerald-600" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-700">{text}</p>
        </div>
      </div>
    </div>
  );
}
