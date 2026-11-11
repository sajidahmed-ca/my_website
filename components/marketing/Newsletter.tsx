"use client";

import { ArrowRight, Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Newsletter sign-up — front-end only.
 *
 * Integration point: in `handleSubmit`, POST `email` to your email provider's
 * endpoint (Buttondown, Mailchimp, Resend audiences, …) and keep the success
 * state below. No network request is made today.
 */
export function Newsletter() {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Enter a valid email address.");
      return;
    }
    setError(null);
    setDone(true);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <label htmlFor={inputId} className="block text-[0.8125rem] font-medium text-canvas/80">
        New stickers, first
      </label>

      {done ? (
        <p
          role="status"
          className="mt-4 flex items-start gap-2 rounded-2xl border border-canvas/15 bg-canvas/[0.07] px-4 py-3.5 text-sm text-canvas"
        >
          <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-mustard" />
          <span>
            Looks good — that address is valid. This demo does not send anything, so connect the form to your
            newsletter provider to collect real sign-ups.
          </span>
        </p>
      ) : (
        <>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <input
              id={inputId}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? `${inputId}-error` : undefined}
              className="h-11 min-w-0 flex-1 rounded-full border border-canvas/20 bg-canvas/[0.07] px-4 text-[0.9375rem] text-canvas placeholder:text-canvas/40 outline-none transition-colors focus:border-mustard"
            />
            <button
              type="submit"
              className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-canvas px-5 text-[0.9375rem] font-medium text-ink transition-colors hover:bg-white"
            >
              Join
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              />
            </button>
          </div>
          {error ? (
            <p id={`${inputId}-error`} role="alert" className="mt-2 text-xs text-mustard">
              {error}
            </p>
          ) : (
            <p className="mt-2.5 text-xs text-canvas/50">One email per new collection. Nothing else.</p>
          )}
        </>
      )}
    </form>
  );
}