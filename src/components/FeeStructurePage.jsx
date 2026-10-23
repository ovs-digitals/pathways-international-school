import { Link } from "react-router-dom";
import RomanLine from "./RomanLine";
import { ADDRESS, CONTACT, FEES, pkr } from "./siteData";

const P = (n) => `PKR ${pkr(n)}`;

const feeSections = [
  {
    title: "Pre-IGCSE, O Levels & International GCSE",
    columns: ["Admission Fee", "IT Fee (Annual)", "Monthly Fee"],
    rows: [
      ["Pre-IGCSE Program", P(FEES.admission), P(FEES.it), P(FEES.monthly.preIgcse)],
      ["IGCSE / O Levels 2 Years Program", P(FEES.admission), P(FEES.it), P(FEES.monthly.igcse)],
    ],
  },
  {
    title: "International A Levels",
    columns: ["Admission Fee", "IT Fee (Annual)", "Monthly Fee"],
    rows: [
      ["International AS & A2 Levels (3 Subjects)", P(FEES.admission), P(FEES.it), P(FEES.monthly.aLevels)],
      ["Self-Paced International AS & A2 Levels (Per Subject)", P(FEES.admission), P(FEES.it), P(FEES.monthly.selfPacedPerSubject)],
    ],
  },
];

export default function FeeStructurePage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid place-items-center bg-emerald-900 px-6 py-10 text-white">
            <img
              src="/logo.webp"
              alt="Pathways International School"
              className="h-20 w-auto object-contain sm:h-28"
            />
          </div>

          <div className="mt-5 bg-emerald-900 px-6 py-5 text-white">
            <h1 className="text-3xl font-semibold sm:text-4xl">
              Pathways Fee Structure
            </h1>
            <div><RomanLine /></div>
            <p className="mt-2 text-sm text-white/75">
              All listed fees are in PKR unless stated as PKR equivalent.
            </p>
          </div>

          <div className="mt-8 space-y-10">
            {feeSections.map((section) => (
              <FeeTable key={section.title} section={section} />
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-slate-50 p-6 text-sm leading-6 text-slate-700">
            <p className="font-semibold text-slate-900">Note:</p>
            <p className="mt-4">
              1. External awarding-body, registration, examination and
              certification charges, where applicable, may be charged separately
              and are subject to the relevant awarding organisation or
              examination authority.
            </p>
            <p className="mt-3">
              2. IT Fee and Admission Fee are non-refundable.
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-3 bg-emerald-900 px-6 py-5 text-sm font-semibold text-white sm:flex-row sm:items-center sm:justify-between">
            <a href={CONTACT.phoneHref} className="hover:text-emerald-100">
              {CONTACT.phone}
            </a>
            <a
              href="https://pathwaysinternationalschool.edu.pk"
              className="hover:text-emerald-100"
            >
              www.pathwaysinternationalschool.edu.pk
            </a>
            <span>{ADDRESS}</span>
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/application-process"
              className="inline-flex rounded-full bg-emerald-700 px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-800"
            >
              Apply for Admission
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FeeTable({ section }) {
  return (
    <div className="overflow-hidden border border-slate-300">
      <div
        className={`grid bg-emerald-900 text-white ${
          section.columns.length === 1
            ? "grid-cols-[1.4fr_1fr]"
            : "grid-cols-[1.8fr_repeat(3,1fr)]"
        }`}
      >
        <div className="px-4 py-4 text-center text-sm font-semibold sm:text-base">
          {section.title}
        </div>
        {section.columns.map((column) => (
          <div
            key={column}
            className="border-l border-white/40 px-4 py-4 text-center text-sm font-semibold sm:text-base"
          >
            {column}
          </div>
        ))}
      </div>

      {section.rows.map((row) => (
        <div
          key={row.join("-")}
          className={`grid border-t border-slate-300 text-sm ${
            section.columns.length === 1
              ? "grid-cols-[1.4fr_1fr]"
              : "grid-cols-[1.8fr_repeat(3,1fr)]"
          }`}
        >
          {row.map((cell, index) => (
            <div
              key={`${cell}-${index}`}
              className={`px-4 py-3 ${
                index === 0
                  ? "font-semibold text-slate-800"
                  : "border-l border-slate-300 text-center font-semibold text-slate-700"
              }`}
            >
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
