"use client";

import { Menu, Search, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, socialLinks } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/components/cart/CartProvider";
import { cn } from "@/lib/cn";
import { SearchOverlay } from "./SearchOverlay";
import { Wordmark } from "./Wordmark";

const isActive = (pathname: string, href: string) =>
  pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

export function Navbar() {
  const pathname = usePathname();
  const { count, ready, open: openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlays on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // ⌘K / Ctrl+K opens search, "/" when not typing.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      } else if (event.key === "/" && !typing && !searchOpen) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [searchOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-canvas"
      >
        Skip to content
      </a>

      <header
        className={cn(
          "sticky top-0 z-70 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-line bg-canvas/85 backdrop-blur-xl"
            : "border-transparent bg-canvas/60 backdrop-blur-sm",
        )}
      >
        <div className="shell flex h-16 items-center gap-4 lg:h-[4.5rem]">
          <Wordmark />

          <nav aria-label="Primary" className="ml-4 hidden lg:block">
            <ul className="flex items-center gap-7">
              {primaryNav.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative py-1 text-[0.875rem] transition-colors duration-300",
                        active ? "font-medium text-ink" : "text-ink-soft hover:text-ink",
                      )}
                    >
                      <span className="link-underline">{item.label}</span>
                      <span
                        aria-hidden
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-400 ease-[cubic-bezier(.22,1,.36,1)]",
                          active && "scale-x-100",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search stickers"
              className="grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <Search aria-hidden className="size-[1.15rem]" />
            </button>

            <button
              type="button"
              onClick={openCart}
              aria-label={`Cart${ready && count > 0 ? `, ${count} item${count === 1 ? "" : "s"}` : ", empty"}`}
              className="relative grid size-10 place-items-center rounded-full text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <ShoppingBag aria-hidden className="size-[1.15rem]" />
              {ready && count > 0 ? (
                <span className="absolute right-1 top-1 grid min-w-4 place-items-center rounded-full bg-accent px-1 text-[0.625rem] font-semibold leading-4 text-white">
                  {count}
                </span>
              ) : null}
            </button>

            {/* Wrapper owns the responsive display so the button's own
                `inline-flex` cannot win the class conflict. */}
            <span className="ml-1 hidden sm:block">
              <Button href="/contact" size="sm">
                Contact
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              className="ml-1 grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5 lg:hidden"
            >
              <Menu aria-hidden className="size-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------------- mobile */}
      <div className={`fixed inset-0 z-95 lg:hidden ${menuOpen ? "" : "pointer-events-none"}`} aria-hidden={!menuOpen}>
        <button
          type="button"
          tabIndex={-1}
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-ink/40 backdrop-blur-[3px] transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0",
          )}
        />

        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className={cn(
            "absolute right-0 top-0 flex h-full w-[min(23rem,88vw)] flex-col border-l border-line bg-canvas shadow-[-24px_0_60px_-30px_rgba(26,22,20,0.5)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
            menuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <Wordmark />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="grid size-10 place-items-center rounded-full text-ink transition-colors hover:bg-ink/5"
            >
              <X aria-hidden className="size-5" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col">
              {primaryNav.map((item, index) => {
                const active = isActive(pathname, item.href);
                return (
                  <li
                    key={item.href}
                    style={{ transitionDelay: menuOpen ? `${90 + index * 45}ms` : "0ms" }}
                    className={cn(
                      "border-b border-line transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                      menuOpen ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
                    )}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className="flex items-baseline justify-between py-4"
                    >
                      <span
                        className={cn(
                          "font-display text-xl font-semibold tracking-[-0.03em]",
                          active ? "text-accent" : "text-ink",
                        )}
                      >
                        {item.label}
                      </span>
                      <span aria-hidden className="text-xs text-ink-faint">
                        0{index + 1}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-line bg-surface px-4 py-3 text-sm text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </nav>

          <div className="border-t border-line p-5">
            <Button href="/custom/request" className="w-full" onClick={() => setMenuOpen(false)}>
              Request a custom sticker
            </Button>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}