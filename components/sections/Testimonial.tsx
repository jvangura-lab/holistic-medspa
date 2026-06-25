import Image from "next/image";
import Reveal from "@/components/motion/Reveal";

/**
 * Testimonial — Figma 125:494 wrapper.
 * Source: sections-mid-NEW.tsx §8.
 *
 * Layout: centered ice-crystals icon 73×73 above quote body. Body is Spectral 40px ink-body,
 * leading 45px, tracking +2px, w=860, centered. Attribution Clash 20px ink-body tracking 1px.
 *
 * HM CONTENT.md `/` "What people say" block specifies: NO testimonial wall yet (mid-rebrand),
 * proof is community-tenure narrative. We render the honest version per content-strategist
 * spec: a community-tenure statement attributed to Holistic Medspa, not a fabricated quote.
 */
export default function Testimonial() {
  return (
    <section
      aria-label="What people say"
      className="relative w-full bg-white py-20 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-0 text-center">
        {/* Decorative icon */}
        <div className="mx-auto mb-10 md:mb-16" style={{ width: 73, height: 73 }}>
          <Image
            src="/figma-assets/imgIceCrystals01.svg"
            alt=""
            width={73}
            height={73}
            className="block mx-auto"
          />
        </div>
        {/* Quote body */}
        <Reveal variant="fade" duration={900}>
          <blockquote
            className="font-spectral text-ink-body mx-auto [word-break:break-word]"
            style={{
              maxWidth: 860,
              fontSize: "clamp(24px, 3.2vw, 40px)",
              lineHeight: 1.18,
              letterSpacing: "2px",
              fontWeight: 400,
            }}
          >
            <p className="mb-0">
              Over five years of returning clients across Bayou Lafourche, Louisiana, Alabama, Arkansas, and Ohio. Holistic Medspa does not have a Google review wall yet — what we have is a community that keeps coming back.
            </p>
          </blockquote>
        </Reveal>
        {/* Attribution */}
        <Reveal variant="fade" delay={400} duration={700} as="p"
          className="font-clash text-ink-body mt-8"
          style={{ fontSize: 20, letterSpacing: "1px", fontWeight: 400 }}
        >
          Toya Terrebonne &middot; Holistic Medspa, Cut Off, LA
        </Reveal>
      </div>
    </section>
  );
}
