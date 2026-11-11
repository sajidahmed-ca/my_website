import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { collections } from "@/data/collections";
import { getCollectionNeighbours, getStickersByCollection } from "@/lib/content";
import { CollectionNav } from "@/components/collections/CollectionNav";
import { StickerGrid } from "@/components/stickers/StickerGrid";
import { Reveal } from "@/components/ui/Reveal";
import { breadcrumbSchema, buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const collection = collections.find((entry) => entry.slug === slug);
  if (!collection) {
    return buildMetadata({ title: "Collection not found", description: site.description, path: `/collections/${slug}` });
  }

  return buildMetadata({
    title: `${collection.title} Collection`,
    description: collection.description,
    path: `/collections/${collection.slug}`,
    image: collection.coverImage,
  });
}

export default async function CollectionDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const collection = collections.find((entry) => entry.slug === slug);
  if (!collection) notFound();

  const items = getStickersByCollection(collection.slug);
  const { previous, next } = getCollectionNeighbours(collection.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Collections", path: "/collections" },
            { name: collection.title, path: `/collections/${collection.slug}` },
          ]),
        }}
      />

      <section className="shell pt-12 sm:pt-16">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <Link
              href="/collections"
              className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
            >
              <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              All collections
            </Link>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <p className="eyebrow">
                {items.length} {items.length === 1 ? "artwork" : "artworks"}
              </p>
              <h1 className="display-xl mt-4">{collection.title}</h1>
              <p className="editorial-serif mt-4 text-xl leading-snug text-ink-soft sm:text-2xl">
                {collection.tagline}
              </p>
            </div>
            <p className="text-base leading-relaxed text-ink-soft lg:col-span-5">{collection.description}</p>
          </div>
        </Reveal>
      </section>

      <section className="shell py-12 sm:py-16">
        <Reveal from="scale" className="relative overflow-hidden rounded-tile border border-line bg-surface-sunk paper-grain shadow-sheet">
          <div className="relative aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src={collection.coverImage}
              alt={collection.alt}
              fill
              sizes="(min-width: 1280px) 78rem, 94vw"
              className="art-contain p-8 sm:p-16"
              priority
            />
          </div>
        </Reveal>
      </section>

      <section className="shell pb-16 sm:pb-20">
        <div className="flex items-end justify-between gap-4 border-b border-line pb-5">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">The full set</h2>
          <Link
            href="/stickers"
            className="group hidden shrink-0 text-sm font-medium text-ink sm:inline-flex sm:items-center sm:gap-1.5"
          >
            Browse all stickers
            <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-9">
          <StickerGrid stickers={items} priorityCount={4} layout="masonry" />
        </div>
      </section>

      <div className="shell pb-16 sm:pb-24">
        <CollectionNav previous={previous} next={next} />
      </div>
    </>
  );
}