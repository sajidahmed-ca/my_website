import { ArrowRight } from "lucide-react";
import { collections } from "@/data/collections";
import { stickers } from "@/data/stickers";
import { Button } from "@/components/ui/Button";
import { StickerArt } from "@/components/ui/StickerArt";
import { ParallaxLayer } from "@/components/ui/ParallaxLayer";
import { site } from "@/data/site";

/** Floating sticker tiles layered over a paper wall in the hero. */
const TILES = [
  { slug: "nyc-skyline-at-dusk", className: "left-[2%] top-[4%] w-[46%] z-20", tilt: -6, anim: "animate-float-slow" },
  { slug: "liberty-in-the-hudson", className: "right-[1%] top-[0%] w-[34%] z-10", tilt: 7, anim: "animate-float-mid" },
  { slug: "masala-chai", className: "left-[8%] bottom-[6%] w-[32%] z-30", tilt: -9, anim: "animate-float-mid" },
  { slug: "tokyo-torii-gate", className: "right-[6%] bottom-[2%] w-[40%] z-20", tilt: 5, anim: "animate-float-slow" },
  { slug: "morning-coffee", className: "left-[40%] top-[38%] w-[26%] z-40 hidden sm:block", tilt: -3, anim: "animate-float-slow" },
] as const;

function tileFor(slug: string) {
  return stickers.find((sticker) => sticker.slug === slug);
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-10 sm:pt-16 lg:pt-20">
      {/* Soft colour wash behind the copy — two quiet radial fields, no gradients on UI. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 -top-32 size-[34rem] rounded-full bg-accent-tint blur-3xl opacity-70" />
        <div className="absolute -right-40 top-24 size-[30rem] rounded-full bg-teal-tint blur-3xl opacity-80" />
      </div>

      <div className="shell grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6 xl:col-span-5">
          <p className="eyebrow flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-px w-8 bg-accent" />
            {site.role}
          </p>

          <h1 className="display-xl mt-5 text-ink">
            Cities, culture
            <br className="hidden sm:block" /> &amp; stories
            <br />
            <span className="relative inline-block">
              turned into
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 -z-10 h-[0.32em] bg-mustard-tint"
              />
            </span>
            <br className="hidden sm:block" /> stickers.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-soft sm:text-lg">
            Cute illustrated stickers inspired by places, people, culture, travel and everyday moments.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/stickers" size="lg">
              Explore stickers
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Button href="/custom" variant="outline" size="lg">
              Create a custom sticker
            </Button>
          </div>

          <dl className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-6">
            {[
              { label: "Artworks", value: stickers.length },
              { label: "Collections", value: collections.length },
              { label: "Sizes", value: "60–120 mm" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-2">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-xl font-semibold tracking-tight tabular-nums">{stat.value}</dd>
                <span aria-hidden className="text-xs uppercase tracking-[0.14em] text-ink-muted">
                  {stat.label}
                </span>
              </div>
            ))}
          </dl>
        </div>

        {/* Artwork wall */}
        <div className="lg:col-span-6 xl:col-span-7">
          <ParallaxLayer strength={14}>
            <div className="relative mx-auto aspect-square w-full max-w-[36rem] rounded-tile border border-line bg-surface paper-grain shadow-sheet sm:aspect-[5/4] lg:aspect-square">
              <div
                aria-hidden
                className="absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-sage-tint via-mustard-tint to-accent-tint opacity-70"
              />
              {TILES.map((tile) => {
                const sticker = tileFor(tile.slug);
                if (!sticker) return null;
                return (
                  <div
                    key={tile.slug}
                    className={`absolute ${tile.className}`}
                    style={{ ["--tilt" as string]: `${tile.tilt}deg`, animationDelay: `${tile.tilt * 40}ms` }}
                  >
                    <div className={tile.anim}>
                      <StickerArt
                        src={sticker.image}
                        alt={sticker.alt}
                        inset="none"
                        sizes="(min-width: 1024px) 20rem, 42vw"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}