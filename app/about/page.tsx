import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CustomProcess } from "@/components/custom/CustomProcess";
import { JournalCard } from "@/components/journal/JournalCard";
import { StickerArt } from "@/components/ui/StickerArt";
import { allStickers, getSticker } from "@/lib/content";
import { journalPosts } from "@/data/journal";
import { site, socialLinks } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Sajid Ahmed is an illustrator drawing cute stickers from places, culture, travel and everyday moments — with the process, the reasoning and the mistakes that got there.",
  path: "/about",
});

const principles = [
  {
    title: "One place, one drawing",
    body: "A sticker tries to hold a whole city. It only works if the drawing is specific enough that you can tell which city, and simple enough that it survives being 6 cm tall.",
  },
  {
    title: "Culture is a detail",
    body: "Marigolds on a doorway, a brass kettle on a stove, text on a shop sign. The details that make a place itself are the ones worth drawing — not the postcard view of it.",
  },
  {
    title: "Consistency over novelty",
    body: "One line weight, one palette logic, one hand. It means a set of stickers from different years still looks like it belongs together.",
  },
  {
    title: "Drawn, not traced",
    body: "Everything starts as a sketch from observation or memory. Even when a photograph is the reference, the drawing is rebuilt by hand.",
  },
];

export default function AboutPage() {
  const portrait = getSticker("masala-chai") ?? getSticker("street-duo");
  const latestPosts = journalPosts.slice(0, 2);

  return (
    <>
      <section className="shell pb-12 pt-14 sm:pb-16 sm:pt-20">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow">About</p>
            <h1 className="display-xl mt-5">
              Small drawings of
              <br />
              places that feel{" "}
              <span className="editorial-serif font-normal italic">specific</span>.
            </h1>
            <div className="mt-7 flex max-w-xl flex-col gap-4 text-base leading-relaxed text-ink-soft">
              <p>
                {site.name} is an illustrator and sticker artist. The work comes from places first: the corner of a
                street that finally looks right at dusk, a meal that tastes like somebody&apos;s kitchen, a sign in
                a script most people cannot read.
              </p>
              <p>{librarySummary()}</p>
            </div>
          </div>

          <Reveal from="right" delay={80} className="lg:col-span-5">
            <figure className="relative mx-auto max-w-sm lg:max-w-none">
              <div
                className="rounded-tile border border-line bg-surface-sunk paper-grain p-8 shadow-sheet sm:p-12"
                style={{ aspectRatio: "4 / 5" }}
              >
                <div className="flex h-full items-center justify-center">
                  {portrait ? (
                    <StickerArt
                      src={portrait.image}
                      alt={portrait.alt}
                      priority
                      inset="none"
                      className="h-full w-full"
                      sizes="(min-width: 1024px) 26rem, 80vw"
                    />
                  ) : null}
                </div>
              </div>
              <figcaption className="editorial-serif absolute -bottom-5 left-4 max-w-[16rem] text-lg leading-snug text-ink-soft sm:left-8">
                Most collections begin with a walk, a photograph and a bad cup of coffee.
              </figcaption>
            </figure>
          </Reveal>
        </Reveal>
      </section>

      <section className="border-y border-line bg-ink py-16 text-canvas sm:py-20">
        <div className="shell">
          <Reveal className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Quote aria-hidden className="size-8 text-mustard" />
            </div>
            <blockquote className="lg:col-span-8">
              <p className="editorial-serif text-2xl leading-[1.35] sm:text-3xl">
                I am not trying to show you a city. I am trying to show you the one detail you would actually miss.
              </p>
              <footer className="mt-5 text-sm text-canvas/55">
                {site.name} — {site.role}
              </footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="shell py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="Approach"
          title="Four rules I actually follow"
          align="left"
          intro="The constraints are what make a large library look like one artist made it."
        />
        <div className="mt-9 grid gap-4 sm:grid-cols-2">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delay={index * 70}>
              <div className="flex h-full flex-col rounded-card border border-line bg-surface p-6">
                <span aria-hidden className="font-display text-sm font-semibold tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-[1.0625rem] font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{principle.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface-sunk py-16 sm:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Studio" title="How a sticker gets made" align="left" />
          <div className="mt-10 rounded-tile border border-line bg-surface p-7 sm:p-10">
            <CustomProcess
              steps={[
                {
                  id: "01",
                  title: "Walk & collect",
                  body: "Sketches on paper, photographs, receipts, tickets. The raw material is gathered before anything digital happens.",
                },
                {
                  id: "02",
                  title: "Shape the idea",
                  body: "Decide what the sticker is actually about, then throw away everything that does not support that.",
                },
                {
                  id: "03",
                  title: "Draw",
                  body: "Rough to ink to colour, always with a real pen or brush first. Flat colours, one light source.",
                },
                {
                  id: "04",
                  title: "Cut & check",
                  body: "The die line follows the artwork, not a rectangle. Every piece is checked before it ships.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow="Elsewhere" title="Follow the work" align="left" intro="New collections post first on social." />
            <ul className="mt-7 flex flex-col gap-2.5">
              {socialLinks.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center justify-between rounded-card border border-line bg-surface px-5 py-4 transition-[transform,border-color,box-shadow] duration-400 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-sheet"
                  >
                    <span>
                      <span className="block font-display text-[0.9375rem] font-semibold tracking-tight">
                        {social.label}
                      </span>
                      <span className="mt-0.5 block text-xs text-ink-muted">{social.handle}</span>
                    </span>
                    <ArrowRight
                      aria-hidden
                      className="size-4 text-ink-faint transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              Or send a message
            </Link>
          </div>

          <div className="lg:col-span-7">
            <SectionHeading
              eyebrow="Journal"
              title="Recent notes"
              align="left"
              action={
                <Link href="/journal" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  All entries
                  <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              }
            />
            <div className="mt-7 flex flex-col gap-4">
              {latestPosts.map((post, index) => (
                <Reveal key={post.id} delay={index * 70}>
                  <JournalCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Short library summary, derived from the data rather than hard-coded. */
function librarySummary() {
  const collectionCount = new Set(allStickers().map((sticker) => sticker.collection)).size;
  return `The library has grown from one skyline sticker into ${allStickers().length} original illustrations across ${collectionCount} collections — cityscapes and landmarks, travel memories, culture and food, characters, and everyday life. They are drawn to be recognizable at 6 cm, printed water-resistant, and shaped to the artwork rather than to a rectangle.`;
}