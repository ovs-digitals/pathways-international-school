import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight, Award, Bell, BookOpen, CalendarDays, ClipboardCheck, CreditCard, Download, FileText, GraduationCap,
  LayoutDashboard, MapPin, ShieldCheck, ShoppingCart, Sparkles, Timer, Upload, Users,
} from "lucide-react";
import { WHATSAPP_LINK, WhatsAppIcon } from "./WhatsAppButton";
import { REFUND_POLICY } from "./RefundPolicy";
import { SessionTimeline, useSeries } from "./SessionDates";

/* =====================================================================
   British Council exam registration (private candidates, IGCSE / A Levels).
   Order: who we register → session dates → how it works → what your
   portal (LMS) gives you → 60% rule → fees → FAQ → Sign up (at the end).
===================================================================== */

const SLIDES = ["st-stream-science.webp", "st-stream-science.webp", "st-stream-humanities.webp", "hero-bg1.webp", "st-stream-business.webp"];

const steps = [
  { n: "01", icon: FileText, title: "Introduction form", text: "Choose your exams like on the British Council site — level, session, city and subjects — then add your name, contact and ID." },
  { n: "02", icon: LayoutDashboard, title: "Register — your portal opens", text: "Pay the Pathways registration fee and your own student portal opens straight away." },
  { n: "03", icon: ClipboardCheck, title: "Free mock tests", text: "Exam-style papers for every subject you chose — 3 attempts each, marked as soon as you submit." },
  { n: "04", icon: Award, title: "Score 60%", text: "Reach 60% and your mock result card shows you are exam-ready. British Council registration unlocks." },
  { n: "05", icon: GraduationCap, title: "British Council entry", text: "We register your entry with the British Council. You pay the British Council fee from your portal." },
  { n: "06", icon: BookOpen, title: "SOE, results & certificate", text: "Your Statement of Entry, exam result card, marked scripts and certificate arrive in your portal." },
];

const lms = [
  { icon: ShoppingCart, title: "My exams (basket)", text: "Your subjects, papers, dates and fee — add or remove exams before registration." },
  { icon: ClipboardCheck, title: "Free mock tests", text: "Timed, exam-style papers. 3 attempts per subject, best score counts." },
  { icon: Timer, title: "Instant marking", text: "MCQs marked at once; written answers checked by our Exams team." },
  { icon: Award, title: "Mock result card", text: "Subject-wise marks with the 60% line — download any time." },
  { icon: CreditCard, title: "Online fee payment", text: "Pay the registration and British Council fee by card, Easypaisa, JazzCash or bank transfer." },
  { icon: CalendarDays, title: "SOE & datesheet", text: "Your Statement of Entry with exam centre, candidate number and dates." },
  { icon: GraduationCap, title: "Exam result card", text: "Your British Council Statement of Results, as issued." },
  { icon: FileText, title: "Marked scripts", text: "Your checked exam papers, uploaded by the Exams department." },
  { icon: Download, title: "Past papers", text: "Practise with past papers for your subjects." },
  { icon: Upload, title: "Document locker", text: "Your ID, slips and receipts kept safe in one place." },
  { icon: Bell, title: "Notifications", text: "Every update — approval, fee, SOE, results — on your dashboard." },
  { icon: Users, title: "Become a regular student", text: "Want to study with us? Send a request straight from your portal." },
];

const faqs = [
  { q: "Who can register?", a: "Any private candidate from anywhere in Pakistan — school students, home-schoolers, or anyone who wants to sit IGCSE or International A Level exams on their own." },
  { q: "Where can I sit my exam?", a: "In any city of Pakistan. You choose your exam city when you fill in the form." },
  { q: "Are the mock tests really free?", a: "Yes. Mock tests come with your registration — 3 attempts for every subject you chose." },
  { q: "What is the passing criteria?", a: "You need 60% or above in our mock tests before we register you with the British Council." },
  { q: "Who sets the exam dates?", a: "The exam board, through the British Council. The registration windows above are from the British Council; your exact dates arrive with your Statement of Entry in your portal." },
  { q: "Can I become a regular student later?", a: "Yes. Send a request from your portal and our Admissions team will contact you." },
];

const dmy = (iso) => iso.split("-").reverse().join("/");

