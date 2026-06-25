"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";

/**
 * ScrollScrub — scroll-position-tied animation (owner motion req #1 + #4 parallax).
 *
 * Most common use: parallax. As scroll progresses through the trigger's start/end
 * range, the wrapped element interpolates from its starting transform to `to`.
 *
 * Example for parallax:
 *   <ScrollScrub to={{ y: -50 }} start="top bottom" end="bottom top">…</ScrollScrub>
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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;

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

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === node)
        .forEach((t) => t.kill());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, end, scrub]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
