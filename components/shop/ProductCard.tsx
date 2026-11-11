import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { Product } from "@/data/types";
import { formatPrice } from "@/data/site";
import { stickerBySlug } from "@/data/stickers";
import { StickerArt } from "@/components/ui/StickerArt";
import { cn } from "@/lib/cn";

const availabilityTone: Record<Product["availability"], string> = {
  "In stock": "bg-teal-tint text-teal border-teal/25",
  "Low stock": "bg-mustard-tint text-mustard border-mustard/30",
  "Made to order": "bg-plum-tint text-plum border-plum/25",
  "Sold out": "bg-canvas-deep text-ink-muted border-line",
};

type Props = {
  product: Product;
  priority?: boolean;
  className?: string;
};

export function ProductCard({ product, priority = false, className }: Props) {
  const hero = stickerBySlug.get(product.stickers[0]);
  const soldOut = product.availability === "Sold out";

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        "hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      <div className="relative flex items-center justify-center overflow-hidden bg-surface-sunk paper-grain p-7 transition-colors duration-500 group-hover:bg-canvas-deep">
        <div className="h-40 w-40 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06] motion-reduce:group-hover:scale-100">
          <StickerArt
            src={hero?.image ?? "/artwork/street-duo.svg"}
            alt={hero?.alt ?? product.name}
            priority={priority}
            inset="none"
            className="h-full w-full"
            sizes="(min-width: 1024px) 12rem, 40vw"
          />
        </div>

        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full border border-line bg-surface/90 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-ink-soft backdrop-blur-sm">
            {product.badge}
          </span>
        ) : null}

        <span
          className={cn(
            "absolute bottom-4 right-4 rounded-full border px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.12em]",
            availabilityTone[product.availability],
          )}
        >
          {product.availability}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 border-t border-line p-5">
        <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-ink-muted">
          {product.format}
        </p>
        <h3 className="font-display text-lg font-semibold tracking-[-0.025em]">{product.name}</h3>
        <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>
        <p className="mt-3 font-display text-xl font-semibold tabular-nums tracking-tight">
          {formatPrice(product.price)}
        </p>
        <span
          className={cn(
            "mt-2 inline-flex items-center gap-1 text-sm font-medium",
            soldOut ? "text-ink-muted" : "text-ink",
          )}
        >
          {soldOut ? "Currently unavailable" : "View product"}
          <ArrowUpRight aria-hidden className="size-3.5" />
        </span>
      </div>

      <Link href={`/shop/${product.slug}`} className="absolute inset-0 rounded-card" aria-label={product.name}>
        <span className="sr-only">View {product.name}</span>
      </Link>
    </article>
  );
}