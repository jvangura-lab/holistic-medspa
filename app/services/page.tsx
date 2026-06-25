import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/sections/Header";
import ServiceHero from "@/components/sections/ServiceHero";
import ScheduleSession from "@/components/sections/ScheduleSession";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";
import { SERVICES } from "@/lib/services-data";

/**
 * /services — Services Index
 *
 * Composition per DESIGN_SYSTEM.md §5.2 register row for /services
 *   Hero(480h) → Pill band header → 8-tile service-card grid → Schedule form → Footer
 *
 * Copy poured verbatim from CONTENT.md `/services` block (lines 95-126).
 * 8 services from CONTENT.md sitemap → SERVICES catalog in lib/services-data.ts.
 *
 * Voice-anchor count target on this page: 0 (budget consumed on home; remaining anchors
 * reserved for /about etc. in F3.4).
 */

export const metadata: Metadata = {
  title: "Services — Holistic Medspa, Cut Off LA",
  description:
    "Eight wellness offerings at Holistic Medspa in Cut Off, Louisiana: ZYTO scans, lymphatic drainage, infrared sauna, thermography, naturopathy consultations, Bach flowers, doTERRA essential oils, and hosted modalities.",
  keywords: [
    "holistic wellness services Cut Off LA",
    "naturopathy services Louisiana",
    "lymphatic drainage services Bayou Lafourche",
    "infrared sauna services Cut Off",
    "ZYTO scan price Louisiana",
    "essential oils retail Cut Off",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Holistic Medspa, Cut Off LA",
    description:
      "Eight bookable wellness offerings at Holistic Medspa, Cut Off, Louisiana. By appointment, by hand, by Toya.",
    type: "website",
  },
};

// Icon mapping reuses the figma-asset glyph register from F3.2 WhatWeOffer (no new icons).
const ICON_BY_SLUG: Record<string, { src: string; size: number }> = {
  "zyto-wellness-scan": { src: "/figma-assets/imgSpaSvgrepoCom1.svg", size: 91 },
  "lymphatic-drainage": { src: "/figma-assets/imgSpaSolidSvgrepoCom1.svg", size: 91 },
  "millys-minutes": { src: "/figma-assets/imgVector.svg", size: 91 },
  thermography: { src: "/figma-assets/imgGroup.svg", size: 91 },
  "naturopathy-consultation": { src: "/figma-assets/imgGroup5.svg", size: 91 },
  "bach-flowers": { src: "/figma-assets/imgVector1.svg", size: 91 },
  "essential-oils": { src: "/figma-assets/imgVector2.svg", size: 91 },
  "hosted-modalities": { src: "/figma-assets/imgGroup.svg", size: 91 },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Services at Holistic Medspa",
  itemListElement: SERVICES.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: s.name,
    url: `https://holistic-v6.vercel.app/services/${s.slug}`,
  })),
};

