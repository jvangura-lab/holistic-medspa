import Image from "next/image";
import Link from "next/link";
import SplitText from "@/components/motion/SplitText";
import ScrollReveal from "@/components/motion/ScrollReveal";
import ScrollScrub from "@/components/motion/ScrollScrub";
import MagneticHover from "@/components/motion/MagneticHover";

/**
 * Hero — Figma nodeId 125:499
 * Source: research/references/figma-ds/design-context/hero-125-499-NEW.tsx
 *
 * R3.C MOTION:
 *   - Headline: SplitText `chars` mode, immediate fire on mount (no scroll dep)
 *     with cascading expo-out reveal. Each character of "Mind · Body · Soul." pops in.
 *   - Sub-copy: ScrollReveal `lift` variant with 0.4s delay
 *   - Portrait ellipse: ScrollScrub parallax — translateY -50 → 0 across full hero scroll
 *   - CTA pill: MagneticHover (Framer spring) for mouse-proximity pull
 */
export default function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative w-full overflow-hidden bg-white"
      style={{ minHeight: 940 }}
    >
      {/* Desktop layout — 1600px canvas absolute positioning */}
      <div className="hidden md:block relative mx-auto h-[940px] w-full max-w-[1600px]">
        {/* Hero background photo: bleeds 14px left, 1633w × 800h */}
        <div className="absolute h-[800px] left-[-14px] top-0 w-[1633px]">
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

        {/* Dark gradient scrim */}
        <div
          aria-hidden
          className="absolute h-[800px] left-0 top-0 w-full max-w-[1600px]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.87) 0%, rgba(0,0,0,0.14) 46.354%, rgba(0,0,0,0.76) 100%)",
          }}
        />

        {/* Mix-blend-screen decorative vector */}
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

        {/* HEADLINE — char-by-char cascade on mount (text-splitting animation, owner req #5) */}
        <h1
          className="absolute font-spectral left-[142px] not-italic text-white top-[419px] w-[1080px] [word-break:break-word] overflow-hidden"
          style={{
            fontSize: "120px",
            lineHeight: "130px",
            letterSpacing: "-6px",
            fontWeight: 400,
          }}
        >
          <SplitText
            text="Mind · Body · Soul."
            mode="chars"
            stagger={0.045}
            duration={1.1}
            immediate
            yFrom={120}
          />
        </h1>

        {/* Hero portrait ellipse — scroll-scrub parallax (owner req #4 vibe) */}
        <ScrollScrub
          to={{ y: -50 }}
          start="top top"
          end="bottom top"
          scrub={1}
          className="absolute h-[335px] top-[640px] w-[559px]"
          style={{ left: "calc(50% + 90px)" }}
        >
          <div
            className="relative h-full w-full overflow-hidden rounded-ellipse border-[10px] border-solid border-rose"
            aria-label="Toya Terrebonne portrait — placeholder pending owner photo"
          >
            <div className="absolute inset-0 bg-cream" />
            <Image
              src="/figma-assets/imgRectangle4.png"
              alt=""
              fill
              sizes="559px"
              className="object-cover pointer-events-none opacity-0"
            />
            <span
              className="absolute inset-0 flex items-center justify-center font-clash text-ink-body uppercase"
              style={{ fontSize: "16px", letterSpacing: "0.8px" }}
            >
              Toya Terrebonne
            </span>
          </div>
        </ScrollScrub>

        {/* CTA pill — Magnetic hover */}
        <MagneticHover
          strength={14}
          className="absolute h-[50px] left-[150px] top-[709px] w-[200px]"
        >
          <Link
            href="/book"
            className="block h-full w-full rounded-pill border-2 border-solid border-mint transition-[filter] duration-150 hover:brightness-95 relative"
            aria-label="Request a Consultation"
          >
            <span
              className="absolute inset-0 flex items-center justify-center font-clash not-italic text-mint"
              style={{ fontSize: "20px", letterSpacing: "1px", fontWeight: 400 }}
            >
              Request Consult
            </span>
          </Link>
        </MagneticHover>

        {/* Phone label */}
        <a
          href="tel:9852786087"
          className="absolute font-clash not-italic text-white top-[722px] whitespace-nowrap leading-[normal] transition-colors duration-150 hover:text-mint"
          style={{ left: "calc(16.67% + 126.33px)", fontSize: "20px", letterSpacing: "1px", fontWeight: 400 }}
        >
          (985) 278-6087
        </a>

        {/* SUB-COPY — ScrollReveal lift with delay so it settles after headline cascade */}
        <ScrollReveal
          variant="lift"
          delay={0.5}
          duration={0.85}
          as="p"
          className="absolute font-manrope left-[150px] text-ink-body top-[851px] w-[640px] [word-break:break-word]"
          style={{ fontSize: "24px", lineHeight: "28px", letterSpacing: "-0.48px", fontWeight: 400 }}
        >
          Naturopathy consultations, lymphatic drainage, infrared sauna, ZYTO scans, and essential-oil care — by appointment, by hand, by Toya. Cut Off, Louisiana. Call or text (985) 278-6087.
        </ScrollReveal>
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
            className="absolute font-spectral text-white px-5 bottom-[180px] [word-break:break-word] overflow-hidden"
            style={{
              fontSize: "56px",
              lineHeight: "60px",
              letterSpacing: "-2.4px",
              fontWeight: 400,
            }}
          >
            <SplitText text="Mind · Body · Soul." mode="chars" stagger={0.035} duration={0.9} immediate yFrom={110} />
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
