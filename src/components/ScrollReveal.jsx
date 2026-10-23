import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* Site-wide scroll animation (website pages only, not the portal):
   headings slide in from the side, pictures zoom in, cards rise one after another.
   Classes are removed after the animation so hover effects keep working. */
const ANIM = ["rv", "rv-up", "rv-left", "rv-right", "rv-zoom", "rv-in"];

export default function ScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (/^\/portal/i.test(pathname) || typeof IntersectionObserver === "undefined") return undefined;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timers = [];
    let io;
    const start = setTimeout(() => {
      const sections = [...document.querySelectorAll("section")].filter((s) => !s.closest("header, footer, nav, [data-noreveal]"));
      const items = [];
      const mark = (el, kind, delay = 0) => {
        if (!el || el.dataset.rv || (el.style && (el.style.transition || el.style.transform))) return;   // already animated elsewhere
        el.dataset.rv = "1";
        el.classList.add("rv", kind);
        if (delay) el.style.transitionDelay = `${delay}ms`;
        items.push(el);
      };
      // top of each page: heading and text slide in from the left, line by line; pictures from the right
      const top = sections[0];
      if (top) {
        [...top.querySelectorAll("h1, h1 ~ p, h1 + div p, p")].slice(0, 4).forEach((el, i) => mark(el, "rv-left", 150 + i * 160));
        top.querySelectorAll("img").forEach((im) => mark(im, "rv-right", 300));
      }
      sections.forEach((sec, si) => {
        sec.querySelectorAll("h2").forEach((h) => mark(h, si % 2 ? "rv-right" : "rv-left"));
        sec.querySelectorAll("img").forEach((im) => { if (!im.closest("[data-rv]")) mark(im, "rv-zoom"); });
        // only real layout grids (cards in columns), not small icon boxes
        sec.querySelectorAll('.grid[class*="grid-cols"], .grid[class*="gap-"]').forEach((g) => {
          [...g.children].filter((c) => !(c instanceof SVGElement)).slice(0, 12).forEach((c, i) => mark(c, "rv-up", Math.min(i, 5) * 110));
        });
      });
      io = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          // show it when it scrolls into view — or if the page has already gone past it
          if (!e.isIntersecting && e.boundingClientRect.top > 0) return;
          const el = e.target; io.unobserve(el);
          el.classList.add("rv-in");
          timers.push(setTimeout(() => { el.classList.remove(...ANIM); el.style.transitionDelay = ""; }, 1500));
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      items.forEach((el) => io.observe(el));
    }, 350);
    return () => {
      clearTimeout(start); timers.forEach(clearTimeout); if (io) io.disconnect();
      document.querySelectorAll("[data-rv]").forEach((el) => { el.classList.remove(...ANIM); el.style.transitionDelay = ""; delete el.dataset.rv; });
    };
  }, [pathname]);
  return null;
}
