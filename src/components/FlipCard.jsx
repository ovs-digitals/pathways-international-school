import { useEffect, useState } from "react";

/**
 * 3D flip card — flips on hover (desktop) and on tap (mobile / keyboard).
 * Give it a fixed height via className (e.g. "h-80").
 */
export default function FlipCard({ front, back, className = "", label }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={flipped}
      onClick={() => setFlipped((v) => !v)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
      className={`flip-card ${flipped ? "is-flipped" : ""} ${className}`}
    >
      <div className="flip-inner">
        <div className="flip-face">{front}</div>
        <div className="flip-face flip-back">{back}</div>
      </div>
    </div>
  );
}

/** Rotating words with a 3D flip-in animation. */
export function FlipWords({ words, interval = 2600, className = "" }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => clearInterval(id);
  }, [words.length, interval]);
  return (
    <span className="flip-word-wrap" aria-live="polite">
      <span key={i} className={`flip-word ${className}`}>
        {words[i]}
      </span>
    </span>
  );
}
