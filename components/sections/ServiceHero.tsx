import Image from "next/image";
import Link from "next/link";

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
      {/* DESKTOP — 480px band */}
      <div className="hidden md:block relative mx-auto h-[480px] w-full max-w-[1600px]">
        <div className="absolute inset-0">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1600px) 100vw, 1600px"
            priority
            className="object-cover pointer-events-none"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.72) 100%)",
            }}
          />
        </div>

        {/* Headline — Spectral, left=150 (page gutter), positioned bottom-up */}
        <h1
          className="absolute font-spectral left-[150px] right-[150px] not-italic text-white [word-break:break-word]"
          style={{
            top: 200,
            fontSize: "clamp(48px, 5.5vw, 72px)",
            lineHeight: 1.05,
            letterSpacing: "-2.4px",
            fontWeight: 400,
            maxWidth: 1100,
          }}
        >
          {headline}
        </h1>

        {sub ? (
          <p
            className="absolute font-manrope left-[150px] text-white/85 [word-break:break-word]"
            style={{
              top: 340,
              fontSize: 20,
              lineHeight: "28px",
              letterSpacing: "-0.4px",
              fontWeight: 400,
              maxWidth: 760,
            }}
          >
            {sub}
          </p>
        ) : null}

        {/* Outline mint CTA pill 200×50 — same primitive as home hero variant B */}
        <Link
          href={ctaHref}
          className="absolute h-[50px] left-[150px] top-[400px] w-[200px] rounded-pill border-2 border-solid border-mint transition-[filter] duration-150 hover:brightness-95 flex items-center justify-center font-clash text-mint uppercase"
          style={{ fontSize: 16, letterSpacing: "0.8px" }}
          aria-label={ctaLabel}
        >
          {ctaLabel}
        </Link>

        {showPhone ? (
          <a
            href="tel:9852786087"
            className="absolute font-clash not-italic text-white whitespace-nowrap leading-[normal] transition-colors duration-150 hover:text-mint"
            style={{ left: 380, top: 415, fontSize: 18, letterSpacing: "0.9px", fontWeight: 400 }}
          >
            (985) 278-6087
          </a>
        ) : null}
      </div>

      {/* MOBILE — 380px band */}
      <div className="md:hidden relative w-full h-[420px] overflow-hidden">
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
              "linear-gradient(to bottom, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.34) 46%, rgba(0,0,0,0.74) 100%)",
          }}
        />
        <h1
          className="absolute font-spectral text-white px-5 left-0 right-0 [word-break:break-word]"
          style={{
            top: 140,
            fontSize: "32px",
            lineHeight: "36px",
            letterSpacing: "-1.4px",
            fontWeight: 400,
          }}
        >
          {headline}
        </h1>
        {sub ? (
          <p
            className="absolute font-manrope text-white/85 px-5 left-0 right-0 [word-break:break-word]"
            style={{ top: 260, fontSize: 15, lineHeight: "22px", fontWeight: 400 }}
          >
            {sub}
          </p>
        ) : null}
        <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 flex-wrap">
          <Link
            href={ctaHref}
            className="font-clash uppercase rounded-pill border-2 border-solid border-mint text-mint px-5 py-2"
            style={{ fontSize: 14, letterSpacing: "0.7px" }}
          >
            {ctaLabel}
          </Link>
          {showPhone ? (
            <a
              href="tel:9852786087"
              className="font-clash text-white"
              style={{ fontSize: 15, letterSpacing: "0.7px" }}
            >
              (985) 278-6087
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
