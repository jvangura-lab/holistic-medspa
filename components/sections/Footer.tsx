import Image from "next/image";
import Link from "next/link";
import SplitText from "@/components/motion/SplitText";
import Reveal from "@/components/motion/Reveal";

/**
 * Footer — Figma nodeId 125:519.
 * Source: research/references/figma-ds/design-context/footer-125-519-NEW.tsx
 *
 * Structure:
 *  1. Footer-CTA band (light cream bg): Spectral 80px H1 "Ready for a transformative self-care experience?"
 *     + outline ink CTA pill "Book Now" 200×50 below.
 *  2. Dark footer panel (decorative rectangle104 SVG): wordmark left + 2 link columns + Social col + 2 social icons.
 *  3. Copyright black bar full-bleed h=84: Privacy policy left, Terms & conditions middle, © right.
 *
 * Links wired to HM CONTENT.md sitemap (20 routes); columns map to IA categories.
 */
export default function Footer() {
  return (
    <footer aria-label="Site footer" className="relative w-full bg-white">
      {/* PANEL 1 — Ready-CTA on cream bg, 1600 canvas */}
      <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-0 pt-20 md:pt-28 pb-16 md:pb-24">
        <h2
          className="font-spectral text-ink-deep md:ml-[150px] mb-10 md:mb-12 [word-break:break-word]"
          style={{
            maxWidth: 860,
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: "1.05",
            letterSpacing: "-4px",
            fontWeight: 400,
          }}
        >
          <SplitText text="Ready for a transformative self-care experience?" stagger={70} duration={800} />
        </h2>
        <Reveal variant="fade" delay={400} duration={700} className="md:ml-[150px] flex flex-wrap items-center gap-6">
          <Link
            href="/book"
            className="block rounded-pill border border-solid border-ink-body bg-transparent text-ink-deep text-center font-clash uppercase transition-[filter] duration-150 hover:brightness-90"
            style={{
              width: 200,
              height: 50,
              lineHeight: "48px",
              fontSize: 20,
              letterSpacing: "1px",
              fontWeight: 400,
            }}
          >
            Book Now
          </Link>
          <a
            href="tel:9852786087"
            className="font-clash text-ink-body uppercase transition-colors duration-150 hover:text-mint"
            style={{ fontSize: 16, letterSpacing: "0.8px", fontWeight: 400 }}
          >
            Or call (985) 278-6087
          </a>
        </Reveal>
      </div>

      {/* Wavy SVG divider — fills with the dark PANEL 2 color, rises up into the cream CTA panel
          to create the wave-rim transition shown in the design reference. Decorative; aria-hidden. */}
      <svg
        viewBox="0 0 1600 100"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="block w-full h-[50px] md:h-[100px] -mb-px"
        style={{ display: "block" }}
      >
        <path
          d="M0,55 C266,5 533,95 800,45 C1066,-5 1333,85 1600,35 L1600,100 L0,100 Z"
          fill="#1a1a1a"
        />
      </svg>

      {/* PANEL 2 — Dark footer with decorative rectangle104 SVG bg + links */}
      <div className="relative w-full bg-[#1a1a1a] text-white overflow-hidden">
        <Image
          src="/figma-assets/imgRectangle104.svg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30 pointer-events-none"
        />
        <Image
          src="/figma-assets/imgVector4.svg"
          alt=""
          width={300}
          height={200}
          className="absolute right-10 bottom-10 opacity-20 pointer-events-none hidden md:block"
        />
        <div className="relative mx-auto w-full max-w-[1600px] px-5 md:px-0 py-16 md:py-24">
          <div className="md:grid md:grid-cols-12 md:gap-8 md:ml-[150px] md:mr-[150px]">
            {/* Wordmark — col 3 */}
            <div className="md:col-span-3 mb-10 md:mb-0">
              <Link
                href="/"
                className="font-istok text-white"
                style={{ fontSize: 20, fontWeight: 700 }}
              >
                Holistic Medspa
              </Link>
              <p
                className="font-manrope text-white/70 mt-4"
                style={{ fontSize: 14, lineHeight: 1.6 }}
              >
                A small wellness clinic on Bayou Lafourche, Cut Off, LA.
              </p>
            </div>
            {/* Column 1: site nav */}
            <div className="md:col-span-3 mb-8 md:mb-0">
              <ul className="font-clash uppercase text-white" style={{ fontSize: 18, letterSpacing: "0.9px", lineHeight: "40px", fontWeight: 400 }}>
                <li><Link href="/" className="hover:text-mint transition-colors duration-150">Home</Link></li>
                <li><Link href="/about" className="hover:text-mint transition-colors duration-150">About</Link></li>
                <li><Link href="/services" className="hover:text-mint transition-colors duration-150">Services</Link></li>
                <li><Link href="/first-visit" className="hover:text-mint transition-colors duration-150">First Visit</Link></li>
              </ul>
            </div>
            {/* Column 2: services */}
            <div className="md:col-span-3 mb-8 md:mb-0">
              <ul className="font-clash uppercase text-white" style={{ fontSize: 18, letterSpacing: "0.9px", lineHeight: "40px", fontWeight: 400 }}>
                <li><Link href="/services/zyto-wellness-scan" className="hover:text-mint transition-colors duration-150">ZYTO Scan</Link></li>
                <li><Link href="/services/lymphatic-drainage" className="hover:text-mint transition-colors duration-150">Lymphatic</Link></li>
                <li><Link href="/services/millys-minutes" className="hover:text-mint transition-colors duration-150">Milly&apos;s Minutes</Link></li>
                <li><Link href="/services/thermography" className="hover:text-mint transition-colors duration-150">Thermography</Link></li>
              </ul>
            </div>
            {/* Column 3: Social */}
            <div className="md:col-span-3">
              <h3
                className="font-clash text-white uppercase mb-3"
                style={{ fontSize: 18, letterSpacing: "0.9px", lineHeight: "40px", fontWeight: 400 }}
              >
                Social
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61556091000"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="size-[24px] inline-block transition-opacity duration-150 hover:opacity-70"
                >
                  <Image
                    src="/figma-assets/imgIconsaxLinearFacebook.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="block"
                  />
                </a>
                <a
                  href="https://www.instagram.com/bayou_holistics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="size-[24px] inline-block transition-opacity duration-150 hover:opacity-70"
                >
                  <Image
                    src="/figma-assets/imgIconsaxLinearInstagram.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="block"
                  />
                </a>
              </div>
              <p className="font-manrope text-white/70 mt-6" style={{ fontSize: 13, lineHeight: 1.5 }}>
                17361 W Main St<br />
                Cut Off, LA 70345
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PANEL 3 — Black copyright bar */}
      <div className="w-full bg-black">
        <div className="mx-auto w-full max-w-[1600px] px-5 md:px-0 h-[84px] flex items-center justify-between md:px-[150px]">
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="font-clash text-white uppercase transition-colors duration-150 hover:text-mint"
              style={{ fontSize: 14, letterSpacing: "0.7px", fontWeight: 400 }}
            >
              Privacy policy
            </Link>
            <Link
              href="/terms"
              className="font-clash text-white uppercase transition-colors duration-150 hover:text-mint hidden md:inline"
              style={{ fontSize: 14, letterSpacing: "0.7px", fontWeight: 400 }}
            >
              Terms &amp; conditions
            </Link>
          </div>
          <p
            className="font-clash text-white uppercase"
            style={{ fontSize: 14, letterSpacing: "0.7px", fontWeight: 400 }}
          >
            &copy; Copyright 2026.
          </p>
        </div>
      </div>
    </footer>
  );
}
