"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { STICKER_CATEGORIES, type Sticker, type StickerCategory } from "@/data/types";
import { StickerGrid } from "@/components/stickers/StickerGrid";
import { cn } from "@/lib/cn";

type Props = {
  stickers: Sticker[];
  collections: { slug: string; title: string }[];
};

/** Category + collection filtering. State lives in the URL-free client island so
 *  the server can still render the full grid for crawlers and no-JS users. */
export function StickerBrowser({ stickers, collections }: Props) {
  const [category, setCategory] = useState<StickerCategory>("All");
  const [collection, setCollection] = useState<string>("All");
  const [format, setFormat] = useState<string>("All");
  const [sort, setSort] = useState<"featured" | "az" | "za" | "price-asc" | "price-desc">("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const formats = useMemo(
    () => ["All", ...Array.from(new Set(stickers.map((sticker) => sticker.type)))],
    [stickers],
  );

  const visible = useMemo(() => {
    const filtered = stickers.filter((sticker) => {
      if (category !== "All" && sticker.category !== category) return false;
      if (collection !== "All" && sticker.collection !== collection) return false;
      if (format !== "All" && sticker.type !== format) return false;
      return true;
    });

    const sorted = [...filtered];
    if (sort === "az") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "za") sorted.sort((a, b) => b.title.localeCompare(a.title));
    else if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title));

    return sorted;
  }, [stickers, category, collection, format, sort]);

  const reset = () => {
    setCategory("All");
    setCollection("All");
    setFormat("All");
    setSort("featured");
  };

  const dirty = category !== "All" || collection !== "All" || format !== "All";

  return (
    <div className="shell pb-4">
      {/* Category chips — always visible, the primary way people browse. */}
      <div className="flex flex-wrap items-center gap-2">
        {STICKER_CATEGORIES.map((option) => {
          const active = option === category;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setCategory(option)}
              aria-pressed={active}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-[background-color,color,border-color] duration-300",
                active
                  ? "border-ink bg-ink text-canvas"
                  : "border-line bg-surface text-ink-soft hover:border-ink/25 hover:text-ink",
              )}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-y border-line py-3">
        <p className="text-sm text-ink-muted" aria-live="polite">
          <span className="font-medium text-ink tabular-nums">{visible.length}</span>{" "}
          {visible.length === 1 ? "sticker" : "stickers"}
        </p>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setFiltersOpen((open) => !open)}
            aria-expanded={filtersOpen}
            aria-controls="sticker-filters"
            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-ink transition-colors hover:border-ink/25 lg:hidden"
          >
            <SlidersHorizontal aria-hidden className="size-4" />
            Filters
          </button>

          <label className="flex items-center gap-2 text-sm text-ink-muted">
            <span className="sr-only sm:not-sr-only">Sort</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as typeof sort)}
              className="rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-ink outline-none transition-colors hover:border-ink/25 focus-visible:ring-2 focus-visible:ring-accent/40"
            >
              <option value="featured">Featured</option>
              <option value="az">A → Z</option>
              <option value="za">Z → A</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
        </div>
      </div>

      <div
        id="sticker-filters"
        className={cn("flex-col gap-5 pt-5 lg:flex lg:flex-row lg:gap-10", filtersOpen ? "flex" : "hidden")}
      >
        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Collection</legend>
          <div className="flex flex-wrap gap-2">
            {[{ slug: "All", title: "All collections" }, ...collections].map((option) => (
              <button
                key={option.slug}
                type="button"
                onClick={() => setCollection(option.slug)}
                aria-pressed={option.slug === collection}
                className={cn(
                  "rounded-xl border px-3 py-1.5 text-sm transition-colors",
                  option.slug === collection
                    ? "border-accent bg-accent-tint text-accent"
                    : "border-line bg-surface text-ink-soft hover:border-ink/25 hover:text-ink",
                )}
              >
                {option.title}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-2">
          <legend className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Format</legend>
          <div className="flex flex-wrap gap-2">
            {formats.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setFormat(option)}
                aria-pressed={option === format}
                className={cn(
                  "rounded-xl border px-3 py-1.5 text-sm transition-colors",
                  option === format
                    ? "border-teal bg-teal-tint text-teal"
                    : "border-line bg-surface text-ink-soft hover:border-ink/25 hover:text-ink",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </fieldset>

        {dirty ? (
          <button
            type="button"
            onClick={reset}
            className="self-start text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent lg:ml-auto"
          >
            Clear all filters
          </button>
        ) : null}
      </div>

      <div className="mt-8">
        {visible.length > 0 ? (
          <StickerGrid
            key={`${category}-${collection}-${format}-${sort}`}
            stickers={visible}
            priorityCount={4}
            sizes="(min-width: 1280px) 19rem, (min-width: 768px) 28vw, 45vw"
          />
        ) : (
          <div className="rounded-card border border-dashed border-line px-6 py-20 text-center">
            <p className="font-display text-xl font-semibold tracking-tight">No stickers match those filters</p>
            <p className="mt-2 text-sm text-ink-soft">Try a different combination, or clear everything and start again.</p>
            <button
              type="button"
              onClick={reset}
              className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}