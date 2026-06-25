import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Header from "@/components/sections/Header";
import ServiceHero from "@/components/sections/ServiceHero";
import BookForm from "@/components/sections/BookForm";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";

/**
 * /contact — Contact
 *
 * Composition per DESIGN_SYSTEM.md §5.2: Hero(480h) → split section form + details card +
 * storefront photo → "Or just call/text" CTA → Footer.
 *
 * Copy poured verbatim from CONTENT.md `/contact` block.
 * Voice anchor used here: "have a Blessed Day" (1× sitewide budget — the closing sign-off line).
 */

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Holistic Medspa is at 16148 W Main St, Cut Off, LA 70345. Call or text (985) 278-6087. The brown brick storefront on West Main, with the white window sign.",
  keywords: [
    "Holistic Medspa contact",
    "Bayou Holistics Cut Off LA",
    "wellness clinic Cut Off Louisiana",
    "16148 W Main St Cut Off",
    "985-278-6087",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Holistic Medspa, Cut Off LA",
    description: "The brown brick storefront on West Main, with the white window sign. 16148 W Main St, Cut Off, LA.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Holistic Medspa",
  alternateName: "Bayou Holistics LLC",
  url: "https://holistic-v6.vercel.app/contact",
  telephone: ["+1-985-278-6087", "+1-985-632-6087"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "16148 W Main St",
    addressLocality: "Cut Off",
    addressRegion: "LA",
    postalCode: "70345",
    addressCountry: "US",
  },
  sameAs: [
    "https://www.instagram.com/bayou_holistics/",
    "https://www.instagram.com/bayouholisticsllc/",
    "https://www.nahadirectory.com/listing/toya-terrebonne-bayou-holistics.html",
  ],
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative bg-white brand-loader">
        <Header />
        <ServiceHero
          headline="Cut Off, Louisiana."
          sub="The brown brick storefront on West Main, with the white window sign."
          image="/media/contact-storefront-photo.jpg"
          imageAlt="The Holistic Medspa storefront at 16148 W Main St, Cut Off, LA."
          ctaHref="tel:9852786087"
          ctaLabel="Call now"
          showPhone={false}
        />

        {/* Split — details left, form right */}
        <section
          aria-label="Contact details and form"
          className="relative w-full bg-white py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-12 gap-10 md:gap-16">
            {/* Details card */}
            <div className="md:col-span-5">
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                The details
              </p>
              <h2
                className="font-spectral text-ink-h2 mb-8 [word-break:break-word]"
                style={{
                  fontSize: "clamp(34px, 4.4vw, 56px)",
                  lineHeight: 1.05,
                  letterSpacing: "-2px",
                  fontWeight: 400,
                }}
              >
                Where to find us.
              </h2>

              <dl
                className="font-manrope text-ink-body space-y-6 mb-10 [word-break:break-word]"
                style={{ fontSize: 17, lineHeight: 1.6, letterSpacing: "-0.2px" }}
              >
                <div>
                  <dt className="font-clash uppercase text-ink-h2 mb-1" style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}>
                    Address
                  </dt>
                  <dd>
                    16148 W Main St
                    <br />
                    Cut Off, LA 70345
                  </dd>
                </div>
                <div>
                  <dt className="font-clash uppercase text-ink-h2 mb-1" style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}>
                    Phone (cell, text-friendly)
                  </dt>
                  <dd>
                    <a href="tel:9852786087" className="underline hover:text-mint transition-colors">
                      (985) 278-6087
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-clash uppercase text-ink-h2 mb-1" style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}>
                    Landline
                  </dt>
                  <dd>
                    <a href="tel:9856326087" className="underline hover:text-mint transition-colors">
                      (985) 632-6087
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-clash uppercase text-ink-h2 mb-1" style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}>
                    Hours
                  </dt>
                  <dd>By appointment only.</dd>
                </div>
              </dl>

              {/* Storefront photo */}
              <figure className="relative w-full h-[280px] md:h-[340px] overflow-hidden mb-4">
                <Image
                  src="/media/contact-storefront-photo.jpg"
                  alt="The Holistic Medspa storefront at 16148 W Main St, Cut Off, Louisiana — brown brick hip-roof building with white window sign."
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover"
                />
              </figure>
              <figcaption
                className="font-manrope text-ink-body/70"
                style={{ fontSize: 13, lineHeight: 1.5, letterSpacing: "-0.2px" }}
              >
                16148 W Main St, Cut Off, LA 70345 — parking in front, please come in.
              </figcaption>
            </div>

            {/* Form */}
            <div className="md:col-span-7">
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                Send a request
              </p>
              <h2
                className="font-spectral text-ink-h2 mb-8 [word-break:break-word]"
                style={{
                  fontSize: "clamp(28px, 3.4vw, 40px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1.4px",
                  fontWeight: 400,
                }}
              >
                Or fill in the form — Toya replies in person.
              </h2>
              <BookForm source="/contact" />
            </div>
          </div>
        </section>

        {/* Social + map placeholder band on cream */}
        <section
          aria-label="Social and location"
          className="relative w-full bg-cream py-20 md:py-24"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                Social
              </p>
              <h3
                className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
                style={{
                  fontSize: "clamp(26px, 3vw, 36px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1.2px",
                  fontWeight: 400,
                }}
              >
                Follow along.
              </h3>
              <ul
                className="font-manrope text-ink-body space-y-4 [word-break:break-word]"
                style={{ fontSize: 16, lineHeight: 1.55, letterSpacing: "-0.2px" }}
              >
                <li>
                  <a
                    href="https://www.instagram.com/bayou_holistics/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-mint transition-colors"
                  >
                    Instagram @bayou_holistics
                  </a>{" "}
                  — updates from Toya, occasional event flyers (thermography clinics, hosted ultrasound days, oil-of-the-month posts).
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/bayouholisticsllc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-mint transition-colors"
                  >
                    Instagram @bayouholisticsllc (archive)
                  </a>{" "}
                  — the dormant original handle from the 2020 founding. Still public, still worth browsing if you&apos;d like to see where the practice came from.
                </li>
              </ul>
            </div>

            <div>
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                The fastest way to reach us
              </p>
              <h3
                className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
                style={{
                  fontSize: "clamp(26px, 3vw, 36px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1.2px",
                  fontWeight: 400,
                }}
              >
                A text to (985) 278-6087.
              </h3>
              <p
                className="font-manrope text-ink-body mb-6 [word-break:break-word]"
                style={{ fontSize: 16, lineHeight: 1.6, letterSpacing: "-0.2px" }}
              >
                We appreciate the call when something requires a fuller conversation. For &ldquo;are you in town this week?&rdquo; and &ldquo;can I book a Lymphstar for Saturday?&rdquo; — a text is perfect.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="sms:9852786087"
                  className="font-clash bg-mint text-black uppercase rounded-pill text-center transition-[filter] duration-150 hover:brightness-95"
                  style={{
                    width: 200,
                    height: 50,
                    lineHeight: "50px",
                    fontSize: 16,
                    letterSpacing: "0.8px",
                    fontWeight: 500,
                  }}
                >
                  Text us
                </a>
                <Link
                  href="/book"
                  className="font-clash text-ink-body uppercase border-b border-ink-body/30 pb-1 hover:text-mint hover:border-mint transition-colors duration-150"
                  style={{ fontSize: 14, letterSpacing: "0.8px", fontWeight: 400 }}
                >
                  Or use the request form
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sign-off — uses the "Blessed Day" anchor 1× per voice budget */}
        <section
          aria-label="Sign-off"
          className="relative w-full bg-white py-24 md:py-32"
        >
          <div className="mx-auto w-full max-w-[1100px] px-5 md:px-[150px] text-center">
            <p
              className="font-spectral text-ink-deep mx-auto [word-break:break-word]"
              style={{
                maxWidth: 860,
                fontSize: "clamp(28px, 3.4vw, 44px)",
                lineHeight: 1.2,
                letterSpacing: "-1.4px",
                fontWeight: 400,
              }}
            >
              Thank you for being part of this practice. From all of us, have a Blessed Day.
            </p>
          </div>
        </section>

        <Footer />
        <StickyMobileBar />
        <div className="md:hidden h-[56px]" aria-hidden />
      </main>
    </>
  );
}
