import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Header from "@/components/sections/Header";
import ServiceHero from "@/components/sections/ServiceHero";
import RelatedServices from "@/components/sections/RelatedServices";
import ReadyToBook from "@/components/sections/ReadyToBook";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";

import Accordion from "@/components/ui/Accordion";
import NumberedSteps from "@/components/ui/NumberedSteps";
import PriceCard from "@/components/ui/PriceCard";
import OvalCard from "@/components/ui/OvalCard";
import PillBandQuote from "@/components/ui/PillBandQuote";
import Reveal from "@/components/motion/Reveal";

import {
  SERVICE_BY_SLUG,
  SERVICE_SLUGS,
  type ServiceSpec,
} from "@/lib/services-data";

/**
 * /services/[slug] — deep service pages (8 routes via generateStaticParams).
 *
 * Composition per DESIGN_SYSTEM.md §5.2 register row for /services/[slug] (extended to
 * the full content-strategist.md service-page structure):
 *
 *   1. Hero (reduced 480h, ServiceHero primitive)
 *   2. What it is — cream band, Spectral H2 + Manrope body (multi-paragraph)
 *   3. How it works — dark band, NumberedSteps primitive
 *   4. What to expect — cream band, definition-list pattern (Duration/Downtime/etc.)
 *   5. Pricing — white band, PriceCard primitive in a 2-col layout (price card + typical-range note)
 *   6. Common questions — cream band, Accordion primitive
 *   7. Small note (optional) — narrative band
 *   8. Related sessions — cream band, RelatedServices primitive (cross-link cards)
 *   9. Ready to book — white band, ReadyToBook CTA
 *  10. Footer
 *
 * All prose poured VERBATIM from CONTENT.md via lib/services-data.ts.
 *
 * Voice-anchor count target on each deep page: 0 (per F3.3 dispatcher — anchors reserved
 * for /about etc. in F3.4).
 */

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICE_BY_SLUG[slug];
  if (!svc) return { title: "Not found" };
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    keywords: [svc.primaryKeyword],
    alternates: { canonical: `/services/${svc.slug}` },
    openGraph: {
      title: svc.metaTitle,
      description: svc.metaDescription,
      type: "article",
    },
  };
}

