"use client";

import { useEffect, useRef, type ElementType, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { registerEases } from "@/lib/motion/eases";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";

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

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (prefersReducedMotion()) return;

    gsap.registerPlugin(ScrollTrigger);
    registerEases();

    // Split the text. split-type mutates the DOM in place, wrapping fragments in spans.
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

    const tween = gsap.to(targets, {
      yPercent: 0,
      opacity: 1,
      duration,
      delay,
      ease: "expo-out",
      stagger,
      ...(immediate
        ? {}
        : {
            scrollTrigger: {
              trigger: node,
              start,
              toggleActions: "play none none none",
            },
          }),
    });

    return () => {
      tween.kill();
      ScrollTrigger.getAll()
        .filter((t) => t.trigger === node)
        .forEach((t) => t.kill());
      split.revert();
    };
  }, [text, mode, stagger, duration, delay, start, immediate, yFrom]);

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className} style={style} aria-label={text}>
      {text ?? children}
    </Component>
  );
}
