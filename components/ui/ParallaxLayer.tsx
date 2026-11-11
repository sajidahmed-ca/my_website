"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max displacement in px at the pointer edge. */
  strength?: number;
  rotate?: boolean;
};

/**
 * Gentle pointer parallax for the hero artwork layer.
 *
 * Pure transform math on a single container, disabled for touch devices and
 * for reduced-motion users so nothing animates unnecessarily.
 */
export function ParallaxLayer({ children, className, strength = 12, rotate = true }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    node.style.setProperty("--px", `${(x * strength).toFixed(2)}px`);
    node.style.setProperty("--py", `${(y * strength).toFixed(2)}px`);
    node.style.setProperty("--pr", `${(x * (rotate ? 4 : 0)).toFixed(2)}deg`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--px", "0px");
    node.style.setProperty("--py", "0px");
    node.style.setProperty("--pr", "0deg");
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ ["--px" as string]: "0px", ["--py" as string]: "0px", ["--pr" as string]: "0deg" }}
      className={cn(
        "[transform:translate3d(var(--px),var(--py),0)_rotate(var(--pr))] [transition:transform_700ms_cubic-bezier(.22,1,.36,1)] motion-reduce:[transform:none]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function ParallaxLink({
  href,
  className,
  children,
  label,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  label: string;
}) {
  return (
    <Link href={href} aria-label={label} className={cn("block", className)}>
      {children}
    </Link>
  );
}