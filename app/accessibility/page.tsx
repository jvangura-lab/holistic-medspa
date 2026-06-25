import type { Metadata } from "next";

import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "Holistic Medspa's commitment to web accessibility (WCAG 2.2 AA) and physical-clinic accessibility in Cut Off, Louisiana.",
  alternates: { canonical: "/accessibility" },
  robots: { index: true, follow: true },
};

export default function AccessibilityPage() {
  return (
    <LegalPage
      hero="Accessibility Statement"
      sub="Our commitment to making this site and our clinic accessible — and how to reach us if something is not working for you."
      heroImage="/media/contact-storefront-photo.jpg"
      ownerNote="Confirm physical accessibility specifics — ramp at entry, ADA-accessible restroom, parking accessibility, any features that would be useful for a client to know in advance."
      sections={[
        {
          heading: "Our commitment",
          body: (
            <p>
              Holistic Medspa is committed to making this website and our physical clinic accessible to as many people as possible, regardless of ability or device.
            </p>
          ),
        },
        {
          heading: "On the website",
          body: (
            <ul className="list-disc pl-6 space-y-3">
              <li>
                The site is built to <strong>WCAG 2.2 AA</strong> standards.
              </li>
              <li>Color contrast, keyboard navigation, focus states, and screen-reader support are tested at build.</li>
              <li>
                Motion respects <code className="font-manrope text-ink-deep bg-cream px-1.5 py-0.5">prefers-reduced-motion</code>.
              </li>
              <li>
                If you find a page that does not work well for your device or assistive technology, please let us know — call or text{" "}
                <a href="tel:9852786087" className="underline hover:text-mint transition-colors">(985) 278-6087</a>.
              </li>
            </ul>
          ),
        },
        {
          heading: "At the clinic",
          body: (
            <ul className="list-disc pl-6 space-y-3">
              <li>The clinic is a single-suite ground-floor space at 16148 W Main St, Cut Off.</li>
              <li>If you have specific accessibility needs (mobility, sensory, communication), please tell us when you book so we can prepare. We are a small practice and can adapt the appointment, the room setup, and the timing to fit.</li>
            </ul>
          ),
        },
        {
          heading: "Reaching us for accessibility questions",
          body: (
            <p>
              Call or text <a href="tel:9852786087" className="underline hover:text-mint transition-colors">(985) 278-6087</a>. We respond in person.
            </p>
          ),
        },
      ]}
    />
  );
}
