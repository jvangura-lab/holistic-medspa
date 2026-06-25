import type { Metadata } from "next";

import Header from "@/components/sections/Header";
import ServiceHero from "@/components/sections/ServiceHero";
import BookForm from "@/components/sections/BookForm";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";
import NumberedSteps from "@/components/ui/NumberedSteps";

/**
 * /book — Request a Consultation
 *
 * Composition per DESIGN_SYSTEM.md §5.2: Hero(480h) → centered Schedule form → call/text band
 * → "What happens next" NumberedSteps → Footer.
 *
 * Copy poured verbatim from CONTENT.md `/book` block.
 * Voice anchors used on this route: 0.
 */

export const metadata: Metadata = {
  title: "Request a Consultation",
  description:
    "Holistic Medspa books by hand. Send your details — or call or text (985) 278-6087. Toya replies in person.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Request a Consultation — Holistic Medspa, Cut Off LA",
    description: "Send your details below — or call or text. Toya replies in person.",
    type: "website",
  },
};

const NEXT_STEPS = [
  {
    title: "You see a confirmation.",
    body: "“Thanks. Toya will be in touch by call or text within a few days.” A short auto-reply lands in your inbox if you provided an email.",
  },
  {
    title: "Toya reads incoming requests when she is next in the clinic.",
    body: "She is currently splitting time between Florida and Louisiana while caring for her son after his injury, so response time may run a day or two depending on when she is next in. Calls during weekday afternoons are typically returned fastest.",
  },
  {
    title: "She replies to you personally.",
    body: "Usually by text if you indicated text is fine, otherwise by call. You agree on a specific date and time. Then you come in.",
  },
];

export default function BookPage() {
  return (
    <main className="relative bg-white brand-loader">
      <Header />
      <ServiceHero
        headline="Holistic Medspa books by hand."
        sub="Send your details below — or call or text. Toya replies in person."
        image="/media/services/service-naturopathy-consultation.jpg"
        imageAlt="The consultation room at Holistic Medspa, Cut Off, Louisiana."
        ctaHref="tel:9852786087"
        ctaLabel="Call now"
        showPhone={false}
      />

      {/* Fastest paths band */}
      <section
        aria-label="Fastest paths to book"
        className="relative w-full bg-cream py-16 md:py-20"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            {
              k: "Cell (text-friendly)",
              v: "(985) 278-6087",
              href: "tel:9852786087",
              note: "Texts are fine; we read them.",
            },
            {
              k: "Landline",
              v: "(985) 632-6087",
              href: "tel:9856326087",
              note: "Calls during weekday afternoons are returned fastest.",
            },
            {
              k: "Form below",
              v: "Send your details",
              href: "#form",
              note: "Toya replies via call or text the next time she is in the clinic.",
            },
          ].map((p) => (
            <a
              key={p.k}
              href={p.href}
              className="block border-t border-ink-body/15 pt-5 hover:border-mint transition-colors duration-150"
            >
              <p
                className="font-clash uppercase text-mint mb-2"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                {p.k}
              </p>
              <p
                className="font-spectral text-ink-h2 mb-3 [word-break:break-word]"
                style={{
                  fontSize: "clamp(24px, 2.8vw, 36px)",
                  lineHeight: 1.1,
                  letterSpacing: "-1.2px",
                  fontWeight: 400,
                }}
              >
                {p.v}
              </p>
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{ fontSize: 15, lineHeight: 1.5, letterSpacing: "-0.2px" }}
              >
                {p.note}
              </p>
            </a>
          ))}
        </div>
      </section>

      {/* Schedule paragraph + form */}
      <section
        id="form"
        aria-label="Request consultation form"
        className="relative w-full bg-white py-20 md:py-28 scroll-mt-20"
      >
        <div className="mx-auto w-full max-w-[820px] px-5 md:px-0">
          <p
            className="font-clash uppercase text-mint mb-4"
            style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
          >
            A note on scheduling
          </p>
          <h2
            className="font-spectral text-ink-h2 mb-6 [word-break:break-word]"
            style={{
              fontSize: "clamp(34px, 4.4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              fontWeight: 400,
            }}
          >
            Tell us a little about what you are looking for.
          </h2>
          <p
            className="font-manrope text-ink-body mb-12 md:mb-14 [word-break:break-word]"
            style={{ fontSize: 17, lineHeight: 1.65, letterSpacing: "-0.2px", fontWeight: 400 }}
          >
            Toya is currently splitting time between Florida and Louisiana while caring for her son after his injury. Response time on form submissions and texts may run a day or two depending on when she is next in. We appreciate your patience and your understanding.
          </p>
          <BookForm source="/book" />
        </div>
      </section>

      {/* What happens next */}
      <section
        aria-label="What happens after you submit"
        className="relative w-full bg-cream py-20 md:py-28"
      >
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
          <h2
            className="font-spectral text-ink-h2 mb-10 md:mb-14 [word-break:break-word]"
            style={{
              maxWidth: 860,
              fontSize: "clamp(34px, 4.4vw, 56px)",
              lineHeight: 1.05,
              letterSpacing: "-2px",
              fontWeight: 400,
            }}
          >
            What happens after you send.
          </h2>
          <NumberedSteps steps={NEXT_STEPS} surface="cream" />

          <div className="mt-16 md:mt-20 border-t border-ink-body/15 pt-10 max-w-[820px]">
            <p
              className="font-clash uppercase text-mint mb-3"
              style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
            >
              If you prefer to skip the form
            </p>
            <p
              className="font-manrope text-ink-body [word-break:break-word]"
              style={{ fontSize: 17, lineHeight: 1.65, letterSpacing: "-0.2px" }}
            >
              That is fine. Just call or text{" "}
              <a href="tel:9852786087" className="underline hover:text-mint transition-colors">
                (985) 278-6087
              </a>
              . The form is for convenience; the phone is always the most direct path.
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileBar />
      <div className="md:hidden h-[56px]" aria-hidden />
    </main>
  );
}
