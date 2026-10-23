import ProgramFees from "./ProgramFees";
import { motion } from "framer-motion";
import { INTAKE_YEAR } from "./RefundPolicy";
import { Link } from "react-router-dom";
import { BriefcaseBusiness, FlaskConical, Globe2, Laptop } from "lucide-react";
import IgcsePathway from "./IgcsePathway";
import { FEES, waLinkTo } from "./siteData";

export default function IGCSETwoYearProgram() {
  const programDetails = [
    {
      label: "Eligibility Criteria",
      value:
        "Grade 7 or 8 with British Curriculum or its equivalent qualification",
    },
    {
      label: "Program Duration",
      value: "2 Years",
    },
    {
      label: "Year 1",
      value: (
        <>
          <span className="font-semibold text-slate-900">August to June</span> — Urdu,
          Pakistan Studies, Islamic Studies, English and Mathematics Part 1
        </>
      ),
    },
    {
      label: "Year 2",
      value: "Mathematics Part 2 plus your chosen stream — Science, IT, Business or Humanities",
    },
    {
      label: "Admission Dates",
      value: (
        <div className="space-y-1">
          <p>15 June to 30 June Every Year</p>
          <p>15 July to 15 August Every Year</p>
          <p>15 November to 30 November Every Year</p>
        </div>
      ),
    },
  ];

  const year1Subjects = [
    { name: "English", note: "Language" },
    { name: "Mathematics Part 1", note: "Core" },
    { name: "Urdu", note: "National language" },
    { name: "Islamic Studies", note: "Core" },
    { name: "Pakistan Studies", note: "History & Geography" },
  ];

  const streams = [
    {
      key: "science",
      title: "Science / Medical",
      tag: "Pre-Medical & Engineering",
      icon: FlaskConical,
      image: "st-stream-science.webp",
      subjects: ["Mathematics Part 2", "Physics", "Chemistry", "Biology"],
    },
    {
      key: "it",
      title: "IT / Computer",
      tag: "Computing & Technology",
      icon: Laptop,
      image: "st-stream-it.webp",
      subjects: ["Mathematics Part 2", "Physics", "Chemistry", "Computer Science"],
    },
    {
      key: "business",
      title: "Business",
      tag: "Commerce & Management",
      icon: BriefcaseBusiness,
      image: "senior.webp",
      subjects: ["Business Studies", "Economics", "Accounting", "Mathematics Part 2"],
    },
    {
      key: "humanities",
      title: "Humanities",
      tag: "Social Sciences & Arts",
      icon: Globe2,
      image: "st-stream-humanities.webp",
      subjects: ["Global Citizenship", "History", "Geography", "Mathematics Part 2"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="relative flex min-h-[520px] items-start overflow-hidden bg-navy-950 text-white lg:min-h-[600px]">
        <img data-rv="1" src="prog-igcse.webp" alt="" className="absolute inset-y-0 right-0 h-full w-full object-cover object-top lg:w-[62%]" style={{ WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 28%)", maskImage: "linear-gradient(90deg, transparent 0%, #000 28%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(10,24,44,.97) 0%, rgba(10,24,44,.92) 38%, rgba(14,33,57,.55) 62%, rgba(14,33,57,.05) 100%)" }} />

        {/* Decorative Glow */}
        <div className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-green-300/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-8 sm:px-6 md:pt-10 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Tag */}
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100 backdrop-blur">
              IGCSE / O Levels
            </div>

            {/* Heading */}
            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              IGCSE / O Levels
              <span className="block text-emerald-200">
                2 Years Program
              </span>
            </h1>

            {/* Description */}
            <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/90 sm:text-lg">
              The International GCSE 2 Years Programme is specially designed for
              students and learners located in Pakistan or overseas who wish to
              pursue or continue their further studies in Pakistan. The full
              program is divided into three (3) terms, allowing students to focus
              more effectively on their key subjects while benefiting from a
              flexible timeline.
            </p>

            {/* Hero Stats */}
            <div className="mt-8 flex flex-wrap gap-3">

              <StatBox
                label="Program Duration"
                value="2 Years"
              />

              <StatBox
                label="Terms"
                value="3 terms · 2 years"
              />

            </div>
          </motion.div>
        </div>
      </section>


      {/* 2 years · 3 terms · subjects · admission form */}
      <IgcsePathway intro={false} id="igcse-terms" />

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* =====================================================
            FINAL CTA
        ====================================================== */}
        <div className="mt-14 text-center">

          <p className="text-sm font-medium text-emerald-700">
            Your IGCSE Journey
          </p>

          <h2 className="mx-auto mt-2 max-w-3xl font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
            Complete your IGCSE in just 3 terms and 2 years
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            A structured plan that balances subject preparation, British Council
            examinations and your next step into A Levels.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">

            <a
              href={waLinkTo()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#1ebe5b]"
            >
              Chat on WhatsApp
            </a>

            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-8 py-3 text-sm font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Speak to Admissions
            </Link>

          </div>
        </div>
      </section>
      <ProgramFees programme="IGCSE / O Levels" monthly={FEES.monthly.igcse} />
    </main>
  );
}

/* =====================================================
   HERO STAT
====================================================== */

function StatBox({ label, value }) {
  return (
    <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
      <p className="text-xs text-emerald-100/70">
        {label}
      </p>

      <p className="mt-1 font-semibold text-white">
        {value}
      </p>
    </div>
  );
}