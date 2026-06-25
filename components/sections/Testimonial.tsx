import Image from "next/image";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitText from "@/components/motion/SplitText";

/**
 * Testimonial — Figma 125:494 wrapper.
 * Source: sections-mid-NEW.tsx §8.
 *
 * Layout: centered ice-crystals icon 73×73 above quote body. Body is Spectral 40px ink-body,
 * leading 45px, tracking +2px, w=860, centered. Attribution Clash 20px ink-body tracking 1px.
 *
 * R3.C MOTION:
 *   - Icon: ScrollReveal `iris` (clip-path circle reveal — opens like an aperture)
 *   - Quote body: SplitText `lines` mode — each line cascades in
 *   - Attribution: ScrollReveal `lift` with delay
 */
export default function Testimonial() {
  return (
    <section
      aria-label="What people say"
      className="relative w-full bg-white py-20 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-0 text-center">
        {/* Decorative icon — iris aperture reveal */}
        <ScrollReveal variant="iris" duration={0.9} start="top 80%" className="mx-auto mb-10 md:mb-16" style={{ width: 73, height: 73 }}>
          <Image
            src="/figma-assets/imgIceCrystals01.svg"
            alt=""
            width={73}
            height={73}
            className="block mx-auto"
          />
        </ScrollReveal>
        {/* Quote body — line-by-line cascade.
            R4.A mobile pass: at mobile sizes (clamp's lower bound), 2px letter-spacing reads
            airy and disconnected. The clamp-driven inline style overrode any sm: utility,
            so we use CSS env() via `[--mobile-track:...]` and a media-query fallback in the
            style attribute via the var. Simpler: bump the min size to 22 + use a CSS
            variable expression for tracking that auto-shrinks at small sizes. */}
        <blockquote
          className="font-spectral text-ink-body mx-auto [word-break:break-word] [letter-spacing:0.4px] sm:[letter-spacing:2px]"
          style={{
            maxWidth: 860,
            fontSize: "clamp(22px, 3.2vw, 40px)",
            lineHeight: 1.35,
            fontWeight: 400,
          }}
        >
          <SplitText
            text="Over five years of returning clients across Bayou Lafourche, Louisiana, Alabama, Arkansas, and Ohio. Holistic Medspa does not have a Google review wall yet — what we have is a community that keeps coming back."
            mode="lines"
            as="p"
            stagger={0.12}
            duration={0.9}
            start="top 80%"
            yFrom={110}
            className="mb-0"
          />
        </blockquote>
        {/* Attribution */}
        <ScrollReveal
          variant="lift"
          delay={0.4}
          duration={0.7}
          as="p"
          className="font-clash text-ink-body mt-8"
          style={{ fontSize: 20, letterSpacing: "1px", fontWeight: 400 }}
        >
          Toya Terrebonne &middot; Holistic Medspa, Cut Off, LA
        </ScrollReveal>
      </div>
    </section>
  );
}
