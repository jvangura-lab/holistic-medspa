import Image from "next/image";
import Link from "next/link";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

/**
 * Hero — Figma nodeId 125:499
 * Source: research/references/figma-ds/design-context/hero-125-499-NEW.tsx
 * Layout: 1633×800 hero band (bleeds 14px left of 1600 canvas), full-bleed bg photo +
 *         dark gradient scrim + mix-blend-screen vector + Spectral 120px headline left +
 *         ellipse portrait right + outline mint CTA pill + phone label.
 *         Sub-copy sits at top=851 (below the 800h hero band, on cream page bg) at #242424.
 *
 * Headline + sub-copy + CTAs from CONTENT.md `/` Hero block (verbatim).
 * Hero bg image uses the carry-forward hero-poster.jpg with hero-video.mp4 fallback play.
 * Portrait slot uses Figma source imgRectangle4 as documented placeholder per
 * IMAGERY-PROVENANCE.md slot N5 (real Toya portrait pending owner intake).
 */
export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-white"
      // Hero band is 800px on desktop, with sub-copy band ~140px below (total 940px on 1600 canvas)
      style={{ minHeight: 940 }}
    >
      {/* Desktop layout — 1600px canvas absolute positioning */}
      <div className="hidden md:block relative mx-auto h-[940px] w-full max-w-[1600px]">
        {/* Hero background photo: bleeds 14px left, 1633w × 800h */}
        <div className="absolute h-[800px] left-[-14px] top-0 w-[1633px]">
          {/* Poster as primary; video overlay autoplays for richer look (muted/loop) */}
          <Image
            src="/media/hero-poster.jpg"
            alt=""
            fill
            sizes="(max-width: 1600px) 100vw, 1633px"
            priority
            className="object-cover pointer-events-none"
          />
          <video
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/hero-poster.jpg"
            aria-hidden
          >
            <source src="/media/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Dark gradient scrim: top→bottom 87% black → 14% via 46.354% → 76% bottom */}
        <div
          aria-hidden
          className="absolute h-[800px] left-0 top-0 w-full max-w-[1600px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.87) 0%, rgba(0,0,0,0.14) 46.354%, rgba(0,0,0,0.76) 100%)",
          }}
        />

        {/* Mix-blend-screen decorative vector at left:calc(50%+67px) top=505 size 605 */}
        <div
          aria-hidden
          className="absolute mix-blend-screen size-[605px] top-[505px]"
          style={{ left: "calc(50% + 67px)" }}
        >
          <Image
            src="/figma-assets/imgVector3.svg"
            alt=""
            fill
            sizes="605px"
            className="block max-w-none size-full"
          />
        </div>

        {/* HEADLINE — Spectral 120px white, w=1080, left=142, top=419, tracking -6, leading 130 */}
        <h1
          className="absolute font-spectral left-[142px] not-italic text-white top-[419px] w-[1080px] [word-break:break-word]"
          style={{
            fontSize: "120px",
            lineHeight: "130px",
            letterSpacing: "-6px",
            fontWeight: 400,
          }}
        >
          <SplitText text="Mind · Body · Soul." stagger={120} duration={900} />
        </h1>

        {/* Hero portrait ellipse: 559×335, rounded-306.5, 10px solid dusty-rose #c08181 border,
            left=calc(50%+90px) top=640. PLACEHOLDER per slot N5 — real Toya pending owner intake. */}
        <div
          className="absolute h-[335px] top-[640px] w-[559px] overflow-hidden rounded-ellipse border-[10px] border-solid border-rose"
          style={{ left: "calc(50% + 90px)" }}
          aria-label="Toya Terrebonne portrait — placeholder pending owner photo"
        >
          {/* Soft cream placeholder per IMAGERY-PROVENANCE.md N5 — real photo deferred */}
          <div className="absolute inset-0 bg-cream" />
          <Image
            src="/figma-assets/imgRectangle4.png"
            alt=""
            fill
            sizes="559px"
            className="object-cover pointer-events-none opacity-0"
          />
          <span className="absolute inset-0 flex items-center justify-center font-clash text-ink-body uppercase" style={{ fontSize: "16px", letterSpacing: "0.8px" }}>
            Toya Terrebonne
          </span>
        </div>

        {/* Outline mint CTA pill 200×50 at left=150 top=709 */}
        <Link
          href="/book"
          className="absolute h-[50px] left-[150px] top-[709px] w-[200px] rounded-pill border-2 border-solid border-mint transition-[filter] duration-150 hover:brightness-95"
          aria-label="Request a Consultation"
        />
        <Link
          href="/book"
          className="absolute font-clash left-[181px] not-italic text-mint top-[722px] whitespace-nowrap leading-[normal] pointer-events-none"
          style={{ fontSize: "20px", letterSpacing: "1px", fontWeight: 400 }}
        >
          Request Consult
        </Link>

        {/* Phone label — Clash 20px white tracking 1px at left:calc(16.67%+126.33px) top=722 */}
        <a
          href="tel:9852786087"
          className="absolute font-clash not-italic text-white top-[722px] whitespace-nowrap leading-[normal] transition-colors duration-150 hover:text-mint"
          style={{ left: "calc(16.67% + 126.33px)", fontSize: "20px", letterSpacing: "1px", fontWeight: 400 }}
        >
          (985) 278-6087
        </a>

        {/* SUB-COPY — Manrope 24px ink-body, w=640, left=150, top=851 (sits below 800h scrim on cream page bg)
            Reveal fade with 500ms delay so it settles after headline cascade. */}
        <Reveal
          variant="fade"
          delay={500}
          duration={700}
          as="p"
          className="absolute font-manrope left-[150px] text-ink-body top-[851px] w-[640px] [word-break:break-word]"
          style={{ fontSize: "24px", lineHeight: "28px", letterSpacing: "-0.48px", fontWeight: 400 }}
        >
          Naturopathy consultations, lymphatic drainage, infrared sauna, ZYTO scans, and essential-oil care — by appointment, by hand, by Toya. Cut Off, Louisiana. Call or text (985) 278-6087.
        </Reveal>
      </div>

      {/* MOBILE layout — hero band stacked above sub-copy */}
      <div className="md:hidden relative w-full">
        <div className="relative w-full h-[520px] overflow-hidden">
          <Image
            src="/media/hero-poster.jpg"
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 1633px"
            priority
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.34) 46.354%, rgba(0,0,0,0.78) 100%)",
            }}
          />
          <h1
            className="absolute font-spectral text-white px-5 bottom-[180px] [word-break:break-word]"
            style={{
              fontSize: "56px",
              lineHeight: "60px",
              letterSpacing: "-2.4px",
              fontWeight: 400,
            }}
          >
            <SplitText text="Mind · Body · Soul." stagger={100} duration={700} />
          </h1>
          <div className="absolute bottom-6 left-5 right-5 flex items-center gap-3 flex-wrap">
            <Link
              href="/book"
              className="font-clash uppercase rounded-pill border-2 border-solid border-mint text-mint px-5 py-2"
              style={{ fontSize: "14px", letterSpacing: "0.7px" }}
            >
              Request Consult
            </Link>
            <a
              href="tel:9852786087"
              className="font-clash text-white"
              style={{ fontSize: "16px", letterSpacing: "0.8px" }}
            >
              (985) 278-6087
            </a>
          </div>
        </div>
        <p
          className="font-manrope text-ink-body px-5 py-8 [word-break:break-word]"
          style={{ fontSize: "18px", lineHeight: "26px", letterSpacing: "-0.36px", fontWeight: 400 }}
        >
          Naturopathy consultations, lymphatic drainage, infrared sauna, ZYTO scans, and essential-oil care — by appointment, by hand, by Toya. Cut Off, Louisiana. Call or text (985) 278-6087.
        </p>
      </div>
    </section>
  );
}
