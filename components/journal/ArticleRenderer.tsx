import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { JournalPost } from "@/data/types";
import { formatDate, site } from "@/data/site";
import { getSticker } from "@/lib/content";

type Props = {
  post: JournalPost;
};

type Block =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "image"; src: string; alt: string; caption?: string };

/**
 * Renders the static, hand-authored block list from `data/journal.ts`.
 * Deliberately not markdown — content is typed, so there is nothing to parse
 * at runtime and no unsanitized HTML is ever injected.
 */
function toBlocks(post: JournalPost): Block[] {
  return post.body.map((part): Block => {
    switch (part.type) {
      case "p":
        return { kind: "paragraph", text: part.text };
      case "h2":
        return { kind: "heading", text: part.text };
      case "quote":
        return { kind: "quote", text: part.text };
      case "list":
        return { kind: "list", items: part.items };
      case "artwork": {
        const sticker = getSticker(part.stickerSlug);
        return {
          kind: "image",
          src: sticker?.image ?? "/artwork/masala-chai.svg",
          alt: sticker?.alt ?? part.caption,
          caption: part.caption,
        };
      }
    }
  });
}

export function ArticleRenderer({ post }: Props) {
  const blocks = toBlocks(post);

  return (
    <article className="shell py-14 sm:py-16">
      <div className="mx-auto max-w-[42rem]">
        <Link
          href="/journal"
          className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          All journal entries
        </Link>

        <header className="mt-6 border-b border-line pb-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
            <span className="text-accent">{post.category}</span>
            <span aria-hidden className="size-1 rounded-full bg-ink-faint" />
            <time dateTime={post.date}>{formatDate(post.date, { year: "numeric" })}</time>
            <span aria-hidden className="size-1 rounded-full bg-ink-faint" />
            <span>{post.readTime} min read</span>
          </div>

          <h1 className="display-md mt-4">{post.title}</h1>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{post.excerpt}</p>
        </header>

        <div className="mt-9 flex flex-col gap-6 text-[1.0625rem] leading-[1.75] text-ink-soft">
          {blocks.map((block, index) => {
            const key = `${block.kind}-${index}`;

            switch (block.kind) {
              case "heading":
                return (
                  <h2 key={key} className="mt-4 font-display text-2xl font-semibold tracking-[-0.03em] text-ink">
                    {block.text}
                  </h2>
                );

              case "quote":
                return (
                  <blockquote
                    key={key}
                    className="editorial-serif border-l-2 border-accent pl-5 text-xl leading-snug text-ink"
                  >
                    {block.text}
                  </blockquote>
                );

              case "list":
                return (
                  <ul key={key} className="flex flex-col gap-2.5">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );

              case "image":
                return (
                  <figure key={key} className="-mx-4 sm:-mx-10">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-line bg-surface-sunk paper-grain">
                      <Image src={block.src} alt={block.alt} fill sizes="(min-width: 768px) 42rem, 94vw" className="object-contain p-6" />
                    </div>
                    {block.caption ? (
                      <figcaption className="mt-3 text-center text-sm text-ink-muted">{block.caption}</figcaption>
                    ) : null}
                  </figure>
                );

              default:
                return (
                  <p key={key} className="first-of-type:text-lg">
                    {block.text}
                  </p>
                );
            }
          })}
        </div>

        <footer className="mt-12 border-t border-line pt-6 text-sm text-ink-muted">
          <p>
            Written by {site.name}. Enjoyed the process?{" "}
            <Link href="/custom" className="font-medium text-ink underline decoration-accent underline-offset-4">
              Commission a custom sticker
            </Link>
            .
          </p>
        </footer>
      </div>
    </article>
  );
}