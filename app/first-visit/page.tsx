import type { Metadata } from "next";

import Header from "@/components/sections/Header";
import ServiceHero from "@/components/sections/ServiceHero";
import ReadyToBook from "@/components/sections/ReadyToBook";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";
import NumberedSteps from "@/components/ui/NumberedSteps";

/**
 * /first-visit — Your First Visit
 *
 * Composition per DESIGN_SYSTEM.md §5.2: Hero(480h) → numbered step cards → "What to bring"
 * inline list → ReadyToBook CTA → Footer.
 *
 * Copy poured verbatim from CONTENT.md `/first-visit` block.
 * Voice anchors used on this route: 0 (anchors live on /about and /contact).
 */

export const metadata: Metadata = {
  title: "Your First Visit",
  description:
    "What to expect, what to bring, and the small ways we keep your first hour calm at Holistic Medspa, Cut Off LA.",
  alternates: { canonical: "/first-visit" },
  openGraph: {
    title: "Your First Visit — Holistic Medspa, Cut Off LA",
    description: "What to expect, what to bring, and the small ways we keep your first hour calm.",
    type: "website",
  },
};

const STEPS = [
  {
    title: "Before you come — reach out and pick a service.",
    body: "Call or text (985) 278-6087 (cell) or call the landline at (985) 632-6087. Or send your details through the form on /book. Toya replies in person. Most first visits are either a 1-hour naturopathy consultation, a 30-minute Lymphstar lymphatic-drainage session, a 20-30 minute ZYTO scan with walkthrough, or a Milly's Minutes session of your choice. If you are not sure which to start with, ask when you book — Toya will help you pick.",
  },
  {
    title: "A short intake — your own words.",
    body: "Toya may text or email a brief intake form to fill out before your appointment (current medications, supplements, primary concerns, what your medical provider has said). It is short. Use your own words. Handwritten notes on the back of an envelope are also fine.",
  },
  {
    title: "When you arrive — a few minutes to settle.",
    body: "The clinic is small — a single-suite practice at 16148 W Main St, Cut Off — the brown brick hip-roof building with the white sign in the window. Parking is in front. Please come in. Use the restroom, pour a glass of water, take a breath. We do not rush first visits. Toya greets you in person; we are a one-person practice with no front-desk staff layer.",
  },
  {
    title: "Your appointment — a calm hour, in your rhythm.",
    body: "Each service has its own flow — see the per-service page for the specifics. As a general rhythm: a few minutes of conversation to confirm what you came for and check in on the rest of life; the service itself; a short close-out with any notes, recommendations, and a follow-up suggestion if relevant. Payment is at the time of service (cash, check, or card).",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "Your First Visit to Holistic Medspa",
  description: "Step-by-step what to expect for a first visit to Holistic Medspa in Cut Off, Louisiana.",
  step: STEPS.map((s, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: s.title,
    text: s.body,
  })),
};

