import Image from "next/image";
import Link from "next/link";

/**
 * PriceCard — single-card extraction of the pricing-card primitive defined in
 * DESIGN_SYSTEM.md §3.5 (Offer & Packages, used in F3.2 home as ServiceCategories).
 *
 * Chrome (DS §3.5 verbatim):
 *  - Frame: 420×564 minimum, bg rgba(125,184,138,0.6), backdrop-blur 5px, no radius
 *  - Title: Clash Display Medium 31px ink-deep
 *  - Price stack: Manrope 25.8 / 80 / 22 inside Archivo wrapper
 *  - Checklist: Manrope 18 ink-deep, 36px stride, imgMdiTick 21×19 icon
 *  - CTA: bg black, 353×53 rounded-50, Clash 20 white tracking 1px
 *
 * Generalized so it can sit alone on a service deep page Pricing section, OR as a row
 * member on /pricing later in F3.4.
 */

export type PriceCardBullet = string;

export default function PriceCard({
  title,
  priceLine,
  bullets,
  ctaLabel = "Schedule Now",
  ctaHref = "/book",
  note,
}: {
  title: string;
  /** Already-laid-out price line, e.g. ["$", "60", "/Scan"] or [null, "By", "Consult"]. */
  priceLine: { glyph?: string; digits: string; suffix: string };
  bullets: PriceCardBullet[];
  ctaLabel?: string;
  ctaHref?: string;
  note?: string;
}) {
  return (
    <article
      className="relative backdrop-blur-[5px] flex flex-col"
      style={{
        background: "rgba(125,184,138,0.6)",
        minHeight: 540,
        padding: "30px",
      }}
    >
      <h3
        className="font-clash text-ink-deep mb-6 [word-break:break-word]"
        style={{ fontSize: "clamp(24px, 2.4vw, 31px)", fontWeight: 500, lineHeight: 1.1 }}
      >
        {title}
      </h3>

      <div className="font-archivo mb-6" style={{ letterSpacing: "-1.6px", lineHeight: 1.15 }}>
        {priceLine.glyph ? (
          <span
            className="font-manrope text-ink-deep align-top"
            style={{ fontSize: 25.8, lineHeight: 1.15 }}
          >
            {priceLine.glyph}
          </span>
        ) : null}
        <span
          className="font-manrope text-ink-deep"
          style={{ fontSize: "clamp(56px, 6vw, 80px)", lineHeight: 1.15, fontWeight: 400 }}
        >
          {priceLine.digits}
        </span>
        <span
          className="font-manrope text-ink-h2 ml-1"
          style={{ fontSize: 22, lineHeight: 1.15 }}
        >
          {priceLine.suffix}
        </span>
      </div>

      <ul className="flex-1 space-y-[10px] mb-8">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <Image
              src="/figma-assets/imgMdiTick.svg"
              alt=""
              width={21}
              height={19}
              className="block mt-1 flex-shrink-0"
            />
            <span
              className="font-manrope text-ink-deep [word-break:break-word]"
              style={{
                fontSize: 18,
                lineHeight: 1.3,
                letterSpacing: "-0.36px",
                fontWeight: 400,
              }}
            >
              {b}
            </span>
          </li>
        ))}
      </ul>

      <Link
        href={ctaHref}
        className="block bg-black rounded-pill font-clash uppercase text-white text-center transition-[filter] duration-150 hover:brightness-95 mt-auto"
        style={{
          width: "100%",
          maxWidth: 353,
          height: 53,
          lineHeight: "53px",
          fontSize: 20,
          letterSpacing: "1px",
          fontWeight: 400,
        }}
      >
        {ctaLabel}
      </Link>

      {note ? (
        <p
          className="font-manrope text-ink-h2/85 mt-5 [word-break:break-word]"
          style={{ fontSize: 13, lineHeight: 1.5, letterSpacing: "-0.2px" }}
        >
          {note}
        </p>
      ) : null}
    </article>
  );
}
