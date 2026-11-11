"use client";

import { collections } from "@/data/collections";
import { journalPosts } from "@/data/journal";
import { stickers } from "@/data/stickers";
import { products } from "@/data/products";
import { StickerArt } from "@/components/ui/StickerArt";
import { cn } from "@/lib/cn";

export type SearchDoc =
  | { kind: "Sticker"; title: string; subtitle: string; href: string; image: string; keywords: string }
  | { kind: "Collection"; title: string; subtitle: string; href: string; image: string; keywords: string }
  | { kind: "Product"; title: string; subtitle: string; href: string; image: string; keywords: string }
  | { kind: "Journal"; title: string; subtitle: string; href: string; image: string; keywords: string };

/** Client-side index built from local data — no API, no external feed. */
export const searchIndex: SearchDoc[] = [
  ...stickers.map((sticker) => ({
    kind: "Sticker" as const,
    title: sticker.title,
    subtitle: `${sticker.category} · ${sticker.collection.replace(/-/g, " ")}`,
    href: `/stickers/${sticker.slug}`,
    image: sticker.image,
    keywords: `${sticker.title} ${sticker.description} ${sticker.tags.join(" ")} ${sticker.category}`,
  })),
  ...collections.map((collection) => ({
    kind: "Collection" as const,
    title: collection.title,
    subtitle: `${collection.stickerIds.length} artworks · ${collection.tagline}`,
    href: `/collections/${collection.slug}`,
    image: collection.coverImage,
    keywords: `${collection.title} ${collection.tagline} ${collection.description}`,
  })),
  ...products.map((product) => ({
    kind: "Product" as const,
    title: product.name,
    subtitle: product.format,
    href: `/shop/${product.slug}`,
    image: `/artwork/${product.stickers[0]}.svg`,
    keywords: `${product.name} ${product.description} ${product.format}`,
  })),
  ...journalPosts.map((post) => ({
    kind: "Journal" as const,
    title: post.title,
    subtitle: post.category,
    href: `/journal/${post.slug}`,
    image: post.image,
    keywords: `${post.title} ${post.excerpt} ${post.category}`,
  })),
];

export function searchDocs(query: string, limit = 8): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];

  return searchIndex
    .map((doc) => {
      const title = doc.title.toLowerCase();
      const haystack = `${title} ${doc.keywords.toLowerCase()} ${doc.subtitle.toLowerCase()}`;
      if (!haystack.includes(q)) return null;
      let score = 0;
      if (title === q) score += 100;
      if (title.startsWith(q)) score += 50;
      if (title.includes(q)) score += 25;
      if (doc.kind === "Sticker") score += 4;
      return { doc, score };
    })
    .filter((entry): entry is { doc: SearchDoc; score: number } => entry !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.doc);
}

export const SearchResultPreview = ({ doc, className }: { doc: SearchDoc; className?: string }) => (
  <span className={cn("grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-surface-sunk p-1", className)}>
    <StickerArt src={doc.image} alt="" inset="none" className="h-full w-full" sizes="44px" />
  </span>
);