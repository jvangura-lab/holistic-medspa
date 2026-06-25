"use client";

/**
 * MotionReady — page-load gate for all GSAP/Lenis-driven motion (R4.C).
 *
 * Owner reported: motion fires before content/fonts/images finish loading,
 * causing jank, wrong scroll trigger positions, and content stuck invisible.
 *
 * This Context exposes a `ready` boolean that flips to true only after ALL of:
 *   1. window 'load' event fired (HTML, CSS, images, iframes all loaded)
 *   2. document.fonts.ready resolved (web fonts decoded — line-heights settled)
 *   3. Lenis has signalled init (set via setLenisReady from SmoothScroll)
 *
 * Motion primitives consume `useMotionReady()` and early-return their useEffect
 * until ready === true. Until then they render children at their final state
 * (no opacity:0, no clip-path-inset, no transform) so content appears
 * IMMEDIATELY — only the motion is deferred.
 *
 * Reduced-motion users get `ready: true` immediately on mount AND every primitive
 * short-circuits via prefersReducedMotion() check (existing pattern preserved).
 *
 * After ready flips true, MotionReady fires a one-shot custom event
 * 'motion-ready' on window so primitives mounted later can also kick off.
 */

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";

type Ctx = {
  ready: boolean;
  setLenisReady: () => void;
};

const MotionReadyContext = createContext<Ctx>({
  ready: false,
  setLenisReady: () => {},
});

export function useMotionReady(): boolean {
  return useContext(MotionReadyContext).ready;
}

/** Internal — for SmoothScroll to signal Lenis is up. */
export function useSetLenisReady(): () => void {
  return useContext(MotionReadyContext).setLenisReady;
}

export function MotionReadyProvider({ children }: { children: ReactNode }) {
  const [windowLoaded, setWindowLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [lenisReady, setLenis] = useState(false);
  // Reduced-motion bypass — flips ready true immediately, no waiting.
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (prefersReducedMotion()) {
      setReducedMotion(true);
      return;
    }

    // window.load — fires after all subresources (images, iframes) finish
    if (document.readyState === "complete") {
      setWindowLoaded(true);
    } else {
      const onLoad = () => setWindowLoaded(true);
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

    // document.fonts.ready — resolves when all @font-face declarations finish loading
    if ("fonts" in document) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      // Older browsers — fall back to a short timeout
      const t = window.setTimeout(() => setFontsLoaded(true), 800);
      return () => window.clearTimeout(t);
    }
  }, []);

  const setLenisReady = useCallback(() => {
    setLenis(true);
  }, []);

  const ready = reducedMotion || (windowLoaded && fontsLoaded && lenisReady);

  // Broadcast a one-shot event for any escape-hatch code (e.g. third-party libs)
  useEffect(() => {
    if (!ready) return;
    if (typeof window === "undefined") return;
    window.dispatchEvent(new CustomEvent("motion-ready"));
  }, [ready]);

  const value = useMemo<Ctx>(() => ({ ready, setLenisReady }), [ready, setLenisReady]);

  return <MotionReadyContext.Provider value={value}>{children}</MotionReadyContext.Provider>;
}
