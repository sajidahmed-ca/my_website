"use client";

import { useState, type FormEvent } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export type FormValues = Record<string, string>;

export type FormErrors = Partial<Record<keyof FormValues, string>>;

type Props<T extends FormValues> = {
  /** Validators return a message per field; empty object means valid. */
  validate?: (values: T) => FormErrors;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  resetLabel?: string;
  className?: string;
  children: (state: {
    values: T;
    setValue: (name: keyof T, value: string) => void;
    errors: FormErrors;
    disabled: boolean;
  }) => React.ReactNode;
};

type Status = "idle" | "submitting" | "success";

/**
 * Front-end only form shell.
 *
 * Validates in the browser, then shows a confirmation state instead of
 * pretending to deliver anything. Wiring a real endpoint (Formspree, Resend,
 * an API route, …) means replacing the marked `SUBMIT` block with a fetch and
 * mapping the response onto `setStatus`.
 */
export function ClientForm<T extends FormValues>({
  validate,
  submitLabel = "Send",
  successTitle = "Thanks — that's everything.",
  successBody = "This demo form does not send anything yet, so your message was not transmitted.",
  resetLabel = "Send another",
  className,
  children,
}: Props<T>) {
  const [values, setValues] = useState<T>(() => ({} as T));
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const setValue = (name: keyof T, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name as string]) return current;
      const next = { ...current };
      delete next[name as string];
      return next;
    });
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const found = validate?.(values) ?? {};
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus("idle");
      // Move focus to the first invalid control for keyboard and SR users.
      const firstField = Object.keys(found)[0];
      const node = event.currentTarget.querySelector<HTMLElement>(`[name="${firstField}"]`);
      node?.focus();
      return;
    }

    // SUBMIT — no backend is configured for this portfolio.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "flex flex-col items-start gap-3 rounded-card border border-line bg-surface p-7 sm:p-9",
          className,
        )}
      >
        <span className="grid size-11 place-items-center rounded-full bg-teal-tint text-teal">
          <Check aria-hidden className="size-5" />
        </span>
        <h3 className="font-display text-xl font-semibold tracking-[-0.03em]">{successTitle}</h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-soft">{successBody}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-2"
          onClick={() => {
            setValues({} as T);
            setErrors({});
            setStatus("idle");
          }}
        >
          {resetLabel}
        </Button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className={className}>
      {children({ values, setValue, errors, disabled: status === "submitting" })}
      <Button type="submit" size="lg" className="mt-2 w-full sm:w-auto" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden className="size-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            <Send aria-hidden className="size-4" />
            {submitLabel}
          </>
        )}
      </Button>
    </form>
  );
}