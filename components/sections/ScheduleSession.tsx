import Image from "next/image";
import type { HTMLAttributes } from "react";

/**
 * Schedule a Session — Figma 125:295 wrapper (sections-mid-NEW.tsx §5).
 * Layout: H2 left + 5 form fields (Name/Email/Phone/Date/Message — left col 530w)
 *         + submit pill 532×70 BELOW fields + right-col image 712×665.
 *
 * Field bg #f6f6f6 (cream), labels Manrope 16px uppercase #242424 at inner-padding (29,24).
 * Form vertical stride 100px between fields. Submit pill bg #7db88a, Clash 20px BLACK label.
 *
 * Backend stub: form posts to /api/book (handled in F3.4). For F3.2, submit triggers a
 * native form POST with action="/book?source=home" so the form is functional pre-API.
 */
export default function ScheduleSession() {
  return (
    <section
      aria-label="Schedule a Session"
      className="relative w-full bg-white py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-5 md:px-0">
        {/* H2 */}
        <h2
          className="font-spectral text-ink-h2 mb-10 md:mb-12 md:ml-[150px] [word-break:break-word]"
          style={{
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: "1.05",
            letterSpacing: "-3.2px",
            fontWeight: 400,
            maxWidth: 591,
          }}
        >
          Schedule a Session
        </h2>

        {/* Desktop: absolute layout — left form 530w at left=150, right image 712×665 at left:calc(41.67%+72.33px) */}
        <div className="hidden md:block relative mx-auto w-full max-w-[1600px]" style={{ height: 695 }}>
          <form
            method="POST"
            action="/book?source=home"
            className="absolute"
            style={{ left: 150, top: 0, width: 530 }}
          >
            {/* 4 single-row fields */}
            {[
              { id: "name", label: "Name", type: "text", autoComplete: "name", required: true },
              { id: "email", label: "Email", type: "email", autoComplete: "email", required: true },
              { id: "phone", label: "Phone", type: "tel", autoComplete: "tel", required: true },
              { id: "date", label: "Date", type: "text", autoComplete: "off", required: false },
            ].map((f, i) => (
              <div
                key={f.id}
                className="absolute bg-cream"
                style={{ left: 0, top: i * 100, width: 530, height: 70 }}
              >
                <label
                  htmlFor={`schedule-${f.id}`}
                  className="absolute font-manrope uppercase text-ink-body pointer-events-none"
                  style={{ left: 29, top: 24, fontSize: 16, letterSpacing: "0.8px", fontWeight: 400 }}
                >
                  {f.label}
                </label>
                <input
                  id={`schedule-${f.id}`}
                  name={f.id}
                  type={f.type}
                  autoComplete={f.autoComplete}
                  required={f.required}
                  className="absolute inset-0 w-full h-full bg-transparent pt-9 px-7 font-manrope text-ink-deep focus:outline-none focus:ring-0"
                  style={{ fontSize: 16 }}
                  aria-label={f.label}
                />
              </div>
            ))}
            {/* Message field — bigger 165h at top=400 */}
            <div className="absolute bg-cream" style={{ left: 0, top: 400, width: 530, height: 165 }}>
              <label
                htmlFor="schedule-message"
                className="absolute font-manrope uppercase text-ink-body pointer-events-none"
                style={{ left: 29, top: 24, fontSize: 16, letterSpacing: "0.8px", fontWeight: 400 }}
              >
                Message
              </label>
              <textarea
                id="schedule-message"
                name="message"
                rows={5}
                className="absolute inset-0 w-full h-full bg-transparent pt-12 px-7 font-manrope text-ink-deep resize-none focus:outline-none"
                style={{ fontSize: 16 }}
                aria-label="Message"
              />
            </div>
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="absolute opacity-0 pointer-events-none"
              style={{ left: -9999 }}
            />
            {/* Submit pill — bg mint, w=532 h=70, top=595 (after message ends at 565 → +30 gap) */}
            <button
              type="submit"
              className="absolute bg-mint rounded-pill font-clash uppercase text-black transition-[filter] duration-150 hover:brightness-95"
              style={{
                left: -1,
                top: 595,
                width: 532,
                height: 70,
                fontSize: 20,
                letterSpacing: "1px",
                fontWeight: 400,
              }}
            >
              Book an Appointment
            </button>
          </form>

          {/* Right image 712×665 at left:calc(41.67%+72.33px) top=0 */}
          <div
            className="absolute overflow-hidden"
            style={{ left: "calc(41.67% + 72.33px)", top: 0, width: 712, height: 665 }}
          >
            <Image
              src="/media/philosophy.jpg"
              alt="Classic apothecary jars lined up on a wooden shelf in dim warm light."
              fill
              sizes="712px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Mobile — R4.A optimized: form FIRST (action-first per skill — let user act
            before scrolling past), image collapsed into a small visual anchor below.
            Skill applied:
              - Inputs use natural-flow labels above (clearer than overlay) + 16px text
                (Apple no-zoom rule) + 56px field height (≥44pt tap target).
              - bg-cream + 2px focus ring (mint) for clear interaction state.
              - inputmode hints surface the right mobile keyboard per field type.
              - Submit pill is full-width + 56pt height + filled mint (highest affordance).
              - The trust photo lives BELOW the form as supporting context, not above
                gating the action. */}
        <div className="md:hidden">
          <form method="POST" action="/book?source=home" className="space-y-3.5">
            {[
              { id: "name", label: "Your name", type: "text", inputMode: "text", autoComplete: "name", required: true },
              { id: "email", label: "Email", type: "email", inputMode: "email", autoComplete: "email", required: true },
              { id: "phone", label: "Phone", type: "tel", inputMode: "tel", autoComplete: "tel", required: true },
              { id: "date", label: "Preferred date or window", type: "text", inputMode: "text", autoComplete: "off", required: false },
            ].map((f) => (
              <div key={f.id}>
                <label
                  htmlFor={`mschedule-${f.id}`}
                  className="block font-manrope uppercase text-ink-body mb-2"
                  style={{ fontSize: 12, letterSpacing: "0.9px", fontWeight: 500 }}
                >
                  {f.label}
                </label>
                <input
                  id={`mschedule-${f.id}`}
                  name={f.id}
                  type={f.type}
                  inputMode={f.inputMode as HTMLAttributes<HTMLInputElement>["inputMode"]}
                  autoComplete={f.autoComplete}
                  required={f.required}
                  className="block w-full bg-cream font-manrope text-ink-deep focus:outline-none focus:ring-2 focus:ring-mint focus:ring-offset-0 px-4"
                  style={{ fontSize: 16, height: 56, border: "1px solid transparent" }}
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="mschedule-message"
                className="block font-manrope uppercase text-ink-body mb-2"
                style={{ fontSize: 12, letterSpacing: "0.9px", fontWeight: 500 }}
              >
                Message <span className="text-ink-body/60 normal-case">(optional)</span>
              </label>
              <textarea
                id="mschedule-message"
                name="message"
                rows={4}
                className="block w-full bg-cream font-manrope text-ink-deep resize-none focus:outline-none focus:ring-2 focus:ring-mint px-4 py-3"
                style={{ fontSize: 16, border: "1px solid transparent" }}
              />
            </div>
            <button
              type="submit"
              className="tap-press w-full bg-mint rounded-pill font-clash uppercase text-black inline-flex items-center justify-center mt-2"
              style={{ fontSize: 15, letterSpacing: "0.9px", fontWeight: 500, minHeight: 56 }}
            >
              Book an Appointment
            </button>
            <a
              href="tel:9852786087"
              className="tap-press block text-center font-clash uppercase text-ink-body/70 mt-1"
              style={{ fontSize: 12, letterSpacing: "0.8px", fontWeight: 500, minHeight: 44, lineHeight: "44px" }}
            >
              Or call (985) 278-6087
            </a>
          </form>
          {/* Image becomes a trust anchor BELOW the form — smaller, no longer blocks action */}
          <div className="relative w-full h-[200px] mt-10 overflow-hidden rounded-[20px]">
            <Image
              src="/media/philosophy.jpg"
              alt="Classic apothecary jars lined up on a wooden shelf in dim warm light."
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
