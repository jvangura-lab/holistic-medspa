import Link from "next/link";

import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/sections/StickyMobileBar";

/**
 * /404 — Not Found
 *
 * Composition per DESIGN_SYSTEM.md §5.2 — reduced-hero centered on cream.
 * Copy poured verbatim from CONTENT.md `/404` block.
 */

export const metadata = {
  title: "Not Found",
  description: "This page does not exist (yet). Find your way back home, to services, or call (985) 278-6087.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative bg-white brand-loader min-h-svh flex flex-col">
      <Header />
      <section
        aria-label="Page not found"
        className="relative w-full flex-1 flex items-center justify-center bg-cream py-32 md:py-48"
      >
        <div className="mx-auto w-full max-w-[1100px] px-5 md:px-[150px] text-center">
          <p
            className="font-clash text-mint uppercase mb-6"
            style={{ fontSize: 14, letterSpacing: "0.7px", fontWeight: 500 }}
          >
            404 &middot; Page not found
          </p>
          <h1
            className="font-spectral text-ink-deep mb-8 [word-break:break-word]"
            style={{
              fontSize: "clamp(64px, 9vw, 120px)",
              lineHeight: 1,
              letterSpacing: "-4px",
              fontWeight: 400,
            }}
          >
            This page does not exist (yet).
          </h1>
          <p
            className="font-manrope text-ink-body mx-auto mb-12 [word-break:break-word]"
            style={{
              maxWidth: 680,
              fontSize: "clamp(17px, 1.5vw, 21px)",
              lineHeight: 1.6,
              letterSpacing: "-0.2px",
              fontWeight: 400,
            }}
          >
            We are a small practice and the site is new. If you came here from a link that did not work, or a typo in the address bar, no harm done.
          </p>

          <p
            className="font-clash text-ink-h2 uppercase mb-6"
            style={{ fontSize: 14, letterSpacing: "0.7px", fontWeight: 500 }}
          >
            The pages we definitely have:
          </p>
          <ul
            className="font-clash text-ink-body flex flex-wrap items-center justify-center gap-x-7 gap-y-3 mb-14"
            style={{ fontSize: 16, letterSpacing: "0.8px", fontWeight: 400 }}
          >
            {[
              { href: "/", label: "Home" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
              { href: "/first-visit", label: "First Visit" },
              { href: "/pricing", label: "Pricing" },
              { href: "/book", label: "Request Consult" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="uppercase border-b border-ink-body/30 hover:text-mint hover:border-mint transition-colors duration-150 pb-1"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <Link
              href="/"
              className="block rounded-pill border border-solid border-ink-body bg-transparent text-ink-deep text-center font-clash uppercase transition-[filter] duration-150 hover:brightness-90"
              style={{
                width: 200,
                height: 50,
                lineHeight: "48px",
                fontSize: 18,
                letterSpacing: "0.9px",
                fontWeight: 400,
              }}
            >
              Back to home
            </Link>
            <a
              href="tel:9852786087"
              className="font-clash text-ink-body uppercase transition-colors duration-150 hover:text-mint"
              style={{ fontSize: 16, letterSpacing: "0.8px", fontWeight: 400 }}
            >
              Or call (985) 278-6087
            </a>
          </div>

          <p
            className="font-manrope text-ink-body/80 mt-12 mx-auto [word-break:break-word]"
            style={{
              maxWidth: 560,
              fontSize: 15,
              lineHeight: 1.6,
              letterSpacing: "-0.2px",
            }}
          >
            If you were looking for a specific service or page and cannot find it, call or text (985) 278-6087 and we will point you to the right place.
          </p>
        </div>
      </section>
      <Footer />
      <StickyMobileBar />
      <div className="md:hidden h-[56px]" aria-hidden />
    </main>
  );
}
