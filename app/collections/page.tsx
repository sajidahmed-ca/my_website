import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { CollectionGrid } from "@/components/collections/CollectionGrid";
import { CTASection } from "@/components/marketing/CTASection";
import { collections } from "@/data/collections";
import { getStickersByCollection } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Collections",
  description:
    "Seven illustrated worlds by Sajid Ahmed — Cities & Landmarks, Travel Memories, Culture & Food, Characters, Lifestyle and Special editions, each drawn in one consistent hand.",
  path: "/collections",
});

export default function CollectionsPage() {
  const counts = collections.map((collection) => ({
    collection,
    count: getStickersByCollection(collection.slug).length,
  }));
  const total = counts.reduce((sum, entry) => sum + entry.count, 0);

  return (
    <>
      <section className="shell pb-12 pt-14 sm:pb-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Collections</p>
          <h1 className="display-lg mt-5 max-w-3xl">Explore the World</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            Six worlds and one special edition, {total} original illustrations in total. One hand, one palette,
            a different weather in each.
          </p>
        </Reveal>
      </section>

      <div className="shell pb-4">
        <CollectionGrid collections={collections} />
      </div>

      <div className="mt-16 sm:mt-20">
        <CTASection
          eyebrow="Custom work"
          title={"Building your own\ncollection instead?"}
          body="Tell me the places, the people or the meals you want drawn and they can become a set that belongs only to you."
          primary={{ label: "Request a custom set", href: "/custom" }}
          secondary={{ label: "Browse every sticker", href: "/stickers" }}
          tone="ink"
        />
      </div>
    </>
  );
}