function buildJsonLd(svc: ServiceSpec) {
  const base = "https://holistic-v6.vercel.app";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: svc.name,
    description: svc.metaDescription,
    url: `${base}/services/${svc.slug}`,
    provider: {
      "@type": "MedicalBusiness",
      name: "Holistic Medspa",
      alternateName: "Bayou Holistics LLC",
      telephone: ["+1-985-278-6087", "+1-985-632-6087"],
      address: {
        "@type": "PostalAddress",
        streetAddress: "17361 W Main St",
        addressLocality: "Cut Off",
        addressRegion: "LA",
        postalCode: "70345",
        addressCountry: "US",
      },
      url: base,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Bayou Lafourche, Louisiana",
    },
    offers: {
      "@type": "Offer",
      url: `${base}/services/${svc.slug}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
    },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: svc.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  };
}

/** Build a price line for the PriceCard from the historical/current pricing string. */
function pricelineFor(svc: ServiceSpec): {
  glyph?: string;
  digits: string;
  suffix: string;
} {
  // Defaults map (extracted from CONTENT.md historical-rate blocks per service).
  const map: Record<string, { glyph?: string; digits: string; suffix: string }> = {
    "zyto-wellness-scan": { glyph: "$", digits: "99", suffix: "/Scan" },
    "lymphatic-drainage": { glyph: "$", digits: "30", suffix: "/30 min" },
    "millys-minutes": { glyph: "$", digits: "1", suffix: "/Minute" },
    thermography: { glyph: "$", digits: "340", suffix: "/Session" },
    "naturopathy-consultation": { digits: "By", suffix: "Consult" },
    "bach-flowers": { digits: "By", suffix: "Consult" },
    "essential-oils": { glyph: "$", digits: "30", suffix: "/Person · class" },
    "hosted-modalities": { glyph: "$", digits: "100", suffix: "+ /Scan" },
  };
  return map[svc.slug] ?? { digits: "By", suffix: "Consult" };
}

/** Build the bullet list for the PriceCard from the spec. */
function bulletsFor(svc: ServiceSpec): string[] {
  switch (svc.slug) {
    case "zyto-wellness-scan":
      return [
        "~20-page body-systems report",
        "Hand scanner — no needles",
        "Read-through with Toya",
        "Starting map, not diagnosis",
        "Historical 2020 flyer price",
      ];
    case "lymphatic-drainage":
      return [
        "30-minute Lymphstar Pro session",
        "Sound + vibration modality",
        "Gentle, non-invasive",
        "Bring loose comfortable clothing",
        "Historical 2020 flyer price",
      ];
    case "millys-minutes":
      return [
        "Infrared sauna access",
        "Vibra plate platform",
        "Ionic foot bath",
        "Stay 10, 30, 45 — your call",
        "$1 per minute, all modalities",
      ];
    case "thermography":
      return [
        "1-hour full-body session",
        "Radiation-free infrared imaging",
        "Visiting practitioner — hosted clinic",
        "Written report in following weeks",
        "Historical 2020 flyer price",
      ];
    case "naturopathy-consultation":
      return [
        "One quiet hour with Toya",
        "Diet, sleep, stress history",
        "Herbal + lifestyle options",
        "NAHA-listed practitioner",
        "Call (985) 278-6087 for rate",
      ];
    case "bach-flowers":
      return [
        "Short focused conversation",
        "4-7 remedies, custom blended",
        "Take-home dropper bottle",
        "Gentle, non-pharmaceutical",
        "Call for current rate",
      ];
    case "essential-oils":
      return [
        "doTERRA CPTG retail oils",
        "Custom roller blends in class",
        "Class: 7+ people, 2 hrs",
        "At clinic or at your location",
        "$30/person class — 2020 rate",
      ];
    case "hosted-modalities":
      return [
        "Sound Prevention scans: $100-$300",
        "Full or region-specific imaging",
        "OlyLife THz: short wellness session",
        "Hosted-clinic days, ask for schedule",
        "Call (985) 278-6087 to confirm",
      ];
    default:
      return [];
  }
}

/** Per-service distilled quote — drawn from the service's whatItIs first sentence (already CONTENT.md prose). */
function quoteFor(svc: ServiceSpec): string {
  // Per-slug curated one-liners (extracted from each svc.hero.headline / shortest distilled idea —
  // staying VERBATIM to copy already in services-data.ts; no new copy authored here).
  const map: Record<string, string> = {
    "zyto-wellness-scan": "A snapshot of your body’s signals. Not a diagnosis. A starting map.",
    "lymphatic-drainage": "Gentle. Quiet. Restorative.",
    "millys-minutes": "One dollar a minute. Three modalities. Your own proportions.",
    "thermography": "Radiation-free thermal imaging — hosted at our Cut Off clinic.",
    "naturopathy-consultation": "One quiet hour. No clipboard speed-run. We start by listening.",
    "bach-flowers": "A small bottle for emotional weather.",
    "essential-oils": "Real bottles on the shelf — and a private blending class when you bring seven friends.",
    "hosted-modalities": "Two newer offerings, framed honestly.",
  };
  return map[svc.slug] ?? svc.hero.headline;
}

export default async function ServiceDeepPage({ params }: Props) {
  const { slug } = await params;
  const svc = SERVICE_BY_SLUG[slug];
  if (!svc) notFound();

  const jsonLd = buildJsonLd(svc);
  const priceLine = pricelineFor(svc);
  const bullets = bulletsFor(svc);
  const serviceQuote = quoteFor(svc);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative bg-white brand-loader">
        <Header />

        <ServiceHero
          headline={svc.hero.headline}
          sub={svc.hero.sub}
          image={svc.hero.image}
          imageAlt={`Visual context for ${svc.name} at Holistic Medspa.`}
        />

        {/* 2. WHAT IT IS — cream band */}
        <section
          aria-label="What it is"
          className="relative w-full bg-cream py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
            <h2
              className="font-spectral text-ink-h2 mb-10 md:mb-14 [word-break:break-word]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 72px)",
                lineHeight: 1.04,
                letterSpacing: "-2.8px",
                fontWeight: 400,
              }}
            >
              What it is
            </h2>
            <div className="grid md:grid-cols-12 md:gap-16">
              <div className="md:col-span-8 space-y-6 md:space-y-8">
                {svc.whatItIs.map((para, i) => (
                  <p
                    key={i}
                    className="font-manrope text-ink-body [word-break:break-word]"
                    style={{
                      fontSize: "clamp(16px, 1.3vw, 19px)",
                      lineHeight: 1.7,
                      letterSpacing: "-0.2px",
                      fontWeight: 400,
                    }}
                  >
                    {para}
                  </p>
                ))}
              </div>
              {svc.regulatoryDisclaimer ? (
                <aside className="md:col-span-4 mt-10 md:mt-0">
                  <div className="border-l-2 border-mint pl-6 md:sticky md:top-24">
                    <div
                      className="font-clash text-mint mb-3 uppercase"
                      style={{ fontSize: 12, letterSpacing: "0.8px", fontWeight: 500 }}
                    >
                      Important context
                    </div>
                    <p
                      className="font-manrope text-ink-body"
                      style={{
                        fontSize: "clamp(14px, 1.1vw, 16px)",
                        lineHeight: 1.6,
                        letterSpacing: "-0.2px",
                        fontWeight: 400,
                      }}
                    >
                      {svc.regulatoryDisclaimer}
                    </p>
                  </div>
                </aside>
              ) : null}
            </div>
          </div>
        </section>

        {/* PillBandQuote — DS image-band between "What it is" and "How it works" */}
        <section aria-label="A distilled note" className="relative w-full bg-cream py-8 md:py-12">
          <PillBandQuote
            src={svc.hero.image}
            alt={`Imagery for ${svc.name} at Holistic Medspa.`}
            quote={serviceQuote}
            attribution="Holistic Medspa — Cut Off, Louisiana"
            scrimOpacity={0.6}
            minHeight={300}
          />
        </section>

        {/* 3. HOW IT WORKS — dark band */}
        <section
          aria-label="How it works"
          className="relative w-full bg-ink-deep py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
            <h2
              className="font-spectral text-white mb-10 md:mb-14 [word-break:break-word]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 72px)",
                lineHeight: 1.04,
                letterSpacing: "-2.8px",
                fontWeight: 400,
              }}
            >
              How it works
            </h2>
            <NumberedSteps
              steps={svc.howItWorks}
              leadIn={svc.howItWorksLeadIn}
              surface="dark"
            />
          </div>
        </section>

        {/* 4. WHAT TO EXPECT — cream band, definition-list pattern */}
        <section
          aria-label="What to expect"
          className="relative w-full bg-cream py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
            <h2
              className="font-spectral text-ink-h2 mb-10 md:mb-14 [word-break:break-word]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 72px)",
                lineHeight: 1.04,
                letterSpacing: "-2.8px",
                fontWeight: 400,
              }}
            >
              What to expect
            </h2>
            {/* OvalCard — DS oval pattern with the service image */}
            <div className="mb-12 md:mb-16">
              <Reveal variant="mask" duration={950}>
                <OvalCard
                  src={svc.hero.image}
                  alt={`Visual context for ${svc.name}.`}
                  width={680}
                  height={360}
                  className="mx-auto md:mx-0"
                />
              </Reveal>
            </div>
            <dl className="grid md:grid-cols-2 gap-x-12 gap-y-8 max-w-[1100px]">
              {svc.whatToExpect.map((e) => (
                <div key={e.label} className="border-t border-ink-body/15 pt-5">
                  <dt
                    className="font-clash text-ink-deep mb-3 uppercase"
                    style={{ fontSize: 14, letterSpacing: "0.7px", fontWeight: 500 }}
                  >
                    {e.label}
                  </dt>
                  <dd
                    className="font-manrope text-ink-body [word-break:break-word]"
                    style={{
                      fontSize: "clamp(15px, 1.2vw, 17px)",
                      lineHeight: 1.6,
                      letterSpacing: "-0.2px",
                      fontWeight: 400,
                    }}
                  >
                    {e.body}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* 5. PRICING — white band, price card on left + typical-range body right */}
        <section
          aria-label="Pricing"
          className="relative w-full bg-white py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
            <h2
              className="font-spectral text-ink-h2 mb-10 md:mb-14 [word-break:break-word]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 72px)",
                lineHeight: 1.04,
                letterSpacing: "-2.8px",
                fontWeight: 400,
              }}
            >
              Pricing
            </h2>
            <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-start">
              <div className="md:col-span-5 max-w-[460px] mx-auto md:mx-0 w-full">
                <PriceCard
                  title={svc.shortName}
                  priceLine={priceLine}
                  bullets={bullets}
                  ctaLabel="Request to Book"
                  ctaHref="/book"
                />
              </div>
              <div className="md:col-span-7 space-y-6">
                {svc.pricing.historical ? (
                  <div>
                    <div
                      className="font-clash text-mint mb-2 uppercase"
                      style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                    >
                      Historical
                    </div>
                    <p
                      className="font-manrope text-ink-body [word-break:break-word]"
                      style={{
                        fontSize: "clamp(16px, 1.3vw, 19px)",
                        lineHeight: 1.65,
                        letterSpacing: "-0.2px",
                        fontWeight: 400,
                      }}
                    >
                      {svc.pricing.historical}
                    </p>
                  </div>
                ) : null}
                <div>
                  <div
                    className="font-clash text-mint mb-2 uppercase"
                    style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                  >
                    Current 2026 rate
                  </div>
                  <p
                    className="font-manrope text-ink-body [word-break:break-word]"
                    style={{
                      fontSize: "clamp(16px, 1.3vw, 19px)",
                      lineHeight: 1.65,
                      letterSpacing: "-0.2px",
                      fontWeight: 400,
                    }}
                  >
                    {svc.pricing.current}
                  </p>
                </div>
                {svc.pricing.typical ? (
                  <div>
                    <div
                      className="font-clash text-mint mb-2 uppercase"
                      style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                    >
                      Typical U.S. range (for context)
                    </div>
                    <p
                      className="font-manrope text-ink-body [word-break:break-word]"
                      style={{
                        fontSize: "clamp(16px, 1.3vw, 19px)",
                        lineHeight: 1.65,
                        letterSpacing: "-0.2px",
                        fontWeight: 400,
                      }}
                    >
                      {svc.pricing.typical}
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* 6. COMMON QUESTIONS — cream band, Accordion */}
        <section
          aria-label="Common questions"
          className="relative w-full bg-cream py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
            <h2
              className="font-spectral text-ink-h2 mb-10 md:mb-14 [word-break:break-word]"
              style={{
                fontSize: "clamp(40px, 5.4vw, 72px)",
                lineHeight: 1.04,
                letterSpacing: "-2.8px",
                fontWeight: 400,
              }}
            >
              Common questions
            </h2>
            <Accordion items={svc.faqs} idPrefix={`faq-${svc.slug}`} />
          </div>
        </section>

        {/* 7. SMALL NOTE — narrative band on white (optional per service) */}
        {svc.smallNote ? (
          <section
            aria-label={svc.smallNote.title}
            className="relative w-full bg-white py-20 md:py-28"
          >
            <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] max-w-[920px]">
              <h2
                className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
                style={{
                  fontSize: "clamp(30px, 3.6vw, 48px)",
                  lineHeight: 1.05,
                  letterSpacing: "-1.8px",
                  fontWeight: 400,
                }}
              >
                {svc.smallNote.title}
              </h2>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{
                  fontSize: "clamp(16px, 1.25vw, 18px)",
                  lineHeight: 1.7,
                  letterSpacing: "-0.2px",
                  fontWeight: 400,
                }}
              >
                {svc.smallNote.body}
              </p>
            </div>
          </section>
        ) : null}

        {/* 8. RELATED SESSIONS */}
        <RelatedServices items={svc.related} />

        {/* 9. READY TO BOOK */}
        <ReadyToBook
          heading={svc.readyToBook.heading}
          body={svc.readyToBook.body}
        />

        <Footer />
        <StickyMobileBar />
        <div className="md:hidden h-[56px]" aria-hidden />
      </main>
    </>
  );
}
