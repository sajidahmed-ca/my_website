import type { Metadata } from "next";
import { site, socialLinks } from "@/data/site";

type MetaInput = {
  /** Omit on the homepage to inherit the site-wide title. */
  title?: string | { absolute: string };
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

const absolute = (path: string) => (path.startsWith("http") ? path : `${site.url}${path}`);

/** Consistent page metadata: title, description, canonical, OG and Twitter. */
export function buildMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
}: MetaInput): Metadata {
  const url = absolute(path);
  const resolvedTitle = typeof title === "string" ? title : (title?.absolute ?? site.title);
  const ogImage = absolute(image ?? "/opengraph-image");

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      title: resolvedTitle,
      description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${site.name} — illustrated stickers` }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [ogImage],
    },
  };
}

/** Social profiles, single-sourced from `data/site.ts`. */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: `${site.name} Stickers`,
  url: site.url,
  jobTitle: site.role,
  description: site.description,
  email: `mailto:${site.email}`,
  knowsAbout: [
    "Illustration",
    "Sticker art",
    "City illustration",
    "Travel illustration",
    "Character design",
  ],
  sameAs: socialLinks.map((social) => social.href),
} as const;

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} — Stickers`,
  url: site.url,
  description: site.description,
  inLanguage: "en",
} as const;

/** @returns a JSON-LD string safe to inject on a page. */
export const personSchema = () => JSON.stringify(personJsonLd);

/** @returns a JSON-LD string safe to inject on a page. */
export const websiteSchema = () => JSON.stringify(websiteJsonLd);

/** Breadcrumbs for nested detail pages. */
export const breadcrumbSchema = (trail: { name: string; path: string }[]) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      item: absolute(entry.path),
    })),
  });

/** @returns a JSON-LD string for a single artwork. */
export const artworkSchema = (sticker: {
  title: string;
  description: string;
  image: string;
  slug: string;
}) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: sticker.title,
    description: sticker.description,
    artform: "Digital illustration",
    image: absolute(sticker.image),
    url: absolute(`/stickers/${sticker.slug}`),
    creator: { "@type": "Person", name: site.name, url: site.url },
  });

/** @returns a JSON-LD string for a journal article. */
export const articleSchema = (post: {
  title: string;
  excerpt: string;
  image: string;
  slug: string;
  date: string;
}) =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: absolute(post.image),
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
    mainEntityOfPage: absolute(`/journal/${post.slug}`),
  });