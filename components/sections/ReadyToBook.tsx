import Link from "next/link";

/**
 * ReadyToBook — call/text/request-form CTA band used on every service deep page.
 *
 * Reuses the footer ready-CTA chrome (DS §3.1 footer + §3.1 button variant C: outline ink pill)
 * inside a cream band rather than the footer's white-to-dark transition. Sits BEFORE the Footer
 * component on the page (which has its own broader Ready-CTA — both are intentional per
 * DESIGN_SYSTEM.md §5 extension, where service pages get a directed booking CTA in addition to
 * the sitewide footer CTA).
 *
 * Booking funnel per /Users/jonasvangura/website-auto/studio/templates/booking-integrations.md
 * (Call/Text + Request-Consultation — no dead Acuity link).
 */
export default function ReadyToBook({
  heading,
  body,
  bookHref = "/book",
  bookLabel = "Request Consultation",
}: {
  heading: string;
  body: string;
  bookHref?: string;
  bookLabel?: string;
}) {
  return (
    <section
      aria-label="Ready to book"
      className="relative w-full bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-[150px]">
        <h2
          className="font-spectral text-ink-deep mb-6 [word-break:break-word]"
          style={{
            maxWidth: 860,
            fontSize: "clamp(34px, 4.6vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-2.4px",
            fontWeight: 400,
          }}
        >
          {heading}
        </h2>
        <p
          className="font-manrope text-ink-body mb-10 [word-break:break-word]"
          style={{
            maxWidth: 760,
            fontSize: "clamp(16px, 1.4vw, 19px)",
            lineHeight: 1.6,
            letterSpacing: "-0.2px",
            fontWeight: 400,
          }}
        >
          {body}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href={bookHref}
            className="block rounded-pill border border-solid border-ink-body bg-transparent text-ink-deep text-center font-clash uppercase transition-[filter] duration-150 hover:brightness-90"
            style={{
              width: 240,
              height: 50,
              lineHeight: "48px",
              fontSize: 18,
              letterSpacing: "0.9px",
              fontWeight: 400,
            }}
          >
            {bookLabel}
          </Link>
          <a
            href="tel:9852786087"
            className="font-clash text-ink-body uppercase transition-colors duration-150 hover:text-mint"
            style={{ fontSize: 16, letterSpacing: "0.8px", fontWeight: 400 }}
          >
            Call (985) 278-6087
          </a>
          <a
            href="sms:9852786087"
            className="font-clash text-ink-body uppercase transition-colors duration-150 hover:text-mint"
            style={{ fontSize: 16, letterSpacing: "0.8px", fontWeight: 400 }}
          >
            Text us
          </a>
        </div>
      </div>
    </section>
  );
}
