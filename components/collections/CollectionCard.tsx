import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Collection } from "@/data/types";
import { collectionCount } from "@/lib/content";
import { StickerArt } from "@/components/ui/StickerArt";
import { cn } from "@/lib/cn";

const accents = {
  accent: "group-hover:border-accent/40",
  teal: "group-hover:border-teal/40",
  sage: "group-hover:border-sage/50",
  mustard: "group-hover:border-mustard/50",
  plum: "group-hover:border-plum/40",
} as const;

type Props = {
  collection: Collection;
  size?: "lg" | "md";
  className?: string;
  priority?: boolean;
};

export function CollectionCard({ collection, size = "md", className, priority = false }: Props) {
  const count = collectionCount(collection.slug);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-tile border border-line bg-surface transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        "hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0",
        accents[collection.accent],
        className,
      )}
    >
      <div
        className={cn(
          "relative flex items-center justify-center overflow-hidden bg-surface-sunk paper-grain transition-colors duration-500 group-hover:bg-canvas-deep",
          size === "lg" ? "p-8 sm:p-12" : "p-6 sm:p-8",
        )}
        style={{ aspectRatio: size === "lg" ? "16 / 11" : "4 / 3" }}
      >
        <div className="h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] motion-reduce:group-hover:scale-100">
          <StickerArt
            src={collection.coverImage}
            alt={collection.alt}
            priority={priority}
            inset="none"
            className="h-full w-full"
            sizes={size === "lg" ? "(min-width: 1024px) 42rem, 92vw" : "(min-width: 1024px) 26rem, 92vw"}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 border-t border-line p-5 sm:p-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3
            className={cn(
              "font-display font-semibold tracking-[-0.03em]",
              size === "lg" ? "text-2xl sm:text-3xl" : "text-xl",
            )}
          >
            {collection.title}
          </h3>
          <span className="shrink-0 text-xs tabular-nums text-ink-muted">
            {String(count).padStart(2, "0")} works
          </span>
        </div>
        <p className="text-sm leading-relaxed text-ink-soft">{collection.tagline}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Explore
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)] group-hover:translate-x-1"
          />
        </span>
      </div>

      <Link
        href={`/collections/${collection.slug}`}
        className="absolute inset-0 z-0 rounded-tile"
        aria-label={`Explore the ${collection.title} collection`}
      >
        <span className="sr-only">Explore {collection.title}</span>
      </Link>
    </article>
  );
}