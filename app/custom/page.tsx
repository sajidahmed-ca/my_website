import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock, HelpCircle, Palette, PencilRuler, PackageCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CustomProcess } from "@/components/custom/CustomProcess";
import { CTASection } from "@/components/marketing/CTASection";
import { StickerGrid } from "@/components/stickers/StickerGrid";
import { getStickersByCategory } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Custom Stickers",
  description:
    "Commission a custom illustrated sticker by Sajid Ahmed — your own place, person, culture or memory, drawn in the same hand as the shop library. Five clear steps, no surprises.",
  path: "/custom",
});

const reassurance = [
  { icon: PencilRuler, title: "Original drawing", body: "Everything is drawn from scratch. Nothing is traced, licensed or copied from a photo." },
  { icon: Palette, title: "One consistent hand", body: "Custom work uses the same palette and line weight as the shop library, so it fits right in." },
  { icon: Clock, title: "Roughs first", body: "You see a rough sketch early and nothing moves forward until you are happy with it." },
  { icon: PackageCheck, title: "Print-ready files", body: "You also receive the clean artwork file, so you can reprint or use it elsewhere." },
];

const faqs = [
  {
    q: "How much does a custom sticker cost?",
    a: "A single design starts around the price of an individual sticker, and a set is priced per design plus setup. You get an exact quote with the brief — no surprises after the drawing starts.",
  },
  {
    q: "Can you draw my own photo?",
    a: "Yes. Send a reference photo and describe what matters about it. The result is an original illustration in the studio style, not a copy of the photograph.",
  },
  {
    q: "What is the turnaround?",
    a: "Roughs usually land within a few days of a clear brief. Final artwork and printing depend on the size of the job, and the estimate is confirmed up front.",
  },
  {
    q: "Do you ship internationally?",
    a: "Stickers ship flat worldwide. Anything larger — posters, prints, packaging — is quoted separately because the packaging changes.",
  },
  {
    q: "What if I only need a few?",
    a: "Single designs are fine. If you need a run of fifty or more, say so in the brief and the quote will include setup and bulk pricing.",
  },
];

export default function CustomPage() {
  const inspiration = getStickersByCategory("Landmarks").slice(0, 4);

  return (
    <>
      <section className="shell pb-12 pt-14 sm:pb-16 sm:pt-20">
        <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow">Custom work</p>
            <h1 className="display-xl mt-5">
              Your place, your memory,
              <br />
              your <span className="editorial-serif font-normal italic">own sticker</span>.
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pt-14">
            <p className="text-lg leading-relaxed text-ink-soft">
              Send me one sentence about what you want drawn — a building, a dish, a person, a whole trip — and I
              will turn it into an illustration in the same hand as the shop library.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/custom/request"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[0.9375rem] font-medium text-white transition-colors hover:bg-accent-dark"
              >
                Start a custom request
                <ArrowRight aria-hidden className="size-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                Ask a question first
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface-sunk py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="The process"
            title="How it works"
            intro="Five steps, no black box. You always know what is happening and what is needed from you."
            align="left"
          />
          <div className="mt-10 rounded-tile border border-line bg-surface p-7 sm:p-10">
            <CustomProcess />
          </div>
        </div>
      </section>

      <section className="shell py-16 sm:py-20 lg:py-24">
        <SectionHeading eyebrow="What you get" title="Built to last" align="left" />
        <dl className="mt-9 grid gap-4 sm:grid-cols-2">
          {reassurance.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="flex h-full gap-4 rounded-card border border-line bg-surface p-6">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-accent-tint text-accent">
                  <item.icon aria-hidden className="size-5" />
                </span>
                <div>
                  <dt className="font-display text-[1.0625rem] font-semibold tracking-tight">{item.title}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.body}</dd>
                </div>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      {inspiration.length > 0 ? (
        <section className="border-t border-line bg-surface-sunk py-16 sm:py-20">
          <div className="shell">
            <SectionHeading
              eyebrow="The style"
              title="What custom work looks like"
              intro="Custom illustrations share the same line weight and palette as these landmark stickers."
              align="left"
              action={
                <Link href="/stickers" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                  See the full library
                  <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              }
            />
            <div className="mt-9">
              <StickerGrid stickers={inspiration} sizes="(min-width: 1280px) 19rem, 44vw" />
            </div>
          </div>
        </section>
      ) : null}

      <section className="shell py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="Questions"
          title="Before you send a brief"
          intro="The five things people ask most often. Anything else, just ask."
          align="left"
        />

        <div className="mt-9 grid gap-x-10 gap-y-8 lg:grid-cols-2">
          {faqs.map((faq, index) => (
            <Reveal key={faq.q} delay={index * 60}>
              <div className="border-t border-line pt-5">
                <h3 className="flex items-start gap-2.5 font-display text-[1.0625rem] font-semibold tracking-tight">
                  <HelpCircle aria-hidden className="mt-0.5 size-4.5 shrink-0 text-accent" />
                  {faq.q}
                </h3>
                <p className="mt-2.5 pl-[1.6rem] text-sm leading-relaxed text-ink-soft">{faq.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection
        eyebrow="Ready when you are"
        title={"One sentence is\nall it takes to start."}
        body="Fill in the brief and it will tell you immediately whether the essentials are there. Nothing is sent until the form is connected to a real inbox."
        primary={{ label: "Fill in the brief", href: "/custom/request" }}
        secondary={{ label: "Message instead", href: "/contact" }}
        tone="accent"
      />
    </>
  );
}