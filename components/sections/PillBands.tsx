"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

/**
 * Three sticky-stacking pill bands — Figma nodes 125:273 (Sessions), 125:280 (Treatments), 125:287 (Services).
 *
 * Visual: original Figma-cloned full-bleed bg image per band + dark scrim overlay + Spectral 80px H2 label
 *         at left + mint arrow at right + rounded-pill (radius 50).
 * Motion: sticky-stacking — each band pins at top of viewport when scrolled to; next band overlays z-up
 *         (sticky's natural stacking); previous scales down for depth perception (subtle 1.0 → 0.95 → 0.90
 *         per owner directive). Last band fades opacity in final 15% of scroll progress as the next section
 *         enters ("fade into next section with transparency").
 * Stack:  motion/react useScroll + useTransform; original layout (NOT the 21st.dev demo structure).
 *         Mobile: R4.A horizontal swipe carousel — UNCHANGED.
 */

const bands = [
  { label: "Sessions",    bg: "/media/figma-slots/sessions-band-bg.jpg",    scrimAlpha: 0.55 },
  { label: "Treatments",  bg: "/media/figma-slots/treatments-band-bg.jpg",  scrimAlpha: 0.5 },
  { label: "Services",    bg: "/media/figma-slots/services-band-bg.jpg",    scrimAlpha: 0.45 },
];

function StackingBand({
  i,
  label,
  bg,
  scrimAlpha,
  progress,
  isLast,
}: {
  i: number;
  label: string;
  bg: string;
  scrimAlpha: number;
  progress: MotionValue<number>;
  isLast: boolean;
}) {
  // Subtle stack: 1.0 (latest, i=2) → 0.95 (middle, i=1) → 0.90 (first, i=0).
  // Formula: targetScale = 1 - (count - i - 1) * 0.05 with count = 3.
  const count = bands.length;
  const targetScale = 1 - (count - i - 1) * 0.05;
  // Each band's scale animates over its own scroll segment (i/count → 1) so the
  // shrink coincides with the next band entering.
  const scale = useTransform(progress, [i / count, 1], [1, targetScale]);
  // Only the last band fades on exit — others stay at full opacity beneath the stack.
  const opacity = useTransform(progress, [0.85, 1], isLast ? [1, 0] : [1, 1]);

  return (
    <div className="h-screen sticky top-0 flex items-start justify-center pt-[12vh]">
      <motion.div
        style={{ scale, opacity, transformOrigin: "top center" }}
        className="relative w-[90%] max-w-[1300px] h-[480px] rounded-[50px] overflow-hidden shadow-[0_24px_80px_-30px_rgba(0,0,0,0.45)]"
      >
        <Image
          src={bg}
          alt=""
          fill
          priority={i === 0}
          sizes="(max-width: 1600px) 90vw, 1300px"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,${scrimAlpha}) 0%, rgba(0,0,0,${Math.min(scrimAlpha + 0.15, 0.7)}) 100%)`,
          }}
        />
        <Link
          href="/services"
          className="absolute inset-0 flex items-center justify-between px-[60px] md:px-[80px] group"
          aria-label={`${label} — explore`}
        >
          <h2
            className="font-spectral text-white not-italic"
            style={{ fontSize: 80, lineHeight: "80px", letterSpacing: "-3.2px", fontWeight: 400 }}
          >
            {label}
          </h2>
          <svg
            width="60"
            height="40"
            viewBox="0 0 60 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
            className="transition-transform duration-300 ease-[var(--ease-settle,cubic-bezier(0.65,0,0.35,1))] group-hover:translate-x-2"
          >
            <path
              d="M2 20 H52 M52 20 L36 4 M52 20 L36 36"
              stroke="#7db88a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
        </Link>
      </motion.div>
    </div>
  );
}

export default function PillBands() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      aria-label="What we offer — sessions, treatments, services"
      className="relative w-full bg-white"
    >
      {/* DESKTOP — sticky-stacking with motion/react useScroll + useTransform.
          Each band is its own h-screen sticky child. Sticky's natural top:0 + z-stacking
          (later children paint over earlier) gives the overlay effect for free.
          Per-band scale-down (1.0 → 0.95 → 0.90) adds depth. Last band fades on exit. */}
      <div className="hidden md:block">
        {bands.map((band, i) => (
          <StackingBand
            key={band.label}
            i={i}
            label={band.label}
            bg={band.bg}
            scrimAlpha={band.scrimAlpha}
            progress={scrollYProgress}
            isLast={i === bands.length - 1}
          />
        ))}
      </div>

      {/* MOBILE — R4.A optimized: horizontal swipe carousel with scroll-snap. UNTOUCHED. */}
      <div className="md:hidden py-8">
        <div className="scroll-snap-x gap-4 px-5">
          {[
            { label: "Sessions", bg: "/media/figma-slots/sessions-band-bg.jpg", opacity: "opacity-40", sub: "ZYTO · Lymphatic · Bach" },
            { label: "Treatments", bg: "/media/figma-slots/treatments-band-bg.jpg", opacity: "opacity-55", sub: "Sauna · Vibra · Foot bath" },
            { label: "Services", bg: "/media/figma-slots/services-band-bg.jpg", opacity: "opacity-70", sub: "Consults · Thermography" },
          ].map((b) => (
            <Link
              key={b.label}
              href="/services"
              className="scroll-snap-item tap-press relative block h-[220px] rounded-[28px] overflow-hidden"
              style={{ width: "80vw", maxWidth: 320 }}
            >
              <div className="absolute inset-0 bg-black" />
              <Image src={b.bg} alt="" fill sizes="80vw" className={`object-cover ${b.opacity}`} />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65), transparent)" }}
              />
              <div className="absolute left-5 right-5 bottom-5">
                <h2
                  className="font-spectral text-white mb-1"
                  style={{ fontSize: 32, lineHeight: "34px", letterSpacing: "-1px", fontWeight: 400 }}
                >
                  {b.label}
                </h2>
                <p
                  className="font-clash text-mint uppercase"
                  style={{ fontSize: 11, letterSpacing: "1.2px", fontWeight: 500 }}
                >
                  {b.sub}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* Subtle swipe hint per skill — empty states / affordance signals */}
        <p
          className="text-center font-clash uppercase text-ink-body/40 mt-4 px-5"
          style={{ fontSize: 10, letterSpacing: "1.4px", fontWeight: 500 }}
        >
          Swipe to explore →
        </p>
      </div>
    </section>
  );
}
