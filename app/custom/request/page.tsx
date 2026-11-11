import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Info } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { CustomRequestForm } from "@/components/custom/CustomRequestForm";
import { CustomProcess } from "@/components/custom/CustomProcess";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: "Custom Request Brief",
  description:
    "Send a brief for a custom illustrated sticker — the idea, size, quantity and budget. Form validation is fully built; connect it to an inbox to start receiving requests.",
  path: "/custom/request",
});

export default function CustomRequestPage() {
  return (
    <>
      <section className="shell pb-10 pt-12 sm:pt-16">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <Link
              href="/custom"
              className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Custom work
            </Link>
          </nav>

          <p className="eyebrow mt-8">The brief</p>
          <h1 className="display-lg mt-5 max-w-2xl">Tell me about your sticker</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            The more concrete the better — a place, a memory, a photo, a mood. Everything here is optional except
            the essentials marked with an asterisk.
          </p>
        </Reveal>
      </section>

      <section className="shell grid gap-10 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="rounded-tile border border-line bg-surface p-6 sm:p-9">
              <CustomRequestForm />
            </div>
          </Reveal>
        </div>

        <aside className="lg:col-span-5">
          <Reveal from="right" delay={80}>
            <div className="flex items-start gap-3 rounded-card border border-mustard/30 bg-mustard-tint p-5">
              <Info aria-hidden className="mt-0.5 size-5 shrink-0 text-mustard" />
              <div>
                <h2 className="font-display text-[0.9375rem] font-semibold tracking-tight">
                  This form is not connected yet
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                  Validation, focus management and the confirmation state are all built. Submitting shows you exactly
                  what would happen, but nothing is transmitted and no email address is stored. To go live, point the
                  single submit handler at your form endpoint or inbox.
                </p>
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-7">
              <h2 className="font-display text-lg font-semibold tracking-tight">What happens next</h2>
              <div className="mt-6">
                <CustomProcess />
              </div>
            </div>

            <div className="mt-8 border-t border-line pt-7">
              <h2 className="font-display text-lg font-semibold tracking-tight">Prefer email?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Write directly and include the same details — idea, size, quantity and your deadline.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                {site.email}
                <ArrowRight aria-hidden className="size-3.5" />
              </a>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}