import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Droplets, Layers, Package, Ruler, Truck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ShopBrowser } from "@/components/shop/ShopBrowser";
import { ProductGallery } from "@/components/shop/ProductGallery";
import { ProductCard } from "@/components/shop/ProductCard";
import { CustomProcess } from "@/components/custom/CustomProcess";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";
import { getRelatedProducts, getSticker } from "@/lib/content";
import { buildMetadata } from "@/lib/metadata";
import type { Sticker } from "@/data/types";

export const metadata: Metadata = buildMetadata({
  title: "Shop",
  description:
    "Sticker packs, individual die-cut stickers and digital downloads by Sajid Ahmed. Water-resistant vinyl, matte finish, sizes from 60 mm to 120 mm.",
  path: "/shop",
});

const specs = [
  { icon: Droplets, label: "Material", value: "Water-resistant matte vinyl" },
  { icon: Layers, label: "Finish", value: "Matte, UV-laminated edge" },
  { icon: Ruler, label: "Sizes", value: "60, 70, 80, 90, 120 mm" },
  { icon: Package, label: "Packs", value: "3, 5 or 8 designs" },
  { icon: Truck, label: "Shipping", value: "Flat mailer, tracked" },
];

export default function ShopPage() {
  const featured = products[0];
  const featuredArt = featured
    ? featured.stickers.map((slug) => getSticker(slug)).filter((s): s is Sticker => Boolean(s))
    : [];
  const alsoLike = featured ? getRelatedProducts(featured.slug, 3) : [];

  return (
    <>
      <section className="shell pb-12 pt-14 sm:pb-14 sm:pt-20">
        <Reveal>
          <p className="eyebrow">Shop</p>
          <h1 className="display-lg mt-5 max-w-3xl">Stickers, ready to stick</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink-soft">
            Packs, singles and downloads — {products.length} products across four formats. Every price, size and
            finish below is real catalogue data.
          </p>
        </Reveal>
      </section>

      {featured && featuredArt.length > 0 ? (
        <section className="border-y border-line bg-surface-sunk py-14 sm:py-16">
          <div className="shell grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-14">
            <Reveal from="left" className="lg:col-span-6">
              <ProductGallery stickers={featuredArt} productName={featured.name} />
            </Reveal>
            <Reveal from="right" delay={80} className="lg:col-span-6">
              <p className="eyebrow">Featured</p>
              <h2 className="display-md mt-4">{featured.name}</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{featured.description}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {featured.details.slice(0, 3).map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted">{detail.label}</dt>
                    <dd className="mt-1 text-sm font-medium">{detail.value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                href={`/shop/${featured.slug}`}
                className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-canvas transition-colors hover:bg-ink-soft"
              >
                View {featured.name}
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <div className="mt-14 sm:mt-16">
        <ShopBrowser products={products} />
      </div>

      <section className="shell py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="Specifications"
          title="Materials & shipping"
          align="left"
          intro="What is actually specified for every physical sticker, whatever the design."
        />
        <dl className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {specs.map((spec, index) => (
            <Reveal key={spec.label} delay={index * 60}>
              <div className="h-full rounded-card border border-line bg-surface p-5">
                <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-muted">
                  <spec.icon aria-hidden className="size-4 text-accent" />
                  {spec.label}
                </dt>
                <dd className="mt-2.5 text-sm font-medium leading-relaxed">{spec.value}</dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </section>

      <section className="border-y border-line bg-surface-sunk py-16 sm:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Custom"
            title="From brief to doorstep"
            intro="Custom work follows the same five steps, whatever the size or the deadline."
            align="left"
            action={
              <Link
                href="/custom"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink"
              >
                How custom work works
                <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />
          <div className="mt-10 rounded-tile border border-line bg-surface p-7 sm:p-10">
            <CustomProcess />
          </div>
        </div>
      </section>

      {alsoLike.length > 0 ? (
        <section className="shell py-16 sm:py-20">
          <SectionHeading
            eyebrow="Also in the shop"
            title="You might like"
            align="left"
            action={
              <Link href="/shop" className="group inline-flex items-center gap-1.5 text-sm font-medium text-ink">
                All products
                <ArrowRight aria-hidden className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            }
          />
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {alsoLike.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}