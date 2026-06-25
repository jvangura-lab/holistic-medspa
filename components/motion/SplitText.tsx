"use client";

import { useEffect, useRef, useState, type ElementType } from "react";

/**
 * SplitText — lightweight DOM-split word cascade on viewport enter.
 *
 * No GSAP licensing required. Splits text into word spans with inline-block display.
 * Each word: opacity 0 → 1 + translateY(40%) → 0 with stagger 60ms / word.
 * Per-word duration 700ms, easing cubic-bezier(0.22, 1, 0.36, 1) "veil".
 *
 * Honors prefers-reduced-motion: renders text statically, no transitions.
 */
export default function SplitText({
  text,
  className = "",
  style,
  as: Tag = "span",
  stagger = 60,
  duration = 700,
  delay = 0,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
  stagger?: number;
  duration?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [reducedMotion]);

  const words = text.split(/(\s+)/);
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className} style={style} aria-label={text}>
      {words.map((w, i) => {
        if (/^\s+$/.test(w)) {
          return <span key={i}>{w}</span>;
        }
        // Cap visual stagger so very long headlines do not drag (mask after 12 words)
        const idx = Math.min(Math.floor(i / 2), 12);
        const transform = visible || reducedMotion ? "translateY(0)" : "translateY(50%)";
        const opacity = visible || reducedMotion ? 1 : 0;
        return (
          <span
            key={i}
            aria-hidden
            style={{
              display: "inline-block",
              opacity,
              transform,
              transition: reducedMotion
                ? "none"
                : `opacity ${duration}ms ${ease} ${delay + idx * stagger}ms, transform ${duration}ms ${ease} ${delay + idx * stagger}ms`,
              willChange: visible ? undefined : "opacity, transform",
            }}
          >
            {w}
          </span>
        );
      })}
    </Component>
  );
}
