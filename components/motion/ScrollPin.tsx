"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";
import { useMotionReady } from "./MotionReady";

/**
 * ScrollPin — sticky-pin a child element for a given scroll distance (owner motion req #3).
 *
 * Used for the stacking-card overlap on home / PillBands. Each pin window is one
 * viewport-height (default end: "+=100%") so the card holds while the next one
 * climbs underneath.
 *
 * R4.C: `pinType: 'fixed'` — required when using Lenis smooth scroll. Lenis
 * transforms the document body; without `pinType: fixed` ScrollTrigger's
 * absolute-positioned pin spacer reads stale positions and the pin "drifts".
 *
 * R4.C: gated on useMotionReady() so pins activate only after page fully ready.
 *
 * Honors prefers-reduced-motion: no pin, renders as static block.
 */
export default function ScrollPin({
  children,
  className = "",
  style = {},
  start = "top top",
  end = "+=100%",
  pinSpacing = true,
  anticipatePin = 1,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  start?: string;
  end?: string;
  pinSpacing?: boolean;
  anticipatePin?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const ready = useMotionReady();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);

    const st = ScrollTrigger.create({
      trigger: node,
      start,
      end,
      pin: true,
      pinSpacing,
      anticipatePin,
      pinType: "fixed", // Required for Lenis smooth-scroll compatibility.
    });

    // Refresh once the pin is created so its computed positions account for
    // current document height (post-load, post-font-decode).
    ScrollTrigger.refresh();

    return () => {
      st.kill();
    };
  }, [start, end, pinSpacing, anticipatePin, ready]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
