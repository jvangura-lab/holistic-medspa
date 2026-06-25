"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — Lenis-driven inertial smooth scroll.
 *
 * Honors prefers-reduced-motion (bails entirely — native scroll only).
 * Cleans up on unmount. Mounted in app/layout.tsx wrapping children.
 *
 * DESIGN_SYSTEM.md §7: easing cubic-bezier(0.16, 1, 0.3, 1) "draw" curve.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mql.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      // Lenis defaults to wheel + touch — leave them on.
      lerp: 0.1,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
