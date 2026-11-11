import { collections, collectionBySlug } from "@/data/collections";
import { stickerBySlug, stickers } from "@/data/stickers";
import { productBySlug, products } from "@/data/products";
import { journalBySlug, journalPosts } from "@/data/journal";
import { STICKER_CATEGORIES, type Product, type Sticker, type StickerCategory } from "@/data/types";

/* ------------------------------------------------------------- stickers --- */

export const allStickers = (): Sticker[] => stickers;

export const getSticker = (slug: string): Sticker | undefined => stickerBySlug.get(slug);

export const getFeaturedStickers = (limit = 6): Sticker[] => stickers.filter((s) => s.featured).slice(0, limit);

export const getStickersByCollection = (slug: string): Sticker[] => {
  const collection = collectionBySlug.get(slug);
  if (!collection) return [];
  return collection.stickerIds.map((id) => stickerBySlug.get(id)).filter((s): s is Sticker => Boolean(s));
};

export const getStickersByCategory = (category: StickerCategory): Sticker[] =>
  category === "All" ? stickers : stickers.filter((s) => s.category === category);

/** Sticker → product cross references, used by the sticker detail page. */
export const getProductsForSticker = (slug: string): Product[] =>
  products.filter((product) => product.stickers.includes(slug));

/**
 * Related stickers: same collection first, then shared category, never the
 * sticker itself. Deterministic so server and client render identically.
 */
export const getRelatedStickers = (slug: string, limit = 4): Sticker[] => {
  const current = stickerBySlug.get(slug);
  if (!current) return [];

  const scored = stickers
    .filter((s) => s.slug !== slug)
    .map((s) => {
      let score = 0;
      if (s.collection === current.collection) score += 4;
      if (s.category === current.category) score += 2;
      score += s.tags.filter((tag) => current.tags.includes(tag)).length;
      return { sticker: s, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || a.sticker.id.localeCompare(b.sticker.id));

  const result = scored.slice(0, limit).map((entry) => entry.sticker);

  // Top up with anything left so the row is never short.
  if (result.length < limit) {
    for (const sticker of stickers) {
      if (result.length >= limit) break;
      if (sticker.slug !== slug && !result.some((r) => r.slug === sticker.slug)) result.push(sticker);
    }
  }
  return result;
};

export const searchStickers = (query: string): Sticker[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return stickers.filter((sticker) =>
    [sticker.title, sticker.description, sticker.category, ...sticker.tags]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
};

/* ---------------------------------------------------------- collections --- */

export const getCollection = (slug: string) => collectionBySlug.get(slug);

export const getCollectionNeighbours = (slug: string) => {
  const index = collections.findIndex((collection) => collection.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: collections[index - 1],
    next: collections[index + 1],
  };
};

export const collectionCount = (slug: string) => getStickersByCollection(slug).length;

/* -------------------------------------------------------------- product --- */

export const getProduct = (slug: string): Product | undefined => productBySlug.get(slug);

export const getProductsByFormat = (format: string): Product[] =>
  format === "All" ? products : products.filter((product) => product.format === format);

/** Similar products: overlapping sticker slugs first, then same format. */
export const getRelatedProducts = (slug: string, limit = 3): Product[] => {
  const current = productBySlug.get(slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const overlap = p.stickers.filter((s) => current.stickers.includes(s)).length;
      let score = overlap * 2;
      if (p.format === current.format) score += 1;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.product);
};

/* -------------------------------------------------------------- journal --- */

export const getJournalPost = (slug: string) => journalBySlug.get(slug);

export const getJournalByCategory = (category: string) =>
  category === "All" ? journalPosts : journalPosts.filter((post) => post.category === category);

export const getRelatedPosts = (slug: string, limit = 3) => {
  const current = journalBySlug.get(slug);
  if (!current) return [];
  return journalPosts
    .filter((post) => post.slug !== slug)
    .map((post) => ({ post, score: post.related.includes(slug) ? 1 : 0 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.post);
};

export { STICKER_CATEGORIES };