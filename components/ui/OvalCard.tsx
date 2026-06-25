import Image from "next/image";

/**
 * OvalCard — DS pattern reuse of the home Hero ellipse portrait
 * (rounded-ellipse + 10px dusty-rose border + cream backdrop).
 *
 * Used on subpages to introduce imagery in the design-system vocabulary instead of
 * default "caption + image-next-to-it" layouts.
 *
 * width / height defaults match the home Hero ellipse (559×335). Override per slot.
 */
export default function OvalCard({
  src,
  alt = "",
  width = 559,
  height = 335,
  caption,
  className = "",
  priority = false,
  borderColor = "border-rose",
}: {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  caption?: string;
  className?: string;
  priority?: boolean;
  borderColor?: string;
}) {
  return (
    <figure className={`relative ${className}`} style={{ width: "100%", maxWidth: width }}>
      <div
        className={`relative overflow-hidden rounded-ellipse border-[10px] border-solid ${borderColor} bg-cream`}
        style={{ aspectRatio: `${width} / ${height}` }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={`(max-width: 768px) 100vw, ${width}px`}
          priority={priority}
          className="object-cover"
        />
      </div>
      {caption ? (
        <figcaption
          className="font-clash text-ink-body/70 uppercase mt-4 text-center"
          style={{ fontSize: 12, letterSpacing: "0.7px", fontWeight: 500 }}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
