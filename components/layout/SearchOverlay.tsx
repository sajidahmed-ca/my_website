"use client";

import { CornerDownLeft, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { searchDocs, searchIndex, SearchResultPreview } from "./search-index";

type Props = {
  open: boolean;
  onClose: () => void;
};

const SUGGESTIONS = ["New York", "tea", "travel", "food", "night", "holo"];

export function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const frame = window.requestAnimationFrame(() => inputRef.current?.focus());

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      // Keep Tab inside the dialog while it is open.
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      window.cancelAnimationFrame(frame);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const results = useMemo(() => searchDocs(query), [query]);

  return (
    <div className={`fixed inset-0 z-95 ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        type="button"
        tabIndex={-1}
        aria-label="Close search"
        onClick={onClose}
        className={`absolute inset-0 bg-ink/40 backdrop-blur-[3px] transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal={open ? true : undefined}
        aria-label="Search the sticker library"
        inert={!open}
        className={`relative mx-auto flex w-full max-w-2xl flex-col overflow-hidden rounded-t-tile border border-line bg-canvas shadow-[0_40px_90px_-40px_rgba(26,22,20,0.6)] transition-all duration-400 ease-[cubic-bezier(.22,1,.36,1)] ${
          open ? "mt-[12vh] translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <Search aria-hidden className="size-5 shrink-0 text-ink-muted" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter" || results.length === 0) return;
              event.preventDefault();
              onClose();
              router.push(results[0].href);
            }}
            placeholder="Search stickers, collections, shop and journal…"
            aria-label="Search"
            className="h-9 min-w-0 flex-1 rounded-lg bg-transparent text-base placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-search-cancel-button]:hidden"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="-mr-1 grid size-11 shrink-0 place-items-center rounded-full text-ink-muted transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X aria-hidden className="size-4" />
          </button>
        </div>

        <div className="max-h-[min(28rem,58vh)] overflow-y-auto">
          {query.trim().length < 2 ? (
            <div className="px-5 py-5">
              <p className="eyebrow mb-3">Try searching for</p>
              <ul className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((term) => (
                  <li key={term}>
                    <button
                      type="button"
                      onClick={() => setQuery(term)}
                      className="rounded-full border border-line bg-surface px-4 py-3 text-sm text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
                    >
                      {term}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs leading-relaxed text-ink-muted">
                {searchIndex.length} artworks, collections, products and journal entries are indexed locally.
              </p>
            </div>
          ) : results.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-ink-muted">
              Nothing matches “{query}”. Try a city, a mood or a collection name.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {results.map((doc) => (
                <li key={doc.href}>
                  <Link
                    href={doc.href}
                    onClick={onClose}
                    className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-surface-sunk"
                  >
                    <SearchResultPreview doc={doc} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[0.9375rem] font-semibold tracking-tight">
                        {doc.title}
                      </span>
                      <span className="block truncate text-xs text-ink-muted">{doc.subtitle}</span>
                    </span>
                    <span className="hidden shrink-0 rounded-full border border-line px-2 py-0.5 text-[0.625rem] uppercase tracking-[0.12em] text-ink-muted sm:block">
                      {doc.kind}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line bg-surface-sunk px-5 py-3">
          <p className="hidden items-center gap-1.5 text-[0.6875rem] text-ink-muted sm:flex">
            <CornerDownLeft aria-hidden className="size-3" /> Enter to open the first result
          </p>
          <Button href="/stickers" variant="ghost" size="sm" onClick={onClose} className="ml-auto min-h-11">
            Browse all stickers
          </Button>
        </div>
      </div>
    </div>
  );
}