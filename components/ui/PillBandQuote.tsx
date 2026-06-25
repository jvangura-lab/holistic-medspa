import Image from "next/image";

/**
 * PillBandQuote — DS pattern reuse of the home Sessions/Treatments/Services pill bands.
 *
 * Renders a rounded-pill (50px) image-band card with dark scrim and Spectral quote text
 * overlay. Matches the home StickyStack vocabulary exactly (radius / scrim / typography).
 *
 * Used on subpages between text sections to break flow with design-system imagery
 * instead of plain prose blocks.
 */
export default function PillBandQuote({
  src,
  alt = "",
  quote,
  attribution,
  scrimOpacity = 0.6,
  bg = "bg-black",
  textColor = "text-white",
  minHeight = 320,
}: {
  src: string;
  alt?: string;
  quote: string;
  attribution?: string;
  scrimOpacity?: number;
  bg?: string;
  textColor?: string;
  minHeight?: number;
}) {
  return (
    <div className="mx-auto w-full max-w-[1300px] px-5 md:px-0">
      <figure
        className="relative overflow-hidden rounded-pill"
        style={{ minHeight }}
      >
        <div className={`absolute inset-0 ${bg}`} />
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1300px) 100vw, 1300px"
          className="object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `rgba(0,0,0,${scrimOpacity})` }}
        />
        <div className="relative h-full flex flex-col justify-center items-start px-8 md:px-20 py-16 md:py-20">
          <blockquote
            className={`font-spectral ${textColor} max-w-[820px] [word-break:break-word]`}
            style={{
              fontSize: "clamp(28px, 3.6vw, 48px)",
              lineHeight: 1.15,
              letterSpacing: "-1.6px",
              fontWeight: 400,
            }}
          >
            <p>{quote}</p>
          </blockquote>
          {attribution ? (
            <figcaption
              className={`font-clash ${textColor}/80 uppercase mt-6`}
              style={{ fontSize: 13, letterSpacing: "0.7px", fontWeight: 500 }}
            >
              {attribution}
            </figcaption>
          ) : null}
        </div>
      </figure>
    </div>
  );
}
