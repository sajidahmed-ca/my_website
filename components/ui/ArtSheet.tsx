import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Adds the dotted paper texture used behind artwork walls. */
  grain?: boolean;
};

/** Bordered "sticker sheet" surface used for artwork panels across the site. */
export function ArtSheet({ children, className, grain = false }: Props) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-tile border border-line bg-surface-sunk",
        grain && "paper-grain",
        className,
      )}
    >
      {children}
    </div>
  );
}