"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties, type ElementType } from "react";

/**
 * Reveal — viewport-enter animation primitive.
 *
 * Variants: 'fade' (opacity+translateY), 'slide' (translateX configurable), 'mask' (clip-path inset).
 * Easing: cubic-bezier(0.22, 1, 0.36, 1) "veil"; duration 800ms desktop / 500ms mobile.
 * Honors prefers-reduced-motion: renders at final state immediately, no transition.
 *
 * Uses IntersectionObserver (zero JS lib weight beyond React).
 */

type Variant = "fade" | "slide" | "mask";
type Direction = "up" | "down" | "left" | "right";

export default function Reveal({
  children,
  variant = "fade",
  direction = "up",
  delay = 0,
  duration,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
  className = "",
  style = {},
}: {
  children: ReactNode;
  variant?: Variant;
  direction?: Direction;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(e.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [threshold, once, reducedMotion]);

  const dur = duration ?? (typeof window !== "undefined" && window.innerWidth < 768 ? 500 : 800);
  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

  const initial: CSSProperties = {};
  const final: CSSProperties = { opacity: 1, transform: "none", clipPath: "inset(0 0 0 0)" };

  if (variant === "fade") {
    initial.opacity = 0;
    initial.transform = "translateY(24px)";
  } else if (variant === "slide") {
    initial.opacity = 0;
    const dx = direction === "left" ? "32px" : direction === "right" ? "-32px" : "0";
    const dy = direction === "up" ? "32px" : direction === "down" ? "-32px" : "0";
    initial.transform = `translate(${dx}, ${dy})`;
  } else if (variant === "mask") {
    initial.clipPath = "inset(0 0 100% 0)";
    initial.opacity = 0.001;
  }

  const computed: CSSProperties = reducedMotion
    ? {}
    : {
        ...(visible ? final : initial),
        transition: `opacity ${dur}ms ${ease} ${delay}ms, transform ${dur}ms ${ease} ${delay}ms, clip-path ${dur + 100}ms ${ease} ${delay}ms`,
        willChange: visible ? undefined : "opacity, transform",
      };

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} className={className} style={{ ...computed, ...style }}>
      {children}
    </Component>
  );
}
