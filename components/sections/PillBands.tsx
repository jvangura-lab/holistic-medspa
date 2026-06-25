"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerEases } from "@/lib/motion/eases";
import { prefersReducedMotion } from "@/lib/motion/prefersReducedMotion";
import SplitText from "@/components/motion/SplitText";

/**
 * Three sticky-stacking pill bands — Figma nodes 125:273, 125:280, 125:287.
 * Source: research/references/figma-ds/design-context/sections-mid-NEW.tsx
 *
 * R3.C MOTION REDO — stacking-card overlap (owner's headline deliverable):
 *   - Each band is its own pin window (`ScrollTrigger pin: true`, end: "+=100%")
 *   - z-index ascends 1 → 2 → 3 so band N overlays bands < N
 *   - As band 3 (Services) exits its pin window, opacity ramps 1 → 0 (scrub) so
 *     the stack fades into the next section — owner's "fade into next section
 *     with transparency" requirement.
 *   - H2 word reveal triggers per-band as each enters its pin window.
 *
 * Mobile: natural-flow stack (no sticky pinning — mobile interaction model is scroll, not stack).
 *
 * Reduced-motion: pin behavior is skipped entirely (the .stack-host wrapper
 * collapses to natural flow with the 3 bands stacked vertically).
 */
export default function PillBands() {
  const stackRef = useRef<HTMLDivElement | null>(null);
  const band1Ref = useRef<HTMLDivElement | null>(null);
  const band2Ref = useRef<HTMLDivElement | null>(null);
  const band3Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;
    if (window.innerWidth < 768) return; // mobile uses natural flow
    const stack = stackRef.current;
    const b1 = band1Ref.current;
    const b2 = band2Ref.current;
    const b3 = band3Ref.current;
    if (!stack || !b1 || !b2 || !b3) return;

    gsap.registerPlugin(ScrollTrigger);
    registerEases();

    const ctx = gsap.context(() => {
      const bands = [b1, b2, b3];

      bands.forEach((band, idx) => {
        // Pin each band for one viewport-height of scroll. Band N covers band N-1
        // because z-index ascends (set inline below in JSX). The pinSpacing of each
        // pin adds the scroll distance, so the parent total height grows organically.
        ScrollTrigger.create({
          trigger: band,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });
      });

      // Final band (Services) opacity ramp 1 → 0 during the LAST 35% of its pin window,
      // so the whole stack fades into next section.
      gsap.to([b1, b2, b3], {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: b3,
          start: "top+=65% top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Refresh after layout has settled (fonts, images).
      const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
      return () => window.clearTimeout(refreshTimer);
    }, stack);

    return () => ctx.revert();
  }, []);

  return (
    <section
      aria-label="What we offer — sessions, treatments, services"
      className="relative w-full bg-white"
    >
      {/* Desktop sticky-stacking layout — pin-based, parent grows to fit pinSpacing of 3 bands */}
      <div ref={stackRef} className="hidden md:block relative mx-auto w-full max-w-[1600px]">

        {/* BAND 1: Sessions — z-1 (gets covered by band 2 + 3) */}
        <div ref={band1Ref} className="relative w-full" style={{ height: "100vh", zIndex: 1 }}>
          <div
            className="absolute h-[458px] rounded-pill overflow-hidden left-1/2 -translate-x-1/2"
            style={{ top: "calc(50vh - 229px)", width: 1300 }}
          >
            <div className="absolute inset-0 bg-black rounded-pill" />
            <Image
              src="/media/figma-slots/sessions-band-bg.jpg"
              alt=""
              fill
              sizes="1300px"
              className="object-cover rounded-pill opacity-30"
            />
            <h2
              className="absolute font-spectral text-white"
              style={{
                left: 235,
                top: 57,
                fontSize: 80,
                lineHeight: "80px",
                letterSpacing: "-3.2px",
                fontWeight: 400,
              }}
            >
              <SplitText text="Sessions" mode="words" stagger={0.08} duration={0.95} start="top 80%" />
            </h2>
            <Link
              href="/services"
              aria-label="View sessions"
              className="absolute"
              style={{ left: "calc(83.33% - 31.33px)", top: 77, width: 59.375, height: 40 }}
            >
              <Image
                src="/figma-assets/imgGroup1.svg"
                alt=""
                width={60}
                height={40}
                className="block"
                style={{ width: "100%", height: "100%" }}
              />
            </Link>
          </div>
        </div>

        {/* BAND 2: Treatments — z-2 (covers band 1) */}
        <div ref={band2Ref} className="relative w-full" style={{ height: "100vh", zIndex: 2 }}>
          <div
            className="absolute h-[583px] rounded-pill overflow-hidden left-1/2 -translate-x-1/2"
            style={{ top: "calc(50vh - 291px)", width: 1300 }}
          >
            <div className="absolute inset-0 bg-black rounded-pill" />
            <Image
              src="/media/figma-slots/treatments-band-bg.jpg"
              alt=""
              fill
              sizes="1300px"
              className="object-cover rounded-pill opacity-50"
            />
            <h2
              className="absolute font-spectral text-white"
              style={{
                left: 235,
                top: 49,
                fontSize: 80,
                lineHeight: "80px",
                letterSpacing: "-3.2px",
                fontWeight: 400,
              }}
            >
              <SplitText text="Treatments" mode="words" stagger={0.08} duration={0.95} start="top 80%" />
            </h2>
            <Link
              href="/services"
              aria-label="View treatments"
              className="absolute"
              style={{ left: "calc(83.33% - 31.33px)", top: 69, width: 59.28, height: 40 }}
            >
              <Image
                src="/figma-assets/imgGroup2.svg"
                alt=""
                width={60}
                height={40}
                className="block"
              />
            </Link>
          </div>
        </div>

        {/* BAND 3: Services — z-3 (covers bands 1 & 2), warm-brown bg */}
        <div ref={band3Ref} className="relative w-full" style={{ height: "100vh", zIndex: 3 }}>
          <div
            className="absolute h-[698px] rounded-pill overflow-hidden left-1/2 -translate-x-1/2"
            style={{ top: "calc(50vh - 349px)", width: 1300 }}
          >
            <div className="absolute inset-0 bg-brown rounded-pill" />
            <Image
              src="/media/figma-slots/services-band-bg.jpg"
              alt=""
              fill
              sizes="1300px"
              className="object-cover rounded-pill"
            />
            <h2
              className="absolute font-spectral text-white"
              style={{
                left: "calc(8.33% + 106.67px)",
                top: 53,
                fontSize: 80,
                lineHeight: "80px",
                letterSpacing: "-3.2px",
                fontWeight: 400,
              }}
            >
              <SplitText text="Services" mode="words" stagger={0.08} duration={0.95} start="top 80%" />
            </h2>
            <Link
              href="/services"
              aria-label="View services"
              className="absolute"
              style={{ left: "calc(83.33% - 30.33px)", top: 73, width: 57, height: 40 }}
            >
              <Image
                src="/figma-assets/imgGroup3.svg"
                alt=""
                width={57}
                height={40}
                className="block"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE: 3 stacked rounded cards (no sticky stacking — natural flow) */}
      <div className="md:hidden flex flex-col gap-4 px-4 py-8">
        {[
          { label: "Sessions", bg: "/media/figma-slots/sessions-band-bg.jpg", opacity: "opacity-30" },
          { label: "Treatments", bg: "/media/figma-slots/treatments-band-bg.jpg", opacity: "opacity-50" },
          { label: "Services", bg: "/media/figma-slots/services-band-bg.jpg", opacity: "" },
        ].map((b) => (
          <Link
            key={b.label}
            href="/services"
            className="relative block h-[180px] rounded-[28px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-black" />
            <Image src={b.bg} alt="" fill sizes="100vw" className={`object-cover ${b.opacity}`} />
            <h2
              className="absolute left-5 top-1/2 -translate-y-1/2 font-spectral text-white"
              style={{ fontSize: 40, letterSpacing: "-1.6px", fontWeight: 400 }}
            >
              {b.label}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
