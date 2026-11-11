"use client";

import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { getBuyable } from "@/lib/catalog";
import { cartNotice, formatPrice } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { useCart } from "./CartProvider";

/**
 * Cart drawer — front-end only.
 *
 * Integration point: replace the "Continue shopping" block with your provider's
 * checkout-session creation (Stripe, Lemon Squeezy, Shopify, …), passing
 * `lines` (`[{ slug, quantity }]`) so a session can be built server-side.
 * Nothing in this component contacts a payment provider.
 */
export function CartDrawer() {
  const { lines, subtotal, isOpen, close, setQuantity, remove, count } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
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
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      previousFocus?.focus?.();
    };
  }, [isOpen, close]);

  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden
        className={`fixed inset-0 z-90 ${isOpen ? "" : "pointer-events-none"}`}
      >
        <button
          type="button"
          tabIndex={-1}
          onClick={close}
          className={`absolute inset-0 bg-ink/35 backdrop-blur-[2px] transition-opacity duration-400 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      <aside
        ref={panelRef}
        role="dialog"
        aria-modal={isOpen ? true : undefined}
        aria-label="Shopping cart"
        inert={!isOpen}
        className={`fixed right-0 top-0 z-90 flex h-full w-full max-w-[26rem] flex-col border-l border-line bg-canvas shadow-[-24px_0_60px_-30px_rgba(26,22,20,0.5)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 className="font-display text-[1.125rem] font-semibold tracking-[-0.03em]">
            <span className="inline-flex items-center gap-2.5">
              <ShoppingBag aria-hidden className="size-5 text-accent" />
              Your cart
            </span>{" "}
            {count > 0 ? <span className="text-ink-muted">({count})</span> : null}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="-mr-2 grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <X aria-hidden className="size-5" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span aria-hidden className="grid size-14 place-items-center rounded-full bg-surface text-ink-faint">
              <ShoppingBag className="size-6" />
            </span>
            <p className="font-display text-lg font-semibold tracking-tight">Nothing in here yet</p>
            <p className="text-sm leading-relaxed text-ink-soft">
              Pick a single sticker, a pack or a digital download and it will show up here.
            </p>
            <Button href="/shop" variant="outline" size="sm" onClick={close}>
              Browse the shop
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {lines.map((line) => {
                const item = getBuyable(line.slug);
                if (!item) return null;
                return (
                  <li key={line.slug} className="flex gap-4 py-5">
                    <Link
                      href={item.href}
                      onClick={close}
                      className="relative grid size-20 shrink-0 place-items-center rounded-2xl border border-line bg-surface-sunk p-1.5"
                    >
                      <Image src={item.image} alt="" width={72} height={72} className="art-contain" />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[0.9375rem] font-semibold tracking-tight">{item.name}</p>
                      <p className="mt-0.5 text-xs text-ink-muted">{item.variant}</p>

                      <div className="mt-3 flex items-center justify-between gap-3">
                        <div className="flex items-center rounded-full border border-line bg-surface">
                          <button
                            type="button"
                            onClick={() => setQuantity(line.slug, line.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="grid size-8 place-items-center rounded-full text-ink-soft transition-colors hover:text-ink"
                          >
                            <Minus aria-hidden className="size-3.5" />
                          </button>
                          <span aria-live="polite" className="min-w-6 text-center text-sm tabular-nums">
                            {line.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQuantity(line.slug, line.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="grid size-8 place-items-center rounded-full text-ink-soft transition-colors hover:text-ink"
                          >
                            <Plus aria-hidden className="size-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-medium tabular-nums">
                          {formatPrice(item.price * line.quantity)}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => remove(line.slug)}
                        className="mt-2.5 text-xs text-ink-muted underline underline-offset-4 transition-colors hover:text-accent"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <footer className="border-t border-line bg-surface px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-ink-soft">Subtotal</span>
                <span className="font-display text-2xl font-semibold tracking-tight tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-muted">{cartNotice}</p>
              <Button href="/shop" className="mt-4 w-full" onClick={close}>
                Continue shopping
              </Button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}