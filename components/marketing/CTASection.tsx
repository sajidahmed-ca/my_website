import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

type Props = {
  eyebrow?: string;
  title: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "ink" | "accent" | "canvas";
};

/** Reusable conversion panel used on the homepage, custom page and shop. */
export function CTASection({ eyebrow, title, body, primary, secondary, tone = "ink" }: Props) {
  const tones = {
    ink: "bg-ink text-canvas",
    accent: "bg-accent text-white",
    canvas: "bg-canvas-deep text-ink border border-line",
  } as const;

  const dark = tone !== "canvas";

  return (
    <section className={`${tones[tone]} overflow-hidden`}>
      <div className="shell py-16 sm:py-20 lg:py-24">
        <Reveal className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            {eyebrow ? (
              <p className={`eyebrow ${dark ? "!text-canvas/50" : ""}`}>{eyebrow}</p>
            ) : null}
            <p className="display-lg mt-4 whitespace-pre-line">
              {title}
            </p>
            {body ? (
              <p className={`mt-5 max-w-xl text-base leading-relaxed ${dark ? "text-canvas/70" : "text-ink-soft"}`}>
                {body}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-3 lg:col-span-5 lg:justify-end">
            {primary ? (
              <Button
                href={primary.href}
                size="lg"
                className={
                  dark
                    ? "bg-canvas text-ink hover:bg-white"
                    : "bg-ink text-canvas hover:bg-ink-soft"
                }
              >
                {primary.label}
                <ArrowRight aria-hidden className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
            ) : null}
            {secondary ? (
              <Button
                href={secondary.href}
                size="lg"
                variant="outline"
                className={
                  dark
                    ? "border-canvas/25 bg-transparent text-canvas hover:border-canvas/50 hover:bg-canvas/10"
                    : undefined
                }
              >
                {secondary.label}
              </Button>
            ) : null}
          </div>
        </Reveal>
      </div>
    </section>
  );
}