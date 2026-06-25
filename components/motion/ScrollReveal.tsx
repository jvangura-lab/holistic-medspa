"use client";

import { useEffect, useRef, type ReactNode, type CSSProperties, type ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerEases } from "@/lib/motion/eases";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";

type Variant = "mask" | "lift" | "unblur" | "iris";

/**
 * ScrollReveal — viewport-detected entrance, GSAP-driven (NOT IntersectionObserver).
 *
 * Variants encode design intent — never a generic fade:
 *   - mask    clip-path inset(0 0 100% 0) → inset(0)  (sheet pulled up)
 *   - lift    translateY(80px) + opacity 0 → 0 + 1     (text settles in)
 *   - unblur  filter: blur(20px) → blur(0)              (focus pull)
 *   - iris    clip-path circle(0%) → circle(100%)       (aperture open)
 *
 * Triggered by GSAP ScrollTrigger onEnter at start "top 78%".
 * Uses brand ease "veil" (calm, drawn-out).
 * Honors prefers-reduced-motion: skips animation, renders at final state.
 */
export default function ScrollReveal({
  children,
  variant = "lift",
  delay = 0,
  duration = 0.95,
  start = "top 78%",
  as: Tag = "div",
  className = "",
  style = {},
  once = true,
}: {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  duration?: number;
  start?: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) {
      // ensure visible
      gsap.set(node, { clearProps: "all" });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);
    registerEases();

    // Initial state per variant
    const initial: gsap.TweenVars = (() => {
      switch (variant) {
        case "mask":
          return { clipPath: "inset(0 0 100% 0)", opacity: 0.001 };
        case "unblur":
          return { filter: "blur(20px)", opacity: 0 };
        case "iris":
          return { clipPath: "circle(0% at 50% 50%)", opacity: 0.001 };
        case "lift":
        default:
          return { y: 80, opacity: 0 };
      }
    })();

    const final: gsap.TweenVars = (() => {
      switch (variant) {
        case "mask":
          return { clipPath: "inset(0 0 0 0)", opacity: 1 };
        case "unblur":
          return { filter: "blur(0px)", opacity: 1 };
        case "iris":
          return { clipPath: "circle(100% at 50% 50%)", opacity: 1 };
        case "lift":
        default:
          return { y: 0, opacity: 1 };
      }
    })();

    gsap.set(node, initial);

    const tween = gsap.to(node, {
      ...final,
      duration,
      delay,
      ease: "veil",
      scrollTrigger: {
        trigger: node,
        start,
        toggleActions: once ? "play none none none" : "play reverse play reverse",
        // markers: true, // dev only
      },
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === node)
        .forEach((t) => t.kill());
    };
  }, [variant, delay, duration, start, once]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className} style={style}>
      {children}
    </Component>
  );
}