export default function ServicesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative bg-white brand-loader">
        <Header />
        <ServiceHero
          headline="The current catalog."
          sub="Eight offerings. Bookable by call, text, or the request form. Some are in-house every week; one (thermography) is a hosted clinic with a visiting practitioner; one (ultrasound) is a hosted-only event that runs when Sound Prevention brings their mobile clinic to us."
          image="/media/services/service-naturopathy-consultation.jpg"
          imageAlt="The apothecary at Holistic Medspa, Cut Off, Louisiana."
          ctaHref="/book"
          ctaLabel="Request Consult"
        />

        {/* "Sessions" pill header band — extends DS §3.2 pill band pattern at reduced height
            (240px) to anchor the catalog with the same visual vocabulary as the home page. */}
        <section
          aria-label="All services"
          className="relative w-full bg-white py-12 md:py-20"
        >
          <div className="hidden md:block relative mx-auto w-full max-w-[1600px]">
            <div
              className="relative h-[240px] rounded-pill overflow-hidden mx-auto"
              style={{ width: "min(1300px, calc(100% - 60px))" }}
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
                className="absolute left-[80px] top-1/2 -translate-y-1/2 font-spectral text-white"
                style={{
                  fontSize: 64,
                  lineHeight: "64px",
                  letterSpacing: "-2.6px",
                  fontWeight: 400,
                }}
              >
                All Services
              </h2>
            </div>
          </div>

          {/* Mobile compact band */}
          <div className="md:hidden px-4">
            <div className="relative h-[140px] rounded-[28px] overflow-hidden">
              <div className="absolute inset-0 bg-black" />
              <Image
                src="/media/figma-slots/sessions-band-bg.jpg"
                alt=""
                fill
                sizes="100vw"
                className="object-cover opacity-30"
              />
              <h2
                className="absolute left-5 top-1/2 -translate-y-1/2 font-spectral text-white"
                style={{ fontSize: 32, letterSpacing: "-1.2px", fontWeight: 400 }}
              >
                All Services
              </h2>
            </div>
          </div>
        </section>

        {/* 8-card grid using DS §3.3 service-card chrome (extended to a richer card with
            short description per CONTENT.md /services "The list" block). */}
        <section className="relative w-full bg-white pb-20 md:pb-28" aria-label="Service catalog">
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
            <p
              className="font-manrope text-ink-body mb-12 md:mb-16 [word-break:break-word]"
              style={{
                fontSize: "clamp(16px, 1.4vw, 20px)",
                lineHeight: 1.6,
                letterSpacing: "-0.3px",
                fontWeight: 400,
                maxWidth: 820,
              }}
            >
              Each card links to a full page with what it is, how it works, what to expect, the honest pricing picture, and the questions we get most often.
            </p>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-12 md:gap-x-16 gap-y-12 md:gap-y-16">
              {SERVICES.map((s, i) => {
                const ic = ICON_BY_SLUG[s.slug];
                return (
                  <li
                    key={s.slug}
                    className="group border-t border-ink-body/15 pt-8 md:pt-10"
                  >
                    <Link href={`/services/${s.slug}`} className="block">
                      <div className="flex items-start gap-6 md:gap-8">
                        <div
                          className="shrink-0"
                          style={{ width: 72, height: 72 }}
                          aria-hidden
                        >
                          <Image
                            src={ic.src}
                            alt=""
                            width={72}
                            height={72}
                            className="block"
                          />
                        </div>
                        <div className="flex-1">
                          <div
                            className="font-manrope text-mint mb-2 uppercase"
                            style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                          >
                            {String(i + 1).padStart(2, "0")} · Service
                          </div>
                          <h3
                            className="font-spectral text-ink-h2 mb-4 [word-break:break-word]"
                            style={{
                              fontSize: "clamp(26px, 3vw, 38px)",
                              lineHeight: 1.1,
                              letterSpacing: "-1.4px",
                              fontWeight: 400,
                            }}
                          >
                            {s.name}
                          </h3>
                          <p
                            className="font-manrope text-ink-body mb-6 [word-break:break-word]"
                            style={{
                              fontSize: "clamp(15px, 1.2vw, 17px)",
                              lineHeight: 1.55,
                              letterSpacing: "-0.2px",
                              fontWeight: 400,
                              maxWidth: 580,
                            }}
                          >
                            {s.hero.headline}
                          </p>
                          <div className="flex items-center gap-3">
                            <span
                              className="font-manrope text-ink-body uppercase"
                              style={{ fontSize: 14, letterSpacing: "0.7px", fontWeight: 400 }}
                            >
                              Read More
                            </span>
                            <span className="inline-block w-[19.95px] h-[14px] transition-transform duration-150 ease-out group-hover:translate-x-1">
                              <Image
                                src="/figma-assets/imgGroup4.svg"
                                alt=""
                                width={20}
                                height={14}
                                className="block"
                              />
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* A note on pricing — verbatim from CONTENT.md /services "A note on pricing" */}
            <div className="mt-20 md:mt-28 border-t border-ink-body/15 pt-10 md:pt-14 max-w-[820px]">
              <h2
                className="font-spectral text-ink-h2 mb-5 [word-break:break-word]"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 44px)",
                  lineHeight: 1.05,
                  letterSpacing: "-1.5px",
                  fontWeight: 400,
                }}
              >
                A note on pricing
              </h2>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{
                  fontSize: "clamp(16px, 1.25vw, 18px)",
                  lineHeight: 1.65,
                  letterSpacing: "-0.2px",
                  fontWeight: 400,
                }}
              >
                Some prices on this site reflect the 2020 Grand Opening flyer and the Milly&apos;s Minutes flyer — the most recent published rates we have. Toya is mid-rebrand and current rates may differ. Every page shows the historical price clearly labeled. <strong className="text-ink-deep">Call or text to confirm 2026 pricing before booking.</strong>
              </p>
            </div>
          </div>
        </section>

        <ScheduleSession />
        <Footer />
        <StickyMobileBar />
        <div className="md:hidden h-[56px]" aria-hidden />
      </main>
    </>
  );
}
