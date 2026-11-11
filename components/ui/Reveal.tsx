"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Stagger in ms. */
  delay?: number;
  /** Visible immediately (above the fold) instead of waiting for the observer. */
  eager?: boolean;
  from?: "up" | "left" | "right" | "scale";
  as?: ElementType;
};

/**
 * Reveals content on first scroll into view.
 *
 * Rendered without the hiding attribute until after mount, so if JavaScript
 * never runs the content is simply visible. Respects reduced motion via the
 * CSS layer rather than by branching in JS.
 */
export function Reveal({ children, className, delay = 0, eager = false, from = "up", as: Tag = "div" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "in">(eager ? "in" : "idle");

  useEffect(() => {
    const node = ref.current;
    if (!node || state === "in") return;

    if (typeof IntersectionObserver === "undefined") {
      setState("in");
      return;
    }

    setState("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("in");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [state]);

  return (
    <Tag
      ref={ref}
      data-reveal={state === "idle" ? undefined : state === "in" ? "in" : "out"}
      data-reveal-dir={from === "up" ? undefined : from}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}