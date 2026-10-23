import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { AdmissionForm } from "./IgcsePathway";

/* "Apply Now" anywhere on the website opens the admission form right here,
   without leaving the page. Call openApply() from any button. */
export const openApply = () => window.dispatchEvent(new Event("pw:apply"));

export default function ApplyModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("pw:apply", on);
    return () => window.removeEventListener("pw:apply", on);
  }, []);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow; document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[95] overflow-y-auto bg-navy-950/70 px-3 py-6 backdrop-blur-sm sm:px-6 sm:py-10" onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label="Admission form">
      <div className="panel-in relative mx-auto max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute -top-3 right-0 z-10 grid h-10 w-10 place-items-center rounded-full bg-white text-navy-800 shadow-xl hover:bg-gold-400 sm:-right-3"><X className="h-5 w-5" /></button>
        <AdmissionForm inModal />
      </div>
    </div>
  );
}
