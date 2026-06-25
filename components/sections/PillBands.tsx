"use client";

import Image from "next/image";
import Link from "next/link";
import StackingCards from "@/components/ui/stacking-card";

/**
 * Three sticky-stacking pill bands — Figma nodes 125:273, 125:280, 125:287.
 *
 * R4.B — desktop block now uses 21st.dev StackingCards (motion/react + ReactLenis).
 * The previous R3.C GSAP pin attempt was broken; this replaces it with the
 * owner-provided 21st.dev component verbatim (see components/ui/stacking-card.tsx)
 * and adapts the consumer data shape only.
 *
 * Mobile: natural-flow stack — UNTOUCHED (R4.A territory).
 */

// Bands data — title/description pulled from existing PillBands content +
// DESIGN_SYSTEM.md §4. `link` field carries the bg image URL (the 21st.dev
// Card uses `url` for <img src>); colors are dark BRAND.md hexes so the outer
// card reads dark while the inner image dominates.
const bands = [
  {
    title: "Sessions",
    description:
      "Personal one-on-one bodywork — tailored sessions for grounded restoration.",
    link: "/media/figma-slots/sessions-band-bg.jpg",
    color: "#231f20", // ink — dark neutral
  },
  {
    title: "Treatments",
    description:
      "Targeted treatments for deep recovery and lasting balance.",
    link: "/media/figma-slots/treatments-band-bg.jpg",
    color: "#1b3311", // deep-forest
  },
  {
    title: "Services",
    description:
      "Holistic services that move you toward long-term well-being.",
    link: "/media/figma-slots/services-band-bg.jpg",
    color: "#443c38", // warm-brown
  },
];

export default function PillBands() {
  return (
    <section
      aria-label="What we offer — sessions, treatments, services"
      className="relative w-full bg-white"
    >
      {/* DESKTOP: 21st.dev stacking-card (motion/react + ReactLenis) */}
      <div className="hidden md:block">
        <StackingCards projects={bands} />
      </div>

      {/* MOBILE — R4.A optimized: horizontal swipe carousel with scroll-snap.
          Skill: category browsing reads more native as horizontal swipe with peek-of-next
          (vs. tall stacked tiles that demand vertical scroll). Tiles 80vw so the next
          peeks → signals more content + invites swipe. Scroll-snap-start aligns release. */}
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
