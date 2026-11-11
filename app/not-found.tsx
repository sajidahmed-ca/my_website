import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { stickers } from "@/data/stickers";
import { StickerArt } from "@/components/ui/StickerArt";

/** Friendly 404. Also serves as the fallback for any removed content slug. */
export default function NotFound() {
  const samples = stickers.slice(0, 3);

  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <span aria-hidden className="grid size-14 place-items-center rounded-full bg-accent-tint text-accent">
        <Compass className="size-6" />
      </span>

      <p className="eyebrow mt-7">Error 404</p>
      <h1 className="display-lg mt-4 max-w-2xl">That sticker has wandered off</h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
        The page you were looking for is not here. It may have been renamed, or the link might be out of date.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/stickers" size="lg">
          Browse the library
          <ArrowLeft aria-hidden className="size-4" />
        </Button>
        <Button href="/" variant="outline" size="lg">
          Back home
        </Button>
      </div>

      <ul className="mt-14 flex items-end justify-center gap-4">
        {samples.map((sticker) => (
          <li key={sticker.id} className="w-16 sm:w-20">
            <Link href={`/stickers/${sticker.slug}`} className="block transition-transform duration-300 hover:-translate-y-1">
              <StickerArt src={sticker.image} alt={sticker.alt} inset="none" sizes="80px" />
              <span className="sr-only">{sticker.title}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}