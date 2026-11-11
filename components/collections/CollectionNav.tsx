import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Collection } from "@/data/types";
import { StickerArt } from "@/components/ui/StickerArt";

type Props = {
  previous?: Collection;
  next?: Collection;
};

/** Previous / next collection navigation, shown at the foot of a collection. */
export function CollectionNav({ previous, next }: Props) {
  if (!previous && !next) return null;

  return (
    <nav aria-label="Collection navigation" className="grid gap-4 sm:grid-cols-2">
      {previous ? (
        <Link
          href={`/collections/${previous.slug}`}
          className="group flex items-center gap-4 rounded-card border border-line bg-surface p-4 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-sheet"
        >
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl border border-line bg-surface-sunk p-1">
            <StickerArt src={previous.coverImage} alt="" inset="none" className="h-full w-full" sizes="64px" />
          </span>
          <span className="min-w-0">
            <span className="flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
              <ArrowLeft
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1"
              />
              Previous
            </span>
            <span className="mt-1 block truncate font-display text-lg font-semibold tracking-tight">
              {previous.title}
            </span>
          </span>
        </Link>
      ) : (
        <span aria-hidden className="hidden sm:block" />
      )}

      {next ? (
        <Link
          href={`/collections/${next.slug}`}
          className="group flex items-center justify-end gap-4 rounded-card border border-line bg-surface p-4 text-right transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-sheet"
        >
          <span className="min-w-0">
            <span className="flex items-center justify-end gap-1.5 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
              Next
              <ArrowRight
                aria-hidden
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              />
            </span>
            <span className="mt-1 block truncate font-display text-lg font-semibold tracking-tight">{next.title}</span>
          </span>
          <span className="grid size-16 shrink-0 place-items-center rounded-2xl border border-line bg-surface-sunk p-1">
            <StickerArt src={next.coverImage} alt="" inset="none" className="h-full w-full" sizes="64px" />
          </span>
        </Link>
      ) : null}
    </nav>
  );
}