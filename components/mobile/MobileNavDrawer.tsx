"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * MobileNavDrawer (R4.A mobile pass per mobile-app-ui-design skill)
 *
 * Skill rationale:
 *   - "Hamburger drawer" is the native pattern for >5 deep routes on mobile.
 *   - Drawer slides from right (thumb-zone friendly for right-handed users).
 *   - Close affordance is a large 44pt tap area (skill: tap-target rule).
 *   - Active route highlights (uses pathname) so user knows location.
 *   - Drawer locks body scroll while open.
 *   - Respects prefers-reduced-motion (matches sitewide motion rule).
 *
 * Mobile-only — header desktop block is untouched.
 * Renders inside <Header /> mobile compact block.
 */

const PRIMARY_NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/first-visit", label: "First Visit" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book Now" },
] as const;

const SERVICE_NAV = [
  { href: "/services/zyto-wellness-scan", label: "ZYTO Wellness Scan" },
  { href: "/services/lymphatic-drainage", label: "Lymphatic Drainage" },
  { href: "/services/millys-minutes", label: "Milly's Minutes" },
  { href: "/services/thermography", label: "Thermography" },
  { href: "/services/naturopathy-consultation", label: "Naturopathy" },
  { href: "/services/bach-flowers", label: "Bach Flowers" },
  { href: "/services/essential-oils", label: "Essential Oils" },
  { href: "/services/hosted-modalities", label: "Hosted Modalities" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function MobileNavDrawer() {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);

  // Body scroll lock while open
  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  return (
    <>
      {/* Trigger — sized to 44pt tap target (skill accessibility rule) */}
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-nav-drawer"
        onClick={() => setOpen(true)}
        className="tap-target inline-flex items-center justify-center text-white"
      >
        {/* 3-line hamburger icon */}
        <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden>
          <rect width="22" height="2" rx="1" fill="currentColor" />
          <rect y="6" width="22" height="2" rx="1" fill="currentColor" />
          <rect y="12" width="22" height="2" rx="1" fill="currentColor" />
        </svg>
      </button>

      {/* Backdrop */}
      <div
        aria-hidden
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-200 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer panel — slides from right, 86vw wide, full-height */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`fixed top-0 right-0 z-[70] h-[100svh] w-[86vw] max-w-[360px] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 16px)",
          paddingBottom: "calc(env(safe-area-inset-bottom) + 24px)",
        }}
      >
        {/* Header row — wordmark + close */}
        <div className="flex items-center justify-between px-5 pb-6 border-b border-ink-body/10">
          <Link
            href="/"
            className="font-istok text-ink-deep"
            style={{ fontSize: 18, fontWeight: 700 }}
          >
            Holistic Medspa
          </Link>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="tap-target inline-flex items-center justify-center text-ink-deep"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
              <path d="M2 2 L16 16 M16 2 L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Scrollable nav body */}
        <div className="overflow-y-auto h-[calc(100%-72px)] px-5 py-6">
          {/* Primary nav */}
          <ul className="space-y-1 mb-8">
            {PRIMARY_NAV.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block font-spectral py-3 [word-break:break-word] transition-colors duration-150 ${
                      active ? "text-mint" : "text-ink-deep"
                    }`}
                    style={{ fontSize: 26, lineHeight: 1.2, letterSpacing: "-0.6px", fontWeight: 400 }}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Services subgroup */}
          <div className="mb-8">
            <p
              className="font-clash uppercase text-ink-body/60 mb-3"
              style={{ fontSize: 11, letterSpacing: "1.2px", fontWeight: 500 }}
            >
              Sessions
            </p>
            <ul className="space-y-0">
              {SERVICE_NAV.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`block font-manrope py-2 [word-break:break-word] transition-colors duration-150 ${
                        active ? "text-mint" : "text-ink-body"
                      }`}
                      style={{ fontSize: 15, lineHeight: 1.4, fontWeight: 500 }}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Contact block — peak-end moment per skill: drawer closes with concrete next-step */}
          <div className="border-t border-ink-body/10 pt-6">
            <a
              href="tel:9852786087"
              className="block font-spectral text-ink-deep mb-1"
              style={{ fontSize: 22, lineHeight: 1.2, letterSpacing: "-0.4px", fontWeight: 400 }}
            >
              (985) 278-6087
            </a>
            <p
              className="font-manrope text-ink-body/70"
              style={{ fontSize: 13, lineHeight: 1.5 }}
            >
              Call or text Toya — 17361 W Main St, Cut Off, LA.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
