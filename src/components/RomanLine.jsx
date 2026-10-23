import { useLocation } from "react-router-dom";

/* One clear Roman-Urdu line on every page — the message parents and students
   in Pakistan read first. Keyed by page address. */
export const ROMAN_LINES = {
  "/igcse": "IGCSE sirf 2 saal mein — 3 terms, ek saaf raasta.",
};

export default function RomanLine({ text, light, className = "" }) {
  const { pathname } = useLocation();
  const line = text || ROMAN_LINES[pathname.toLowerCase()];
  if (!line) return null;
  return (
    <p className={`mt-5 inline-flex max-w-3xl items-start gap-2 rounded-2xl border px-4 py-2.5 text-[15px] font-semibold leading-6 sm:text-base ${light ? "border-gold-300 bg-gold-50 text-navy-800" : "border-gold-500/40 bg-white/[0.06] text-gold-200"} ${className}`}>
      <span aria-hidden className="mt-0.5 text-gold-400">✦</span>{line}
    </p>
  );
}
