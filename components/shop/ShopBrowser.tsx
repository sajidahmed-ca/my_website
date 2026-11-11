"use client";

import { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { PRODUCT_FORMATS, type Product } from "@/data/types";
import { shopNotice } from "@/data/site";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { cn } from "@/lib/cn";

const AVAILABILITIES = ["All", "In stock", "Low stock", "Made to order", "Sold out"] as const;

type AvailabilityFilter = (typeof AVAILABILITIES)[number];

type Props = {
  products: Product[];
};

/** Format + availability filtering, plus an honest notice about checkout. */
export function ShopBrowser({ products }: Props) {
  const [format, setFormat] = useState<string>("All");
  const [availability, setAvailability] = useState<AvailabilityFilter>("All");

  const visible = useMemo(
    () =>
      products.filter((product) => {
        if (format !== "All" && product.format !== format) return false;
        if (availability !== "All" && product.availability !== availability) return false;
        return true;
      }),
    [products, format, availability],
  );

  const dirty = format !== "All" || availability !== "All";

  return (
    <div className="shell pb-4">
      <div className="flex flex-col gap-5 border-y border-line py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Format</span>
          {["All", ...PRODUCT_FORMATS].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setFormat(option)}
              aria-pressed={option === format}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                option === format
                  ? "border-ink bg-ink text-canvas"
                  : "border-line bg-surface text-ink-soft hover:border-ink/25 hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Status</span>
          {AVAILABILITIES.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setAvailability(option)}
              aria-pressed={option === availability}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-sm transition-colors",
                option === availability
                  ? "border-accent bg-accent-tint text-accent"
                  : "border-line bg-surface text-ink-soft hover:border-ink/25 hover:text-ink",
              )}
            >
              {option}
            </button>
          ))}

          {dirty ? (
            <button
              type="button"
              onClick={() => {
                setFormat("All");
                setAvailability("All");
              }}
              className="ml-1 text-sm font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              Clear
            </button>
          ) : null}
        </div>
      </div>

      <aside className="mt-8 flex items-start gap-3 rounded-card border border-mustard/30 bg-mustard-tint p-5">
        <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-mustard" />
        <div>
          <h2 className="font-display text-[0.9375rem] font-semibold tracking-tight">{shopNotice.title}</h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{shopNotice.body}</p>
        </div>
      </aside>

      <p className="mt-8 text-sm text-ink-muted" aria-live="polite">
        <span className="font-medium text-ink tabular-nums">{visible.length}</span>{" "}
        {visible.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-5">
        {visible.length > 0 ? (
          <ProductGrid products={visible} priorityCount={3} />
        ) : (
          <div className="rounded-card border border-dashed border-line px-6 py-20 text-center">
            <p className="font-display text-xl font-semibold tracking-tight">Nothing matches those filters</p>
            <button
              type="button"
              onClick={() => {
                setFormat("All");
                setAvailability("All");
              }}
              className="mt-5 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-canvas transition-colors hover:bg-ink-soft"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}