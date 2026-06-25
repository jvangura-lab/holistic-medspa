import type { Metadata } from "next";

import LegalPage from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Plain-language privacy policy for Holistic Medspa — how we handle your form submissions, your wellness notes, and the third-party services we use.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      hero="Privacy Policy"
      sub="Plain language. How we handle your information when you contact us or visit the site."
      heroImage="/media/services/service-naturopathy-consultation.jpg"
      ownerNote="Review and have an attorney sign off on the final privacy policy before publish, especially the wellness-records section. Small wellness clinics in Louisiana do not have a HIPAA obligation by default — but if at any point you accept covered-entity referrals or work with insurance, the obligation may shift."
      sections={[
        {
          heading: "What we collect",
          body: (
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>When you fill out the request form on /book:</strong> your name, phone number, optional email, the service you indicated, your preferred contact method, your preferred time windows, and any notes you choose to add about your wellness situation.
              </li>
              <li>
                <strong>When you call or text:</strong> your phone number and the content of our conversation, kept informally in Toya&apos;s appointment notes for the purpose of providing your wellness service.
              </li>
              <li>
                <strong>When you visit the website:</strong> standard server logs (IP address, browser type, pages visited). We use these for site-health monitoring only.
              </li>
            </ul>
          ),
        },
        {
          heading: "What we do with it",
          body: (
            <ul className="list-disc pl-6 space-y-3">
              <li>We use your contact information to reply to your inquiry and to schedule and confirm your appointment.</li>
              <li>We use the notes about your wellness situation to prepare for your appointment and to keep informal records of your visits with us.</li>
              <li>We do not sell, rent, or share your personal information with third parties, with the limited exceptions noted below.</li>
            </ul>
          ),
        },
        {
          heading: "Third parties",
          body: (
            <ul className="list-disc pl-6 space-y-3">
              <li>
                <strong>The form submission system</strong> (currently planned to use Resend or a comparable transactional email provider) processes your form submission and delivers it to the clinic inbox. Their privacy policy governs that processing layer.
              </li>
              <li>
                <strong>Cloudflare Turnstile</strong> is used on the form to prevent automated spam. Cloudflare&apos;s privacy policy governs that interaction.
              </li>
              <li>
                <strong>Hosting and analytics:</strong> the site is hosted on standard cloud infrastructure. We do not use ad-tracking or behavioral-targeting tools.
              </li>
              <li>
                <strong>Hosted clinical events:</strong> if you book a hosted Sound Prevention ultrasound or a Sandy Cambre thermography clinic, those clinical providers will collect their own information directly from you for the imaging service. Their privacy policies apply to that data.
              </li>
            </ul>
          ),
        },
        {
          heading: "Wellness records (not medical records)",
          body: (
            <p>
              We are not a HIPAA-covered medical practice. Holistic Medspa is a wellness clinic and our notes about your visits are wellness records, not medical records. Even so, we treat them confidentially — they are not shared without your permission.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <>
              <p>You can:</p>
              <ul className="list-disc pl-6 space-y-3">
                <li>Ask us what information we have about you.</li>
                <li>Ask us to correct or update any information.</li>
                <li>Ask us to delete your information (with the exception of any information we are required to retain for tax or legal reasons).</li>
              </ul>
              <p>
                Send any of these requests to <a href="tel:9852786087" className="underline hover:text-mint transition-colors">(985) 278-6087</a> (call or text) or to the clinic email.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              The site uses essential cookies for security and to remember your form-submission state if you reload. It does not use behavioral-advertising or cross-site tracking cookies.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              We may update this policy as the practice grows or as required by law. Material changes will be noted at the top of this page.
            </p>
          ),
        },
        {
          heading: "Contact about privacy",
          body: (
            <p>
              Questions about this policy or your data: <a href="tel:9852786087" className="underline hover:text-mint transition-colors">(985) 278-6087</a>.
            </p>
          ),
        },
      ]}
    />
  );
}
