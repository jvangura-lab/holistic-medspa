import type { Metadata } from "next";
import Image from "next/image";

import Header from "@/components/sections/Header";
import ServiceHero from "@/components/sections/ServiceHero";
import Testimonial from "@/components/sections/Testimonial";
import ReadyToBook from "@/components/sections/ReadyToBook";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";
import OvalCard from "@/components/ui/OvalCard";
import PillBandQuote from "@/components/ui/PillBandQuote";
import Reveal from "@/components/motion/Reveal";

/**
 * /about — About / Our Story
 *
 * Composition per DESIGN_SYSTEM.md §5.2: Hero(480h reduced) → story alternating cream/dark
 * text bands → practitioner image card → testimonial slab → ReadyToBook → Footer.
 *
 * Copy poured verbatim from CONTENT.md `/about` block.
 *
 * Voice anchor budget — this is the route where the remaining anchors live (≤1 each sitewide):
 *   - "heal & restore" — 1× (the 2020 founding-vision paraphrase)
 *   - "Family Wellness Clinic" — 1× (Toya's preferred phrase, in "A note on names")
 *   - "the BEST CLIENTS in the World" — 1× (the 2025 transition-post close)
 */

export const metadata: Metadata = {
  title: "About Holistic Medspa",
  description:
    "A small wellness clinic on Bayou Lafourche. Founded in 2020 in a parking lot. Now in a brown brick storefront on West Main Street, Cut Off. Rebuilding under a new name with Toya Terrebonne.",
  keywords: [
    "Toya Terrebonne",
    "Bayou Holistics history",
    "Holistic Medspa Cut Off LA",
    "naturopathy Louisiana",
    "wellness clinic Bayou Lafourche",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Holistic Medspa, Cut Off LA",
    description: "A small wellness clinic on Bayou Lafourche. Founded 2020. Rebuilding under a new name.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  url: "https://holistic-v6.vercel.app/about",
  mainEntity: {
    "@type": "MedicalBusiness",
    name: "Holistic Medspa",
    alternateName: "Bayou Holistics LLC",
    foundingDate: "2020-11-06",
    founder: {
      "@type": "Person",
      name: "Toya Terrebonne",
      jobTitle: "Wellness Practitioner",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "16148 W Main St",
      addressLocality: "Cut Off",
      addressRegion: "LA",
      postalCode: "70345",
      addressCountry: "US",
    },
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative bg-white brand-loader">
        <Header />
        <ServiceHero
          headline="Rooted in the bayou."
          sub="Founded in 2020 in a parking lot. Now in a brown brick storefront on West Main Street, Cut Off — quietly rebuilding under a new name."
          image="/media/about/about-hero-image.jpg"
          imageAlt="The storefront at Holistic Medspa, Cut Off, Louisiana."
          ctaHref="/book"
          ctaLabel="Request Consult"
        />

        {/* The 2020 beginning — cream band
            (R3.A: heading column widened from col-span-4 → col-span-5 and font-size capped
            at 52px so the heading fits in ≤2 lines and doesn't leave a vertical whitespace
            gap when wrapping to 3+ lines in a narrow column.) */}
        <section
          aria-label="The 2020 beginning"
          className="relative w-full bg-cream py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                The 2020 beginning
              </p>
              <h2
                className="font-spectral text-ink-h2 [word-break:break-word]"
                style={{
                  fontSize: "clamp(36px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                  fontWeight: 400,
                }}
              >
                It started in a parking lot.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6">
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                Holistic Medspa began as <strong>Bayou Holistics</strong>, an herbal-store storefront tucked into the Galliano Food Store parking lot at 18210 West Main Street. The opening flyer is still on the original Instagram feed: Grand Opening, November 6th and 7th, 2020 — Total Thermography, lymphatic drainage with the Lymphstar Pro, infrared sauna with chromo and sound, the ZYTO Balancer hand scan, 20% off doTERRA. A phone number that has not changed since: (985) 278-6087.
              </p>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                Toya Terrebonne ran it then. She still runs it now.
              </p>
              {/* "heal & restore" anchor — single sitewide use */}
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                The voice from those early posts is the voice that is still here. The founding sentiment: a new business practicing naturopathic medicine with the intent to heal &amp; restore Humanity, Mind, Body &amp; Soul. The spelling unchanged, the spirit the same.
              </p>
            </div>
          </div>
          {/* Oval-portrait DS pattern — philosophy image in ellipse for visual rhythm */}
          <Reveal variant="mask" duration={1000} className="mx-auto mt-16 md:mt-20 px-5 md:px-0">
            <OvalCard
              src="/media/philosophy.jpg"
              alt="A quiet corner of the practice on Bayou Lafourche."
              width={720}
              height={420}
              className="mx-auto"
              caption="The practice in 2020, near the Galliano Food Store storefront."
            />
          </Reveal>
        </section>

        {/* PillBandQuote — design-system image-band quote between 2020 and 2025 sections */}
        <section aria-label="Practice quote" className="w-full bg-white py-16 md:py-20">
          <PillBandQuote
            src="/media/storefront.jpg"
            alt="The brown brick storefront at 16148 W Main St, Cut Off, Louisiana."
            quote="A new business practicing naturopathic medicine, with the intent to heal &amp; restore Humanity, Mind, Body &amp; Soul."
            attribution="Holistic Medspa — Grand Opening, November 2020"
            scrimOpacity={0.6}
            minHeight={340}
          />
        </section>

        {/* The 2025 transition — dark band */}
        <section
          aria-label="The 2025 transition"
          className="relative w-full bg-[#1a1a1a] text-white py-20 md:py-28 overflow-hidden"
        >
          <Image
            src="/figma-assets/imgRectangle104.svg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20 pointer-events-none"
          />
          <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                The 2025 transition
              </p>
              <h2
                className="font-spectral text-white [word-break:break-word]"
                style={{
                  fontSize: "clamp(36px, 4vw, 52px)",
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                  fontWeight: 400,
                }}
              >
                A move from herbal store to a fuller wellness clinic.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6">
              {/* "BEST CLIENTS in the World" anchor — single sitewide use */}
              <p
                className="font-manrope text-white/85 [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                On April 14, 2025, Toya posted an announcement. A new clinic coming July 1st. A move from herbal store to a fuller wellness clinic. The post named the regions her clients had been coming from over five years — Bayou Lafourche, Louisiana, Alabama, Arkansas, Ohio — and thanked them by region. She closed by naming her returning clients with a phrase that has become quietly iconic in the practice&apos;s internal culture: the BEST CLIENTS in the World.
              </p>
              <p
                className="font-manrope text-white/85 [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                The new location is at 16148 West Main Street in Cut Off, a brown brick hip-roof building with a white window sign. It is a small, single-suite practice. The Google Business Profile lists it as Holistic Medspa. The legal LLC, registered with Louisiana, is still Bayou Holistics LLC.
              </p>
              <p
                className="font-manrope text-white/85 [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                The four names overlap. The work behind them is one practice, owned and operated by one practitioner, in Cut Off.
              </p>
            </div>
          </div>
        </section>

        {/* Toya — image + body split */}
        <section
          aria-label="Toya Terrebonne"
          className="relative w-full bg-white py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Image card — DS oval pattern in place of rectangle */}
            <div className="md:col-span-5">
              <Reveal variant="mask" duration={950}>
                <OvalCard
                  src="/media/about/about-hero-image.jpg"
                  alt="Toya Terrebonne, owner and sole practitioner at Holistic Medspa."
                  width={600}
                  height={420}
                  className="mx-auto"
                />
              </Reveal>
              <p
                className="font-manrope text-ink-body/70 mt-4 text-center"
                style={{ fontSize: 13, lineHeight: 1.5, letterSpacing: "-0.2px" }}
              >
                Owner-confirm portrait pending. Storefront placeholder used here in the interim.
              </p>
            </div>
            <div className="md:col-span-7 space-y-6">
              <p
                className="font-clash uppercase text-mint mb-2"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                The practitioner
              </p>
              <h2
                className="font-spectral text-ink-h2 mb-2 [word-break:break-word]"
                style={{
                  fontSize: "clamp(40px, 5vw, 64px)",
                  lineHeight: 1.05,
                  letterSpacing: "-2.4px",
                  fontWeight: 400,
                }}
              >
                Toya.
              </h2>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                Toya Terrebonne is the owner and sole practitioner. She is listed in the NAHA (Northshore Alternative Health Alliance) directory for Naturopathy, Homeopathic, Traditional Chinese Medicine, and Herbal Medicine.
              </p>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                Louisiana does not license naturopathic doctors. That is a structural fact about how Louisiana regulates this field — not a comment on her training. What it means in practice is straightforward: Toya does not practice as a medical doctor, does not use a medical-doctor title, does not perform diagnoses, and does not prescribe pharmaceuticals. She offers consultation, naturopathy-tradition options, and wellness services. She always defers to your medical provider for medical care.
              </p>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                She is currently splitting time between Florida and Louisiana while caring for her son Dayne after his injury — a circumstance she shared openly with the practice&apos;s community in January 2026. The fastest way to confirm she is in town and book is a call or text to{" "}
                <a href="tel:9852786087" className="underline hover:text-mint transition-colors">
                  (985) 278-6087
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        {/* A note on names — cream band, uses "Family Wellness Clinic" anchor */}
        <section
          aria-label="A note on names"
          className="relative w-full bg-cream py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-5">
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                A note on names
              </p>
              <h2
                className="font-spectral text-ink-h2 [word-break:break-word]"
                style={{
                  fontSize: "clamp(32px, 3.6vw, 48px)",
                  lineHeight: 1.05,
                  letterSpacing: "-1.6px",
                  fontWeight: 400,
                }}
              >
                Several names, one practice.
              </h2>
            </div>
            <div className="md:col-span-7 space-y-6">
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                Several names overlap here for a real reason — the practice is rebuilding under a new identity while the legal LLC, the storefront sign, and the existing Google profile all use slightly different forms. For clarity:
              </p>
              <dl
                className="font-manrope text-ink-body space-y-4 [word-break:break-word]"
                style={{ fontSize: 17, lineHeight: 1.55, letterSpacing: "-0.2px" }}
              >
                <div className="border-t border-ink-body/15 pt-4">
                  <dt className="font-clash uppercase text-ink-h2 mb-1" style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}>
                    Google Business Profile name
                  </dt>
                  <dd>Holistic Medspa</dd>
                </div>
                <div className="border-t border-ink-body/15 pt-4">
                  <dt className="font-clash uppercase text-ink-h2 mb-1" style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}>
                    Legal entity
                  </dt>
                  <dd>Bayou Holistics, L.L.C. (Louisiana)</dd>
                </div>
                <div className="border-t border-ink-body/15 pt-4">
                  <dt className="font-clash uppercase text-ink-h2 mb-1" style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}>
                    Storefront window sign
                  </dt>
                  <dd>&ldquo;Mind &middot; Body &middot; Soul MEDSPA&rdquo;</dd>
                </div>
                {/* "Family Wellness Clinic" anchor — single sitewide use */}
                <div className="border-t border-ink-body/15 pt-4">
                  <dt className="font-clash uppercase text-ink-h2 mb-1" style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}>
                    Toya&apos;s preferred phrase for the rebuilt practice
                  </dt>
                  <dd>Family Wellness Clinic</dd>
                </div>
              </dl>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: "clamp(17px, 1.4vw, 19px)", lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                Throughout this website we use <strong>Holistic Medspa</strong> as the working display name. If you&apos;re looking for Bayou Holistics — that is still us. If you&apos;re looking for the new MEDSPA sign — that is the storefront. If your friend told you about a wellness clinic on West Main — same place.
              </p>
            </div>
          </div>
        </section>

        {/* Page Cheramie Abadie + Mildred memorial band */}
        <section
          aria-label="In memory and in honor"
          className="relative w-full bg-white py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-2 gap-12 md:gap-20">
            <div className="border-t-2 border-rose pt-8">
              <p
                className="font-clash uppercase text-rose mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                In memory
              </p>
              <h3
                className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
                style={{
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1.4px",
                  fontWeight: 400,
                }}
              >
                Page Cheramie Abadie.
              </h3>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: 17, lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                In June 2024, a team member named Page Cheramie Abadie passed away. The practice posted a quiet memorial on Instagram. She was part of the work. We mention her here because she was.
              </p>
            </div>

            <div className="border-t-2 border-mint pt-8">
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                In honor
              </p>
              <h3
                className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
                style={{
                  fontSize: "clamp(28px, 3.2vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1.4px",
                  fontWeight: 400,
                }}
              >
                Mildred Hayes Cheramie.
              </h3>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: 17, lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                The clinic&apos;s $1-per-minute body-work program — Milly&apos;s Minutes — is named after Mildred Hayes Cheramie. We honor her by keeping the name on the flyer that has stood since the early days.
              </p>
            </div>
          </div>
        </section>

        {/* The bigger picture */}
        <section
          aria-label="The bigger picture"
          className="relative w-full bg-cream py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1100px] px-5 md:px-[150px] text-center">
            <p
              className="font-clash uppercase text-mint mb-4"
              style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
            >
              The bigger picture
            </p>
            <h2
              className="font-spectral text-ink-h2 mb-8 [word-break:break-word]"
              style={{
                fontSize: "clamp(34px, 4.6vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-2.2px",
                fontWeight: 400,
              }}
            >
              A small, careful wellness practice.
            </h2>
            <p
              className="font-manrope text-ink-body mb-6 mx-auto [word-break:break-word]"
              style={{
                maxWidth: 760,
                fontSize: "clamp(17px, 1.5vw, 20px)",
                lineHeight: 1.65,
                letterSpacing: "-0.2px",
                fontWeight: 400,
              }}
            >
              This is a one-person-going-on-two practice with a $20 sauna session, a $30 lymphatic-drainage session, a $99 ZYTO scan (historical), Bach Flower consultations, doTERRA on the shelf, and a calendar that books by phone. We are not a luxury day spa. We are not a medical clinic. We are a small, careful wellness practice that has been operating on Bayou Lafourche for over five years, with returning clients across Louisiana, Alabama, Arkansas, and Ohio, and a community that has supported us through a rebrand and through Toya&apos;s months of part-time scheduling.
            </p>
            <p
              className="font-spectral text-ink-deep mx-auto [word-break:break-word]"
              style={{
                maxWidth: 760,
                fontSize: "clamp(22px, 2.4vw, 30px)",
                lineHeight: 1.3,
                letterSpacing: "-0.8px",
                fontWeight: 400,
              }}
            >
              If that is the kind of place you have been looking for, we would like to meet you.
            </p>
          </div>
        </section>

        {/* Storefront image-card slab (Stay-Connected style) — DS image-with-overlay-card pattern */}
        <section aria-label="Storefront — find us" className="relative w-full bg-white py-8 md:py-12">
          <div className="mx-auto w-full max-w-[1300px] px-5 md:px-0">
            <Reveal variant="mask" duration={1000}>
              <div className="relative overflow-hidden rounded-[28px]" style={{ minHeight: 360 }}>
                <Image
                  src="/media/contact-storefront-photo.jpg"
                  alt="The brown brick storefront at 16148 W Main St, Cut Off, Louisiana."
                  fill
                  sizes="(max-width: 1300px) 100vw, 1300px"
                  className="object-cover"
                />
                <div aria-hidden className="absolute inset-0 bg-overlay/55" />
                <div className="relative px-8 md:px-16 py-16 md:py-20 max-w-[640px]">
                  <p
                    className="font-clash uppercase text-mint mb-3"
                    style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                  >
                    Find us
                  </p>
                  <h3
                    className="font-spectral text-white mb-6 [word-break:break-word]"
                    style={{
                      fontSize: "clamp(32px, 4vw, 52px)",
                      lineHeight: 1.05,
                      letterSpacing: "-1.8px",
                      fontWeight: 400,
                    }}
                  >
                    The brown brick on West Main.
                  </h3>
                  <p
                    className="font-manrope text-white/85 [word-break:break-word]"
                    style={{ fontSize: 17, lineHeight: 1.55, letterSpacing: "-0.2px" }}
                  >
                    16148 W Main St, Cut Off, LA 70345. Parking in front. Hip-roof building, white window sign.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Find us — quick info card */}
        <section
          aria-label="Find us"
          className="relative w-full bg-white py-20 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
            <div className="grid md:grid-cols-4 gap-8 md:gap-12">
              {[
                { k: "Address", v: "16148 W Main St,\nCut Off, LA 70345" },
                { k: "Phone (cell, text-friendly)", v: "(985) 278-6087", href: "tel:9852786087" },
                { k: "Landline", v: "(985) 632-6087", href: "tel:9856326087" },
                { k: "Hours", v: "By appointment." },
              ].map((c) => (
                <div key={c.k} className="border-t border-ink-body/15 pt-5">
                  <p
                    className="font-clash uppercase text-mint mb-2"
                    style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}
                  >
                    {c.k}
                  </p>
                  {c.href ? (
                    <a
                      href={c.href}
                      className="font-spectral text-ink-h2 hover:text-mint transition-colors [word-break:break-word]"
                      style={{
                        fontSize: "clamp(20px, 2vw, 26px)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.8px",
                        fontWeight: 400,
                      }}
                    >
                      {c.v}
                    </a>
                  ) : (
                    <p
                      className="font-spectral text-ink-h2 whitespace-pre-line [word-break:break-word]"
                      style={{
                        fontSize: "clamp(20px, 2vw, 26px)",
                        lineHeight: 1.2,
                        letterSpacing: "-0.8px",
                        fontWeight: 400,
                      }}
                    >
                      {c.v}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <Testimonial />
        <ReadyToBook
          heading="Ready to come in?"
          body="The fastest path is a call or text to (985) 278-6087. Or send your details through the request form and Toya will reach back the next time she is in the clinic."
        />
        <Footer />
        <StickyMobileBar />
        <div className="md:hidden" aria-hidden style={{ height: "calc(64px + env(safe-area-inset-bottom))" }} />
      </main>
    </>
  );
}
