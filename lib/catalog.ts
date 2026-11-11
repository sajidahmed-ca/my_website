import { productBySlug } from "@/data/products";
import { stickerBySlug } from "@/data/stickers";

/**
 * A single "buyable item" shape so the cart can hold both individual artworks
 * and packs without the UI needing to know which it is holding.
 */
export type BuyableItem = {
  slug: string;
  name: string;
  /** Small label: the product format, or the sticker format. */
  variant: string;
  price: number;
  image: string;
  href: string;
};

const fromProduct = (slug: string): BuyableItem | undefined => {
  const product = productBySlug.get(slug);
  if (!product) return undefined;
  const art = product.stickers[0];
  return {
    slug: product.slug,
    name: product.name,
    variant: product.format,
    price: product.price,
    image: art ? (stickerBySlug.get(art)?.image ?? "/artwork/street-duo.svg") : "/artwork/street-duo.svg",
    href: `/shop/${product.slug}`,
  };
};

const fromSticker = (slug: string): BuyableItem | undefined => {
  const sticker = stickerBySlug.get(slug);
  if (!sticker) return undefined;
  return {
    slug: sticker.slug,
    name: sticker.title,
    variant: sticker.type,
    price: sticker.price,
    image: sticker.image,
    href: `/stickers/${sticker.slug}`,
  };
};

/** Products win if a slug ever collides with a sticker. */
export const getBuyable = (slug: string): BuyableItem | undefined => fromProduct(slug) ?? fromSticker(slug);

export const isBuyable = (slug: string): boolean => getBuyable(slug) !== undefined;