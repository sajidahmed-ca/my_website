import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  /** Intrinsic ratio (height / width). Defaults to square. */
  ratio?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Inner wrapper padding — artwork never touches the frame edge. */
  inset?: "none" | "sm" | "md" | "lg";
};

const insets = {
  none: "p-0",
  sm: "p-3 sm:p-4",
  md: "p-5 sm:p-7",
  lg: "p-8 sm:p-10",
} as const;

/**
 * Presents a sticker illustration.
 *
 * Every asset already carries its own white die-cut border and transparent
 * corners, so it is always rendered with `object-contain` — nothing important
 * is ever cropped, and transparency is preserved.
 */
export function StickerArt({
  src,
  alt,
  ratio = 1,
  priority = false,
  sizes = "(min-width: 1280px) 22rem, (min-width: 768px) 30vw, 45vw",
  className,
  inset = "md",
}: Props) {
  const width = 1200;
  const height = Math.round(1200 * ratio);

  return (
    <div className={cn("relative flex items-center justify-center", insets[inset], className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        sizes={sizes}
        className="art-contain h-auto w-full max-w-full select-none"
        draggable={false}
      />
    </div>
  );
}