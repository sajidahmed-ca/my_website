import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { FeaturedStickersSection } from "@/components/home/FeaturedStickersSection";
import { CollectionsPreviewSection } from "@/components/home/CollectionsPreviewSection";
import { StorySection } from "@/components/home/StorySection";
import { SocialGridSection } from "@/components/home/SocialGridSection";
import { CTASection } from "@/components/marketing/CTASection";
import { buildMetadata, personSchema } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: { absolute: site.title },
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Static, build-time constant — no user input reaches this string.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
      />

      <Hero />
      <FeaturedStickersSection />
      <CollectionsPreviewSection />
      <StorySection />
      <SocialGridSection />
      <CTASection
        eyebrow="Your turn"
        title={"Got a place, a memory,\nor a moment in mind?"}
        body="Custom stickers start with one sentence about what you want drawn. Tell me the story and I will take it from there."
        primary={{ label: "Start a custom request", href: "/custom/request" }}
        secondary={{ label: "Browse the library", href: "/stickers" }}
      />
    </>
  );
}