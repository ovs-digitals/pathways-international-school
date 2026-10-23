import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { openApply } from "./ApplyModal";

/* Home hero: photos fade/zoom behind, text on the left with a typed gold line. */
const POINTS = ["Expert Teachers", "Zero-Tuition Policy", "Live Interactive Classes", "Flexible Timings", "Affordable Fees"];
const FROM_LEFT = {
  hidden: { opacity: 0, x: -80 },
  show: (i = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.9, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] } }),
};
const SLIDES = [
  { img: "/hero-bg1.webp", pos: "50% 32%", line: "Pearson Edexcel School.", lead: "Ab achi parhai ke liye shehar badalne ki zaroorat nahi!", text: "Live, interactive classes with expert teachers — for students all over Pakistan, right from home." },
  { img: "/hero-bg2.webp", pos: "55% 40%", line: "IGCSE & A Levels School.", lead: "Expert teachers, real-time guidance.", text: "Har class live aur interactive — sawal poochiye, discuss kijiye aur apne teachers se seedha seekhiye." },
  { img: "/hero-bg3.webp", pos: "50% 30%", line: "school — ghar baithe!", lead: "Flexible timings, affordable fees.", text: "Apne ghar ke comfort se, apne schedule ke mutabiq — quality education ab har ghar tak." },
  { img: "/hero-students.webp", pos: "50% 25%", line: "for students all over Pakistan.", lead: "Private candidates welcome.", text: "British Council exam registration for IGCSE / A Levels — admission se exams tak, sab ek jagah." },
];
const SERIF = { fontFamily: '"Playfair Display", Georgia, "Times New Roman", serif' };

function TypedLine({ text, active }) {
  const [n, setN] = useState(active ? 0 : text.length);
  useEffect(() => {
    if (!active) { setN(text.length); return; }
    setN(0);
    let i = 0, t2;
    const t1 = setTimeout(function tick() { i++; setN(i); if (i < text.length) t2 = setTimeout(tick, 70); }, 450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [active, text]);
  return (
    <span className="italic text-gold-400" aria-label={text}>
      {text.slice(0, n)}
      {active && <span aria-hidden className={"hs-caret" + (n >= text.length ? " is-done" : "")} />}
      <span aria-hidden style={{ visibility: "hidden" }}>{text.slice(n)}</span>
    </span>
  );
}

export default function HomeHero() {
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setCur((c) => (c + 1) % SLIDES.length), 6500);
    return () => clearTimeout(t);
  }, [cur]);

  return (
    <section data-noreveal data-rv="1" className="hs relative w-full overflow-hidden text-white">
      <div aria-hidden className="hs-bgs">
        {SLIDES.map((s, i) => (
          <img key={s.img} src={s.img} alt="" className={"hs-bg" + (i === cur ? " is-on" : "")} style={{ objectPosition: s.pos }} />
        ))}
      </div>
      <div aria-hidden className="hs-shade" />
      <div className="hs-inner">
        <div className="hs-col">
          <motion.div variants={FROM_LEFT} initial="hidden" animate="show" custom={0} className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-gold-300 backdrop-blur sm:text-[11px] sm:tracking-[0.2em]">
            <CheckCircle2 className="h-4 w-4" /> Admissions Open · Pearson Edexcel Centre No. 97911
          </motion.div>
          <motion.div variants={FROM_LEFT} initial="hidden" animate="show" custom={1} className="hs-copy" aria-live="polite">
            {SLIDES.map((s, i) => {
              const Title = i === 0 ? "h1" : "p";
              return (
                <div key={s.img} className={"hs-slide" + (i === cur ? " is-on" : "")} aria-hidden={i !== cur}>
                  <Title className="hs-title font-semibold" style={SERIF}>
                    Pakistan's First Live Online<br />
                    <TypedLine text={s.line} active={i === cur} />
                  </Title>
                  <p className="hs-text"><b className="text-white">{s.lead}</b> {s.text}</p>
                </div>
              );
            })}
          </motion.div>
          <motion.ul variants={FROM_LEFT} initial="hidden" animate="show" custom={2} className="hs-list grid max-w-xl grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
            {POINTS.map((p) => (
              <li key={p} className="flex items-center gap-2 text-sm font-medium text-white/90">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-gold-500 text-[10px] font-bold text-navy-900">✓</span>{p}
              </li>
            ))}
          </motion.ul>
          <motion.div variants={FROM_LEFT} initial="hidden" animate="show" custom={3} className="hs-cta flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={openApply} className="btn-shimmer group inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-navy-900 shadow-xl shadow-gold-500/25 transition hover:from-gold-300 hover:to-gold-400">
              Apply for Admission <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
            </button>
            <Link to="/private-candidates" className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/5 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white backdrop-blur transition hover:border-gold-400 hover:text-gold-300">
              British Council Exam Registration (IGCSE / A Levels)
            </Link>
          </motion.div>
          <div className="hs-dots">
            {SLIDES.map((s, i) => (
              <button key={s.img} type="button" aria-label={"Slide " + (i + 1)} className={"hs-dot" + (i === cur ? " is-on" : i < cur ? " is-done" : "")} onClick={() => setCur(i)}>
                <span key={i === cur ? "on" + cur : "off"} className="hs-dot-fill" />
              </button>
            ))}
          </div>
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-10 bg-[#f6f8fc] [clip-path:ellipse(70%_100%_at_50%_100%)]" />
    </section>
  );
}
