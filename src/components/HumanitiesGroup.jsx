import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";

const programs = [
  {
    title: "Fast Track Program",
    duration: "1 Year",
    badge: "Accelerated Pathway",
    description:
      "A focused one-year route designed for students who want efficient completion with essential Humanities and business-focused subjects.",
    subjects: ["Mathematics", "English", "Global Citizenship", "ICT", "Business"],
  },
  {
    title: "Fast Track Program",
    duration: "1.5 Years",
    badge: "Extended Accelerated Pathway",
    description:
      "A structured 1.5-year pathway for students who want a balanced pace while covering an additional Psychology subject.",
    subjects: [
      "Mathematics",
      "English",
      "Global Citizenship",
      "ICT",
      "Business",
      "Psychology",
    ],
  },
];

export default function HumanitiesGroupPage() {
  return (
    <section className="min-h-screen bg-white text-[#17365D] overflow-hidden">
      {/* Hero Section */}
      <div className="relative isolate px-6 py-20 sm:py-24 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,_#EBD9A7_0%,_transparent_35%),radial-gradient(circle_at_bottom_left,_#EEF3F9_0%,_transparent_40%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-5xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A44C]/40 bg-[#EEF3F9] px-5 py-2 text-sm font-semibold text-[#17365D] shadow-sm">
            <GraduationCap size={18} /> Humanities Group
          </span>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-[#17365D] sm:text-6xl">
            Accelerated Learning Pathways for Focused Study
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Choose a fast, structured, and efficient route designed to help students complete their studies with clarity, confidence, and academic focus.
          </p>
        </motion.div>
      </div>

      {/* Program Cards */}
      <div className="mx-auto max-w-7xl px-6 pb-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {programs.map((program, index) => (
            <motion.div
              key={program.duration}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative rounded-[2rem] border border-[#EBD9A7] bg-white p-8 shadow-xl shadow-[#17365D]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#17365D]/20"
            >
              <div className="absolute inset-x-8 top-0 h-1 rounded-full bg-gradient-to-r from-[#17365D] via-[#C9A44C] to-[#17365D]" />

              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full bg-[#17365D] px-4 py-2 text-sm font-semibold text-white">
                  {program.badge}
                </span>
                <div className="flex items-center gap-2 rounded-full bg-[#EEF3F9] px-4 py-2 text-sm font-bold text-[#17365D]">
                  <Clock size={17} /> {program.duration}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="text-3xl font-extrabold text-[#17365D]">
                  {program.title}
                </h2>
                <p className="mt-4 text-base leading-7 text-slate-600">
                  {program.description}
                </p>
              </div>

              <div className="mt-8 rounded-3xl bg-[#EEF3F9] p-6">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#17365D] shadow-sm">
                    <BookOpen size={22} />
                  </div>
                  <h3 className="text-xl font-bold text-[#17365D]">Subjects Included</h3>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {program.subjects.map((subject) => (
                    <div
                      key={subject}
                      className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
                    >
                      <CheckCircle2 className="text-[#C9A44C]" size={18} />
                      {subject}
                    </div>
                  ))}
                </div>
              </div>

              <button className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#17365D] px-6 py-4 text-base font-bold text-white shadow-lg shadow-[#17365D]/25 transition-all duration-300 hover:bg-[#08066f]">
                Explore This Pathway <ArrowRight size={20} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 rounded-[2rem] bg-[#17365D] px-8 py-10 text-center text-white shadow-2xl shadow-[#17365D]/20"
        >
          <h2 className="text-3xl font-extrabold">Start Smart with Humanities Group</h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-[#EBD9A7]">
            Both program options are designed as accelerated learning pathways, helping students stay focused, save time, and complete their studies efficiently.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
