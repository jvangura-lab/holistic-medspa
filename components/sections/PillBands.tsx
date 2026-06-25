import Image from "next/image";
import Link from "next/link";

/**
 * Three sticky-stacking pill bands — Figma nodes 125:273, 125:280, 125:287.
 * Source: research/references/figma-ds/design-context/sections-mid-NEW.tsx
 *
 * In Figma source: all three bands live inside one outer container at absolute y-positions
 * 1212 / 1670 / 2253, each marked `sticky top-0` so they stack as the user scrolls.
 *
 * Reproduction approach: a relative wrapper with explicit height (1739px) containing 3
 * `.sticky-band` cards anchored at their Figma y-offsets via top values. Each card preserves
 * the rounded-pill 50px radius, 1300×N dimensions, fill+overlay treatment, and Spectral
 * 80px white label per DS §3.2.
 *
 * Labels: HM CONTENT.md uses "Sessions" / "Treatments" / "Services" terminology — we map
 * the Figma "Services/Treatments/Sessions" labels (template-default) to the HM-equivalent
 * proper names: Sessions, Treatments, Services per IA §1 (sitemap).
 */
export default function PillBands() {
  return (
    <section
      aria-label="What we offer — sessions, treatments, services"
      className="relative w-full bg-white"
    >
      {/* Desktop sticky-stacking layout — 1739px tall wrapper at 1600 canvas */}
      <div className="hidden md:block relative mx-auto w-full max-w-[1600px]" style={{ height: 1739 }}>

        {/* BAND 1: Sessions — h=458, top=0 (Figma top=1212 inside outer page) */}
        <div className="sticky top-0 contents pointer-events-auto" data-band="sessions">
          <div
            className="absolute h-[458px] rounded-pill overflow-hidden"
            style={{ left: "50%", top: 0, width: 1300, transform: "translateX(-50%)" }}
          >
            <div className="absolute inset-0 bg-black rounded-pill" />
            <Image
              src="/media/figma-slots/sessions-band-bg.jpg"
              alt=""
              fill
              sizes="1300px"
              className="object-cover rounded-pill opacity-30"
            />
            <h2
              className="absolute font-spectral text-white"
              style={{
                left: 235 - 0,
                top: 57,
                fontSize: 80,
                lineHeight: "80px",
                letterSpacing: "-3.2px",
                fontWeight: 400,
              }}
            >
              Sessions
            </h2>
            <Link
              href="/services"
              aria-label="View sessions"
              className="absolute"
              style={{ left: "calc(83.33% - 31.33px)", top: 77, width: 59.375, height: 40 }}
            >
              <Image
                src="/figma-assets/imgGroup1.svg"
                alt=""
                width={60}
                height={40}
                className="block"
                style={{ width: "100%", height: "100%" }}
              />
            </Link>
          </div>
        </div>

        {/* BAND 2: Treatments — h=583, top=458 (Figma 1670) */}
        <div className="sticky top-0 contents pointer-events-auto" data-band="treatments">
          <div
            className="absolute h-[583px] rounded-pill overflow-hidden"
            style={{ left: "50%", top: 458, width: 1300, transform: "translateX(-50%)" }}
          >
            <div className="absolute inset-0 bg-black rounded-pill" />
            <Image
              src="/media/figma-slots/treatments-band-bg.jpg"
              alt=""
              fill
              sizes="1300px"
              className="object-cover rounded-pill opacity-50"
            />
            <h2
              className="absolute font-spectral text-white"
              style={{
                left: 235,
                top: 49,
                fontSize: 80,
                lineHeight: "80px",
                letterSpacing: "-3.2px",
                fontWeight: 400,
              }}
            >
              Treatments
            </h2>
            <Link
              href="/services"
              aria-label="View treatments"
              className="absolute"
              style={{ left: "calc(83.33% - 31.33px)", top: 69, width: 59.28, height: 40 }}
            >
              <Image
                src="/figma-assets/imgGroup2.svg"
                alt=""
                width={60}
                height={40}
                className="block"
              />
            </Link>
          </div>
        </div>

        {/* BAND 3: Services — h=698, top=1041 (Figma 2253), warm-brown bg + rectangle7 (no opacity reduction) */}
        <div className="sticky top-0 contents pointer-events-auto" data-band="services">
          <div
            className="absolute h-[698px] rounded-pill overflow-hidden"
            style={{ left: "50%", top: 1041, width: 1300, transform: "translateX(-50%)" }}
          >
            <div className="absolute inset-0 bg-brown rounded-pill" />
            <Image
              src="/media/figma-slots/services-band-bg.jpg"
              alt=""
              fill
              sizes="1300px"
              className="object-cover rounded-pill"
            />
            <h2
              className="absolute font-spectral text-white"
              style={{
                left: "calc(8.33% + 106.67px)",
                top: 53,
                fontSize: 80,
                lineHeight: "80px",
                letterSpacing: "-3.2px",
                fontWeight: 400,
              }}
            >
              Services
            </h2>
            <Link
              href="/services"
              aria-label="View services"
              className="absolute"
              style={{ left: "calc(83.33% - 30.33px)", top: 73, width: 57, height: 40 }}
            >
              <Image
                src="/figma-assets/imgGroup3.svg"
                alt=""
                width={57}
                height={40}
                className="block"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE: 3 stacked rounded cards (no sticky stacking — natural flow) */}
      <div className="md:hidden flex flex-col gap-4 px-4 py-8">
        {[
          { label: "Sessions", bg: "/media/figma-slots/sessions-band-bg.jpg", opacity: "opacity-30" },
          { label: "Treatments", bg: "/media/figma-slots/treatments-band-bg.jpg", opacity: "opacity-50" },
          { label: "Services", bg: "/media/figma-slots/services-band-bg.jpg", opacity: "" },
        ].map((b) => (
          <Link
            key={b.label}
            href="/services"
            className="relative block h-[180px] rounded-[28px] overflow-hidden"
          >
            <div className="absolute inset-0 bg-black" />
            <Image src={b.bg} alt="" fill sizes="100vw" className={`object-cover ${b.opacity}`} />
            <h2
              className="absolute left-5 top-1/2 -translate-y-1/2 font-spectral text-white"
              style={{ fontSize: 40, letterSpacing: "-1.6px", fontWeight: 400 }}
            >
              {b.label}
            </h2>
          </Link>
        ))}
      </div>
    </section>
  );
}
