import { motion } from "framer-motion";
import RomanLine from "./RomanLine";
import { Link } from "react-router-dom";

export default function SelfPacedA2Levels() {
  const programDetails = [
    {
      label: "Eligibility Criteria",
      value: "International A2 Levels Qualification with three subjects",
    },
    {
      label: "Program Duration",
      value: "1 Year",
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
    {
      label: "Sessions",
      value: (
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-slate-900">
              Summer Session — Term 1:
            </span>{" "}
            July to November
          </p>

          <p>
            <span className="font-semibold text-slate-900">
              August Session — Term 1:
            </span>{" "}
            25th August to November
          </p>

          <p className="text-xs text-emerald-700">
            August-enrolled students appear in internal examinations only.
          </p>
        </div>
      ),
    },
  ];

  const term1Subjects = [
    "Biology Unit 4",
    "Chemistry Unit 4",
    "Physics Unit 4",
    "Economics Unit 3",
    "Business Unit 3",
    "Accounting Unit 2",
    "Mathematics Pure 3",
    "Information Technology Unit 3",
    "English Unit 3",
    "Cambridge Computer Science (9618) Paper 3",
  ];

  const term2Subjects = [
    "Biology Unit 5 & 6",
    "Chemistry Unit 5 & 6",
    "Physics Unit 5 & 6",
    "Economics Unit 4",
    "Business Unit 4",
    "Accounting Unit 2",
    "Mathematics Pure 4 & Mechanics 2",
    "Information Technology Unit 4",
    "English Unit 4",
    "Cambridge Computer Science (9618) Paper 4",
  ];

  return (
    <main className="min-h-screen bg-slate-50">

      {/* =========================
          HERO
      ========================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-950 text-white">
        <div className="pointer-events-none absolute -top-32 -right-20 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-green-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20 lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-100 backdrop-blur">
              Flexible A2 Level Pathway
            </div>

            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Self-Paced
              <span className="block text-emerald-200">
                International A2 Levels
              </span>
            </h1>
            <div><RomanLine /></div>

            <p className="mt-5 max-w-3xl text-base leading-7 text-emerald-50/90 sm:text-lg">
              A flexible A Level pathway designed for students who wish to
              complete their International A Level qualification at their own
              pace while choosing subjects according to their academic goals.
            </p>

            <p className="mt-3 max-w-3xl text-sm leading-6 text-emerald-100/90">
              Students may select a maximum of three subjects and complete the
              applicable advanced units through the May / June examination
              series.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <StatBox
                label="Study Mode"
                value="Self-Paced"
              />

              <StatBox
                label="Program Duration"
                value="1 Year"
              />

              <StatBox
                label="Maximum Subjects"
                value="3 Subjects"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================== */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">

        {/* =========================
            INTRODUCTION
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600">
            Program Overview
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-slate-900">
            Complete A2 Levels With Greater Flexibility
          </h2>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            The Self-Paced International A2 Levels program is specially
            designed for students and learners who wish to complete their
            International A Level qualifications at their own pace and with
            flexibility in subject selection.
          </p>

          <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
            Students can select a maximum of three subjects and continue with
            their advanced units according to the program schedule and British
            Council examination pathway.
          </p>
        </motion.div>

        {/* =========================
            PROGRAM INFORMATION
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
        >
          <div className="border-b border-emerald-100 bg-emerald-50 px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-600">
              Program Information
            </p>

            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              Self-Paced International A2 Levels
            </h2>
          </div>

          <div className="divide-y divide-slate-100">
            {programDetails.map((item) => (
              <div
                key={item.label}
                className="grid gap-2 px-6 py-5 sm:grid-cols-[220px_1fr] sm:gap-8 sm:px-8"
              >
                <div className="text-sm font-semibold text-emerald-800">
                  {item.label}
                </div>

                <div className="text-sm leading-6 text-slate-700">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* =========================
            FLEXIBILITY HIGHLIGHT
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 rounded-3xl bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-900 p-6 text-white shadow-lg sm:p-8"
        >
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-200">
                Flexible Learning
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold">
                Study According to Your Academic Goals
              </h2>

              <p className="mt-3 text-sm leading-6 text-emerald-50/80">
                Students can select up to three subjects and follow a flexible
                pathway through Term 1 and Term 2 while preparing for their
                British Council examinations.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <FeatureCard
                title="Maximum 3 Subjects"
                description="Choose up to three subjects according to your academic pathway."
              />

              <FeatureCard
                title="Self-Paced Study"
                description="Plan your learning around your individual preparation and goals."
              />

              <FeatureCard
                title="Advanced Units"
                description="Continue through advanced A2 units and Cambridge papers."
              />

              <FeatureCard
                title="British Council Exams"
                description="Progress toward the applicable Unit 3–6 and Paper 3–4 examinations."
              />
            </div>
          </div>
        </motion.div>

        {/* =========================
            TERM 1
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
        >
          <TermHeader
            number="01"
            title="Term 1"
            subtitle="Summer / August Session"
          />

          <div className="p-6 sm:p-8">
            <div className="grid gap-4 md:grid-cols-3">
              <ScheduleCard
                title="Summer Session"
                value="July to November"
              />

              <ScheduleCard
                title="August Session"
                value="25th August to November"
                note="August-enrolled students appear in internal examinations only."
              />
            </div>

            {/* Term 1 Exam */}
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600">
                British Council Exam
              </p>

              <p className="mt-2 text-xl font-bold text-emerald-900">
                Unit 3 & 4 / Paper 3 & 4
              </p>
            </div>

            {/* Term 1 Subjects */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600">
                Subject Selection
              </p>

              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Subjects Offered in Term 1
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Students may select up to three subjects.
              </p>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {term1Subjects.map((subject, index) => (
                  <SubjectCard
                    key={subject}
                    index={index + 1}
                    subject={subject}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================
            AUGUST SESSION NOTE
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-6 rounded-3xl border border-amber-200 bg-amber-50 p-6 sm:p-7"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 font-bold text-amber-700">
              !
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
                Important Session Note
              </p>

              <h3 className="mt-1 text-lg font-semibold text-amber-950">
                August Session Students
              </h3>

              <p className="mt-2 max-w-4xl text-sm leading-6 text-amber-900/80">
                Students enrolling in the August session will appear in
                internal examinations only during Term 1, according to the
                program schedule.
              </p>
            </div>
          </div>
        </motion.div>

        {/* =========================
            TERM 2
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-8 overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm"
        >
          <TermHeader
            number="02"
            title="Term 2"
            subtitle="Advanced A2 Completion"
          />

          <div className="p-6 sm:p-8">
            {/* Final Exam */}
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600">
                Final British Council Exam
              </p>

              <p className="mt-2 text-xl font-bold text-emerald-900">
                Unit 5 & 6 / Paper 4 / Mechanics 2
              </p>
            </div>

            {/* Subjects */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-600">
                Subject Progression
              </p>

              <h3 className="mt-1 text-xl font-semibold text-slate-900">
                Subjects Offered in Term 2
              </h3>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {term2Subjects.map((subject, index) => (
                  <SubjectCard
                    key={subject}
                    index={index + 1}
                    subject={subject}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* =========================
            TIMELINE
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-900 text-white shadow-lg"
        >
          <div className="border-b border-white/10 px-6 py-5 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-200">
              Academic Journey
            </p>

            <h2 className="mt-1 font-serif text-2xl font-semibold">
              Self-Paced A2 Level Timeline
            </h2>
          </div>

          <div className="grid md:grid-cols-2">
            <TimelineCard
              number="01"
              title="Term 1"
              period="July / August – November"
              description="Study Unit 3–4 or Paper 3–4 subjects according to the selected academic pathway."
            />

            <TimelineCard
              number="02"
              title="Term 2"
              period="Advanced Completion"
              description="Complete Unit 5–6, Paper 4 or Mechanics 2 and prepare for final British Council examinations."
            />
          </div>
        </motion.div>

        {/* =========================
            FINAL CTA
        ========================== */}
        <div className="mt-14 text-center">
          <p className="text-sm font-medium text-emerald-700">
            Flexible A2 Progression
          </p>

          <h2 className="mx-auto mt-2 max-w-3xl font-serif text-3xl font-semibold text-slate-900 sm:text-4xl">
            Complete your International A2 qualification at a pace that works
            for you
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600">
            Choose up to three subjects, continue through advanced A2 units and
            prepare for your final International A Level examinations with a
            flexible study structure.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/923222838583"
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
    </main>
  );
}


/* =========================
   STAT BOX
========================== */

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


/* =========================
   FEATURE CARD
========================== */

function FeatureCard({ title, description }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-300 text-[10px] font-bold text-emerald-950">
          ✓
        </span>

        <div>
          <p className="text-sm font-semibold text-white">
            {title}
          </p>

          <p className="mt-1 text-xs leading-5 text-emerald-50/70">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}


/* =========================
   TERM HEADER
========================== */

function TermHeader({ number, title, subtitle }) {
  return (
    <div className="flex items-center gap-4 border-b border-emerald-100 bg-emerald-50 px-6 py-5 sm:px-8">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-sm font-bold text-white">
        {number}
      </div>

      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-0.5 text-xs text-slate-500">
          {subtitle}
        </p>
      </div>
    </div>
  );
}


/* =========================
   SCHEDULE CARD
========================== */

function ScheduleCard({ title, value, note }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
        Session
      </p>

      <h3 className="mt-2 text-base font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mt-1 text-sm font-medium text-emerald-800">
        {value}
      </p>

      {note && (
        <p className="mt-3 text-xs leading-5 text-slate-500">
          {note}
        </p>
      )}
    </div>
  );
}


/* =========================
   SUBJECT CARD
========================== */

function SubjectCard({ index, subject }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-[10px] font-bold text-emerald-700">
        {index}
      </span>

      <p className="text-sm leading-5 text-slate-700">
        {subject}
      </p>
    </div>
  );
}


/* =========================
   TIMELINE
========================== */

function TimelineCard({
  number,
  title,
  period,
  description,
}) {
  return (
    <div className="border-b border-white/10 p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0">
      <span className="text-xs font-bold text-emerald-300">
        {number}
      </span>

      <h3 className="mt-2 text-lg font-semibold text-white">
        {title}
      </h3>

      <p className="mt-1 text-sm font-medium text-emerald-200">
        {period}
      </p>

      <p className="mt-3 text-xs leading-5 text-emerald-50/70">
        {description}
      </p>
    </div>
  );
}

