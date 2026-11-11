import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { StickerBrowser } from "@/components/stickers/StickerBrowser";
import { CTASection } from "@/components/marketing/CTASection";
import { allStickers } from "@/lib/content";
import { collections } from "@/data/collections";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Illustrated Stickers",
  description:
    "Browse every illustrated sticker by Sajid Ahmed — cities, travel, culture, landmarks, characters and everyday moments, filterable by category, collection and format.",
  path: "/stickers",
});

export default function StickersPage() {
  const stickers = allStickers();

  return (
    <>
      <section className="shell pb-10 pt-14 sm:pb-12 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Library</p>
          <h1 className="display-lg mt-5 max-w-3xl">Illustrated Stickers</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            {stickers.length} original illustrations, all drawn in the same hand — {site.shortDescription.toLowerCase()}
          </p>
        </Reveal>
      </section>

      <StickerBrowser
        stickers={stickers}
        collections={collections.map((collection) => ({ slug: collection.slug, title: collection.title }))}
      />

      <div className="mt-16 sm:mt-20">
        <CTASection
          eyebrow="Something specific?"
          title={"Want one of these\nin your own words?"}
          body="Every library sticker can be redrawn as a custom piece — different city, different palette, different size. It starts with one short brief."
          primary={{ label: "Request a custom sticker", href: "/custom" }}
          secondary={{ label: "See collections", href: "/collections" }}
          tone="canvas"
        />
      </div>
    </>
  );
}