import type { NavItem } from "./types";

/**
 * Single source of truth for brand, SEO and navigation.
 * `NEXT_PUBLIC_SITE_URL` overrides the canonical origin in any environment.
 */
const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://sajidahmed.studio";

export const site = {
  name: "Sajid Ahmed",
  role: "Illustrator & Sticker Artist",
  wordmark: "SAJID",
  url: origin,
  locale: "en_US",
  title: "Sajid Ahmed — Illustrated City & Culture Stickers",
  shortDescription:
    "Cute illustrated stickers inspired by cities, landmarks, culture, travel, people and everyday moments.",
  description:
    "Explore illustrated stickers by Sajid Ahmed — playful visual stories inspired by cities, culture, travel, people and everyday life.",
  email: "hello@sajidahmed.studio",
  location: "Working worldwide",
  copyrightYear: 2026,
} as const;

export const primaryNav: NavItem[] = [
  { label: "Stickers", href: "/stickers" },
  { label: "Collections", href: "/collections" },
  { label: "Shop", href: "/shop" },
  { label: "Custom", href: "/custom" },
  { label: "About", href: "/about" },
  { label: "Journal", href: "/journal" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  { title: "Explore", items: primaryNav },
  { title: "Studio", items: [{ label: "Contact", href: "/contact" }, { label: "Custom request", href: "/custom/request" }] },
];

export const socialLinks = [
  { label: "X", handle: "@sajidillustrates", href: "https://x.com/sajidillustrates" },
  { label: "Instagram", handle: "@sajidillustrates", href: "https://instagram.com/sajidillustrates" },
  { label: "Pinterest", handle: "Sajid Ahmed Stickers", href: "https://pinterest.com/sajidillustrates" },
  { label: "Behance", handle: "sajidillustrates", href: "https://behance.net/sajidillustrates" },
] as const;

/** Currency formatting for the (still front-end only) shop UI. */
export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2 }).format(value);

export const formatDate = (iso: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", options ?? { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );

/** Option lists shared by the front-end forms. */
export const customTypes = [
  "Custom place / landmark",
  "Custom character",
  "Custom cultural motif",
  "Wedding & event",
  "Brand & business",
  "Something else",
] as const;

export const customSizes = ["60 mm", "70 mm", "80 mm", "90 mm", "120 mm", "Not sure yet"] as const;

export const contactSubjects = [
  "A custom sticker enquiry",
  "An existing product question",
  "Bulk or wholesale pricing",
  "Press or collaboration",
  "Copyright & permissions",
  "Something else",
] as const;

/** Honest, static statements about what the shop can and cannot do right now. */
export const shopNotice = {
  title: "Payments are not switched on yet",
  body: "The shop is fully browsable — every product, size and price is real data. Checkout is intentionally not connected: no card details are collected and no payment is taken. Choose a product to see exactly how it would be printed, sized and shipped.",
} as const;

export const cartNotice =
  "Cart is saved in this browser only. Nothing is charged until checkout is connected.";