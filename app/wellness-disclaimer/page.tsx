import type { Metadata } from "next";

import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Wellness Disclaimer",
  description:
    "The services described on this site are wellness modalities, not medical procedures. Louisiana naturopath licensure context and per-service regulatory notes.",
  alternates: { canonical: "/wellness-disclaimer" },
  robots: { index: true, follow: true },
};

export default function WellnessDisclaimerPage() {
  return (
    <LegalPage
      hero="Wellness Disclaimer"
      sub="The services described on this site are wellness modalities, not medical procedures. Always consult your medical provider for medical concerns."
      heroImage="/media/services/service-naturopathy-consultation.jpg"
      sections={[
        {
          heading: "Plain language",
          intro: "The services described on this site are wellness modalities, not medical procedures.",
          body: (
            <p>
              We do not perform diagnoses, treat conditions, cure illness, or prevent disease. The information on this site, in our consultations, and in our printed materials is for general wellness and educational purposes only. It is not medical advice and is not a substitute for the diagnosis, treatment, or advice of a licensed medical provider. Always consult your medical provider for medical concerns.
            </p>
          ),
        },
        {
          heading: "Why this page exists",
          body: (
            <p>
              Louisiana does not license naturopathic doctors. The owner of this practice, Toya Terrebonne, is a wellness practitioner — not a medical doctor. The services on offer (consultations, ZYTO scans, lymphatic drainage, infrared sauna, vibra plate, ionic foot bath, Bach Flower consultations, essential-oil retail, hosted clinical-imaging events with third-party providers, OlyLife THz sessions) are wellness modalities. They are honest, gentle, and useful in their own register — and they are not medical care.
            </p>
          ),
        },
        {
          heading: "Specific service notes",
          body: (
            <>
              <p>(Repeats from /terms, kept here for direct linking.)</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>ZYTO scans</strong> are not intended to identify, treat, cure, or prevent any disease. Results are for wellness and educational purposes only.
                </li>
                <li>
                  <strong>Thermography</strong> is an adjunctive tool and is not a replacement for mammography or any other clinically indicated diagnostic imaging.
                </li>
                <li>
                  <strong>Hosted ultrasound events</strong> are performed and read by Sound Prevention, a third-party clinical provider. Holistic Medspa is the host venue and scheduling contact.
                </li>
                <li>
                  <strong>OlyLife THz / PEMF sessions</strong> are wellness sessions, not medical procedures.
                </li>
                <li>
                  <strong>doTERRA essential oils</strong> are sold as lifestyle and wellness products; not for treating, curing, or preventing any disease.
                </li>
                <li>
                  <strong>Bach Flower Remedies</strong> are not FDA-evaluated for efficacy.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "When to see your medical provider",
          body: (
            <ul className="list-disc pl-6 space-y-3">
              <li>Always for medical diagnosis and treatment.</li>
              <li>Always for medication questions.</li>
              <li>Promptly if any imaging or scan flags something for follow-up.</li>
              <li>Promptly for any new or concerning symptom.</li>
              <li>Always, in pregnancy, before adding new wellness modalities or supplements.</li>
            </ul>
          ),
        },
        {
          heading: "How to reach us about a concern",
          body: (
            <p>
              Call or text <a href="tel:9852786087" className="underline hover:text-mint transition-colors">(985) 278-6087</a>. We are a small practice; we read what comes in.
            </p>
          ),
        },
      ]}
    />
  );
}
