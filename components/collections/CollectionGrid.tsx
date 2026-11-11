import type { Collection } from "@/data/types";
import { CollectionCard } from "./CollectionCard";

type Props = {
  collections: Collection[];
  className?: string;
};

export function CollectionGrid({ collections, className }: Props) {
  return (
    <div className={`grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 ${className ?? ""}`}>
      {collections.map((collection) => (
        <CollectionCard key={collection.id} collection={collection} />
      ))}
    </div>
  );
}