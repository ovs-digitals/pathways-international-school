import RomanLine from "./RomanLine";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------
   Shared visual / animation helpers for the inner pages
   (About, CEO Message, Affiliations, Contact, Careers)
------------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

/** Scroll reveal. variant: up | left | right | zoom | blur */
export function Reveal({ children, variant = "up", delay = 0, className = "", as = "div" }) {
  const from = {
    up: { opacity: 0, y: 36 },
    left: { opacity: 0, x: -60 },
    right: { opacity: 0, x: 60 },
    zoom: { opacity: 0, scale: 0.88 },
    blur: { opacity: 0, y: 16, filter: "blur(10px)" },
  }[variant];
  const to = { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" };
  const Tag = motion[as];
  return (
    <Tag
      initial={from}
      whileInView={to}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}

/** 3D tilt that follows the mouse, with a soft spotlight glow. */
export function TiltCard({ children, className = "", max = 10 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const [glow, setGlow] = useState({ x: 50, y: 50, o: 0 });
  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`,
    });
    setGlow({ x: px * 100, y: py * 100, o: 1 });
  }
  function onLeave() {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)" });
    setGlow((g) => ({ ...g, o: 0 }));
  }
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ ...style, transition: "transform 0.25s ease-out" }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: glow.o,
          background: `radial-gradient(420px circle at ${glow.x}% ${glow.y}%, rgba(201,164,76,0.22), transparent 45%)`,
        }}
      />
    </div>
  );
}

/** Typewriter that types and deletes a list of phrases. */
export function Typewriter({ words, className = "" }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    let t;
    if (!deleting && text === word) t = setTimeout(() => setDeleting(true), 1600);
    else if (deleting && text === "") {
      setDeleting(false);
      setI((n) => n + 1);
    } else {
      t = setTimeout(
        () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)),
        deleting ? 35 : 70
      );
    }
    return () => clearTimeout(t);
  }, [text, deleting, i, words]);
  return (
    <span className={className}>
      {text}
      <span className="typewriter-caret" aria-hidden>|</span>
    </span>
  );
}

/** Large page hero with Ken Burns image, gold rings and staggered text. */
export function PageHero({ eyebrow, title, accent, text, image, children }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <img src={image} alt="" className="kenburns absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900/85 to-navy-800/40" />
      <div aria-hidden className="blob absolute -right-24 top-10 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-28 -top-28 h-96 w-96 rounded-full border border-gold-500/20" />
      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-16 sm:px-6 md:pt-24 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-gold-500/40 bg-white/5 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-6 max-w-4xl font-serif text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
        >
          {title} {accent && <span className="italic text-gold-400">{accent}</span>}
        </motion.h1>
        <div><RomanLine /></div>
        {text && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg"
          >
            {text}
          </motion.p>
        )}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9"
          >
            {children}
          </motion.div>
        )}
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-10 bg-[#f6f8fc] [clip-path:ellipse(70%_100%_at_50%_100%)]" />
    </section>
  );
}

/** Centered section heading with gold rule. */
export function SectionHeading({ eyebrow, title, accent, text, align = "center" }) {
  return (
    <Reveal variant="blur" className={align === "center" ? "text-center" : ""}>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-700">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight text-navy-800 md:text-5xl">
        {title} {accent && <span className="italic text-gold-600">{accent}</span>}
      </h2>
      <span className="gold-rule mt-5" />
      {text && (
        <p className={`mt-5 max-w-2xl text-base leading-7 text-slate-600 ${align === "center" ? "mx-auto" : ""}`}>{text}</p>
      )}
    </Reveal>
  );
}