import type { Metadata } from "next";
import { JournalCard } from "@/components/journal/JournalCard";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/marketing/CTASection";
import { journalPosts } from "@/data/journal";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Journal",
  description:
    "Notes on the artwork — how each collection is researched and drawn, the sketches that almost made it, and the stories behind the places on the stickers.",
  path: "/journal",
});

export default function JournalPage() {
  const [lead, ...rest] = journalPosts;

  return (
    <>
      <section className="shell pb-12 pt-14 sm:pb-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Journal</p>
          <h1 className="display-lg mt-5 max-w-3xl">Notes from the desk</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            How the artwork gets made, what almost made the cut, and the stories behind the places. No filler.
          </p>
        </Reveal>
      </section>

      {lead ? (
        <section className="shell pb-10">
          <Reveal>
            <JournalCard post={lead} variant="lead" priority />
          </Reveal>
        </section>
      ) : null}

      {rest.length > 0 ? (
        <section className="shell pb-4">
          <div className="grid gap-4 sm:gap-5 lg:grid-cols-2">
            {rest.map((post, index) => (
              <Reveal key={post.id} delay={(index % 2) * 70}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-16 sm:mt-20">
        <CTASection
          eyebrow="Your turn"
          title={"Seen something\nyou want drawn?"}
          body="The journal explains how it is made. The brief form is how you start your own piece."
          primary={{ label: "Start a custom request", href: "/custom/request" }}
          secondary={{ label: "Explore the library", href: "/stickers" }}
          tone="canvas"
        />
      </div>
    </>
  );
}