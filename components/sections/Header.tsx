"use client";

import Link from "next/link";

/**
 * Header — Figma nodeId 125:510
 * Source: research/references/figma-ds/design-context/header-125-510-NEW.tsx
 * Render: 1300×51 absolute children at top=21, left=150 of the 1600px page.
 * Sticky-overlay over the hero (z-50). Nav uses 5 owner-route links (Home/About/Services/Conditions/Contact)
 * matching Figma 1:1, with Holistic Medspa CONTENT.md routes wired in.
 *
 * Mobile (<md): collapses to wordmark + Book Now pill (hamburger reserved for F3.3 deeper routes).
 */
export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50 pointer-events-none">
      {/* 1600-canvas frame; header inset 150 left/right; top 21 */}
      <div className="relative mx-auto h-[72px] md:h-[72px] w-full max-w-[1600px] pointer-events-auto">
        <div className="hidden md:block absolute h-[51px] left-[150px] top-[21px] w-[1300px]">
          {/* CTA pill bg #7db88a, w=200 h=51, rounded-50, left=1100 */}
          <Link
            href="/book"
            aria-label="Book Now"
            className="absolute bg-mint h-[51px] left-[1100px] rounded-pill top-0 w-[200px] transition-[filter] duration-150 hover:brightness-95 focus-visible:brightness-95"
          />
          {/* Wordmark Holistic Medspa — Istok Web Bold 20px white (replacing Figma NUIQ placeholder) */}
          <Link
            href="/"
            className="absolute font-istok left-0 not-italic text-[20px] text-white top-[15px] whitespace-nowrap [word-break:break-word] leading-[normal]"
            style={{ fontWeight: 700 }}
          >
            Holistic Medspa
          </Link>
          {/* Nav: 5 links, Clash Display, uppercase, tracking 0.8px, 16px white (active = mint) */}
          <Link
            href="/"
            aria-current="page"
            className="absolute font-clash left-[402px] not-italic text-mint top-[17px] uppercase whitespace-nowrap leading-[normal]"
            style={{ fontSize: "16px", letterSpacing: "0.8px", fontWeight: 500 }}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="absolute font-clash left-[525px] not-italic text-white top-[17px] uppercase whitespace-nowrap leading-[normal] transition-colors duration-150 hover:text-mint"
            style={{ fontSize: "16px", letterSpacing: "0.8px", fontWeight: 400 }}
          >
            About
          </Link>
          <Link
            href="/services"
            className="absolute font-clash left-[649px] not-italic text-white top-[17px] uppercase whitespace-nowrap leading-[normal] transition-colors duration-150 hover:text-mint"
            style={{ fontSize: "16px", letterSpacing: "0.8px", fontWeight: 400 }}
          >
            Services
          </Link>
          <Link
            href="/first-visit"
            className="absolute font-clash left-[798px] not-italic text-white top-[17px] uppercase whitespace-nowrap leading-[normal] transition-colors duration-150 hover:text-mint"
            style={{ fontSize: "16px", letterSpacing: "0.8px", fontWeight: 400 }}
          >
            First Visit
          </Link>
          <Link
            href="/contact"
            className="absolute font-clash left-[967px] not-italic text-white top-[17px] uppercase whitespace-nowrap leading-[normal] transition-colors duration-150 hover:text-mint"
            style={{ fontSize: "16px", letterSpacing: "0.8px", fontWeight: 400 }}
          >
            Contact
          </Link>
          {/* Book Now label sits inside the green pill at left=1153 (1100+53 inset) */}
          <Link
            href="/book"
            className="absolute font-clash left-[1153px] not-italic text-black top-[17px] uppercase whitespace-nowrap leading-[normal]"
            style={{ fontSize: "16px", letterSpacing: "0.8px", fontWeight: 500 }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile compact header: wordmark left + Book Now pill right */}
        <div className="md:hidden flex items-center justify-between h-full px-4 pt-4">
          <Link
            href="/"
            className="font-istok text-white"
            style={{ fontSize: "18px", fontWeight: 700 }}
          >
            Holistic Medspa
          </Link>
          <Link
            href="/book"
            className="font-clash bg-mint text-black uppercase rounded-pill px-5 py-2"
            style={{ fontSize: "14px", letterSpacing: "0.7px", fontWeight: 500 }}
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
