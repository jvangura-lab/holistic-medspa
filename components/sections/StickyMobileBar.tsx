import Link from "next/link";

/**
 * StickyMobileBar — per craft-bar.md sticky mobile bar rule.
 * Fixed bottom on mobile only (<md). 3 actions: Call, Text, Book.
 * Sized to ≥44pt touch targets per ui-ux-pro-max accessibility rule.
 */
export default function StickyMobileBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-ink-body/10 shadow-[0_-2px_8px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid grid-cols-3">
        <li>
          <a
            href="tel:9852786087"
            className="flex flex-col items-center justify-center h-[56px] font-clash uppercase text-ink-deep"
            style={{ fontSize: 12, letterSpacing: "0.6px" }}
          >
            Call
          </a>
        </li>
        <li>
          <a
            href="sms:9852786087"
            className="flex flex-col items-center justify-center h-[56px] font-clash uppercase text-ink-deep border-x border-ink-body/10"
            style={{ fontSize: 12, letterSpacing: "0.6px" }}
          >
            Text
          </a>
        </li>
        <li>
          <Link
            href="/book"
            className="flex flex-col items-center justify-center h-[56px] font-clash uppercase bg-mint text-black"
            style={{ fontSize: 12, letterSpacing: "0.6px" }}
          >
            Book
          </Link>
        </li>
      </ul>
    </nav>
  );
}
