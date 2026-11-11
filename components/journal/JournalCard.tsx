import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { JournalPost } from "@/data/types";
import { formatDate } from "@/data/site";
import { StickerArt } from "@/components/ui/StickerArt";
import { cn } from "@/lib/cn";

type Props = {
  post: JournalPost;
  variant?: "lead" | "row";
  priority?: boolean;
  className?: string;
};

export function JournalCard({ post, variant = "row", priority = false, className }: Props) {
  if (variant === "lead") {
    return (
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-tile border border-line bg-surface transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-ink/15 hover:shadow-lift motion-reduce:hover:translate-y-0",
          className,
        )}
      >
        <div className="relative flex items-center justify-center overflow-hidden bg-surface-sunk paper-grain p-10 transition-colors duration-500 group-hover:bg-canvas-deep">
          <div className="w-52 transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.05] motion-reduce:group-hover:scale-100 sm:w-64">
            <StickerArt src={post.image} alt={post.alt} priority={priority} inset="none" className="h-full w-full" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3 border-t border-line p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
            <span className="text-accent">{post.category}</span>
            <span aria-hidden className="size-1 rounded-full bg-ink-faint" />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          <h3 className="font-display text-2xl font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[1.75rem]">
            {post.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium">
            Read entry
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
        <Link href={`/journal/${post.slug}`} className="absolute inset-0 rounded-tile" aria-label={post.title}>
          <span className="sr-only">Read {post.title}</span>
        </Link>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group relative flex h-full items-start gap-4 rounded-card border border-line bg-surface p-4 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 hover:border-ink/15 hover:shadow-sheet motion-reduce:hover:translate-y-0 sm:gap-5 sm:p-5",
        className,
      )}
    >
      <span className="grid size-20 shrink-0 place-items-center rounded-2xl border border-line bg-surface-sunk p-2 sm:size-24">
        <StickerArt src={post.image} alt="" inset="none" className="h-full w-full" sizes="96px" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
          <span className="text-accent">{post.category}</span>
          <span aria-hidden className="size-1 rounded-full bg-ink-faint" />
          <span>{post.readTime} min</span>
        </div>
        <h3 className="mt-1.5 font-display text-[1.0625rem] font-semibold leading-snug tracking-[-0.025em] sm:text-lg">
          {post.title}
        </h3>
        <p className="mt-1.5 hidden text-sm leading-relaxed text-ink-soft sm:block">{post.excerpt}</p>
      </div>
      <ArrowUpRight
        aria-hidden
        className="mt-1 hidden size-4 shrink-0 text-ink-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink sm:block"
      />
      <Link href={`/journal/${post.slug}`} className="absolute inset-0 rounded-card" aria-label={post.title}>
        <span className="sr-only">Read {post.title}</span>
      </Link>
    </article>
  );
}