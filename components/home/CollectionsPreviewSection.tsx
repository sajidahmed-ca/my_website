import { ArrowRight } from "lucide-react";
import { collections } from "@/data/collections";
import { Button } from "@/components/ui/Button";
import { CollectionCard } from "@/components/collections/CollectionCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function CollectionsPreviewSection() {
  const preview = collections.slice(0, 6);

  return (
    <section className="border-y border-line bg-surface-sunk py-20 sm:py-24 lg:py-28">
      <div className="shell">
        <SectionHeading
          eyebrow="Collections"
          title="Explore the World"
          intro="Six worlds, drawn with one hand and one palette. Each collection has its own weather."
          action={
            <Button href="/collections" variant="outline">
              All collections
              <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </Button>
          }
        />

        {/* First card runs large to break the grid rhythm. */}
        <div className="mt-9 grid gap-5 sm:mt-10 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {preview.map((collection, index) => (
            <Reveal key={collection.id} delay={index * 70} className={index === 0 ? "md:col-span-2 xl:col-span-2" : ""}>
              <CollectionCard collection={collection} size={index === 0 ? "lg" : "md"} priority={index === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}