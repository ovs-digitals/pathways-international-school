import { Award, CalendarDays, Laptop, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { openApply } from "./ApplyModal";
import { FEES, MAX_SCHOLARSHIP, SCHOLARSHIP, pkr } from "./siteData";

/* Fee block at the bottom of every programme page */

export default function ProgramFees({ programme, monthly, admission = FEES.admission, it = FEES.it }) {
  const items = [
    [CalendarDays, "Admission fee", admission, "one time"],
    [Laptop, "IT fee", it, "per year"],
  ];
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-navy-900 text-white shadow-2xl shadow-navy-950/30">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          {/* monthly fee — the big number */}
          <div className="relative overflow-hidden p-6 sm:p-7">
            <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full border-[18px] border-gold-500/10" />
            <p className="relative text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Fee structure · {programme}</p>
            <p className="relative mt-3 text-xs font-semibold text-white/70">Monthly tuition fee</p>
            <p className="relative mt-1 flex items-baseline gap-2">
              <span className="text-lg font-bold text-gold-300">PKR</span>
              <span className="text-4xl font-black tracking-tight sm:text-5xl">{pkr(monthly)}</span>
              <span className="text-sm font-semibold text-white/60">/ month</span>
            </p>
            <p className="relative mt-2 max-w-md text-xs leading-5 text-white/70">Live online classes, recorded lessons, mock tests and your own student portal — all included.</p>
            <div className="relative mt-5 flex flex-wrap gap-2">
              <button type="button" onClick={openApply} className="btn-shimmer rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-navy-900 shadow-lg shadow-gold-500/25">Apply now</button>
              <Link to="/fee-structure" className="rounded-full border border-white/25 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:border-gold-400 hover:text-gold-300">All fees</Link>
            </div>
          </div>
          {/* one-time / yearly + scholarship */}
          <div className="grid gap-px bg-white/10">
            {items.map(([Icon, k, v, note]) => (
              <div key={k} className="flex items-center gap-4 bg-navy-800 px-5 py-3.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-gold-300"><Icon className="h-5 w-5" /></span>
                <div className="flex-1"><p className="text-xs font-semibold text-white/70">{k}</p><p className="text-lg font-extrabold">PKR {pkr(v)}</p></div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-gold-200">{note}</span>
              </div>
            ))}
            <Link to="/scholarships" className="group flex items-center gap-4 bg-gold-500 px-5 py-3.5 text-navy-900 transition hover:bg-gold-400">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-navy-900 text-gold-400"><Award className="h-5 w-5" /></span>
              <div className="flex-1"><p className="text-lg font-black">Up to {MAX_SCHOLARSHIP}% off</p><p className="text-xs font-semibold">{SCHOLARSHIP.hafiz}% Hafiz-e-Quran · {SCHOLARSHIP.siblings}% siblings</p></div>
              <Wallet className="h-6 w-6 transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
