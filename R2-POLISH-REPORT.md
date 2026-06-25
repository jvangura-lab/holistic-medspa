# R2 polish — motion + subpage imagery

Round 2 polish pass on the holistic-v6-figma rebuild. Adds the 5 owner-requested motion
primitives (smooth scroll, viewport-enter, sticky-stack, easing, text-splitting) and brings
design-system imagery vocabulary (oval portraits, pill-band quotes, image-card slabs) to
every subpage that was previously flat.

## Motion primitives shipped

| File | What it does | Reduced-motion fallback |
| --- | --- | --- |
| `components/motion/SmoothScroll.tsx` | Lenis-driven smooth inertial scroll, mounted in `app/layout.tsx` | Bails entirely — native scroll |
| `components/motion/Reveal.tsx` | Viewport-enter primitive with `fade` / `slide` / `mask` variants, IntersectionObserver-based | Renders at final state, no transition |
| `components/motion/SplitText.tsx` | Lightweight DOM-split word-cascade text reveal | Renders text statically |
| `components/sections/PillBands.tsx` | Existing CSS sticky-stack — sticky pill bands stack on scroll (no JS) | Native sticky honored |
| `app/globals.css` `@theme` | Easing curves `--ease-veil`, `--ease-draw`, `--ease-settle` (cubic-bezier presets) | n/a — CSS variable |

## Components animated

| Component | Motion applied |
| --- | --- |
| `Hero.tsx` | Headline SplitText cascade (120ms stagger); ellipse Reveal `mask` clip-path (delay 300ms); sub-copy Reveal `fade` (delay 500ms); mobile headline SplitText |
| `ServiceHero.tsx` | Desktop + mobile headline SplitText (80ms / 60ms stagger); sub-copy Reveal `fade` (delay 350ms) |
| `PillBands.tsx` | Each of 3 band labels (Sessions / Treatments / Services) SplitText 120ms stagger; existing CSS sticky-stack preserved |
| `WhatWeOffer.tsx` | H2 SplitText (100ms stagger); each tile Reveal `slide-up` with column-modulo stagger (80ms × column) |
| `StayConnected.tsx` | H2 SplitText (140ms stagger); each of 3 tiles Reveal `mask` with sequential delays (0 / 180 / 360ms) |
| `Testimonial.tsx` | Quote body Reveal `fade` (900ms); attribution Reveal `fade` (delay 400ms) |
| `ServiceCategories.tsx` | Each pricing card Reveal `fade` with index stagger (110ms × index) |
| `Footer.tsx` | Ready-CTA headline SplitText (70ms stagger); CTA row Reveal `fade` (delay 400ms) |

Motion budget honored — no component received more than 2-3 treatments. Sticky bands kept as
pure CSS to avoid jank (no GSAP ScrollTrigger required for this signature).

## Subpages with imagery additions (DS-pattern, not default captions)

| Page | Imagery additions |
| --- | --- |
| `/about` | 1× `OvalCard` of `philosophy.jpg` in the 2020 founding band; 1× `PillBandQuote` over `storefront.jpg` between 2020 and 2025 sections; replaced flat practitioner rectangle with `OvalCard` of `about-hero-image.jpg`; added new Stay-Connected-style image-card slab over `contact-storefront-photo.jpg` for "Find us" |
| `/first-visit` | 1× `PillBandQuote` over `service-bach-flowers.jpg` ("We do not rush first visits."); 1× `OvalCard` of `first-visit-step-cypress.jpg` above the "Bring with you" block |
| `/pricing` | 1× `PillBandQuote` header over `philosophy.jpg` above anchor pricing cards; 1× `OvalCard` of `storefront.jpg` alongside the "Full list" table heading |
| `/book` | Split layout: left `OvalCard` of `storefront.jpg` (sticky); image-background dark band for "What happens after you send" over `service-bach-flowers.jpg` with dark scrim and white text |
| `/contact` | Replaced flat rectangle storefront figure with `OvalCard` (DS pattern); 1× `PillBandQuote` over `contact-storefront-photo.jpg` between form and social ("By appointment, by hand, by Toya.") |
| `/services/[slug]` (×8) | Per-service `PillBandQuote` between "What it is" and "How it works" — image + distilled per-service quote (curated from the existing CONTENT.md hero line); per-service `OvalCard` of the service's hero image in the "What to expect" section. Multiplied across 8 service routes via the single `[slug]` template — 16 imagery treatments total. |

Reusable imagery primitives created:
- `components/ui/OvalCard.tsx` — ellipse-masked image card with optional caption, mirrors home Hero's `rounded-ellipse` + `border-rose` pattern
- `components/ui/PillBandQuote.tsx` — rounded-pill image band with dark scrim and Spectral quote overlay, mirrors home Sessions/Treatments/Services band pattern

All imagery additions reuse existing media from `public/media/`. Zero new image generation
was performed this turn (image budget = 0).

## npm dependencies added

```
"@gsap/react": "^2.1.2"
"gsap": "^3.15.0"
"lenis": "^1.3.24"
```

(GSAP installed for the easing-curve reference and to be available for future motion work;
SplitText was hand-rolled to avoid GSAP-pro licensing.)

## Build status

`npm run build` — **exit 0**, all 23 routes compile clean.

```
✓ Compiled successfully
✓ Generating static pages (23/23)
```

Route inventory unchanged from R1 — no routes added, none removed.

## Tier-3 risks / carry-forwards

- None. Every motion primitive checks `prefers-reduced-motion` and falls back to a static
  final state. Lenis bails entirely on reduce. Sticky-stack is CSS-only and honors native
  reduce by virtue of the pre-existing `@media (prefers-reduced-motion: reduce)` block in
  globals.css disabling transitions.
- No deviations from DESIGN_SYSTEM.md tokens — all motion primitives consume the §7
  easing curves (`--ease-veil`, `--ease-draw`, `--ease-settle`) which were already in the
  spec; the OvalCard reuses the §3.1 hero ellipse anatomy verbatim (border-rose, rounded-
  ellipse); the PillBandQuote reuses the §3.2 sticky-band anatomy (rounded-pill, dark
  scrim, Spectral white H2).
- No copy authored this turn. Service quotes were lifted verbatim from each service's
  existing `hero.headline` in `lib/services-data.ts`.
