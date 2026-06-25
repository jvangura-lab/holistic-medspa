import Image from "next/image";
import Link from "next/link";
import SplitText from "@/components/motion/SplitText";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ScrollScrub from "@/components/motion/ScrollScrub";
import MagneticHover from "@/components/motion/MagneticHover";

/**
 * ServiceHero — reduced-height hero (480px desktop / 380px mobile) per DESIGN_SYSTEM.md §5.1
 * extension rule #4. Used on /services index and every /services/[slug] deep page.
 *
 * Composition: bg photo + dark scrim + Spectral H1 at left/bottom + Manrope sub-copy +
 * outline mint CTA pill (same primitive as home hero §3.1 variant B). NO ellipse portrait.
 *
 * Header overlays this band (white nav over dark scrim) — same pattern as home hero, so
 * no header-color toggle required.
 */
export default function ServiceHero({
  headline,
  sub,
  image,
  imageAlt = "",
  ctaHref = "/book",
  ctaLabel = "Request Consult",
  showPhone = true,
}: {
  headline: string;
  sub?: string;
  image: string;
  imageAlt?: string;
  ctaHref?: string;
  ctaLabel?: string;
  showPhone?: boolean;
}) {
  return (
    <section
      aria-label="Page hero"
      className="relative w-full overflow-hidden bg-white"
    >
      {/* DESKTOP — 480px band, flow-based layout (anchored bottom; no fixed-y overlap) */}
      <div className="hidden md:block relative mx-auto h-[480px] w-full max-w-[1600px]">
        <div className="absolute inset-0 overflow-hidden">
          <ScrollScrub
            to={{ y: 60 }}
            start="top top"
            end="bottom top"
            scrub={1}
            className="absolute inset-0"
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1600px) 100vw, 1600px"
              priority
              className="object-cover pointer-events-none"
            />
          </ScrollScrub>
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.72) 100%)",
            }}
          />
        </div>

        {/* Flow stack — pinned to bottom-left with 60px bottom padding, content stacks naturally */}
        <div className="absolute inset-x-0 bottom-[60px] left-[150px] right-[150px] flex flex-col gap-6 max-w-[1100px]">
          <h1
            className="font-spectral not-italic text-white [word-break:break-word] overflow-hidden"
            style={{
              fontSize: "clamp(48px, 5.5vw, 72px)",
              lineHeight: 1.05,
              letterSpacing: "-2.4px",
              fontWeight: 400,
            }}
          >
            <SplitText text={headline} mode="words" stagger={0.08} duration={0.95} immediate yFrom={120} />
          </h1>

          {sub ? (
            <ScrollReveal
              variant="lift"
              delay={0.35}
              duration={0.75}
              as="p"
              className="font-manrope text-white/85 [word-break:break-word]"
              style={{
                fontSize: 20,
                lineHeight: "28px",
                letterSpacing: "-0.4px",
                fontWeight: 400,
                maxWidth: 760,
              }}
            >
              {sub}
            </ScrollReveal>
          ) : null}

          <div className="flex items-center gap-6 flex-wrap">
            <MagneticHover strength={12} className="inline-block">
              <Link
                href={ctaHref}
                className="h-[50px] w-[200px] rounded-pill border-2 border-solid border-mint transition-[filter] duration-150 hover:brightness-95 flex items-center justify-center font-clash text-mint uppercase"
                style={{ fontSize: 16, letterSpacing: "0.8px" }}
                aria-label={ctaLabel}
              >
                {ctaLabel}
              </Link>
            </MagneticHover>
            {showPhone ? (
              <a
                href="tel:9852786087"
                className="font-clash not-italic text-white whitespace-nowrap leading-[normal] transition-colors duration-150 hover:text-mint"
                style={{ fontSize: 18, letterSpacing: "0.9px", fontWeight: 400 }}
              >
                (985) 278-6087
              </a>
            ) : null}
          </div>
        </div>
      </div>

      {/* MOBILE — R4.A optimized.
          Skill applied:
            - Increased band height (420 → 460) so taller service names breathe.
            - Headline tracking softened (-1.4 → -1px) for 32px size readability.
            - Body sub-copy line-height 24 (1.6x) per skill body comfort rule.
            - Primary CTA is filled mint (highest affordance); phone is outline secondary.
            - Both CTAs ≥48pt tap targets, full-width stacked for thumb-zone reach. */}
      <div className="md:hidden relative w-full min-h-[460px] overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.74) 0%, rgba(0,0,0,0.32) 46%, rgba(0,0,0,0.80) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-6 left-0 right-0 px-5 flex flex-col gap-4">
          <h1
            className="font-spectral text-white [word-break:break-word] overflow-hidden"
            style={{
              fontSize: "34px",
              lineHeight: "38px",
              letterSpacing: "-1px",
              fontWeight: 400,
            }}
          >
            <SplitText text={headline} mode="words" stagger={0.06} duration={0.8} immediate yFrom={110} />
          </h1>
          {sub ? (
            <p
              className="font-manrope text-white/85 [word-break:break-word]"
              style={{ fontSize: 15, lineHeight: "24px", letterSpacing: "-0.15px", fontWeight: 400 }}
            >
              {sub}
            </p>
          ) : null}
          <div className="flex flex-col gap-2.5 mt-1">
            <Link
              href={ctaHref}
              className="tap-press font-clash uppercase rounded-pill bg-mint text-black inline-flex items-center justify-center w-full"
              style={{
                fontSize: 14,
                letterSpacing: "0.8px",
                fontWeight: 500,
                minHeight: 50,
              }}
            >
              {ctaLabel}
            </Link>
            {showPhone ? (
              <a
                href="tel:9852786087"
                className="tap-press font-clash uppercase rounded-pill border border-solid border-white/70 text-white inline-flex items-center justify-center w-full"
                style={{
                  fontSize: 13,
                  letterSpacing: "0.7px",
                  fontWeight: 500,
                  minHeight: 46,
                }}
              >
                Call (985) 278-6087
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
