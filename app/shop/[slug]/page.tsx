import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Info } from "lucide-react";
import { products } from "@/data/products";
import { getRelatedProducts, getSticker } from "@/lib/content";
import { formatPrice, shopNotice, site } from "@/data/site";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductCard } from "@/components/shop/ProductCard";
import { StickerCard } from "@/components/stickers/StickerCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { breadcrumbSchema, buildMetadata } from "@/lib/metadata";
import type { Sticker } from "@/data/types";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) {
    return buildMetadata({ title: "Product not found", description: site.description, path: `/shop/${slug}` });
  }

  return buildMetadata({
    title: product.name,
    description: `${product.description} ${formatPrice(product.price)}. ${product.format}, ${product.availability}.`,
    path: `/shop/${product.slug}`,
    image: getSticker(product.stickers[0])?.image,
  });
}

export default async function ProductDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const product = products.find((entry) => entry.slug === slug);
  if (!product) notFound();

  const artwork = product.stickers.map((s) => getSticker(s)).filter((s): s is Sticker => Boolean(s));
  const related = getRelatedProducts(product.slug, 3);
  const soldOut = product.availability === "Sold out";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Shop", path: "/shop" },
            { name: product.name, path: `/shop/${product.slug}` },
          ]),
        }}
      />

      <div className="shell pt-10 sm:pt-14">
        <nav aria-label="Breadcrumb">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft aria-hidden className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            All products
          </Link>
        </nav>
      </div>

      <section className="shell grid gap-10 py-10 sm:py-14 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <ProductGallery stickers={artwork} productName={product.name} />
        </div>

        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">{product.format}</p>
            <h1 className="display-md mt-3">{product.name}</h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{product.description}</p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-display text-3xl font-semibold tracking-tight tabular-nums">
                {formatPrice(product.price)}
              </span>
              <span className="rounded-full border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink-soft">
                {product.availability}
              </span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {soldOut ? (
                <span className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface-sunk px-6 text-sm font-medium text-ink-muted">
                  Currently unavailable
                </span>
              ) : (
                <AddToCartButton
                  slug={product.slug}
                  size="lg"
                  label={product.format === "Digital Downloads" ? "Add download" : "Add to cart"}
                  className="min-w-[13rem]"
                />
              )}
              <Link
                href="/custom"
                className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface px-5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
              >
                Customise instead
              </Link>
            </div>

            <aside className="mt-6 flex items-start gap-3 rounded-card border border-mustard/30 bg-mustard-tint p-4">
              <Info aria-hidden className="mt-0.5 size-4.5 shrink-0 text-mustard" />
              <p className="text-sm leading-relaxed text-ink-soft">{shopNotice.body}</p>
            </aside>

            <dl className="mt-8 divide-y divide-line border-y border-line">
              {product.details.map((detail) => (
                <div key={detail.label} className="flex items-baseline justify-between gap-6 py-3.5">
                  <dt className="text-sm text-ink-muted">{detail.label}</dt>
                  <dd className="text-right text-sm font-medium">{detail.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 flex flex-col gap-2.5">
              {["Die-cut to the artwork outline", "Water-resistant matte vinyl", "Ships flat in a rigid mailer"].map(
                (line) => (
                  <li key={line} className="flex items-center gap-2.5 text-sm text-ink-soft">
                    <Check aria-hidden className="size-4 shrink-0 text-teal" />
                    {line}
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </section>

      {artwork.length > 0 ? (
        <section className="border-y border-line bg-surface-sunk py-16 sm:py-20">
          <div className="shell">
            <SectionHeading
              eyebrow="In this pack"
              title="The artwork"
              intro={`Every design included in ${product.name}.`}
              align="left"
            />
            <div className="mt-9 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
              {artwork.map((sticker, index) => (
                <Reveal key={sticker.id} delay={index * 60}>
                  <StickerCard sticker={sticker} variant="flat" sizes="(min-width: 1280px) 19rem, 44vw" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="shell py-16 sm:py-20 lg:py-24">
          <SectionHeading
            eyebrow="More from the shop"
            title="Related products"
            align="left"
            action={
              <Link href="/shop" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                All products
                <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((entry) => (
              <ProductCard key={entry.id} product={entry} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}