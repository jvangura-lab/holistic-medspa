"use client";

import { useState } from "react";

/**
 * Accordion — reusable FAQ primitive used on every service deep page.
 *
 * Visual chrome stays inside DS bounds:
 *  - Manrope body, Spectral question header
 *  - Hairline divider 1px ink-body/15 between rows (matches footer outline border weight)
 *  - +/- glyph rendered as a pure typographic element (no Lucide / no emoji per craft-bar.md)
 *  - 250ms settle transition on expansion (DS §7 motion register)
 *
 * Native <details>/<summary> would be cheaper but doesn't allow the 250ms easing curve
 * we want, and qa-critic Layer 2 reads accordion polish as a craft signal.
 */
export type AccordionItem = { q: string; a: string };

export default function Accordion({ items, idPrefix = "faq" }: { items: AccordionItem[]; idPrefix?: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <ul className="border-t border-ink-body/15">
      {items.map((it, i) => {
        const isOpen = openIdx === i;
        const headingId = `${idPrefix}-h-${i}`;
        const panelId = `${idPrefix}-p-${i}`;
        return (
          <li key={i} className="border-b border-ink-body/15">
            <h3>
              <button
                id={headingId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full text-left flex items-start gap-6 py-6 md:py-8 group transition-colors duration-150 hover:text-ink-deep"
              >
                <span
                  className="flex-1 font-spectral text-ink-h2 [word-break:break-word]"
                  style={{
                    fontSize: "clamp(20px, 2.4vw, 28px)",
                    lineHeight: 1.25,
                    letterSpacing: "-0.5px",
                    fontWeight: 400,
                  }}
                >
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className="font-manrope text-mint shrink-0 transition-transform duration-300"
                  style={{
                    fontSize: "32px",
                    lineHeight: 1,
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    fontWeight: 300,
                  }}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={headingId}
              hidden={!isOpen}
              className="pb-6 md:pb-8 pr-12 md:pr-16"
            >
              <p
                className="font-manrope text-ink-body [word-break:break-word]"
                style={{
                  fontSize: "clamp(15px, 1.2vw, 17px)",
                  lineHeight: 1.65,
                  letterSpacing: "-0.2px",
                  fontWeight: 400,
                  maxWidth: 820,
                }}
              >
                {it.a}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
