"use client";

import { useState, type FormEvent } from "react";

/**
 * BookForm — full request-a-consultation form rendered on /book (and /contact).
 *
 * Field set per CONTENT.md `/book` block. Submits to /api/contact (honeypot + Turnstile + rate-limit
 * server-side per booking-integrations.md). Shows on-screen confirmation per CONTENT.md
 * "What happens after you submit" step 1.
 */

const SERVICE_OPTIONS = [
  "A naturopathy / homeopathy / herbal consultation (~1 hour with Toya)",
  "A ZYTO Wellness Scan (with walkthrough)",
  "Lymphatic Drainage with Lymphstar Pro (30 min)",
  "Milly's Minutes — Infrared Sauna",
  "Milly's Minutes — Vibra Plate",
  "Milly's Minutes — Ionic Foot Bath",
  "A Bach Flower Consultation",
  "A doTERRA Essential Oils retail visit",
  "The Blending on the Bayou private class (groups of 7+)",
  "A hosted Sound Prevention Ultrasound event (notify list)",
  "A Total Thermography hosted clinic event (notify list)",
  "An OlyLife THz Wellness Session",
  "I am not sure — please help me pick",
];

export default function BookForm({
  source = "/book",
  compact = false,
}: {
  source?: string;
  compact?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("source", source);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: fd,
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || data?.ok !== true) {
        setStatus("error");
        setErrorMsg(
          data?.error ??
            "Something went wrong. Please call or text (985) 278-6087 and we will book you in.",
        );
        return;
      }
      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please call or text (985) 278-6087.");
    }
  }

  if (status === "ok") {
    return (
      <div
        className="bg-cream p-8 md:p-12 border-l-4 border-mint"
        role="status"
        aria-live="polite"
      >
        <h3
          className="font-spectral text-ink-deep mb-4 [word-break:break-word]"
          style={{
            fontSize: "clamp(28px, 3.4vw, 40px)",
            lineHeight: 1.1,
            letterSpacing: "-1.4px",
            fontWeight: 400,
          }}
        >
          Thanks. Toya will be in touch.
        </h3>
        <p
          className="font-manrope text-ink-body [word-break:break-word]"
          style={{ fontSize: 17, lineHeight: 1.6, letterSpacing: "-0.2px" }}
        >
          Toya will be in touch by call or text within a few days. If you provided an email, a short auto-reply will land in your inbox. If anything is urgent, call or text{" "}
          <a href="tel:9852786087" className="underline hover:text-mint transition-colors">
            (985) 278-6087
          </a>
          .
        </p>
      </div>
    );
  }

  const labelCls = "block font-manrope uppercase text-ink-body mb-2";
  const labelStyle = { fontSize: 13, letterSpacing: "0.8px", fontWeight: 500 };
  const fieldCls = "block w-full bg-cream font-manrope text-ink-deep focus:outline-none focus:ring-2 focus:ring-mint";
  const fieldStyle = {
    fontSize: 16,
    padding: compact ? "16px" : "20px 22px",
    border: "1px solid transparent",
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-6 md:space-y-7"
      aria-label="Request a consultation"
    >
      {/* Service selector */}
      <div>
        <label htmlFor="bk-service" className={labelCls} style={labelStyle}>
          Service you are interested in <span className="text-ink-body/60 normal-case">(pick the closest)</span>
        </label>
        <select
          id="bk-service"
          name="service"
          className={fieldCls}
          style={fieldStyle}
          defaultValue=""
        >
          <option value="" disabled>
            Pick a service…
          </option>
          {SERVICE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-7">
        <div>
          <label htmlFor="bk-name" className={labelCls} style={labelStyle}>
            Your name
          </label>
          <input
            id="bk-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
            className={fieldCls}
            style={fieldStyle}
          />
        </div>
        <div>
          <label htmlFor="bk-phone" className={labelCls} style={labelStyle}>
            Your phone number <span className="text-ink-body/60 normal-case">(required)</span>
          </label>
          <input
            id="bk-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={fieldCls}
            style={fieldStyle}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-7">
        <div>
          <label htmlFor="bk-email" className={labelCls} style={labelStyle}>
            Email <span className="text-ink-body/60 normal-case">(optional)</span>
          </label>
          <input
            id="bk-email"
            name="email"
            type="email"
            autoComplete="email"
            className={fieldCls}
            style={fieldStyle}
          />
        </div>
        <div>
          <span className={labelCls} style={labelStyle}>
            Preferred way to be reached
          </span>
          <div className="flex flex-wrap gap-4 pt-2">
            {["Call", "Text", "Either"].map((opt, i) => (
              <label
                key={opt}
                className="font-manrope text-ink-body flex items-center gap-2 cursor-pointer"
                style={{ fontSize: 16 }}
              >
                <input
                  type="radio"
                  name="preferred"
                  value={opt}
                  defaultChecked={i === 2}
                  className="accent-mint"
                />
                {opt}
              </label>
            ))}
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="bk-windows" className={labelCls} style={labelStyle}>
          Three time windows that would work in the next two weeks
        </label>
        <input
          id="bk-windows"
          name="windows"
          type="text"
          placeholder="e.g. Tuesday mornings, Thursday afternoons, Saturday before noon"
          className={fieldCls}
          style={fieldStyle}
        />
      </div>

      <div>
        <label htmlFor="bk-notes" className={labelCls} style={labelStyle}>
          Anything you would like Toya to know in advance
        </label>
        <textarea
          id="bk-notes"
          name="notes"
          rows={5}
          maxLength={5000}
          className={fieldCls}
          style={fieldStyle}
        />
      </div>

      {/* Honeypot — bots fill this; humans don't see it */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="sr-only"
        style={{ position: "absolute", left: -9999, top: -9999, width: 1, height: 1, opacity: 0 }}
      />

      {/* Submit pill */}
      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-mint rounded-pill font-clash uppercase text-black transition-[filter] duration-150 hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
          style={{
            width: 240,
            height: 56,
            fontSize: 16,
            letterSpacing: "0.9px",
            fontWeight: 500,
          }}
        >
          {status === "submitting" ? "Sending…" : "Send request"}
        </button>
        <a
          href="tel:9852786087"
          className="font-clash text-ink-body uppercase transition-colors duration-150 hover:text-mint"
          style={{ fontSize: 14, letterSpacing: "0.8px", fontWeight: 400 }}
        >
          Or just call (985) 278-6087
        </a>
      </div>

      {status === "error" ? (
        <p
          role="alert"
          className="font-manrope text-ink-deep bg-rose/20 border-l-4 border-rose pl-4 py-3"
          style={{ fontSize: 15, lineHeight: 1.5 }}
        >
          {errorMsg}
        </p>
      ) : null}

      <p
        className="font-manrope text-ink-body/70 [word-break:break-word]"
        style={{ fontSize: 13, lineHeight: 1.5 }}
      >
        We will use your details to reach back about your appointment. We do not share or sell your information. See{" "}
        <a href="/privacy" className="underline hover:text-mint transition-colors">
          our privacy policy
        </a>{" "}
        for full detail.
      </p>
    </form>
  );
}
