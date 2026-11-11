import type { Sticker } from "@/data/types";
import { StickerCard } from "./StickerCard";
import { cn } from "@/lib/cn";

type Props = {
  stickers: Sticker[];
  variant?: "sheet" | "flat";
  priorityCount?: number;
  className?: string;
  sizes?: string;
  /** `masonry` staggers tile heights; `grid` keeps them uniform. */
  layout?: "grid" | "masonry";
};

/**
 * Artwork grid. Default is a 2/3/4-column responsive grid; the masonry variant
 * offsets alternate rows to keep a collectible-sheet rhythm without clipping.
 */
export function StickerGrid({
  stickers,
  variant = "sheet",
  priorityCount = 0,
  className,
  sizes,
  layout = "grid",
}: Props) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4",
        layout === "masonry" && "md:auto-rows-auto",
        className,
      )}
    >
      {stickers.map((sticker, index) => (
        <StickerCard
          key={sticker.id}
          sticker={sticker}
          variant={variant}
          priority={index < priorityCount}
          sizes={sizes}
        />
      ))}
    </div>
  );
}