/** Shared content types. Every collection/product/post references stickers by slug. */

export const STICKER_CATEGORIES = [
  "All",
  "City",
  "Travel",
  "Culture",
  "Landmarks",
  "Characters",
  "Lifestyle",
  "Special",
] as const;

export type StickerCategory = (typeof STICKER_CATEGORIES)[number];
export type StickerCategoryFilter = StickerCategory;

export type StickerFormat = "Vinyl sticker" | "Digital PNG" | "Holographic vinyl" | "Foil vinyl";

export type Sticker = {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: Exclude<StickerCategory, "All">;
  /** Slug of the owning collection in `data/collections.ts`. */
  collection: string;
  image: string;
  alt: string;
  tags: string[];
  featured: boolean;
  /** Base price in USD. */
  price: number;
  type: StickerFormat;
  /** Height / width ratio of the source file, used for masonry layout. */
  ratio: number;
  colors: [string, string, string];
};

export type Collection = {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  coverImage: string;
  alt: string;
  stickerIds: string[];
  accent: "accent" | "teal" | "sage" | "mustard" | "plum";
};

export const PRODUCT_FORMATS = [
  "Sticker Packs",
  "Individual Stickers",
  "Digital Downloads",
  "Limited Editions",
] as const;

export type ProductFormat = (typeof PRODUCT_FORMATS)[number];

export type Availability = "In stock" | "Low stock" | "Made to order" | "Sold out";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  format: ProductFormat;
  availability: Availability;
  /** Stickers included, by slug. Rendered as the product gallery. */
  stickers: string[];
  badge?: string;
  details: { label: string; value: string }[];
};

export const JOURNAL_CATEGORIES = [
  "Behind the Artwork",
  "Creative Process",
  "New Collections",
  "Stories",
  "Design Notes",
] as const;

export type JournalCategory = (typeof JOURNAL_CATEGORIES)[number];

export type ArticleBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "artwork"; stickerSlug: string; caption: string };

export type JournalPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: JournalCategory;
  date: string;
  readTime: number;
  image: string;
  alt: string;
  related: string[];
  body: ArticleBlock[];
};

export type NavItem = { label: string; href: string };

/** Numbered step used by the process sections. `id` is display text ("01"). */
export type ProcessStep = { id: string; title: string; body: string };

export type InquiryType =
  | "Custom Stickers"
  | "Brand Collaboration"
  | "Commercial Project"
  | "Licensing"
  | "General Question";