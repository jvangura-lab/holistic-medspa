import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
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
          className="font-spectral text-ink-h2 mb-12 md:mb-16 md:ml-[148px] [word-break:break-word]"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: "1.05",
            letterSpacing: "-3.2px",
            fontWeight: 400,
          }}
        >
          <SplitText text="What we offer" stagger={100} duration={800} />
        </h2>

        {/* Desktop: 4×2 grid centered within 1300 container */}
        <ul className="hidden md:grid grid-cols-4 gap-x-[40px] gap-y-[60px] mx-auto" style={{ maxWidth: 1300, paddingLeft: 0, paddingRight: 0 }}>
          {cards.map((c, idx) => (
            <Reveal as="li" variant="slide" direction="up" delay={(idx % 4) * 80} duration={700} key={c.title} className="group">
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
            </Reveal>
          ))}
        </ul>

        {/* Mobile: 2-col grid */}
        <ul className="md:hidden grid grid-cols-2 gap-x-6 gap-y-10">
          {cards.map((c) => (
            <li key={c.title} className="group">
              <Link href={c.href} className="block">
                <div className="mb-4" style={{ width: 56, height: 56 }}>
                  <Image src={c.icon} alt="" width={56} height={56} className="block" />
                </div>
                <h3
                  className="font-clash text-ink-body mb-2"
                  style={{ fontSize: 16, letterSpacing: "0.8px", fontWeight: 400, lineHeight: 1.2 }}
                >
                  {c.title}
                </h3>
                <div className="flex items-center gap-2">
                  <span
                    className="font-manrope text-ink-body uppercase"
                    style={{ fontSize: 12, letterSpacing: "0.6px", fontWeight: 400 }}
                  >
                    Read More
                  </span>
                  <span className="inline-block w-[16px] h-[11px] transition-transform duration-150 ease-out group-hover:translate-x-1">
                    <Image src="/figma-assets/imgGroup4.svg" alt="" width={16} height={11} className="block" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
