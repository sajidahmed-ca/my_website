import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, MapPin } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { socialLinks, site } from "@/data/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Sajid Ahmed about custom stickers, bulk orders, licensing, press or anything about the artwork. Replies usually come within a few days.",
  path: "/contact",
});

const topics = [
  { title: "Custom stickers", body: "Send a brief and you will get a quote with a rough and a timeline." },
  { title: "Bulk & wholesale", body: "Runs of fifty or more are priced with setup included." },
  { title: "Licensing & press", body: "Reproductions, editorial use and press enquiries are all welcome." },
];

export default function ContactPage() {
  return (
    <>
      <section className="shell pb-12 pt-14 sm:pb-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="display-lg mt-5 max-w-3xl">Get in touch</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            Custom work, bulk orders, licensing or a question about a specific piece — it all starts here.
          </p>
        </Reveal>
      </section>

      <section className="shell grid gap-10 pb-16 sm:pb-20 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="rounded-tile border border-line bg-surface p-6 sm:p-9">
              <h2 className="font-display text-xl font-semibold tracking-[-0.03em]">Send a message</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Fields marked with an asterisk are required. Everything else helps but is optional.
              </p>
              <div className="mt-7">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>

        <aside className="flex flex-col gap-8 lg:col-span-5">
          <Reveal from="right" delay={60}>
            <div className="rounded-tile border border-line bg-surface-sunk p-6 sm:p-8">
              <h2 className="font-display text-lg font-semibold tracking-[-0.03em]">Direct details</h2>

              <ul className="mt-5 flex flex-col gap-4">
                <li className="flex items-start gap-3">
                  <Mail aria-hidden className="mt-0.5 size-4.5 shrink-0 text-accent" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-ink-muted">Email</span>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-0.5 block text-sm font-medium underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
                    >
                      {site.email}
                    </a>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin aria-hidden className="mt-0.5 size-4.5 shrink-0 text-accent" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-ink-muted">Based</span>
                    <span className="mt-0.5 block text-sm font-medium">{site.location}</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock aria-hidden className="mt-0.5 size-4.5 shrink-0 text-accent" />
                  <span>
                    <span className="block text-xs uppercase tracking-[0.12em] text-ink-muted">Reply time</span>
                    <span className="mt-0.5 block text-sm font-medium">Usually within a few days</span>
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal from="right" delay={120}>
            <div>
              <h2 className="font-display text-lg font-semibold tracking-[-0.03em]">Elsewhere</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {socialLinks.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group inline-flex items-center gap-1.5 text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      <span className="font-medium underline decoration-accent/40 underline-offset-4 group-hover:decoration-accent">
                        {social.label}
                      </span>
                      <span className="text-ink-faint">{social.handle}</span>
                      <ArrowUpRight
                        aria-hidden
                        className="size-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal from="right" delay={160}>
            <div className="rounded-card border border-line bg-surface p-6">
              <h2 className="font-display text-[0.9375rem] font-semibold tracking-tight">Want to skip the form?</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                The custom brief asks for more detail up front, so it is usually the faster route for new work.
              </p>
              <Link
                href="/custom/request"
                className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-line px-4 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                Open the brief form
              </Link>
            </div>
          </Reveal>

          <Reveal from="right" delay={200}>
            <div className="border-t border-line pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">What people write about</h2>
              <ul className="mt-4 flex flex-col gap-4">
                {topics.map((topic) => (
                  <li key={topic.title}>
                    <p className="text-sm font-semibold">{topic.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-soft">{topic.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </aside>
      </section>
    </>
  );
}