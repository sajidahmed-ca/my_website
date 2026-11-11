import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav, site, socialLinks } from "@/data/site";
import { Newsletter } from "@/components/marketing/Newsletter";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-canvas sm:mt-32">
      <div className="shell grid gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-4">
          <p className="font-display text-2xl font-semibold tracking-[-0.04em]">
            SAJID
            <span aria-hidden className="text-accent">
              .
            </span>
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-canvas/60">{site.shortDescription}</p>
          <a
            href={`mailto:${site.email}`}
            className="link-underline mt-6 inline-block py-1 text-sm text-canvas/85 hover:text-canvas"
          >
            {site.email}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-3">
          {footerNav.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-canvas/45">
                {column.title}
              </h2>
              <ul className="mt-4 flex flex-col gap-0.5">
                {column.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="link-underline inline-block py-1 text-sm text-canvas/75 transition-colors hover:text-canvas"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-[0.6875rem] font-semibold uppercase tracking-[0.18em] text-canvas/45">Elsewhere</h2>
          <ul className="mt-4 flex flex-col gap-0.5">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1 py-1 text-sm text-canvas/75 transition-colors hover:text-canvas"
                >
                  <span className="link-underline">{social.label}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-canvas/10">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-canvas/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} Sajid Ahmed. All rights reserved.
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Independent illustrator</span>
            <span aria-hidden className="hidden size-1 rounded-full bg-canvas/25 sm:block" />
            <span>{site.location}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}