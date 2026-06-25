"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type ReactNode, type CSSProperties, useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";

/**
 * MagneticHover — mouse-proximity magnetic pull on interactive elements
 * (owner motion req #4: easing motion for vibe/mood).
 *
 * Framer Motion useMotionValue + useSpring drives the transform. Pull strength
 * is proportional to mouse offset from element center, clamped at `strength`px.
 *
 * Honors prefers-reduced-motion: renders a plain wrapper, no motion.
 */
export default function MagneticHover({
  children,
  strength = 18,
  className = "",
  style,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 22, mass: 0.6 });

  if (prefersReducedMotion()) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    x.set(Math.max(-1, Math.min(1, dx)) * strength);
    y.set(Math.max(-1, Math.min(1, dy)) * strength);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}
