/**
 * NumberedSteps — reusable How-it-works primitive.
 *
 * Reuses the soft-skill / editorial-luxury archetype loaded in F3.1:
 *  - oversized Spectral number index (no badge chrome, no circle outline)
 *  - Spectral step title
 *  - Manrope body
 *  - hairline divider between steps (matches Accordion + footer outline)
 *
 * Backgrounds (cream vs dark) are managed by the calling page via the surface prop so
 * /services/[slug] can alternate band tones per the spec.
 */
export type Step = { title: string; body: string };

export default function NumberedSteps({
  steps,
  leadIn,
  surface = "cream",
}: {
  steps: Step[];
  leadIn?: string;
  surface?: "cream" | "dark";
}) {
  const isDark = surface === "dark";
  const titleColor = isDark ? "text-white" : "text-ink-h2";
  const bodyColor = isDark ? "text-white/80" : "text-ink-body";
  const numberColor = isDark ? "text-mint" : "text-mint";
  const dividerColor = isDark ? "border-white/15" : "border-ink-body/15";

  return (
    <div>
      {leadIn ? (
        <p
          className={`font-manrope mb-12 md:mb-16 ${bodyColor} [word-break:break-word]`}
          style={{
            fontSize: "clamp(17px, 1.5vw, 21px)",
            lineHeight: 1.55,
            letterSpacing: "-0.2px",
            fontWeight: 400,
            maxWidth: 820,
          }}
        >
          {leadIn}
        </p>
      ) : null}
      <ol className={`border-t ${dividerColor}`}>
        {steps.map((s, i) => (
          <li
            key={i}
            className={`grid md:grid-cols-[180px_1fr] gap-6 md:gap-12 py-8 md:py-12 border-b ${dividerColor}`}
          >
            <div
              className={`font-spectral ${numberColor}`}
              style={{
                fontSize: "clamp(64px, 7vw, 100px)",
                lineHeight: 0.9,
                letterSpacing: "-3px",
                fontWeight: 400,
              }}
              aria-hidden
            >
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <h3
                className={`font-spectral mb-4 ${titleColor} [word-break:break-word]`}
                style={{
                  fontSize: "clamp(26px, 2.6vw, 36px)",
                  lineHeight: 1.15,
                  letterSpacing: "-1px",
                  fontWeight: 400,
                }}
              >
                {s.title}
              </h3>
              <p
                className={`font-manrope ${bodyColor} [word-break:break-word]`}
                style={{
                  fontSize: "clamp(16px, 1.2vw, 18px)",
                  lineHeight: 1.65,
                  letterSpacing: "-0.2px",
                  fontWeight: 400,
                  maxWidth: 820,
                }}
              >
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
