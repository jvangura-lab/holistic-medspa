import Image from "next/image";
import SplitText from "@/components/motion/SplitText";

/**
 * Stay Connected — Figma 125:391 wrapper + 125:493 centered H2.
 * Source: research/references/figma-ds/design-context/sections-mid-NEW.tsx §6.
 *
 * Layout: centered "Stay Connected" Spectral 120px H2 (#231f20) above 3 image/dark tiles.
 * TILE 1 (LEFT): Gift Card — masked image (imgImage4 + 80% black overlay), 420×324
 * TILE 2 (MIDDLE): Newsletter — bg #231f20 dark panel 420×297 + email input 357×52 (bg-black) +
 *                    submit pill bg mint 357×49
 * TILE 3 (RIGHT): Become a Member — masked image (imgImage3 + 80% #0e0f14 overlay)
 *
 * Per IMAGERY-PROVENANCE.md slots N7/N8: Gift Card uses essential-oils-step-blending.jpg as
 * reuse candidate; Become-a-Member uses hero-poster.jpg as reuse candidate.
 */
export default function StayConnected() {
  return (
    <section
      aria-label="Stay Connected"
      className="relative w-full bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-0">
        {/* H2 — Spectral 120px centered, #231f20, tracking -4.8 */}
        <h2
          className="font-spectral text-ink-h2 text-center mx-auto mb-12 md:mb-16 [word-break:break-word]"
          style={{
            fontSize: "clamp(56px, 9vw, 120px)",
            lineHeight: 1,
            letterSpacing: "-4.8px",
            fontWeight: 400,
          }}
        >
          <SplitText text="Stay Connected" stagger={140} duration={900} />
        </h2>

        {/* Desktop: 3-tile row at 1300 container width, ~420w each + gaps */}
        <div className="hidden md:flex justify-center gap-[20px]">
          {/* TILE 1: Gift Card — masked image + 80% black overlay */}
          <div className="relative overflow-hidden rounded-[28px]" style={{ width: 420, height: 324 }}>
            <Image
              src="/media/service-pages/essential-oils-step-blending.jpg"
              alt=""
              fill
              sizes="420px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/80" />
            <h3
              className="absolute font-clash text-white"
              style={{ left: 30, top: 20, fontSize: 31, fontWeight: 500, letterSpacing: 0 }}
            >
              Gift Card
            </h3>
            <p
              className="absolute font-manrope text-white/80 pr-6"
              style={{ left: 30, top: 70, fontSize: 16, lineHeight: "22px", letterSpacing: "-0.32px" }}
            >
              Give the gift of an hour with Toya — a ZYTO scan, a Milly&apos;s Minutes session, or a Bach Flower consult. Call or text (985) 278-6087 to arrange.
            </p>
          </div>

          {/* TILE 2: Newsletter — bg #231f20 dark + email input + submit pill */}
          <div className="relative overflow-hidden rounded-[28px] bg-ink-h2" style={{ width: 420, height: 324 }}>
            <h3
              className="absolute font-clash text-white"
              style={{ left: 30, top: 20, fontSize: 31, fontWeight: 500, letterSpacing: 0 }}
            >
              Newsletter
            </h3>
            <form
              method="POST"
              action="/api/newsletter"
              className="absolute"
              style={{ left: 30, top: 80, width: 357 }}
            >
              <input
                type="email"
                name="email"
                required
                aria-label="Email address"
                placeholder="Enter Your Email ID"
                className="block w-full h-[52px] bg-black px-5 font-clash text-white placeholder:text-white/70 focus:outline-none"
                style={{ fontSize: 16, letterSpacing: "0.8px" }}
              />
              <button
                type="submit"
                className="block mt-3 w-full h-[49px] bg-mint rounded-pill font-clash uppercase text-ink-body transition-[filter] duration-150 hover:brightness-95"
                style={{ fontSize: 18, letterSpacing: "0.9px", fontWeight: 400 }}
              >
                Subscribe
              </button>
            </form>
            <p
              className="absolute font-manrope text-white/60 pr-6"
              style={{ left: 30, bottom: 18, right: 30, fontSize: 12, lineHeight: "16px" }}
            >
              Occasional dispatches from the bayou. No spam, ever.
            </p>
          </div>

          {/* TILE 3: Become a Member — masked image + 80% #0e0f14 overlay */}
          <div className="relative overflow-hidden rounded-[28px]" style={{ width: 420, height: 324 }}>
            <Image
              src="/media/round-2/bayou/pixabay-bayou-swamp-285818.jpg"
              alt=""
              fill
              sizes="420px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-overlay/80" />
            <h3
              className="absolute font-clash text-white"
              style={{ left: 30, top: 20, fontSize: 31, fontWeight: 500, letterSpacing: 0 }}
            >
              Become a Member
            </h3>
            <p
              className="absolute font-manrope text-white/80 pr-6"
              style={{ left: 30, top: 70, fontSize: 16, lineHeight: "22px", letterSpacing: "-0.32px" }}
            >
              Returning clients across Bayou Lafourche have kept coming back since 2020. Ask Toya about ongoing care at your first visit.
            </p>
          </div>
        </div>

        {/* Mobile — R4.A optimized: Newsletter (the highest-value action) goes FIRST,
            then Gift Card + Become-a-Member as horizontal-swipe pair below.
            Skill applied:
              - Newsletter form is action-first (gets prime real estate, full-width input
                + filled mint submit button, both ≥48pt).
              - Gift Card + Become-a-Member tiles are passive (information, not action);
                horizontal swipe pair keeps them out of vertical scroll path.
              - Each tile peek-of-next signals more content. */}
        <div className="md:hidden">
          {/* Newsletter — primary card, full-width, action first */}
          <div className="relative overflow-hidden rounded-[20px] bg-ink-h2 p-6 mb-5">
            <h3
              className="font-clash text-white mb-2"
              style={{ fontSize: 24, fontWeight: 500, letterSpacing: "0.2px" }}
            >
              Newsletter
            </h3>
            <p
              className="font-manrope text-white/70 mb-5"
              style={{ fontSize: 13, lineHeight: 1.5 }}
            >
              Occasional dispatches from the bayou. No spam, ever.
            </p>
            <form method="POST" action="/api/newsletter" className="flex flex-col gap-2.5">
              <input
                type="email"
                name="email"
                required
                inputMode="email"
                autoComplete="email"
                aria-label="Email address"
                placeholder="Your email"
                className="block w-full bg-black px-4 font-clash text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-mint rounded-md"
                style={{ fontSize: 16, height: 52, letterSpacing: "0.6px", border: "1px solid transparent" }}
              />
              <button
                type="submit"
                className="tap-press w-full bg-mint rounded-pill font-clash uppercase text-ink-body inline-flex items-center justify-center"
                style={{ fontSize: 14, letterSpacing: "0.9px", fontWeight: 500, minHeight: 52 }}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Gift Card + Become Member — horizontal swipe pair */}
          <div className="-mx-5">
            <div className="scroll-snap-x gap-3 px-5">
              {[
                {
                  title: "Gift Card",
                  bg: "/media/service-pages/essential-oils-step-blending.jpg",
                  overlay: "bg-black/75",
                  body: "Give the gift of an hour with Toya — call or text (985) 278-6087 to arrange.",
                  href: "tel:9852786087",
                },
                {
                  title: "Become a Member",
                  bg: "/media/round-2/bayou/pixabay-bayou-swamp-285818.jpg",
                  overlay: "bg-overlay/75",
                  body: "Returning clients since 2020. Ask Toya about ongoing care.",
                  href: "/contact",
                },
              ].map((t) => (
                <a
                  key={t.title}
                  href={t.href}
                  className="scroll-snap-item tap-press relative block overflow-hidden rounded-[20px] h-[200px]"
                  style={{ width: "78vw", maxWidth: 320 }}
                >
                  <Image src={t.bg} alt="" fill sizes="78vw" className="object-cover" />
                  <div className={`absolute inset-0 ${t.overlay}`} />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="font-clash text-white mb-2" style={{ fontSize: 22, fontWeight: 500 }}>
                      {t.title}
                    </h3>
                    <p
                      className="font-manrope text-white/80"
                      style={{ fontSize: 12, lineHeight: 1.5 }}
                    >
                      {t.body}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
