import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/motion/ScrollReveal";
import SplitText from "@/components/motion/SplitText";

/**
 * What we offer — 8-tile service-card grid (DESIGN_SYSTEM.md §3.3 + §5 extension rule
 * for the 8-service catalog from CONTENT.md /services Index).
 *
 * Figma source = 6-tile 3×2 grid; HM extends to 8-tile 4×2 desktop / 2-col mobile,
 * preserving card chrome verbatim: icon + 24px Clash title + 14px Manrope "Read More" + arrow.
 *
 * Each card body from CONTENT.md /services The list block.
 */

type ServiceCard = {
  title: string;
  href: string;
  icon: string; // figma-asset path
  iconSize: number;
};

const cards: ServiceCard[] = [
  {
    title: "ZYTO Wellness Scan",
    href: "/services/zyto-wellness-scan",
    icon: "/figma-assets/imgSpaSvgrepoCom1.svg",
    iconSize: 91,
  },
  {
    title: "Lymphatic Drainage",
    href: "/services/lymphatic-drainage",
    icon: "/figma-assets/imgSpaSolidSvgrepoCom1.svg",
    iconSize: 91,
  },
  {
    title: "Milly's Minutes",
    href: "/services/millys-minutes",
    icon: "/figma-assets/imgVector.svg",
    iconSize: 91,
  },
  {
    title: "Thermography",
    href: "/services/thermography",
    icon: "/figma-assets/imgGroup.svg",
    iconSize: 91,
  },
  {
    title: "Naturopathy Consult",
    href: "/services/naturopathy-consultation",
    icon: "/figma-assets/imgGroup5.svg",
    iconSize: 91,
  },
  {
    title: "Bach Flowers",
    href: "/services/bach-flowers",
    icon: "/figma-assets/imgVector1.svg",
    iconSize: 91,
  },
  {
    title: "doTERRA Essential Oils",
    href: "/services/essential-oils",
    icon: "/figma-assets/imgVector2.svg",
    iconSize: 91,
  },
  {
    title: "Hosted Modalities",
    href: "/services/hosted-modalities",
    icon: "/figma-assets/imgSpaSvgrepoCom1.svg",
    iconSize: 91,
  },
];

export default function WhatWeOffer() {
  return (
    <section
      aria-label="What we offer"
      className="relative w-full bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-0">
        {/* H2 — Spectral 80px ink-h2, leading 80, tracking -3.2px, at left=148 (desktop) */}
        <h2
          className="font-spectral text-ink-h2 mb-12 md:mb-16 md:ml-[148px] [word-break:break-word] overflow-hidden"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: "1.05",
            letterSpacing: "-3.2px",
            fontWeight: 400,
          }}
        >
          <SplitText text="What we offer" mode="words" stagger={0.08} duration={0.9} start="top 82%" yFrom={110} />
        </h2>

        {/* Desktop: 4×2 grid centered within 1300 container */}
        <ul className="hidden md:grid grid-cols-4 gap-x-[40px] gap-y-[60px] mx-auto" style={{ maxWidth: 1300, paddingLeft: 0, paddingRight: 0 }}>
          {cards.map((c, idx) => (
            <ScrollReveal
              as="li"
              variant="lift"
              delay={(idx % 4) * 0.08}
              duration={0.8}
              start="top 82%"
              key={c.title}
              className="group"
            >
              <Link href={c.href} className="block">
                <div className="mb-6" style={{ width: c.iconSize, height: c.iconSize }}>
                  <Image
                    src={c.icon}
                    alt=""
                    width={c.iconSize}
                    height={c.iconSize}
                    className="block"
                  />
                </div>
                <h3
                  className="font-clash text-ink-body whitespace-nowrap mb-4"
                  style={{ fontSize: 24, letterSpacing: "1.2px", fontWeight: 400 }}
                >
                  {c.title}
                </h3>
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
            </ScrollReveal>
          ))}
        </ul>

        {/* Mobile — R4.A optimized: horizontal swipe carousel with cream tile bg.
            Skill: 8 services in 2-col grid = 4 rows of vertical scroll = scroll fatigue.
            Swipe carousel with 70vw tiles + peek-of-next reads more native, exposes all
            8 services without scroll cost, supports left-thumb-led discovery flow.
            Each tile bg-cream + isolated icon (skill: color-coded cards with soft bg
            + clean isolated images = effortless scanning).  */}
        <div className="md:hidden -mx-5">
          <ul className="scroll-snap-x gap-3 px-5">
            {cards.map((c) => (
              <li
                key={c.title}
                className="scroll-snap-item"
                style={{ width: "70vw", maxWidth: 270 }}
              >
                <Link
                  href={c.href}
                  className="tap-press block bg-cream rounded-[20px] p-5 h-[200px] relative overflow-hidden"
                >
                  <div className="mb-3" style={{ width: 64, height: 64 }}>
                    <Image src={c.icon} alt="" width={64} height={64} className="block" />
                  </div>
                  <h3
                    className="font-clash text-ink-deep [word-break:break-word]"
                    style={{ fontSize: 17, letterSpacing: "0.4px", fontWeight: 500, lineHeight: 1.25 }}
                  >
                    {c.title}
                  </h3>
                  <div className="absolute bottom-5 left-5 flex items-center gap-2">
                    <span
                      className="font-manrope text-ink-body/70 uppercase"
                      style={{ fontSize: 11, letterSpacing: "0.8px", fontWeight: 500 }}
                    >
                      Read
                    </span>
                    <span className="inline-block w-[14px] h-[10px]">
                      <Image src="/figma-assets/imgGroup4.svg" alt="" width={14} height={10} className="block" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p
            className="text-center font-clash uppercase text-ink-body/40 mt-4 px-5"
            style={{ fontSize: 10, letterSpacing: "1.4px", fontWeight: 500 }}
          >
            8 sessions · Swipe →
          </p>
        </div>
      </div>
    </section>
  );
}
