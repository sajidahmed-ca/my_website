import type { Product } from "./types";

/**
 * Catalogue for the shop UI.
 *
 * Prices and availability are local sample data. `AddToCartButton` writes to
 * the client cart in `components/cart/CartProvider.tsx`; nothing here talks to
 * a payment provider. To go live, create a Checkout session from the cart in
 * that provider's action — see the comment in `components/cart/CartDrawer.tsx`.
 */
export const products: Product[] = [
  {
    id: "p-01",
    slug: "new-york-sticker-pack",
    name: "New York Sticker Pack",
    description: "Eight die-cut vinyl stickers from the New York collection, printed on matte white stock.",
    price: 26,
    format: "Sticker Packs",
    availability: "In stock",
    stickers: ["nyc-skyline-at-dusk", "yellow-cab-on-the-block", "brooklyn-bridge-crossing", "hot-dog-cart"],
    badge: "Best seller",
    details: [
      { label: "Includes", value: "8 die-cut vinyl stickers" },
      { label: "Size", value: "60–80 mm tall" },
      { label: "Finish", value: "Matte, white border" },
      { label: "Ships", value: "3–5 working days" },
    ],
  },
  {
    id: "p-02",
    slug: "world-cities-sticker-pack",
    name: "World Cities Sticker Pack",
    description: "Seven cities drawn the same way so they sit side by side without arguing.",
    price: 24,
    format: "Sticker Packs",
    availability: "In stock",
    stickers: ["london-double-decker", "paris-eiffel", "tokyo-torii-gate", "santorini-blue-domes", "cappadocia-balloons"],
    details: [
      { label: "Includes", value: "7 die-cut vinyl stickers" },
      { label: "Size", value: "60–80 mm tall" },
      { label: "Finish", value: "Matte, white border" },
      { label: "Ships", value: "3–5 working days" },
    ],
  },
  {
    id: "p-03",
    slug: "south-asia-sticker-pack",
    name: "South Asia Sticker Pack",
    description: "Seven warm stickers: marble, marigolds, chai and a very green rickshaw.",
    price: 24,
    format: "Sticker Packs",
    availability: "Low stock",
    stickers: ["taj-mahal-morning", "auto-rickshaw", "masala-chai", "marigold-garland", "bazaar-lanterns"],
    badge: "Low stock",
    details: [
      { label: "Includes", value: "7 die-cut vinyl stickers" },
      { label: "Size", value: "60–80 mm tall" },
      { label: "Finish", value: "Matte, white border" },
      { label: "Ships", value: "3–5 working days" },
    ],
  },
  {
    id: "p-04",
    slug: "city-pack-sticker-sheet",
    name: "City Pack Sticker Sheet",
    description: "Twelve mini city designs printed together on one sheet. A whole collection in a single sticker.",
    price: 14,
    format: "Individual Stickers",
    availability: "In stock",
    stickers: ["city-pack-sticker-sheet"],
    badge: "One sticker",
    details: [
      { label: "Includes", value: "1 sheet sticker, 12 designs" },
      { label: "Size", value: "120 mm tall" },
      { label: "Finish", value: "Matte, white border" },
      { label: "Ships", value: "3–5 working days" },
    ],
  },
  {
    id: "p-05",
    slug: "yellow-cab-single-sticker",
    name: "Yellow Cab, Single Sticker",
    description: "One sticker from the New York collection, cut and packed on its own.",
    price: 3.75,
    format: "Individual Stickers",
    availability: "In stock",
    stickers: ["yellow-cab-on-the-block"],
    details: [
      { label: "Includes", value: "1 die-cut vinyl sticker" },
      { label: "Size", value: "70 mm tall" },
      { label: "Finish", value: "Matte, white border" },
      { label: "Ships", value: "3–5 working days" },
    ],
  },
  {
    id: "p-06",
    slug: "digital-artwork-library",
    name: "Digital Artwork Library",
    description: "Every illustration in the library as a high-resolution PNG with a transparent background.",
    price: 18,
    format: "Digital Downloads",
    availability: "In stock",
    stickers: ["nyc-skyline-at-dusk", "taj-mahal-morning", "morning-coffee"],
    badge: "Instant download",
    details: [
      { label: "Includes", value: "44 PNG files, transparent background" },
      { label: "Resolution", value: "3000 px, square" },
      { label: "Licence", value: "Personal use" },
      { label: "Delivery", value: "Download link on checkout" },
    ],
  },
  {
    id: "p-07",
    slug: "gold-foil-numbered-run",
    name: "Gold Foil, Numbered Run",
    description: "The metallic limited edition sticker, hand-numbered and packed while stock lasts.",
    price: 24,
    format: "Limited Editions",
    availability: "Made to order",
    stickers: ["gold-foil-limited-edition"],
    badge: "Numbered",
    details: [
      { label: "Includes", value: "1 foil vinyl sticker, numbered" },
      { label: "Size", value: "70 mm round" },
      { label: "Finish", value: "Metallic gold foil" },
      { label: "Ships", value: "7–10 working days" },
    ],
  },
  {
    id: "p-08",
    slug: "holographic-round-set",
    name: "Holographic Round Set",
    description: "Three holographic round stickers with different pastel finishes.",
    price: 19,
    format: "Limited Editions",
    availability: "Sold out",
    stickers: ["holo-new-year", "gold-foil-limited-edition", "street-duo"],
    badge: "Sold out",
    details: [
      { label: "Includes", value: "3 holographic round stickers" },
      { label: "Size", value: "55–70 mm" },
      { label: "Finish", value: "Holographic vinyl" },
      { label: "Restock", value: "Next run depends on demand" },
    ],
  },
];

export const productBySlug = new Map(products.map((product) => [product.slug, product]));