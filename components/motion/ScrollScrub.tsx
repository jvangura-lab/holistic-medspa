"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";
import { useMotionReady } from "./MotionReady";

/**
 * ScrollScrub — scroll-position-tied animation (owner motion req #1 + #4 parallax).
 *
 * Most common use: parallax. As scroll progresses through the trigger's start/end
 * range, the wrapped element interpolates from its starting transform to `to`.
 *
 * Example for parallax:
 *   <ScrollScrub to={{ y: -50 }} start="top bottom" end="bottom top">…</ScrollScrub>
 *
 * R4.C: gated on useMotionReady() so scrubs activate only after page fully ready
 * (fonts + images loaded → trigger positions are calculated against final layout).
 *
 * Honors prefers-reduced-motion: no scrub, renders at neutral.
 */
export default function ScrollScrub({
  children,
  to,
  start = "top bottom",
  end = "bottom top",
  scrub = 1,
  className = "",
  style = {},
}: {
  children: ReactNode;
  to: gsap.TweenVars;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const ready = useMotionReady();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);

    const tween = gsap.to(node, {
      ...to,
      ease: "none",
      scrollTrigger: {
        trigger: node,
        start,
        end,
        scrub,
      },
    });

    // Refresh so this scrub's start/end positions are computed against the
    // post-load document.
    ScrollTrigger.refresh();

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === node)
        .forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end, scrub, ready]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
