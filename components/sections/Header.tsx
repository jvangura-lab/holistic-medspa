"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MobileNavDrawer from "@/components/mobile/MobileNavDrawer";

/**
 * Header — Figma nodeId 125:510
 * Source: research/references/figma-ds/design-context/header-125-510-NEW.tsx
 * Render: 1300×51 absolute children at top=21, left=150 of the 1600px page.
 * Sticky-overlay over the hero (z-50). Nav uses 5 owner-route links (Home/About/Services/First Visit/Contact)
 * with Holistic Medspa CONTENT.md routes wired in.
 *
 * Active-link logic (R3.A): pathname-aware via usePathname.
 *   - "/" highlights only on exact match
 *   - other routes highlight on prefix match (so /services/zyto-wellness-scan lights up "Services")
 *
 * Mobile (<md): collapses to wordmark + Book Now pill (hamburger reserved for F3.3 deeper routes).
 */

const NAV_LINKS = [
  { href: "/", label: "Home", left: 402 },
  { href: "/about", label: "About", left: 525 },
  { href: "/services", label: "Services", left: 649 },
  { href: "/first-visit", label: "First Visit", left: 798 },
  { href: "/contact", label: "Contact", left: 967 },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname() ?? "/";

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
          {/* Wordmark Holistic Medspa — Istok Web Bold 20px white */}
          <Link
            href="/"
            className="absolute font-istok left-0 not-italic text-[20px] text-white top-[15px] whitespace-nowrap [word-break:break-word] leading-[normal]"
            style={{ fontWeight: 700 }}
          >
            Holistic Medspa
          </Link>
          {/* Nav: 5 links — pathname-aware active state */}
          {NAV_LINKS.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`absolute font-clash not-italic top-[17px] uppercase whitespace-nowrap leading-[normal] transition-colors duration-150 ${
                  active ? "text-mint" : "text-white hover:text-mint"
                }`}
                style={{
                  left: `${link.left}px`,
                  fontSize: "16px",
                  letterSpacing: "0.8px",
                  fontWeight: active ? 500 : 400,
                }}
              >
                {link.label}
              </Link>
            );
          })}
          {/* Book Now label sits inside the green pill at left=1153 (1100+53 inset) */}
          <Link
            href="/book"
            className="absolute font-clash left-[1153px] not-italic text-black top-[17px] uppercase whitespace-nowrap leading-[normal]"
            style={{ fontSize: "16px", letterSpacing: "0.8px", fontWeight: 500 }}
          >
            Book Now
          </Link>
        </div>

        {/* Mobile compact header: wordmark left + Book pill + hamburger drawer (R4.A mobile pass).
            Skill: deep nav (20 routes) requires a drawer; bottom-right thumb-reach for hamburger.
            All actions ≥44pt tap targets per accessibility rule. */}
        <div className="md:hidden flex items-center justify-between h-full px-4 pt-4">
          <Link
            href="/"
            className="font-istok text-white"
            style={{ fontSize: "18px", fontWeight: 700 }}
          >
            Holistic Medspa
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/book"
              className="font-clash bg-mint text-black uppercase rounded-pill inline-flex items-center justify-center"
              style={{
                fontSize: "13px",
                letterSpacing: "0.7px",
                fontWeight: 500,
                minHeight: 44,
                paddingInline: 18,
              }}
            >
              Book
            </Link>
            <MobileNavDrawer />
          </div>
        </div>
      </div>
    </header>
  );
}
