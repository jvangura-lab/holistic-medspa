import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/motion/ScrollReveal";

/**
 * Service Categories — DS §5 extension rule replacing Figma's 3-tier pricing.
 * Per HM CONTENT.md `/services` block, we render our 8 service categories using the
 * pricing-card visual pattern (DS §3.5): title + price + bullet list + Schedule-Now CTA.
 *
 * Card frame: bg rgba(125,184,138,0.6) backdrop-blur-[5px], 420×564 rounded-0 (no radius — per DS §3.5).
 * Price block uses Manrope Regular 25.8/80/22 stack inside Archivo wrapper.
 * Checklist Manrope 18px ink-deep, 36px row stride, with imgMdiTick 21×19 icon.
 * Schedule-Now CTA bg black, w=353 h=53 rounded-50, Clash Display 20px white tracking 1px.
 *
 * Pricing extracted from CONTENT.md service-deep pages (each has a Pricing block).
 * Items showcased here are the 4 catalog priced offerings:
 *   - ZYTO scan ($60 historical), Milly's Minutes ($1/min), Lymphatic Drainage ($45 historical),
 *     Bach Flowers (consult-only, displayed as "By Consult").
 */

type PriceCard = {
  title: string;
  href: string;
  priceDigits: string;
  priceSuffix: string;
  bullets: string[];
};

const cards: PriceCard[] = [
  {
    title: "ZYTO Wellness Scan",
    href: "/services/zyto-wellness-scan",
    priceDigits: "60",
    priceSuffix: "/Scan",
    bullets: [
      "~20-page body-systems report",
      "Hand scanner — no needles",
      "Read-through with Toya",
      "Starting map, not diagnosis",
      "Historical 2020 flyer price",
    ],
  },
  {
    title: "Lymphatic Drainage",
    href: "/services/lymphatic-drainage",
    priceDigits: "45",
    priceSuffix: "/Session",
    bullets: [
      "30-minute Lymphstar Pro session",
      "Sound + vibration modality",
      "Gentle, non-invasive",
      "Bring loose comfortable clothing",
      "Historical 2020 flyer price",
    ],
  },
  {
    title: "Milly's Minutes",
    href: "/services/millys-minutes",
    priceDigits: "1",
    priceSuffix: "/Minute",
    bullets: [
      "Infrared sauna access",
      "Vibra plate platform",
      "Ionic foot bath",
      "Stay 10, 30, 45 — your call",
      "$1 per minute, all modalities",
    ],
  },
  {
    title: "Naturopathy Consult",
    href: "/services/naturopathy-consultation",
    priceDigits: "By",
    priceSuffix: "Consult",
    bullets: [
      "One quiet hour with Toya",
      "Diet, sleep, stress history",
      "Herbal + lifestyle options",
      "NAHA-listed practitioner",
      "Call (985) 278-6087 for rate",
    ],
  },
];

export default function ServiceCategories() {
  return (
    <section
      aria-label="Offer & Packages"
      className="relative w-full bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-0">
        {/* H2 — Spectral 80px centered-ish (Figma: left calc(50%-269px)) */}
        <h2
          className="font-spectral text-ink-h2 mb-12 md:mb-16 md:text-center [word-break:break-word]"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: "1.05",
            letterSpacing: "-3.2px",
            fontWeight: 400,
          }}
        >
          Offer &amp; Packages
        </h2>

        {/* Desktop: 4-col row (extension from Figma 3-col, kept at 420w each) */}
        <ul className="hidden md:grid gap-x-5 gap-y-8 mx-auto" style={{ gridTemplateColumns: "repeat(4, 1fr)", maxWidth: 1740 }}>
          {cards.map((c, idx) => (
            <ScrollReveal
              as="li"
              variant="lift"
              delay={idx * 0.11}
              duration={0.8}
              start="top 82%"
              key={c.title}
              className="relative backdrop-blur-[5px] flex flex-col"
              style={{
                background: "rgba(125,184,138,0.6)",
                minHeight: 564,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 30,
                paddingBottom: 30,
              }}
            >
              <h3
                className="font-clash text-ink-deep mb-6"
                style={{ fontSize: 31, fontWeight: 500, lineHeight: 1.1 }}
              >
                {c.title}
              </h3>
              {/* Price stack */}
              <div className="font-archivo mb-6" style={{ letterSpacing: "-1.6px", lineHeight: 1.15 }}>
                <span className="font-manrope text-ink-deep align-top" style={{ fontSize: 25.8, lineHeight: 1.15 }}>$</span>
                <span className="font-manrope text-ink-deep" style={{ fontSize: 80, lineHeight: 1.15, fontWeight: 400 }}>{c.priceDigits}</span>
                <span className="font-manrope text-ink-h2 ml-1" style={{ fontSize: 22, lineHeight: 1.15 }}>{c.priceSuffix}</span>
              </div>
              {/* Checklist */}
              <ul className="flex-1 space-y-[10px] mb-8">
                {c.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Image
                      src="/figma-assets/imgMdiTick.svg"
                      alt=""
                      width={21}
                      height={19}
                      className="block mt-1 flex-shrink-0"
                    />
                    <span
                      className="font-manrope text-ink-deep"
                      style={{ fontSize: 18, lineHeight: 1.3, letterSpacing: "-0.36px", fontWeight: 400 }}
                    >
                      {b}
                    </span>
                  </li>
                ))}
              </ul>
              {/* Schedule-Now CTA pill */}
              <Link
                href={c.href}
                className="block bg-black rounded-pill font-clash uppercase text-white text-center transition-[filter] duration-150 hover:brightness-95 mt-auto"
                style={{
                  width: "100%",
                  maxWidth: 353,
                  height: 53,
                  lineHeight: "53px",
                  fontSize: 20,
                  letterSpacing: "1px",
                  fontWeight: 400,
                }}
              >
                Schedule Now
              </Link>
            </ScrollReveal>
          ))}
        </ul>

        {/* Mobile: 1-col stacked */}
        <ul className="md:hidden space-y-5">
          {cards.map((c) => (
            <li
              key={c.title}
              className="relative backdrop-blur-[5px] p-6"
              style={{ background: "rgba(125,184,138,0.6)" }}
            >
              <h3 className="font-clash text-ink-deep mb-4" style={{ fontSize: 24, fontWeight: 500 }}>
                {c.title}
              </h3>
              <div className="mb-4" style={{ letterSpacing: "-0.8px" }}>
                <span className="font-manrope text-ink-deep align-top" style={{ fontSize: 18 }}>$</span>
                <span className="font-manrope text-ink-deep" style={{ fontSize: 56 }}>{c.priceDigits}</span>
                <span className="font-manrope text-ink-h2 ml-1" style={{ fontSize: 16 }}>{c.priceSuffix}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {c.bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Image src="/figma-assets/imgMdiTick.svg" alt="" width={16} height={15} className="mt-1 flex-shrink-0" />
                    <span className="font-manrope text-ink-deep" style={{ fontSize: 14, lineHeight: 1.4 }}>{b}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={c.href}
                className="block bg-black rounded-pill font-clash uppercase text-white text-center h-[48px]"
                style={{ lineHeight: "48px", fontSize: 16, letterSpacing: "0.8px" }}
              >
                Schedule Now
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
