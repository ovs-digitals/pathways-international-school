import React, { useMemo, useState } from "react";

// Pathways International School — School Events Page
// Professional layout inspired by your screenshot:
// - Hero banner with title + subtitle
// - Filter tabs (All / Campus / Event)
// - Responsive masonry-like grid of event cards
// TailwindCSS required.

const EVENTS = [
  {
    id: 1,
    title: "Early Years Celebration",
    category: "Event",
    date: "2026-02-10",
    location: "Main Campus",
    image: "/images/events/event-1.jpg",
    excerpt: "A joyful celebration of learning through play, costumes, and creativity.",
  },
  {
    id: 2,
    title: "Spirit Day",
    category: "Event",
    date: "2026-01-22",
    location: "Main Campus",
    image: "/images/events/event-2.jpg",
    excerpt: "Students showcased school spirit with fun themes, teamwork, and performances.",
  },
  {
    id: 3,
    title: "Sports & Achievement Ceremony",
    category: "Campus",
    date: "2026-02-02",
    location: "Sports Ground",
    image: "/images/events/event-3.jpg",
    excerpt: "Celebrating participation, sportsmanship, and outstanding achievements.",
  },
  {
    id: 4,
    title: "Science Week",
    category: "Campus",
    date: "2026-01-12",
    location: "Science Lab",
    image: "/images/events/event-4.jpg",
    excerpt: "Hands-on experiments and discovery sessions to spark curiosity.",
  },
  {
    id: 5,
    title: "Art & Craft Showcase",
    category: "Event",
    date: "2025-12-18",
    location: "Auditorium",
    image: "/images/events/event-5.jpg",
    excerpt: "A gallery of student work highlighting imagination and skill.",
  },
  {
    id: 6,
    title: "Community Day",
    category: "Campus",
    date: "2025-12-05",
    location: "Campus Grounds",
    image: "/images/events/event-6.jpg",
    excerpt: "Building strong bonds through community engagement and shared moments.",
  },
];

function formatDate(iso) {
  // Simple formatter (no libraries)
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function SchoolEventsPage() {
  const [active, setActive] = useState("All");

  const filtered = useMemo(() => {
    if (active === "All") return EVENTS;
    return EVENTS.filter((e) => e.category === active);
  }, [active]);

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* HERO */}
      <header className="relative">
        <div className="relative h-[320px] md:h-[440px] overflow-hidden">
          <img
            src="/images/events/hero.jpg"
            alt="School Events"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/45" />

          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto w-full max-w-7xl px-4 pb-10 md:pb-14">
              <div className="max-w-3xl">
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100/90 px-3 py-1 text-xs font-semibold text-emerald-900">
                  <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  Pathways International School
                </p>
                <h1 className="mt-4 font-serif text-4xl md:text-6xl text-white">School Events</h1>
                <p className="mt-4 text-sm md:text-lg text-white/90 leading-6">
                  A great way to have fun with classmates, connect with teachers, and create happy memories.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* FILTERS + GRID */}
      <section className="mx-auto max-w-7xl px-4 py-10 md:py-14">
        <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
          {/* Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-4 py-4 md:px-8">
            <div className="flex items-center gap-2">
              <Tab label="All" active={active} onClick={setActive} />
              <Tab label="Campus" active={active} onClick={setActive} />
              <Tab label="Event" active={active} onClick={setActive} />
            </div>

            <div className="text-xs md:text-sm text-slate-600">
              Showing <span className="font-semibold text-slate-900">{filtered.length}</span> item(s)
            </div>
          </div>

          {/* Grid */}
          <div className="p-4 md:p-8">
            {filtered.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-3xl bg-emerald-700 p-7 text-white md:p-10">
          <div className="grid gap-6 md:grid-cols-12 md:items-center">
            <div className="md:col-span-8">
              <h2 className="font-serif text-2xl md:text-3xl">Want to see more?</h2>
              <p className="mt-2 text-sm md:text-base text-emerald-100 leading-6">
                Follow our latest updates and upcoming events. We regularly share highlights from school activities,
                celebrations, trips, and student achievements.
              </p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <div className="flex flex-wrap gap-3 md:justify-end">
                <a
                  href="/contact"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-800 hover:bg-emerald-50"
                >
                  Contact
                </a>
                <a
                  href="/admissions"
                  className="rounded-2xl bg-emerald-900/20 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-emerald-900/30"
                >
                  Admissions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Tab({ label, active, onClick }) {
  const isActive = active === label;
  return (
    <button
      type="button"
      onClick={() => onClick(label)}
      className={
        "rounded-2xl px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-emerald-300 " +
        (isActive
          ? "bg-emerald-700 text-white"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50")
      }
    >
      {label}
    </button>
  );
}

function EventCard({ event }) {
  return (
    <article className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 hover:shadow-md transition-shadow">
      <div className="relative overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-serif text-xl font-bold text-slate-900">{event.title}</h3>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
          <span className="font-semibold text-emerald-800">{formatDate(event.date)}</span>
          <span>•</span>
          <span>{event.location}</span>
        </div>

        <p className="mt-4 text-sm leading-6 text-slate-700">{event.excerpt}</p>

        <div className="mt-5">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            View details
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl bg-slate-50 p-10 text-center ring-1 ring-slate-200">
      <div className="mx-auto h-12 w-12 rounded-2xl bg-emerald-100 ring-1 ring-emerald-200 flex items-center justify-center">
        <span className="h-3 w-3 rounded-full bg-emerald-600" />
      </div>
      <h3 className="mt-4 font-serif text-xl font-bold text-slate-900">No events found</h3>
      <p className="mt-2 text-sm text-slate-600">Try selecting a different category.</p>
    </div>
  );
}
