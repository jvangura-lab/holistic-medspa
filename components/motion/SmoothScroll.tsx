"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerEases } from "@/lib/motion/eases";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";

/**
 * SmoothScroll — Lenis inertial scroll wired into GSAP ticker + ScrollTrigger.
 *
 * Canonical integration pattern from GSAP docs:
 *   1. lenis.on('scroll', ScrollTrigger.update) — refresh STs on every lenis frame
 *   2. gsap.ticker.add(time => lenis.raf(time * 1000)) — single rAF loop
 *   3. gsap.ticker.lagSmoothing(0) — pause-tab safety
 *
 * This replaces R2's standalone Lenis init (which had its own rAF — caused jank
 * because ScrollTrigger ran on a different timing).
 *
 * Reduced-motion: bails entirely — native scroll only, no GSAP plugins.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    registerEases();

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
    });

    // Wire Lenis scroll events into ScrollTrigger so pins/scrubs stay locked.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis off the GSAP ticker so we have ONE rAF (no competing loops).
    const tickerCb = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // After mount + fonts/images settle, refresh ScrollTrigger so pin positions are accurate.
    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      // Kill any ScrollTriggers tied to this layout
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return null;
}
