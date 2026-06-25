"use client";

/**
 * Reveal — backward-compatible shim.
 *
 * R2 used IntersectionObserver-based fade/slide/mask reveals. R3.C replaces that
 * with GSAP ScrollTrigger-driven entrances. This shim maps the legacy API onto
 * ScrollReveal's variant set so any leftover imports keep rendering while we
 * migrate sections to richer primitives (ScrollPin / ScrollScrub / SplitText).
 *
 * Legacy 'fade' and 'slide' → 'lift' (translateY + opacity, GSAP driven)
 * Legacy 'mask'             → 'mask' (clip-path inset, GSAP driven)
 *
 * Prefer ScrollReveal/ScrollPin/ScrollScrub directly for new code.
 */
import { type ReactNode, type CSSProperties, type ElementType } from "react";
import ScrollReveal from "./ScrollReveal";

type LegacyVariant = "fade" | "slide" | "mask";

export default function Reveal({
  children,
  variant = "fade",
  delay = 0,
  duration,
  as,
  className,
  style,
}: {
  children: ReactNode;
  variant?: LegacyVariant;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
}) {
  const mapped = variant === "mask" ? "mask" : "lift";
  // Translate ms → seconds (GSAP uses seconds)
  const seconds = duration ? duration / 1000 : 0.85;
  const delaySec = delay / 1000;
  return (
    <ScrollReveal
      variant={mapped}
      duration={seconds}
      delay={delaySec}
      as={as}
      className={className}
      style={style}
    >
      {children}
    </ScrollReveal>
  );
}
