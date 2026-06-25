"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerEases } from "@/lib/motion/eases";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";
import { useSetLenisReady } from "./MotionReady";

/**
 * SmoothScroll — Lenis inertial scroll wired into GSAP ticker + ScrollTrigger.
 *
 * Canonical integration pattern from GSAP docs (R4.C hardened):
 *   1. lenis.on('scroll', ScrollTrigger.update) — refresh STs on every lenis frame
 *   2. gsap.ticker.add(time => lenis.raf(time * 1000)) — single rAF loop
 *   3. gsap.ticker.lagSmoothing(0) — pause-tab safety
 *   4. ScrollTrigger.refresh() on document.fonts.ready (line-heights reflow after font swap)
 *   5. ScrollTrigger.refresh() on window 'load' (images/iframes affect document height)
 *   6. setLenisReady() — signals MotionReadyProvider that smooth-scroll is up
 *
 * Reduced-motion: bails entirely — native scroll only, no GSAP plugins.
 */
export default function SmoothScroll() {
  const setLenisReady = useSetLenisReady();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) {
      // Still need to flag ready so MotionReady context resolves.
      setLenisReady();
      return;
    }

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

    // Refresh ScrollTrigger after fonts decode (line-heights & metrics settle).
    const fontsRefresh = () => {
      ScrollTrigger.refresh();
    };
    if ("fonts" in document) {
      document.fonts.ready.then(fontsRefresh);
    }

    // Refresh after window.load (images, iframes finish loading; doc height final).
    const onWindowLoad = () => {
      ScrollTrigger.refresh();
    };
    if (document.readyState === "complete") {
      // Already loaded — fire on next tick so primitives' mount effects flush first.
      window.setTimeout(onWindowLoad, 0);
    } else {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    // Refresh on resize (orientation change, devtools toggle).
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    // Initial settle refresh — covers SSR hydration race + late-mounting primitives.
    const initialRefresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    // Signal MotionReady context that Lenis is up.
    setLenisReady();

    return () => {
      window.clearTimeout(initialRefresh);
      window.removeEventListener("load", onWindowLoad);
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [setLenisReady]);

  return null;
}