export default function PrivateCandidatesPage() {
  const [slide, setSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const series = useSeries();
  useEffect(() => { const id = setInterval(() => setSlide((x) => (x + 1) % SLIDES.length), 4000); return () => clearInterval(id); }, []);

  return (
    <main className="overflow-hidden bg-white text-slate-900">
      {/* ================= HEADER (like the British Council school-exams page) ================= */}
      <section className="border-b border-slate-200 bg-[#e9edf0]">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:px-8">
          <div>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-2xl text-navy-800 sm:text-3xl">
              <span className="font-bold">Pearson Edexcel</span><span className="hidden h-9 w-px bg-navy-300 sm:block" />
              <span>Schools</span><span className="hidden h-9 w-px bg-navy-300 sm:block" />
              <span>Pakistan</span>
            </div>
            <p className="mt-4 text-xl font-bold text-navy-700 sm:text-2xl">97911 Pathways International School</p>
            <h1 className="mt-6 text-3xl font-extrabold leading-tight text-navy-900 md:text-5xl">
              British Council Exam Registration <span className="block text-gold-600">IGCSE / A Levels</span>
            </h1>
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-navy-700 px-5 py-2.5 text-sm font-bold text-white md:text-base">
              <MapPin className="h-5 w-5 text-gold-400" /> We accept private candidates from anywhere in Pakistan
            </p>
            <p className="mt-4 text-lg font-semibold text-navy-800">Pakistan mein kahin se bhi — private candidate ke taur par apna IGCSE / A Level exam dein.</p>
          </div>
          {/* photos that change by themselves */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-navy-950/20 ring-4 ring-white">
            {SLIDES.map((src, k) => (
              <img key={src} src={src} alt="" className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ${k === slide ? "scale-100 opacity-100" : "scale-110 opacity-0"}`} />
            ))}
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-2 bg-gradient-to-t from-navy-950/60 to-transparent pb-3 pt-10">
              {SLIDES.map((src, k) => <button key={src} type="button" aria-label={`Photo ${k + 1}`} onClick={() => setSlide(k)} className={`h-2 rounded-full transition-all ${k === slide ? "w-8 bg-gold-400" : "w-2 bg-white/70"}`} />)}
            </div>
          </div>
        </div>
      </section>

      {/* ================= SESSION DATES ================= */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-extrabold text-navy-900 md:text-4xl">Exam session dates</h2>
          <p className="mt-3 text-center text-base text-slate-600">Registration windows — <b>jaldi register karein, kam fee dein.</b></p>
          <div className="mx-auto mt-8 grid max-w-5xl gap-4 md:grid-cols-2">{series.map((s) => <SessionTimeline key={s.title} s={s} />)}</div>
          <p className="mt-3 text-center text-[11px] text-slate-500">Dates published by the British Council. Register early to pay the normal fee — late stages cost more.</p>
        </div>
      </section>

      {/* ================= HOW IT WORKS (bento cards) ================= */}
      <section id="journey" className="scroll-mt-28 bg-navy-900 py-16 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_0.9fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">Your exam journey</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">Six simple steps to <span className="text-gold-400">your exam day</span></h2>
              <p className="mt-4 max-w-lg text-base leading-7 text-white/70">Register online, practise with free mock tests, and we take care of your British Council entry — your SOE, results and certificate all arrive in your portal.</p>
            </div>
            <div className="overflow-hidden rounded-3xl ring-1 ring-gold-500/30 shadow-2xl">
              <img src="st-stream-science.webp" alt="Student sitting an exam" className="h-64 w-full object-cover object-[50%_25%] md:h-72" loading="lazy" />
            </div>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {steps.map(({ n, icon: Icon, title, text }, i) => (
              <article key={n} className={`group relative overflow-hidden rounded-3xl p-7 transition duration-300 hover:-translate-y-1.5 ${i === 2 || i === 3 ? "bg-gold-500 text-navy-900" : "bg-white/[0.06] ring-1 ring-white/10 hover:bg-white/[0.1]"}`}>
                <span className={`pointer-events-none absolute -right-2 -top-6 text-[7rem] font-black leading-none ${i === 2 || i === 3 ? "text-navy-900/10" : "text-white/[0.06]"}`}>{n}</span>
                <span className={`grid h-12 w-12 place-items-center rounded-2xl ${i === 2 || i === 3 ? "bg-navy-900 text-gold-400" : "bg-gold-500 text-navy-900"}`}><Icon className="h-6 w-6" /></span>
                <h3 className="relative mt-5 text-xl font-extrabold">{title}{i === 2 && <span className="ml-2 rounded-full bg-[#10b981] px-2.5 py-0.5 align-middle text-[11px] font-bold uppercase text-white">Free</span>}</h3>
                <p className={`relative mt-3 text-sm leading-6 ${i === 2 || i === 3 ? "text-navy-900/80" : "text-white/70"}`}>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LMS / PORTAL ================= */}
      <section className="bg-[#f6f8fc] py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-700">Your student portal (LMS)</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-navy-900 md:text-5xl">Everything in one place — <span className="text-gold-600">your student portal</span></h2>
            </div>
            <p className="text-base leading-7 text-slate-600">The moment you register, your own portal opens. Everything for your exam — from free mock tests to your final certificate — lives here, on your phone or computer.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lms.map(({ icon: Icon, title, text }) => (
              <div key={title} className="group rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-xl hover:ring-gold-300">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-50 text-navy-700 transition group-hover:bg-gold-500 group-hover:text-navy-900"><Icon className="h-5 w-5" /></span>
                <p className="mt-4 font-extrabold text-navy-900">{title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 60% ================= */}
      <section className="py-16 md:py-20">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 px-4 sm:px-6 md:flex-row lg:px-8">
          <div className="relative grid h-52 w-52 shrink-0 place-items-center">
            <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
              <circle cx="60" cy="60" r="52" fill="none" stroke="#e6eef8" strokeWidth="10" />
              <circle className="ring-70" cx="60" cy="60" r="52" fill="none" stroke="#C9A44C" strokeWidth="10" strokeLinecap="round" strokeDasharray="326.7" strokeDashoffset="130.7" />
            </svg>
            <div className="text-center"><div className="text-6xl font-black text-navy-900">60%</div><div className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">to qualify</div></div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-navy-900 md:text-4xl">Score 60% — <span className="text-gold-600">then sit the real exam</span></h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Our free mock tests are your green light. Reach 60% and we register you as a British Council examination candidate. Below 60%? Re-sit — you get 3 attempts per subject.</p>
          </div>
        </div>
      </section>

      {/* ================= FEES & REFUND POLICY ================= */}
      <section className="bg-white pb-16 md:pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-[#f6f8fc] ring-1 ring-slate-100">
            <div className="flex flex-wrap items-center gap-4 border-b border-slate-200 px-6 py-5 sm:px-8">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-500 text-navy-900"><ShieldCheck className="h-6 w-6" /></span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Fees & refunds</p>
                <h3 className="text-2xl font-extrabold text-navy-900">Refund & late-fee policy</h3>
              </div>
            </div>
            <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
              {REFUND_POLICY.map((r) => (
                <div key={r.title} className="bg-white p-6 sm:p-8">
                  <p className="font-bold text-navy-800">{r.title}</p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="bg-[#f6f8fc] py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">Questions</p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-navy-900 md:text-4xl">Good to know</h2>
            <p className="mt-5 text-base leading-7 text-slate-600">Still unsure? Our admissions team is one message away.</p>
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#25D366]/30 transition hover:bg-[#1ebe5b]">
              <WhatsAppIcon className="h-5 w-5" /> Ask on WhatsApp
            </a>
          </div>
          <div className="space-y-3">
            {faqs.map((f, i) => {
              const open = openFaq === i;
              return (
                <div key={f.q} className={`overflow-hidden rounded-2xl border transition ${open ? "border-gold-300 bg-white shadow-lg" : "border-slate-100 bg-white"}`}>
                  <button type="button" onClick={() => setOpenFaq(open ? -1 : i)} aria-expanded={open} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="text-base font-bold text-navy-800">{f.q}</span>
                    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-lg font-bold transition duration-300 ${open ? "rotate-45 bg-gold-500 text-navy-900" : "bg-navy-700 text-gold-400"}`}>+</span>
                  </button>
                  <div className={`grid transition-all duration-500 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden"><p className="px-6 pb-5 text-sm leading-7 text-slate-600">{f.a}</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= SIGN UP (at the end, after all the details) ================= */}
      <section className="navy-pattern relative overflow-hidden py-20 text-white">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Sparkles className="mx-auto h-8 w-8 text-gold-400" />
          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">Ready? <span className="text-gold-400">Register today.</span></h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-white/75">Fill in the introduction form — your portal and free mock tests open as soon as you register.</p>
          <Link to="/private-candidates/signup" className="btn-shimmer mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-12 py-5 text-lg font-bold uppercase tracking-wider text-navy-900 shadow-2xl shadow-gold-500/30 transition hover:scale-[1.03]">
            Sign up now <ArrowRight className="h-6 w-6" />
          </Link>
        </motion.div>
      </section>
    </main>
  );
}