import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import PillBands from "@/components/sections/PillBands";
import WhatWeOffer from "@/components/sections/WhatWeOffer";
import ScheduleSession from "@/components/sections/ScheduleSession";
import StayConnected from "@/components/sections/StayConnected";
import ServiceCategories from "@/components/sections/ServiceCategories";
import Testimonial from "@/components/sections/Testimonial";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";

/**
 * Holistic Medspa — home route `/`.
 * Phase F3.2 build.
 *
 * Section order per DESIGN_SYSTEM.md §4 home layout (literal Figma port):
 *  1. Header (sticky overlay)
 *  2. Hero (1633×800 bleeding bg + scrim + Spectral 120px H1 + ellipse portrait + outline CTA + phone label + sub-copy)
 *  3-5. Three sticky-stacking pill bands (Sessions black-30 / Treatments black-50 / Services brown)
 *  6. What we offer 8-tile service grid (DS §5 extension from Figma 6-tile)
 *  7. Schedule a Session form + right image
 *  8. Stay Connected centered H2 + 3 tiles (Gift Card / Newsletter / Become a Member)
 *  9. Offer & Packages 4-card row (DS §5 extension from Figma 3-tier pricing → 4 catalog categories)
 * 10. Testimonial centered slab (honest community-tenure version per content-strategist)
 * 11. Footer (ready-CTA + dark panel with link cols + black copyright bar)
 * 12. Sticky mobile bar (Call/Text/Book, fixed bottom <md)
 *
 * JSON-LD LocalBusiness schema embedded for SEO.
 */

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: "Holistic Medspa",
  alternateName: "Bayou Holistics LLC",
  description:
    "A small wellness clinic on Bayou Lafourche offering naturopathy consultations, lymphatic drainage, infrared sauna, ZYTO scans, and essential-oil care. By appointment, by hand, by Toya.",
  url: "https://holistic-v6.vercel.app",
  telephone: ["+1-985-278-6087", "+1-985-632-6087"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "17361 W Main St",
    addressLocality: "Cut Off",
    addressRegion: "LA",
    postalCode: "70345",
    addressCountry: "US",
  },
  founder: { "@type": "Person", name: "Toya Terrebonne" },
  sameAs: [
    "https://www.instagram.com/bayou_holistics/",
    "https://www.facebook.com/profile.php?id=61556091000",
    "https://www.nahadirectory.com/listing/toya-terrebonne-bayou-holistics.html",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="relative bg-white brand-loader">
        <Header />
        <Hero />
        <PillBands />
        <WhatWeOffer />
        <ScheduleSession />
        <StayConnected />
        <ServiceCategories />
        <Testimonial />
        <Footer />
        <StickyMobileBar />
        {/* Mobile-bar bottom-padding spacer so footer copyright row clears the fixed sticky bar */}
        <div className="md:hidden" aria-hidden style={{ height: "calc(64px + env(safe-area-inset-bottom))" }} />
      </main>
    </>
  );
}
