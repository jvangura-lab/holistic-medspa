import type { Metadata } from "next";

import Header from "@/components/sections/Header";
import ServiceHero from "@/components/sections/ServiceHero";
import ReadyToBook from "@/components/sections/ReadyToBook";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";
import PriceCard from "@/components/ui/PriceCard";
import OvalCard from "@/components/ui/OvalCard";
import PillBandQuote from "@/components/ui/PillBandQuote";
import Reveal from "@/components/motion/Reveal";

/**
 * /pricing — Consolidated Pricing
 *
 * Composition per DESIGN_SYSTEM.md §5.2: Hero(480h) → Pricing tile grid (PriceCard primitive)
 * → consolidated honest table → disclaimer → ReadyToBook → Footer.
 *
 * Copy poured verbatim from CONTENT.md `/pricing` block.
 * Voice anchors used on this route: 0.
 */

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Holistic Medspa pricing in Cut Off, Louisiana. Honest, mostly historical rates from the 2020 Grand Opening flyer and Milly's Minutes flyer. Call to confirm 2026 pricing.",
  keywords: [
    "Holistic Medspa pricing Cut Off LA",
    "ZYTO scan price Louisiana",
    "Lymphstar Pro price Bayou Lafourche",
    "infrared sauna price Cut Off",
    "Milly's Minutes pricing",
    "Bayou Holistics rates",
  ],
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "Pricing — Holistic Medspa, Cut Off LA",
    description: "Honest, mostly historical pricing. Call or text to confirm 2026 rates before booking.",
    type: "website",
  },
};

// Price cards — first row uses PriceCard primitive for the anchor 4 services
const PRICE_CARDS: Array<{
  title: string;
  priceLine: { glyph?: string; digits: string; suffix: string };
  bullets: string[];
  ctaLabel?: string;
  note?: string;
}> = [
  {
    title: "ZYTO Wellness Scan",
    priceLine: { glyph: "$", digits: "99", suffix: "/Scan" },
    bullets: [
      "20-page body-systems report",
      "Roughly 20-30 minute visit",
      "Walkthrough with Toya included",
      "Take the report home",
      "Historical 2020 Grand Opening rate",
    ],
    note: "Call to confirm 2026 rate.",
  },
  {
    title: "Lymphatic Drainage",
    priceLine: { glyph: "$", digits: "30", suffix: "/30 min" },
    bullets: [
      "Lymphstar Pro device session",
      "Gentle, sound-and-vibration protocol",
      "No package commitment",
      "Pairs naturally with sauna",
      "Historical 2020 flyer rate",
    ],
    note: "Call to confirm 2026 rate.",
  },
  {
    title: "Milly's Minutes",
    priceLine: { glyph: "$", digits: "1", suffix: "/minute" },
    bullets: [
      "Infrared sauna with chromo & sound",
      "Vibra plate platform",
      "Ionic foot bath",
      "Use any modality, any duration",
      "Named for Mildred Hayes Cheramie",
    ],
    note: "Call to confirm current rate.",
  },
];

const PRICING_TABLE = [
  { service: "ZYTO Wellness Scan", historical: "$99 per scan", current: "Call to confirm" },
  { service: "Lymphatic Drainage with Lymphstar Pro (30 min)", historical: "$30", current: "Call to confirm" },
  { service: "Infrared Sauna with chromo & sound (30 min)", historical: "$30", current: "Call to confirm" },
  { service: "Infrared Sauna basic (30 min)", historical: "$20", current: "Call to confirm" },
  { service: "Milly's Minutes — any modality (sauna / vibra / foot bath)", historical: "$1 per minute", current: "Call to confirm" },
  { service: "Total Thermography (1 hour, hosted)", historical: "$340", current: "Set by visiting practitioner; call for clinic dates" },
  { service: "Naturopathy Consultation (1 hour)", historical: "not published on 2020 flyer", current: "Call to confirm" },
  { service: "Bach Flower Consultation (~30 min)", historical: "not published on 2020 flyer", current: "Call to confirm" },
  { service: "Blending on the Bayou private class (~2 hours)", historical: "$30 per person (7+ minimum)", current: "Call to confirm" },
  { service: "doTERRA Essential Oils retail", historical: "varies by product", current: "varies; ask Toya for Wellness Advocate options" },
  { service: "Sound Prevention Ultrasound (hosted, third-party)", historical: "Women's $300 · Men's $200 · Breast $200 · Vascular $100", current: "set by Sound Prevention; call for clinic dates" },
  { service: "OlyLife THz Wellness Session (15-30 min)", historical: "not previously published", current: "Call to confirm; newer addition" },
];

