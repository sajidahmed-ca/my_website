import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { stickers } from "@/data/stickers";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { journalPosts } from "@/data/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/stickers", priority: 0.9, changeFrequency: "weekly" },
    { path: "/collections", priority: 0.9, changeFrequency: "monthly" },
    { path: "/shop", priority: 0.9, changeFrequency: "weekly" },
    { path: "/custom", priority: 0.8, changeFrequency: "monthly" },
    { path: "/custom/request", priority: 0.7, changeFrequency: "yearly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/journal", priority: 0.7, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...stickers.map((sticker) => ({
      url: `${site.url}/stickers/${sticker.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...collections.map((collection) => ({
      url: `${site.url}/collections/${collection.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${site.url}/shop/${product.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...journalPosts.map((post) => ({
      url: `${site.url}/journal/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}