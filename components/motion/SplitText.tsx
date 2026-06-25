"use client";

import { useEffect, useRef, type ElementType, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { registerEases } from "@/lib/motion/eases";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";
import { useMotionReady } from "./MotionReady";

type SplitMode = "chars" | "words" | "lines";

/**
 * SplitText — text-splitting animation (owner motion req #5).
 *
 * Splits text via split-type (free MIT alternative to GSAP SplitText) into chars,
 * words, or lines. Each fragment animates from below + opacity 0 with cascade stagger.
 *
 * Triggers via GSAP ScrollTrigger when text enters viewport. For hero / above-the-fold
 * use trigger="immediate" to fire on mount without scroll dependency.
 *
 * R4.C: gated on useMotionReady() — CRITICAL for SplitText. Text splits depend on
 * font metrics (line-heights, glyph widths). Splitting before fonts decode produces
 * wrong word/line wrap, then the post-decode reflow leaves animation fragments at
 * stale positions. Waiting for fonts.ready + window.load fixes this.
 *
 * Honors prefers-reduced-motion: renders static, no animation.
 */
export default function SplitText({
  text,
  children,
  mode = "words",
  className = "",
  style,
  as: Tag = "span",
  stagger = 0.06,
  duration = 1.0,
  delay = 0,
  start = "top 85%",
  immediate = false,
  yFrom = 100,
}: {
  text?: string;
  children?: ReactNode;
  mode?: SplitMode;
  className?: string;
  style?: CSSProperties;
  as?: ElementType;
  stagger?: number;
  duration?: number;
  delay?: number;
  start?: string;
  immediate?: boolean;
  yFrom?: number;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const ready = useMotionReady();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;
    if (!ready) return;

    gsap.registerPlugin(ScrollTrigger);
    registerEases();

    // Split the text. split-type mutates the DOM in place, wrapping fragments in spans.
    // Safe to split now: fonts have decoded (gated by ready), so line wrap is final.
    const split = new SplitType(node, {
      types: mode === "lines" ? "lines" : mode === "chars" ? "chars,words" : "words",
      tagName: "span",
    });

    const targets =
      mode === "chars"
        ? (split.chars ?? [])
        : mode === "lines"
        ? (split.lines ?? [])
        : (split.words ?? []);

    if (targets.length === 0) return;

    // Inline-block + overflow needed so y translate doesn't clip outside line box
    targets.forEach((el) => {
      const e = el as HTMLElement;
      e.style.display = "inline-block";
      e.style.willChange = "transform, opacity";
    });

    gsap.set(targets, { yPercent: yFrom, opacity: 0 });

    // For above-the-fold (or any element ALREADY in viewport when ready fires),
    // run the animation immediately without ScrollTrigger.
    const rect = node.getBoundingClientRect();
    const vh = window.innerHeight;
    const alreadyInView = rect.top < vh * 0.85;

    const useImmediate = immediate || alreadyInView;

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration,
      delay,
      ease: "expo-out",
      stagger,
      ...(useImmediate
        ? {}
        : {
            scrollTrigger: {
              trigger: node,
              start,
              toggleActions: "play none none none",
            },
          }),
    });

    // Refresh so any newly-created ScrollTrigger has accurate positions.
    if (!useImmediate) {
      ScrollTrigger.refresh();
    }

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === node)
        .forEach((t) => t.kill());
      split.revert();
    };
  }, [text, mode, stagger, duration, delay, start, immediate, yFrom, ready]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className} style={style} aria-label={text}>
      {text ?? children}
    </Component>
  );
}
