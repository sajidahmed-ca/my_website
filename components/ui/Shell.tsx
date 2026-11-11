import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
};

/** Consistent horizontal page gutter. */
export function Shell({ children, className, id }: Props) {
  return (
    <div id={id} className={cn("shell", className)}>
      {children}
    </div>
  );
}

/** Narrow reading measure for articles and forms. */
export function ShellNarrow({ children, className, id }: Props) {
  return (
    <div id={id} className={cn("shell-narrow", className)}>
      {children}
    </div>
  );
}