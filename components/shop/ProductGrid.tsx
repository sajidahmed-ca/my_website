import type { Product } from "@/data/types";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  priorityCount?: number;
  className?: string;
};

export function ProductGrid({ products, priorityCount = 0, className }: Props) {
  return (
    <div className={`grid gap-5 sm:gap-6 sm:grid-cols-2 xl:grid-cols-3 ${className ?? ""}`}>
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} priority={index < priorityCount} />
      ))}
    </div>
  );
}