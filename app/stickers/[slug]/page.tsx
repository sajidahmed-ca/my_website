import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Layers, Ruler, Sparkles } from "lucide-react";
import { getProductsForSticker, getRelatedStickers, getSticker } from "@/lib/content";
import { stickers } from "@/data/stickers";
import { collectionBySlug } from "@/data/collections";
import { formatPrice, site } from "@/data/site";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { StickerGrid } from "@/components/stickers/StickerGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { artworkSchema, breadcrumbSchema, buildMetadata } from "@/lib/metadata";

/** Pre-render every artwork detail page. */
export function generateStaticParams() {
  return stickers.map((sticker) => ({ slug: sticker.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const sticker = getSticker(slug);
  if (!sticker) return buildMetadata({ title: "Sticker not found", description: site.description, path: `/stickers/${slug}` });

  return buildMetadata({
    title: `${sticker.title} Sticker`,
    description: sticker.description,
    path: `/stickers/${sticker.slug}`,
    image: sticker.image,
  });
}

export default async function StickerDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const sticker = getSticker(slug);
  if (!sticker) notFound();

  const collection = collectionBySlug.get(sticker.collection);
  const related = getRelatedStickers(sticker.slug, 4);
  const products = getProductsForSticker(sticker.slug);

  const specs = [
    { icon: Layers, label: "Format", value: sticker.type },
    { icon: Ruler, label: "Size", value: "60–120 mm" },
    { icon: Sparkles, label: "From", value: formatPrice(sticker.price) },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: artworkSchema(sticker) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Stickers", path: "/stickers" },
            { name: sticker.title, path: `/stickers/${sticker.slug}` },
          ]),
        }}
      />

      <div className="shell pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb">
          <Link
            href="/stickers"
            className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            All stickers
          </Link>
        </nav>
      </div>

      <section className="shell grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div
            className="relative aspect-square overflow-hidden rounded-tile border border-line bg-surface-sunk paper-grain shadow-sheet"
            style={{ aspectRatio: `1 / ${sticker.ratio}` }}
          >
            <Image
              src={sticker.image}
              alt={sticker.alt}
              fill
              sizes="(min-width: 1024px) 44rem, 94vw"
              className="object-contain p-10 sm:p-16"
              priority
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <Reveal>
            {collection ? (
              <Link
                href={`/collections/${collection.slug}`}
                className="text-xs font-semibold uppercase tracking-[0.14em] text-accent hover:underline hover:underline-offset-4"
              >
                {collection.title}
              </Link>
            ) : null}

            <h1 className="display-md mt-3">{sticker.title}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{sticker.description}</p>

            <dl className="mt-7 grid grid-cols-3 gap-3">
              {specs.map((spec) => (
                <div key={spec.label} className="rounded-2xl border border-line bg-surface p-3.5">
                  <dt className="flex items-center gap-1.5 text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">
                    <spec.icon aria-hidden className="size-3.5" />
                    {spec.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold tabular-nums">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <AddToCartButton slug={sticker.slug} size="lg" className="min-w-[13rem]" />
              <Link
                href="/custom"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                Customise this
              </Link>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-ink-muted">
              Prices are live data. Checkout is not connected yet, so nothing is charged and no card details are
              collected — see the shop for how ordering would work.
            </p>

            <div className="mt-8 border-t border-line pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">Tags</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {sticker.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line bg-surface px-3 py-1.5 text-sm text-ink-soft"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {products.length > 0 ? (
        <section className="border-y border-line bg-surface-sunk py-16 sm:py-20">
          <div className="shell">
            <SectionHeading
              eyebrow="Available as"
              title="Where this artwork ships"
              intro="This illustration is already part of these products."
              action={
                <Link href="/shop" className="group text-sm font-medium text-ink">
                  All products
                  <ArrowRight aria-hidden className="ml-1 inline size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              }
            />
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <Reveal key={product.id} delay={index * 70}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="shell py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="More like this"
            title="Related Stickers"
            align="left"
            action={
              <Link href="/stickers" className="group text-sm font-medium text-ink">
                Browse everything
                <ArrowRight aria-hidden className="ml-1 inline size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />
          <div className="mt-9">
            <StickerGrid stickers={related} sizes="(min-width: 1280px) 19rem, 44vw" />
          </div>
        </section>
      ) : null}
    </>
  );
}