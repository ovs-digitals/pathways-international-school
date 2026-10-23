import { BookOpen, CheckCircle2, FileText, Users } from "lucide-react";
import { PageHero } from "./Motion";
import { openApply } from "./ApplyModal";
import { WHATSAPP_LINK, WhatsAppIcon } from "./WhatsAppButton";
import { MAX_SCHOLARSHIP, SCHOLARSHIP } from "./siteData";

/* Admissions → Scholarships */
const schemes = [
  {
    icon: BookOpen, pct: `${SCHOLARSHIP.hafiz}%`, title: "Hafiz-e-Quran",
    text: `Students who have memorised the Holy Quran receive ${SCHOLARSHIP.hafiz}% off the monthly tuition fee.`,
    needs: ["Hifz certificate from a recognised madrasa", "Student's B-Form / CNIC"],
  },
  {
    icon: Users, pct: `${SCHOLARSHIP.siblings}%`, title: "Siblings",
    text: `When two or more children from the same family study at Pathways, each sibling receives ${SCHOLARSHIP.siblings}% off the monthly tuition fee.`,
    needs: ["B-Form of each child (same parents)", "Names and Pathways IDs of the siblings"],
  },
];

export default function ScholarshipsPage() {
  return (
    <main className="bg-[#f6f8fc] text-slate-900">
      <PageHero eyebrow="Admissions" title="Scholarships &" accent="fee concessions"
        text="Good education should be within reach. Pathways offers fee concessions for Hafiz-e-Quran students and for families with more than one child at the school."
        image="/community.webp" />

      <section className="relative z-10 -mt-12 px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {schemes.map(({ icon: Icon, pct, title, text, needs }) => (
            <article key={title} className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-navy-950/10 ring-1 ring-slate-100">
              <div className="navy-pattern flex items-center justify-between gap-4 px-7 py-6 text-white">
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-500 text-navy-900"><Icon className="h-7 w-7" /></span>
                  <h2 className="text-2xl font-extrabold">{title}</h2>
                </div>
                <p className="text-right"><span className="block text-4xl font-black text-gold-300">{pct}</span><span className="text-[11px] font-bold uppercase tracking-wider text-white/70">off monthly fee</span></p>
              </div>
              <div className="p-7">
                <p className="text-base leading-7 text-slate-600">{text}</p>
                <p className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gold-700"><FileText className="h-4 w-4" /> Documents needed</p>
                <ul className="mt-2 space-y-1.5">{needs.map((n) => <li key={n} className="flex gap-2 text-sm text-slate-700"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />{n}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-5xl rounded-3xl bg-white p-7 ring-1 ring-slate-100">
          <p className="font-extrabold text-navy-900">Good to know</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
            <li>• The concession applies to the monthly tuition fee. Admission and IT fees are paid in full.</li>
            <li>• One concession per student — if a student qualifies for both, the higher one ({MAX_SCHOLARSHIP}%) is applied.</li>
            <li>• Ask for the concession when you apply; Admissions confirms it after checking the documents.</li>
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={openApply} className="btn-shimmer inline-flex items-center justify-center rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900">Apply now</button>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-sm font-bold text-white"><WhatsAppIcon className="h-5 w-5" /> Ask about scholarships</a>
          </div>
        </div>
      </section>
    </main>
  );
}
