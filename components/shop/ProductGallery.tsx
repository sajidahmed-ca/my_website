"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Sticker } from "@/data/types";
import { cn } from "@/lib/cn";

type Props = {
  stickers: Sticker[];
  productName: string;
  className?: string;
};

/** Primary image plus a thumbnail rail that responds to arrow keys. */
export function ProductGallery({ stickers, productName, className }: Props) {
  const [index, setIndex] = useState(0);
  const active = stickers[index] ?? stickers[0];
  if (!active) return null;

  const go = (next: number) => setIndex((next + stickers.length) % stickers.length);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="relative aspect-square overflow-hidden rounded-tile border border-line bg-surface-sunk paper-grain">
        <Image
          key={active.image}
          src={active.image}
          alt={active.alt || `${productName} artwork`}
          fill
          sizes="(min-width: 1024px) 34rem, 92vw"
          className="animate-fade-in object-contain p-8 sm:p-14"
          priority
        />

        {stickers.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label={`Previous artwork in ${productName}`}
              className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-canvas"
            >
              <ChevronLeft aria-hidden className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label={`Next artwork in ${productName}`}
              className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface/90 text-ink backdrop-blur-sm transition-colors hover:bg-ink hover:text-canvas"
            >
              <ChevronRight aria-hidden className="size-5" />
            </button>
          </>
        ) : null}

        <p className="pointer-events-none absolute bottom-3 right-4 text-xs tabular-nums text-ink-faint">
          {index + 1} / {stickers.length}
        </p>
      </div>

      {stickers.length > 1 ? (
        <ul
          className="grid grid-cols-5 gap-2 sm:grid-cols-6"
          role="group"
          aria-label={`${productName} artwork images`}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") {
              event.preventDefault();
              go(index + 1);
            }
            if (event.key === "ArrowLeft") {
              event.preventDefault();
              go(index - 1);
            }
          }}
        >
          {stickers.map((sticker, thumbIndex) => {
            const selected = thumbIndex === index;
            return (
              <li key={sticker.image}>
                <button
                  type="button"
                  onClick={() => go(thumbIndex)}
                  aria-label={`Show ${sticker.title}`}
                  aria-current={selected}
                  className={cn(
                    "relative block aspect-square w-full overflow-hidden rounded-2xl border bg-surface-sunk transition-[border-color,transform] duration-300",
                    selected ? "border-ink" : "border-line hover:border-ink/30",
                  )}
                >
                  <Image
                    src={sticker.image}
                    alt=""
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}