const TYPICAL_RANGES = [
  "ZYTO Balancer scans: roughly $75-$150 per session",
  "Lymphstar Pro / lymphatic drainage device sessions: $45-$120 per 30-minute session",
  "Infrared sauna single sessions: $25-$60 per session",
  "Ionic foot baths: $30-$60 per session",
  "Naturopathy consultations: $100-$250 first visit; $60-$150 follow-up",
  "Bach Flower consultations: $50-$120 consult + $15-$30 take-home blend",
  "Thermography full-body: $200-$500 per session",
  "THz / PEMF wellness short sessions: $30-$80 per session",
  "Hosted screening ultrasound events: vendor-set; Sound Prevention's published rates above are typical for the format",
];

export default function PricingPage() {
  return (
    <main className="relative bg-white brand-loader">
      <Header />
      <ServiceHero
        headline="Honest prices, plainly listed."
        sub="A consolidated view of every published price we have for the services on the current menu. Toya is mid-rebrand and current rates may differ — call or text (985) 278-6087 to confirm before booking."
        image="/media/services/service-essential-oils.jpg"
        imageAlt="The retail shelves at Holistic Medspa, Cut Off, Louisiana."
        ctaHref="/book"
        ctaLabel="Request Consult"
      />

      {/* PillBand header — DS image-band above pricing */}
      <section aria-label="Pricing intro band" className="relative w-full bg-white py-12 md:py-16">
        <PillBandQuote
          src="/media/round-2/apothecary/apothecary-wooden-shelves-glass-jars-ingredients-rachelclaire.jpg"
          alt="Wooden apothecary shelves lined with glass ingredient jars."
          quote="Honest prices, plainly listed."
          attribution="Holistic Medspa — Cut Off, Louisiana"
          scrimOpacity={0.6}
          minHeight={300}
        />
      </section>

      {/* Pricing anchor cards (3 PriceCard) on cream */}
      <section
        aria-label="Anchor pricing cards"
        className="relative w-full bg-cream py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
          <p
            className="font-clash uppercase text-mint mb-4"
            style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
          >
            Three anchor sessions
          </p>
          <h2
            className="font-spectral text-ink-h2 mb-10 md:mb-14 [word-break:break-word]"
            style={{
              maxWidth: 860,
              fontSize: "clamp(40px, 5.4vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-2.8px",
              fontWeight: 400,
            }}
          >
            The three sessions most people start with.
          </h2>
          <p
            className="font-manrope text-ink-body mb-12 md:mb-16 [word-break:break-word]"
            style={{
              maxWidth: 820,
              fontSize: "clamp(16px, 1.3vw, 19px)",
              lineHeight: 1.6,
              letterSpacing: "-0.2px",
              fontWeight: 400,
            }}
          >
            Historical rates from the 2020 Grand Opening flyer and the Milly&apos;s Minutes flyer. Current 2026 rates may differ; we are honest about that. Call or text to confirm before booking.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PRICE_CARDS.map((card) => (
              <PriceCard
                key={card.title}
                title={card.title}
                priceLine={card.priceLine}
                bullets={card.bullets}
                note={card.note}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Consolidated full table on white */}
      <section
        aria-label="Consolidated pricing list"
        className="relative w-full bg-white py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
          <div className="grid md:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-14">
            <div className="md:col-span-8">
              <h2
                className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
                style={{
                  maxWidth: 860,
                  fontSize: "clamp(34px, 4.4vw, 56px)",
                  lineHeight: 1.1,
                  letterSpacing: "-2px",
                  fontWeight: 400,
                }}
              >
                The full list.
              </h2>
            </div>
            <div className="md:col-span-4 hidden md:flex items-center justify-end">
              <Reveal variant="mask" duration={900}>
                <OvalCard
                  src="/media/round-2/bayou/pixabay-bayou-louisiana-3641416.jpg"
                  alt="Cypress and reflections on a south-Louisiana bayou."
                  width={360}
                  height={260}
                />
              </Reveal>
            </div>
          </div>
          <p
            className="font-manrope text-ink-body mb-12 md:mb-14 [word-break:break-word]"
            style={{
              maxWidth: 820,
              fontSize: "clamp(16px, 1.3vw, 18px)",
              lineHeight: 1.6,
              letterSpacing: "-0.2px",
            }}
          >
            Most of these prices are from the 2020 Grand Opening flyer or the Milly&apos;s Minutes flyer — the most recent published rates we have. We are honest about that here.
          </p>

          {/* Desktop: table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full font-manrope text-ink-body border-collapse">
              <thead>
                <tr className="border-b-2 border-ink-body/20">
                  <th
                    className="text-left py-4 pr-4 font-clash uppercase text-ink-h2"
                    style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                  >
                    Service
                  </th>
                  <th
                    className="text-left py-4 pr-4 font-clash uppercase text-ink-h2"
                    style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                  >
                    Historical (2020 / Milly&apos;s era)
                  </th>
                  <th
                    className="text-left py-4 font-clash uppercase text-ink-h2"
                    style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                  >
                    Current 2026
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRICING_TABLE.map((row) => (
                  <tr key={row.service} className="border-b border-ink-body/10">
                    <td
                      className="py-5 pr-4 align-top font-spectral text-ink-h2"
                      style={{ fontSize: 19, lineHeight: 1.4, fontWeight: 400 }}
                    >
                      {row.service}
                    </td>
                    <td className="py-5 pr-4 align-top" style={{ fontSize: 16, lineHeight: 1.5 }}>
                      {row.historical}
                    </td>
                    <td className="py-5 align-top" style={{ fontSize: 16, lineHeight: 1.5 }}>
                      {row.current}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: stacked cards */}
          <div className="md:hidden space-y-6">
            {PRICING_TABLE.map((row) => (
              <div key={row.service} className="border-t border-ink-body/15 pt-5">
                <p
                  className="font-spectral text-ink-h2 mb-3 [word-break:break-word]"
                  style={{ fontSize: 19, lineHeight: 1.3, letterSpacing: "-0.4px", fontWeight: 400 }}
                >
                  {row.service}
                </p>
                <p
                  className="font-clash uppercase text-mint mb-1"
                  style={{ fontSize: 11, letterSpacing: "0.7px", fontWeight: 500 }}
                >
                  Historical
                </p>
                <p
                  className="font-manrope text-ink-body mb-3"
                  style={{ fontSize: 15, lineHeight: 1.5 }}
                >
                  {row.historical}
                </p>
                <p
                  className="font-clash uppercase text-mint mb-1"
                  style={{ fontSize: 11, letterSpacing: "0.7px", fontWeight: 500 }}
                >
                  Current 2026
                </p>
                <p
                  className="font-manrope text-ink-body"
                  style={{ fontSize: 15, lineHeight: 1.5 }}
                >
                  {row.current}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Typical ranges + payment + memberships on cream */}
      <section
        aria-label="Typical ranges and payment"
        className="relative w-full bg-cream py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <h3
              className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
              style={{
                fontSize: "clamp(26px, 3vw, 36px)",
                lineHeight: 1.1,
                letterSpacing: "-1.2px",
                fontWeight: 400,
              }}
            >
              Typical U.S. wellness-service ranges.
            </h3>
            <p
              className="font-manrope text-ink-body mb-6 [word-break:break-word]"
              style={{ fontSize: 16, lineHeight: 1.6, letterSpacing: "-0.2px" }}
            >
              For context, comparable wellness sessions in the U.S. market generally fall in these ranges. <strong>These are general industry ranges, not our prices</strong> — Holistic Medspa&apos;s historical rates have often been well under typical.
            </p>
            <ul className="font-manrope text-ink-body space-y-2.5" style={{ fontSize: 15, lineHeight: 1.55 }}>
              {TYPICAL_RANGES.map((line, i) => (
                <li key={i} className="pl-4 border-l border-ink-body/20">
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3
              className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
              style={{
                fontSize: "clamp(26px, 3vw, 36px)",
                lineHeight: 1.1,
                letterSpacing: "-1.2px",
                fontWeight: 400,
              }}
            >
              Payment, memberships, specials.
            </h3>
            <div
              className="font-manrope text-ink-body space-y-4 mb-8 [word-break:break-word]"
              style={{ fontSize: 16, lineHeight: 1.6, letterSpacing: "-0.2px" }}
            >
              <p>We accept payment at the time of service.</p>
              <p>Cash, check, and major credit cards. Insurance is not billed for any of our wellness services.</p>
            </div>

            <p
              className="font-clash uppercase text-mint mb-3"
              style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
            >
              Memberships
            </p>
            <p
              className="font-manrope text-ink-body [word-break:break-word]"
              style={{ fontSize: 16, lineHeight: 1.6, letterSpacing: "-0.2px" }}
            >
              <strong>No published membership tiers at this time.</strong> We have intentionally not invented a tiered membership pricing structure for this site — we are a small practice and any future membership program will come from Toya directly.
            </p>
          </div>
        </div>
      </section>

      <ReadyToBook
        heading="Ready to ask about current pricing?"
        body="Call or text (985) 278-6087. Or send your details through the request form and Toya will confirm 2026 rates when she replies."
      />
      <Footer />
      <StickyMobileBar />
      <div className="md:hidden" aria-hidden style={{ height: "calc(64px + env(safe-area-inset-bottom))" }} />
    </main>
  );
}
