import React from "react";

// O Level Results — React + Tailwind
// This recreates the layout: hero image with heading + short text, then a centered results card.
// Includes an SVG donut chart (editable percentages/colors) so you don't need a pre-made image.

function DonutChart({
  size = 340,
  stroke = 44,
  segments,
  centerLabel = "YOUR SCHOOL",
  centerSub = "O Level Results",
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const startOffset = 0; // we rotate the whole svg -90deg

  let acc = 0;

  return (
    <div className="w-full">
      {/* Legend */}
      <div className="mb-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
            <span className="font-semibold text-slate-700">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mx-auto w-fit">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="block"
          role="img"
          aria-label="O Level results donut chart"
        >
          {/* Rotate so chart starts at top */}
          <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
            {/* Track */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke="rgba(15, 23, 42, 0.08)"
              strokeWidth={stroke}
            />

            {/* Segments */}
            {segments.map((s) => {
              const segLen = (s.value / 100) * c;
              const dasharray = `${segLen} ${c - segLen}`;
              const dashoffset = startOffset - (acc / 100) * c;
              acc += s.value;

              return (
                <circle
                  key={s.label}
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke={s.color}
                  strokeWidth={stroke}
                  strokeLinecap="butt"
                  strokeDasharray={dasharray}
                  strokeDashoffset={dashoffset}
                />
              );
            })}
          </g>

          {/* Center circle */}
          <circle cx={size / 2} cy={size / 2} r={r - stroke / 2 - 8} fill="white" />

          {/* Center text */}
          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-900"
            style={{ fontSize: 26, fontWeight: 800, letterSpacing: 0.5 }}
          >
            {centerLabel}
          </text>
          <text
            x="50%"
            y="58%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-slate-500"
            style={{ fontSize: 12, fontWeight: 600 }}
          >
            {centerSub}
          </text>

          {/* Segment labels (approx positions) */}
          {/* You can remove these if you want a cleaner chart */}
        </svg>

        {/* Percent labels row (simple + clean) */}
        <div className="mt-4 grid grid-cols-3 gap-3 text-center">
          {segments.map((s) => (
            <div key={s.label} className="rounded-2xl bg-slate-50 px-3 py-2 ring-1 ring-slate-200">
              <div className="text-xs font-semibold text-slate-600">{s.label}</div>
              <div className="text-lg font-extrabold" style={{ color: s.color }}>
                {s.value}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OLevelResultsPage() {
  // Edit these values as per your actual results
  const segments = [
    { label: "A* & A", value: 57, color: "#17365D" },
    { label: "B", value: 29, color: "#5479AB" },
    { label: "C", value: 14, color: "#C9A44C" },
  ];

  return (
    <main className="min-h-screen bg-white text-slate-800">
      {/* Hero (image background like your screenshot) */}
      <header className="relative">
        <div className="relative h-[280px] md:h-[360px] overflow-hidden">
          {/* Replace with your hero image */}
          <img
            src="/Results.webp"
            alt="Students"
            className="h-full w-full object-cover"
          />
          {/* <div className="absolute inset-0 bg-black/35" /> */}

        
        </div>
      </header>

      {/* Body */}
      <section className="mx-auto max-w-7xl px-4 pb-14">
        <div className="mx-auto -mt-10 md:-mt-14 max-w-4xl">
          {/* Small intro line */}
          <p className="text-center text-xs md:text-sm text-slate-500">
            We are proud to share our students’ outstanding performance. Congratulations to all students on their
            achievements!
          </p>

          {/* Chart Card */}
          <div className="mt-6 rounded-3xl bg-white shadow-lg ring-1 ring-slate-200 overflow-hidden">
            {/* Top texture / panel (like screenshot) */}
            <div className="bg-[linear-gradient(0deg,rgba(15,23,42,0.06),rgba(15,23,42,0.06))]">
              <div className="px-6 pt-8 md:px-10 md:pt-10">
                <div className="rounded-2xl bg-white p-6 md:p-10 ring-1 ring-slate-200 shadow-sm">
                  <h2 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900">
                    O LEVEL CAIE
                    <span className="block">RESULT 2025</span>
                  </h2>

                  <div className="mt-8">
                    <DonutChart
                      segments={segments}
                      centerLabel="PWIS"
                      centerSub="Pathways International School"
                    />
                  </div>
                </div>
              </div>

              {/* Blue base strip (like screenshot). Change color if you want the brand blue. */}
              <div className="mt-10 h-28 bg-[#17365D]" />
            </div>
          </div>

          {/* Optional CTA */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a
              href="/admissions"
              className="rounded-2xl bg-emerald-700 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              Admissions Open
            </a>
            <a
              href="/contact"
              className="rounded-2xl bg-white px-6 py-3 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200 hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

     
    </main>
  );
}
