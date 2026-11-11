import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Sticker } from "@/data/types";
import { formatPrice } from "@/data/site";
import { collectionBySlug } from "@/data/collections";
import { StickerArt } from "@/components/ui/StickerArt";
import { cn } from "@/lib/cn";

type Props = {
  sticker: Sticker;
  /** `sheet` reads as a collectible sheet; `flat` is denser for filters. */
  variant?: "sheet" | "flat";
  priority?: boolean;
  sizes?: string;
  className?: string;
};

export function StickerCard({
  sticker,
  variant = "sheet",
  priority = false,
  sizes,
  className,
}: Props) {
  const collection = collectionBySlug.get(sticker.collection);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-tile border border-line bg-surface transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        "hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift",
        "motion-reduce:hover:translate-y-0",
        variant === "flat" ? "rounded-card" : "",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex flex-1 items-center justify-center overflow-hidden bg-surface-sunk paper-grain transition-colors duration-500 group-hover:bg-canvas-deep",
          variant === "flat" ? "p-4" : "p-6 sm:p-7",
        )}
        style={{ aspectRatio: `1 / ${sticker.ratio}` }}
      >
        <div className="h-full w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.045] motion-reduce:group-hover:scale-100">
          <StickerArt
            src={sticker.image}
            alt={sticker.alt}
            ratio={sticker.ratio}
            priority={priority}
            sizes={sizes ?? "(min-width: 1280px) 20rem, (min-width: 768px) 30vw, 45vw"}
            inset="none"
            className="h-full w-full"
          />
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-4 flex justify-center opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:opacity-100 motion-reduce:opacity-100"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink/90 px-3.5 py-1.5 text-xs font-medium text-canvas backdrop-blur-sm">
            View artwork
            <ArrowUpRight className="size-3.5" />
          </span>
        </span>
      </div>

      <div className={cn("border-t border-line", variant === "flat" ? "p-4" : "p-5")}>
        <h3 className="font-display text-[1.0625rem] font-semibold tracking-[-0.025em] text-ink">
          {sticker.title}
        </h3>
        <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-ink-muted">
          {collection ? (
            <Link
              href={`/collections/${collection.slug}`}
              className="relative z-10 rounded-full border border-line px-2 py-1 font-medium text-ink-soft transition-colors hover:border-accent hover:text-accent"
            >
              {collection.title}
            </Link>
          ) : null}
          <span>{sticker.type}</span>
          <span aria-hidden className="size-1 rounded-full bg-ink-faint" />
          <span className="tabular-nums">{formatPrice(sticker.price)}</span>
        </div>
      </div>

      {/* Stretched link keeps the whole card clickable without nesting anchors. */}
      <Link href={`/stickers/${sticker.slug}`} className="absolute inset-0 z-0 rounded-tile" aria-label={sticker.title}>
        <span className="sr-only">View {sticker.title}</span>
      </Link>
    </article>
  );
}