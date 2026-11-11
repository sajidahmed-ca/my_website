import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/data/site";

type Props = {
  className?: string;
  /** Renders the wordmark plus an optional trailing label. */
  compact?: boolean;
};

/** Minimal custom wordmark: SAJID + a red dot, no image asset required. */
export function Wordmark({ className, compact = false }: Props) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={cn(
        // Negative margin grows the touch target to 44px+ without
        // changing the header's visual rhythm.
        "group inline-flex shrink-0 items-baseline gap-1.5 py-2.5 -my-2.5 font-display text-[1.0625rem] font-semibold tracking-[-0.045em] text-ink sm:text-xl",
        className,
      )}
    >
      <span className="relative">
        {site.wordmark}
        <span
          aria-hidden
          className="absolute -right-[0.42em] -top-[0.18em] size-[0.3em] rounded-full bg-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-150"
        />
      </span>
      {!compact ? (
        <span className="hidden text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink-muted lg:inline">
          Sticker Studio
        </span>
      ) : null}
    </Link>
  );
}