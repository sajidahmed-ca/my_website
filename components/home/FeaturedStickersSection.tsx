import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StickerCard } from "@/components/stickers/StickerCard";
import { getFeaturedStickers } from "@/lib/content";

export function FeaturedStickersSection() {
  const featured = getFeaturedStickers(6);

  return (
    <section className="shell py-20 sm:py-24 lg:py-28">
      <SectionHeading
        eyebrow="Library"
        title="Featured Stickers"
        intro="A small selection of favourites from the full library, drawn to work both on a laptop lid and in a shop grid."
        align="left"
        action={
          <Button href="/stickers" variant="outline">
            Browse all stickers
            <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        }
      />

      <div className="mt-9 grid grid-cols-2 gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {featured.map((sticker, index) => (
          <Reveal key={sticker.id} delay={index * 60} eager={index < 2}>
            <StickerCard sticker={sticker} priority={index < 2} sizes="(min-width: 1280px) 19rem, 44vw" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}