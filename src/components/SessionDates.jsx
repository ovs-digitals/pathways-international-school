import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import { DEFAULT_SERIES, loadSeries } from "./examSeries";

/* British Council registration windows (admin edits them in the portal).
   Compact timeline, used on the exam page, the home page and the programme pages. */
const dmy = (iso) => (iso ? iso.split("-").reverse().join("/") : "TBA");

export function SessionTimeline({ s }) {
  const today = new Date().toISOString().slice(0, 10);
  const stages = s.stages.map((x) => [x.label, x.date]);
  const idx = stages.reduce((k, st, i) => (st[1] && st[1] <= today ? i : k), -1);   // current stage
  const n = stages.length;
  const fill = idx < 0 ? 0 : idx >= n - 1 ? 100 : (idx / (n - 1)) * 100 + 100 / (n - 1) / 2;
  const tba = stages.every((st) => !st[1]);
  const now = tba ? "Dates coming soon" : idx < 0 ? "Opens soon" : idx >= n - 1 ? `Now: ${stages[n - 1][0]}` : `Now: ${stages[idx][0]}${/fee/i.test(stages[idx][0]) ? "" : " fee"}`;
  return (
    <div className="rounded-2xl bg-[#e6eef8] px-4 py-5 sm:px-6">
      <div className="flex flex-wrap items-center justify-center gap-2 text-center">
        <p className="text-sm font-semibold text-navy-800 sm:text-base">{s.title}</p>
        <span className="rounded-full bg-gold-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-900">{now}</span>
      </div>
      <div className="relative mx-auto mt-5 max-w-3xl">
        <div className="absolute top-[1.85rem] h-0.5 rounded-full bg-navy-200" style={{ left: `${50 / n}%`, right: `${50 / n}%` }} />
        <div className="absolute top-[1.85rem] h-0.5 rounded-full bg-navy-700 transition-all duration-1000" style={{ left: `${50 / n}%`, width: `${fill * (1 - 1 / n)}%` }} />
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
          {stages.map(([label, date], i) => (
            <li key={label + i} className="flex flex-col items-center text-center">
              <span className="text-xs font-bold tabular-nums text-navy-800 sm:text-sm">{dmy(date)}</span>
              <span className={`mt-1.5 h-4 w-4 rounded-full border-[3px] ${i <= idx ? "border-navy-700 bg-navy-700" : "border-navy-700 bg-white"}`} />
              <span className="mt-1.5 text-[11px] leading-tight text-slate-600 sm:text-xs">{label}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export function useSeries() {
  const [series, setSeries] = useState(DEFAULT_SERIES);
  useEffect(() => { loadSeries().then(setSeries).catch(() => {}); }, []);
  return series.filter((s) => s.stages?.length);
}

/* Section for other pages: heading + all series + link to the exam page */
export default function SessionDates({ only }) {
  const series = useSeries().filter((s) => !only || only.test(s.title));
  if (!series.length) return null;
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-gold-700"><CalendarDays className="h-4 w-4" /> British Council exam sessions</p>
            <h2 className="mt-2 text-2xl font-extrabold text-navy-900 md:text-3xl">Session dates — <span className="text-gold-600">jaldi register karein</span></h2>
          </div>
          <Link to="/private-candidates" className="text-sm font-bold text-navy-700 hover:text-gold-700">Exam registration →</Link>
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">{series.map((s) => <SessionTimeline key={s.title} s={s} />)}</div>
        <p className="mt-3 text-center text-[11px] text-slate-500">Dates published by the British Council. Register early to pay the normal fee — late stages cost more.</p>
      </div>
    </section>
  );
}