export default function FirstVisitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative bg-white brand-loader">
        <Header />
        <ServiceHero
          headline="Your first hour, unhurried."
          sub="Holistic Medspa is a one-person practice. Toya greets you, listens, and walks you through your first session at your pace — never a clipboard speed-run."
          image="/media/first-visit/first-visit-step-cypress.jpg"
          imageAlt="The clinic interior at Holistic Medspa, Cut Off, Louisiana."
          ctaHref="/book"
          ctaLabel="Request Consult"
        />

        {/* Numbered steps — the rhythm of the first visit */}
        <section
          aria-label="The rhythm of your first visit"
          className="relative w-full bg-white py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
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
              The shape of the first hour.
            </h2>
            <NumberedSteps steps={STEPS} surface="cream" />
          </div>
        </section>

        {/* What to bring + after-your-visit + small notes */}
        <section
          aria-label="What to bring and what we ask"
          className="relative w-full bg-cream py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px] grid md:grid-cols-2 gap-12 md:gap-20">
            {/* What to bring */}
            <div>
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                Bring with you
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
                A short list, nothing polished.
              </h3>
              <ul
                className="font-manrope text-ink-body space-y-3 [word-break:break-word]"
                style={{ fontSize: 17, lineHeight: 1.6, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                <li>Comfortable clothing — loose layers if you have a body-work session.</li>
                <li>Your current medication and supplement list.</li>
                <li>Recent lab results if you have any (useful context — never required).</li>
                <li>Water — you can refill at the clinic.</li>
                <li>Any handwritten notes about what you would most like to talk about.</li>
              </ul>
            </div>

            {/* After your visit */}
            <div>
              <p
                className="font-clash uppercase text-mint mb-4"
                style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
              >
                After your visit
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
                Hydrate. Take a few notes. Reach out.
              </h3>
              <ul
                className="font-manrope text-ink-body space-y-3 [word-break:break-word]"
                style={{ fontSize: 17, lineHeight: 1.6, letterSpacing: "-0.2px", fontWeight: 400 }}
              >
                <li>
                  <strong>Hydrate</strong> if you have had a Lymphstar, sauna, vibra plate, ionic foot bath, or OlyLife session. Plain water. Avoid caffeine and alcohol for the rest of the day if you can.
                </li>
                <li>
                  <strong>Take notes</strong> of how you feel over the next 24-48 hours if you would like to bring those observations to a follow-up.
                </li>
                <li>
                  <strong>Reach out with questions.</strong> Call or text{" "}
                  <a href="tel:9852786087" className="underline hover:text-mint transition-colors">
                    (985) 278-6087
                  </a>
                  . We do not have an email-ticket system; we reply in person on the phone line.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* What we ask of you + access/payment/cancel notes */}
        <section
          aria-label="What we ask of you"
          className="relative w-full bg-white py-20 md:py-28"
        >
          <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
            <h2
              className="font-spectral text-ink-h2 mb-10 md:mb-14 [word-break:break-word]"
              style={{
                maxWidth: 860,
                fontSize: "clamp(34px, 4.4vw, 56px)",
                lineHeight: 1.1,
                letterSpacing: "-2px",
                fontWeight: 400,
              }}
            >
              What we ask of you in return.
            </h2>
            <div className="grid md:grid-cols-3 gap-10 md:gap-14">
              {[
                {
                  k: "01",
                  t: "Be honest about your medical care.",
                  b: "Tell us about ongoing conditions, medications, and what your medical provider has said. We work alongside your medical care, not in place of it.",
                },
                {
                  k: "02",
                  t: "Reschedule promptly if you need to.",
                  b: "A call or text is fine. We are a small practice and the slots fill quickly when Toya is in town.",
                },
                {
                  k: "03",
                  t: "Tell us if something has not worked.",
                  b: "Honest feedback after a session helps the next conversation be more useful.",
                },
              ].map((card) => (
                <div key={card.k} className="border-t border-ink-body/15 pt-6">
                  <p
                    className="font-clash uppercase text-mint mb-3"
                    style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
                  >
                    {card.k} &middot; What we ask
                  </p>
                  <h3
                    className="font-spectral text-ink-h2 mb-4 [word-break:break-word]"
                    style={{
                      fontSize: "clamp(22px, 2.2vw, 28px)",
                      lineHeight: 1.2,
                      letterSpacing: "-0.8px",
                      fontWeight: 400,
                    }}
                  >
                    {card.t}
                  </h3>
                  <p
                    className="font-manrope text-ink-body [word-break:break-word]"
                    style={{ fontSize: 16, lineHeight: 1.6, letterSpacing: "-0.2px", fontWeight: 400 }}
                  >
                    {card.b}
                  </p>
                </div>
              ))}
            </div>

            {/* Three small notes (accessibility / payment / cancellation) */}
            <div className="mt-20 md:mt-24 grid md:grid-cols-3 gap-10 md:gap-14 border-t border-ink-body/15 pt-12 md:pt-16">
              {[
                {
                  t: "A note on accessibility",
                  b: "The clinic is a single-suite ground-floor space. If you have specific accessibility needs (mobility, sensory, communication), tell us when you book so we can prepare the space and the appointment to fit.",
                },
                {
                  t: "A note on payment",
                  b: "Wellness services at this clinic are paid at the time of service. We accept cash, check, and major credit cards. Insurance is not billed. If you have an HSA or FSA card, the eligibility of specific services depends on your plan administrator — bring the card and ask; we'll process what is accepted.",
                },
                {
                  t: "A note on cancellation",
                  b: "If you need to reschedule or cancel, a call or text as soon as you know is the most helpful. Last-minute cancellations occasionally happen and we understand; equally, we ask that you give the next client a chance at the slot by reaching out as soon as you know.",
                },
              ].map((n) => (
                <div key={n.t}>
                  <h4
                    className="font-clash text-ink-h2 uppercase mb-4"
                    style={{ fontSize: 14, letterSpacing: "0.8px", fontWeight: 500 }}
                  >
                    {n.t}
                  </h4>
                  <p
                    className="font-manrope text-ink-body [word-break:break-word]"
                    style={{ fontSize: 15, lineHeight: 1.6, letterSpacing: "-0.2px", fontWeight: 400 }}
                  >
                    {n.b}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ReadyToBook
          heading="Ready to book your first visit?"
          body="The fastest path is a call or text to (985) 278-6087. Or send your details through the request form and Toya will reach back the next time she is in the clinic."
        />
        <Footer />
        <StickyMobileBar />
        <div className="md:hidden h-[56px]" aria-hidden />
      </main>
    </>
  );
}
