"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useCart } from "./CartProvider";
import { cn } from "@/lib/cn";

type Props = {
  /** Slug of a product or a single artwork — resolved by `lib/catalog`. */
  slug: string;
  label?: string;
  className?: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
  quantity?: number;
  disabled?: boolean;
};

export function AddToCartButton({
  slug,
  label = "Add to cart",
  className,
  variant = "primary",
  size = "md",
  quantity = 1,
  disabled = false,
}: Props) {
  const { add, open } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    add(slug, quantity);
    setAdded(true);
    open();
    window.setTimeout(() => setAdded(false), 2400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || added}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 font-medium transition-all duration-300 ease-[cubic-bezier(.22,1,.36,1)] active:translate-y-px disabled:translate-y-0",
        size === "lg" ? "h-12 text-[0.9375rem]" : "h-11 text-sm",
        variant === "primary"
          ? "bg-accent text-white shadow-[0_10px_24px_-12px_rgba(200,64,47,0.9)] hover:bg-accent-dark"
          : "border border-line bg-surface text-ink hover:border-ink/30 hover:bg-surface-sunk",
        added && "bg-teal text-white",
        className,
      )}
    >
      {added ? (
        <>
          <Check aria-hidden className="size-4" />
          <span role="status">Added to cart</span>
        </>
      ) : (
        label
      )}
    </button>
  );
}