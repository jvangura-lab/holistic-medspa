import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";
import ServiceHero from "@/components/sections/ServiceHero";

import type { ReactNode } from "react";

/**
 * LegalPage — shared composition for /privacy, /terms, /accessibility, /wellness-disclaimer.
 *
 * Composition per DESIGN_SYSTEM.md §5.2: Hero(360h via ServiceHero 480h reduced) →
 * long-form prose body Manrope 18px ink #242424 w=860 centered → Footer.
 */
export type LegalSection = {
  /** Spectral H2 */
  heading?: string;
  /** Optional intro paragraph (used for "Plain language" blocks). */
  intro?: string;
  /** Body — paragraphs (string[]) or pre-rendered JSX. */
  body?: ReactNode;
};

export default function LegalPage({
  hero,
  sub,
  heroImage,
  ownerNote,
  sections,
}: {
  hero: string;
  sub?: string;
  heroImage: string;
  ownerNote?: string;
  sections: LegalSection[];
}) {
  return (
    <main className="relative bg-white brand-loader">
      <Header />
      <ServiceHero
        headline={hero}
        sub={sub}
        image={heroImage}
        imageAlt=""
        ctaHref="/contact"
        ctaLabel="Contact us"
        showPhone={true}
      />

      <section
        aria-label="Legal content"
        className="relative w-full bg-white py-16 md:py-24"
      >
        <div className="mx-auto w-full max-w-[920px] px-5 md:px-8">
          {ownerNote ? (
            <div
              className="mb-12 md:mb-16 border-l-2 border-mint pl-5 py-2"
              role="note"
            >
              <p
                className="font-clash uppercase text-mint mb-2"
                style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                Note for owner before publish
              </p>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: 15, lineHeight: 1.6, letterSpacing: "-0.2px" }}
              >
                {ownerNote}
              </p>
            </div>
          ) : null}

          {sections.map((s, i) => (
            <div key={i} className={i === 0 ? "" : "mt-14 md:mt-16"}>
              {s.heading ? (
                <h2
                  className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
                  style={{
                    fontSize: "clamp(28px, 3.4vw, 44px)",
                    lineHeight: 1.1,
                    letterSpacing: "-1.6px",
                    fontWeight: 400,
                  }}
                >
                  {s.heading}
                </h2>
              ) : null}
              {s.intro ? (
                <p
                  className="font-spectral text-ink-deep mb-6 [word-break:break-word]"
                  style={{
                    fontSize: "clamp(22px, 2.2vw, 28px)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.6px",
                    fontWeight: 400,
                  }}
                >
                  {s.intro}
                </p>
              ) : null}
              {s.body ? (
                <div
                  className="font-manrope text-ink-body space-y-5 [word-break:break-word]"
                  style={{ fontSize: 18, lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
                >
                  {s.body}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <StickyMobileBar />
      <div className="md:hidden h-[56px]" aria-hidden />
    </main>
  );
}
