import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CalendarDays, Sparkles, X } from "lucide-react";
import { ADMISSIONS_WHATSAPP, waLink } from "./portal/DemoStore";
import { openApply } from "./ApplyModal";

/* Pops up when the website opens: which term admissions are open for.
   Terms start in July, September and December — the next one is worked out from today's date. */
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TERM_STARTS = [6, 8, 11];   // July, September, December

export function nextTermStart(from = new Date()) {
  for (let y = from.getFullYear(); ; y++) {
    for (const m of TERM_STARTS) if (new Date(y, m, 1) > from) return { month: MONTHS[m], year: y };
  }
}

const KEY = "pw_admission_popup_seen";

export default function AdmissionPopup() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const skip = /^\/(portal|private-candidates\/signup)/i.test(pathname);
  const t = nextTermStart();

  useEffect(() => {
    if (skip) return undefined;
    let seen = false;
    try { seen = sessionStorage.getItem(KEY) === "1"; } catch (e) { /* storage blocked: just show it */ }
    if (seen) return undefined;
    const id = setTimeout(() => setOpen(true), 1200);
    return () => clearTimeout(id);
  }, [skip]);

  const close = () => { setOpen(false); try { sessionStorage.setItem(KEY, "1"); } catch (e) { /* ignore */ } };
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open || skip) return null;
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-navy-950/60 px-4 backdrop-blur-sm" onClick={close} role="dialog" aria-modal="true" aria-label="Admissions open">
      <div className="panel-in relative w-full max-w-lg overflow-hidden rounded-3xl bg-white text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white hover:bg-white/25"><X className="h-5 w-5" /></button>
        <div className="navy-pattern relative px-8 pb-10 pt-10 text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold-500 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-navy-900">
            <Sparkles className="h-4 w-4" /> Admissions Open
          </span>
          <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-[2.1rem]">
            Discover a New Way to Learn <span className="mt-1 block text-xl italic text-gold-400 sm:text-2xl">— Through Live, Interactive Online Classes.</span>
          </h2>
          <p className="mt-3 text-sm text-white/80">Pakistan's first online live interactive school · IGCSE / O Levels and A Levels.</p>
        </div>
        <div className="px-8 pb-8 pt-6">
          <div className="mx-auto flex max-w-sm items-center justify-center gap-3 rounded-2xl bg-gold-50 px-4 py-3 text-sm font-semibold text-navy-800 ring-1 ring-gold-200">
            <CalendarDays className="h-5 w-5 shrink-0 text-gold-600" /> <span>Next term starts <b className="whitespace-nowrap">{t.month} {t.year}</b></span>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button type="button" onClick={() => { close(); openApply(); }} className="btn-shimmer inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-lg shadow-gold-500/25">Apply now</button>
            <a href={waLink(ADMISSIONS_WHATSAPP)} target="_blank" rel="noreferrer" onClick={close} className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white hover:brightness-95">Chat on WhatsApp</a>
          </div>
          <button type="button" onClick={close} className="mt-4 text-xs font-semibold text-slate-500 hover:text-navy-700">Maybe later</button>
        </div>
      </div>
    </div>
  );
}