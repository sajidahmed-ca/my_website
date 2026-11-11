import { Reveal } from "@/components/ui/Reveal";

type Step = { id: string; title: string; body: string };

/** Static class map — dynamic `grid-cols-*` strings would not be generated. */
const columns: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
};

type Props = {
  steps: Step[];
  className?: string;
  numbered?: boolean;
  tone?: "light" | "dark";
};

/**
 * Vertical or horizontal step flow. Used for the custom process
 * (01 Tell me your idea → 05 Final delivery) and the artist workflow on /about.
 */
export function ProcessSteps({ steps, className, numbered = true, tone = "light" }: Props) {
  const dark = tone === "dark";

  return (
    <ol
      className={
        numbered
          ? `grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:gap-y-0 ${columns[Math.min(steps.length, 5)]} ${className ?? ""}`
          : (className ?? "")
      }
    >
      {steps.map((step, index) => (
        <Reveal
          key={step.id}
          as="li"
          delay={index * 80}
          className="relative flex flex-col gap-2 lg:pr-8"
        >
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className={`font-display text-sm font-semibold tabular-nums ${
                dark ? "text-mustard" : "text-accent"
              }`}
            >
              {step.id}
            </span>
            <span aria-hidden className={`h-px flex-1 ${dark ? "bg-canvas/15" : "bg-line"}`} />
          </div>
          <h3 className={`font-display text-lg font-semibold tracking-tight ${dark ? "text-canvas" : ""}`}>
            {step.title}
          </h3>
          <p className={`text-sm leading-relaxed ${dark ? "text-canvas/60" : "text-ink-soft"}`}>{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}