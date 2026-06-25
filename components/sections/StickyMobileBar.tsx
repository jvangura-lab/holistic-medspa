import Link from "next/link";

/**
 * StickyMobileBar — R4.A optimized (mobile-app-ui-design skill).
 *
 * Skill changes:
 *   - Icon + label per action (skill: visual cues > text-only for affordance recognition)
 *   - Increased height 56 → 64 for more comfortable thumb-zone tap
 *   - Book action gets ARROW glyph + filled mint for highest affordance (peak action)
 *   - Soft top shadow matches background (no harsh black-on-white per skill rule)
 *   - safe-area-bottom utility preserved for iPhone notch
 */
export default function StickyMobileBar() {
  return (
    <nav
      aria-label="Quick actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-ink-body/10"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
        boxShadow: "0 -4px 16px rgba(20, 20, 20, 0.06)",
      }}
    >
      <ul className="grid grid-cols-3">
        <li>
          <a
            href="tel:9852786087"
            className="tap-press flex flex-col items-center justify-center gap-1 h-[64px] font-clash uppercase text-ink-deep"
            style={{ fontSize: 11, letterSpacing: "0.8px", fontWeight: 500 }}
            aria-label="Call (985) 278-6087"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Call</span>
          </a>
        </li>
        <li>
          <a
            href="sms:9852786087"
            className="tap-press flex flex-col items-center justify-center gap-1 h-[64px] font-clash uppercase text-ink-deep border-x border-ink-body/10"
            style={{ fontSize: 11, letterSpacing: "0.8px", fontWeight: 500 }}
            aria-label="Text (985) 278-6087"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Text</span>
          </a>
        </li>
        <li>
          <Link
            href="/book"
            className="tap-press flex flex-col items-center justify-center gap-1 h-[64px] font-clash uppercase bg-mint text-black"
            style={{ fontSize: 11, letterSpacing: "0.8px", fontWeight: 500 }}
            aria-label="Book an appointment"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8" />
              <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span>Book</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
