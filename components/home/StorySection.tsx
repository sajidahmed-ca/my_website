import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StickerArt } from "@/components/ui/StickerArt";
import { getSticker } from "@/lib/content";

/** Editorial brand statement between the artwork sections. */
export function StorySection() {
  const pair = [getSticker("brooklyn-brownstone"), getSticker("bazaar-lanterns")].filter(
    (sticker): sticker is NonNullable<typeof sticker> => Boolean(sticker),
  );

  return (
    <section className="shell py-20 sm:py-24 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeading
            eyebrow="The idea"
            title={
              <>
                From places we recognize
                <br className="hidden sm:block" /> to moments we remember.
              </>
            }
          />

          <Reveal delay={80} className="mt-7 flex max-w-xl flex-col gap-4 text-base leading-relaxed text-ink-soft">
            <p>
              Every sticker starts with a real place and a real moment — a cab waiting at a kerb, marigolds on a
              doorway, a bridge in flat afternoon light. The drawing is only the delivery system.
            </p>
            <p>
              What stays on the sticker is one small story: a city, a culture, a landmark, a character, or the
              ordinary Tuesday that turned into a memory you still carry. Drawn in a consistent hand, cut clean, and
              handed over so it can live somewhere slightly unexpected.
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-8 flex flex-wrap gap-3">
            <Button href="/about" variant="outline">
              Read the story
            </Button>
            <Button href="/custom" variant="ghost">
              Commission a piece
            </Button>
          </Reveal>
        </div>

        <Reveal from="left" delay={60} className="lg:col-span-6">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="rounded-tile border border-line bg-surface-sunk paper-grain p-8 shadow-sheet sm:p-12">
              {pair[0] ? (
                <div className="mx-auto w-[78%] -rotate-3">
                  <StickerArt src={pair[0].image} alt={pair[0].alt} inset="none" priority />
                </div>
              ) : null}
              {pair[1] ? (
                <div className="mx-auto mt-4 w-[78%] rotate-2">
                  <StickerArt src={pair[1].image} alt={pair[1].alt} inset="none" />
                </div>
              ) : null}
            </div>

            <p className="editorial-serif absolute -bottom-6 left-4 max-w-[15rem] text-lg leading-snug text-ink-soft sm:-bottom-4 sm:left-8 sm:text-xl">
              Small drawings of places that feel specific.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}