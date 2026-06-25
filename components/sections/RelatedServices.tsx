import Image from "next/image";
import Link from "next/link";

import type { ServiceRelated } from "@/lib/services-data";
import { SERVICE_BY_SLUG } from "@/lib/services-data";

/**
 * RelatedServices — 2-to-3 cross-link cards using the same card chrome as the home
 * "What we offer" 8-tile grid (DS §3.3): icon + 24px Clash title + 14px Manrope uppercase
 * "Read More" + arrow. Sits inside each /services/[slug] page.
 *
 * Iconography reuses the figma-asset glyphs already wired in WhatWeOffer.tsx so we don't
 * introduce a new icon archetype.
 */

const ICON_BY_SLUG: Record<string, { src: string; size: number }> = {
  "zyto-wellness-scan": { src: "/figma-assets/imgSpaSvgrepoCom1.svg", size: 91 },
  "lymphatic-drainage": { src: "/figma-assets/imgSpaSolidSvgrepoCom1.svg", size: 91 },
  "millys-minutes": { src: "/figma-assets/imgVector.svg", size: 91 },
  thermography: { src: "/figma-assets/imgGroup.svg", size: 91 },
  "naturopathy-consultation": { src: "/figma-assets/imgGroup5.svg", size: 91 },
  "bach-flowers": { src: "/figma-assets/imgVector1.svg", size: 91 },
  "essential-oils": { src: "/figma-assets/imgVector2.svg", size: 91 },
  "hosted-modalities": { src: "/figma-assets/imgSpaSvgrepoCom1.svg", size: 91 },
};

export default function RelatedServices({ items }: { items: ServiceRelated[] }) {
  if (!items?.length) return null;

  return (
    <section
      aria-label="Related services"
      className="relative w-full bg-cream py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
        <h2
          className="font-spectral text-ink-h2 mb-10 md:mb-14 [word-break:break-word]"
          style={{
            fontSize: "clamp(32px, 4.4vw, 56px)",
            lineHeight: 1.05,
            letterSpacing: "-2px",
            fontWeight: 400,
          }}
        >
          Related sessions
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-12">
          {items.map((r) => {
            const ic = ICON_BY_SLUG[r.slug] ?? { src: "/figma-assets/imgGroup.svg", size: 91 };
            const target = SERVICE_BY_SLUG[r.slug];
            return (
              <li key={r.slug} className="group">
                <Link href={`/services/${r.slug}`} className="block">
                  <div
                    className="mb-6"
                    style={{ width: 72, height: 72 }}
                    aria-hidden
                  >
                    <Image
                      src={ic.src}
                      alt=""
                      width={72}
                      height={72}
                      className="block"
                    />
                  </div>
                  <h3
                    className="font-clash text-ink-deep mb-4 [word-break:break-word]"
                    style={{ fontSize: 22, letterSpacing: "1.1px", fontWeight: 400, lineHeight: 1.2 }}
                  >
                    {target?.name ?? r.title}
                  </h3>
                  <p
                    className="font-manrope text-ink-body mb-5"
                    style={{ fontSize: 15, lineHeight: 1.55, letterSpacing: "-0.2px", fontWeight: 400 }}
                  >
                    {r.reason}
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className="font-manrope text-ink-body uppercase"
                      style={{ fontSize: 14, letterSpacing: "0.7px", fontWeight: 400 }}
                    >
                      Read More
                    </span>
                    <span className="inline-block w-[19.95px] h-[14px] transition-transform duration-150 ease-out group-hover:translate-x-1">
                      <Image
                        src="/figma-assets/imgGroup4.svg"
                        alt=""
                        width={20}
                        height={14}
                        className="block"
                      />
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
