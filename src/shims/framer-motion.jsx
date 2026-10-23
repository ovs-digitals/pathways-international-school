import React, { forwardRef, useEffect, useRef, useState } from "react";
const EASE = { linear: "linear", easeIn: "cubic-bezier(.42,0,1,1)", easeOut: "cubic-bezier(0,0,.58,1)", easeInOut: "cubic-bezier(.42,0,.58,1)" };
const OMIT = ["initial","animate","exit","whileInView","whileHover","whileTap","whileFocus","viewport","variants","custom","transition","layout","layoutId","onAnimationComplete","onAnimationStart","drag","dragConstraints"];
function resolve(t, variants, custom) {
  if (t == null || t === false) return {};
  if (typeof t === "string") t = variants && variants[t];
  if (typeof t === "function") t = t(custom);
  return t && typeof t === "object" ? t : {};
}
function toStyle(t, fallbackTr) {
  const s = {}, tf = [];
  const { transition, ...v } = t;
  let x = v.x ?? 0, y = v.y ?? 0;
  if ("x" in v || "y" in v) tf.push(`translate3d(${typeof x === "number" ? x + "px" : x},${typeof y === "number" ? y + "px" : y},0)`);
  if ("scale" in v) tf.push(`scale(${v.scale})`);
  if ("rotateX" in v) tf.push(`perspective(800px) rotateX(${v.rotateX}deg)`);
  if ("rotateY" in v) tf.push(`perspective(800px) rotateY(${v.rotateY}deg)`);
  if ("rotate" in v) tf.push(`rotate(${typeof v.rotate === "number" ? v.rotate + "deg" : v.rotate})`);
  if (tf.length) s.transform = tf.join(" ");
  for (const k of ["opacity","height","width","pointerEvents","backgroundColor","color","filter"]) if (k in v) s[k] = Array.isArray(v[k]) ? v[k][v[k].length - 1] : v[k];
  const tr = transition || fallbackTr || {};
  const dur = tr.duration ?? (tr.type === "spring" ? 0.5 : 0.35);
  const ease = Array.isArray(tr.ease) ? `cubic-bezier(${tr.ease.join(",")})` : EASE[tr.ease] || "cubic-bezier(.22,1,.36,1)";
  s.transition = `all ${dur}s ${ease} ${tr.delay || 0}s`;
  return s;
}
function make(tag) {
  return forwardRef(function Motion(props, ref) {
    const { initial, animate, whileInView, whileHover, viewport, variants, custom, transition, style } = props;
    const rest = {}; for (const k in props) if (!OMIT.includes(k) && k !== "style") rest[k] = props[k];
    const el = useRef(null);
    const [mounted, setMounted] = useState(initial === false);
    const [inView, setInView] = useState(false);
    const [hover, setHover] = useState(false);
    useEffect(() => {
      if (!mounted) { const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true))); return () => cancelAnimationFrame(id); }
    }, []);
    useEffect(() => {
      if (!whileInView) return;
      if (typeof IntersectionObserver === "undefined" || !el.current) { setInView(true); return; }
      const amt = viewport && typeof viewport.amount === "number" ? viewport.amount : 0.1;
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); if (!viewport || viewport.once !== false) io.disconnect(); } else if (viewport && viewport.once === false) setInView(false); }, { threshold: Math.min(amt, 0.25) });
      io.observe(el.current);
      return () => io.disconnect();
    }, []);
    const base = initial === false ? {} : resolve(initial, variants, custom);
    let target = base;
    if (mounted) target = { ...base, ...resolve(animate, variants, custom), ...(inView ? resolve(whileInView, variants, custom) : {}), ...(hover ? resolve(whileHover, variants, custom) : {}) };
    const s = { ...toStyle(target, transition), ...(style || {}) };
    const setRef = (n) => { el.current = n; if (typeof ref === "function") ref(n); else if (ref) ref.current = n; };
    const h = whileHover ? { onMouseEnter: (e) => { setHover(true); props.onMouseEnter && props.onMouseEnter(e); }, onMouseLeave: (e) => { setHover(false); props.onMouseLeave && props.onMouseLeave(e); } } : {};
    return React.createElement(tag, { ...rest, ...h, ref: setRef, style: s });
  });
}
const cache = {};
export const motion = new Proxy({}, { get: (_, tag) => cache[tag] || (cache[tag] = make(tag)) });
export const AnimatePresence = ({ children }) => <>{children}</>;
