import type { Metadata } from "next";

import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Plain-language terms of use for Holistic Medspa. Wellness-service disclaimers, intellectual property, governing law (Louisiana).",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <LegalPage
      hero="Terms of Use"
      sub="Plain language. The rules of using this site and the wellness services described on it."
      heroImage="/media/services/service-naturopathy-consultation.jpg"
      ownerNote="Have an attorney review final terms before publish."
      sections={[
        {
          heading: "Use of the site",
          body: (
            <p>
              This site is provided for informational purposes about Holistic Medspa and its services. By using the site, you agree to use it lawfully and not to interfere with its operation.
            </p>
          ),
        },
        {
          heading: "Not medical advice",
          body: (
            <p>
              Information on this site is for general wellness and educational purposes only. It is not medical advice and is not a substitute for the diagnosis, treatment, or advice of a licensed medical provider. Always consult your medical provider for medical concerns.
            </p>
          ),
        },
        {
          heading: "Wellness services disclaimer",
          body: (
            <>
              <p>
                The wellness services described on this site — naturopathy consultations, ZYTO scans, lymphatic drainage, infrared sauna, vibra plate, ionic foot bath, OlyLife THz sessions, Bach Flower consultations, doTERRA essential oils retail, hosted thermography clinics, hosted ultrasound events — are wellness modalities and consultations. They are not medical procedures. They are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
              <p>Specific notes for specific services:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  <strong>ZYTO scans:</strong> not a medical diagnostic test. Results are for wellness and educational purposes only.
                </li>
                <li>
                  <strong>Thermography:</strong> an adjunctive tool and is not a replacement for mammography or any other clinically indicated diagnostic imaging.
                </li>
                <li>
                  <strong>Hosted ultrasound events (Sound Prevention):</strong> Sound Prevention is the clinical provider performing and reading the scans. Holistic Medspa is the host venue and scheduling contact. Any clinically concerning findings should be reviewed promptly with your medical provider.
                </li>
                <li>
                  <strong>OlyLife THz / PEMF sessions:</strong> a wellness session only. PEMF technology is FDA-cleared at the Class II level for non-union bone fractures specifically; broader wellness use of PEMF and THz is not FDA-evaluated as a medical procedure.
                </li>
                <li>
                  <strong>doTERRA essential oils:</strong> lifestyle and wellness use; not for treating, curing, or preventing any disease.
                </li>
                <li>
                  <strong>Bach Flowers:</strong> not FDA-evaluated for efficacy; presented as a homeopathy-tradition wellness practice.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: "Cancellation and rescheduling",
          body: (
            <p>
              We ask for as much notice as possible if you need to cancel or reschedule an appointment. Call or text{" "}
              <a href="tel:9852786087" className="underline hover:text-mint transition-colors">(985) 278-6087</a>.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              To the maximum extent permitted by law, Holistic Medspa, Bayou Holistics LLC, its owner, and its visiting practitioners are not liable for any incidental or consequential damages arising from your use of this site or from any wellness services described on this site.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <p>
              Site content, including photography of the storefront and clinic, is the property of Bayou Holistics LLC. Please do not republish without permission.
            </p>
          ),
        },
        {
          heading: "Changes",
          body: (
            <p>We may update these terms as needed. Material changes will be noted at the top of this page.</p>
          ),
        },
        {
          heading: "Governing law",
          body: <p>These terms are governed by the laws of the State of Louisiana.</p>,
        },
      ]}
    />
  );
}
