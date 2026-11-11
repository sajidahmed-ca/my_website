import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { stickers } from "@/data/stickers";
import { socialLinks } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StickerArt } from "@/components/ui/StickerArt";

/**
 * Latest-artwork wall.
 * Static local data — no social API is contacted. The platform buttons are
 * plain external links.
 */
export function SocialGridSection() {
  const latest = [...stickers].slice(-8).reverse();

  return (
    <section className="shell py-20 sm:py-24 lg:py-28">
      <SectionHeading
        eyebrow="Latest"
        title="Fresh off the desk"
        intro="The most recent additions to the library. New work posts first on X and Instagram."
        action={
          <ul className="flex flex-wrap gap-2">
            {socialLinks.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-2 text-sm text-ink-soft transition-colors hover:border-ink/25 hover:text-ink"
                >
                  {social.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        }
      />

      <ul className="mt-9 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-4 sm:gap-4">
        {latest.map((sticker, index) => (
          <Reveal
            key={sticker.id}
            as="li"
            delay={(index % 4) * 60}
            className={
              // Staggered column offsets give the wall a hand-pinned rhythm.
              index % 4 === 1 ? "sm:translate-y-6" : index % 4 === 3 ? "sm:-translate-y-4" : ""
            }
          >
            <Link
              href={`/stickers/${sticker.slug}`}
              className="group relative flex items-center justify-center rounded-card border border-line bg-surface p-3 transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:shadow-sheet motion-reduce:hover:translate-y-0"
            >
              <div className="w-full transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105 motion-reduce:group-hover:scale-100">
                <StickerArt src={sticker.image} alt={sticker.alt} inset="none" sizes="(min-width: 640px) 16rem, 45vw" />
              </div>
              <span className="sr-only">{sticker.title}</span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}