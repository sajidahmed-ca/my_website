import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — Illustrated Stickers`,
    short_name: site.wordmark,
    description: site.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fbf7f1",
    theme_color: "#c8402f",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}