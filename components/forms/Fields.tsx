"use client";

import { useId, type ReactNode, type SelectHTMLAttributes, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const control =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-[0.9375rem] text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-300 focus:border-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-60";

const labelClass = "block text-sm font-medium text-ink";
const hintClass = "mt-1.5 text-xs leading-relaxed text-ink-muted";

type FieldProps = {
  label: string;
  name: string;
  hint?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export function FieldShell({
  label: labelText,
  hint,
  error,
  required,
  className,
  children,
}: FieldProps & { children: (props: { id: string; describedBy: string | undefined; invalid: boolean }) => ReactNode }) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {labelText}
        {required ? (
          <span aria-hidden className="ml-1 text-accent">
            *
          </span>
        ) : null}
      </label>
      {hint ? (
        <p id={hintId} className={hintClass}>
          {hint}
        </p>
      ) : null}
      {children({ id, describedBy, invalid: Boolean(error) })}
      {error ? (
        <p id={errorId} className="mt-1.5 text-xs font-medium text-accent">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextField({
  label: labelText,
  name,
  hint,
  error,
  required,
  className,
  ...props
}: FieldProps & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "id">) {
  return (
    <FieldShell label={labelText} name={name} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <input
          {...props}
          id={id}
          name={name}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(control, "mt-2", invalid && "border-accent")}
        />
      )}
    </FieldShell>
  );
}

export function TextAreaField({
  label: labelText,
  name,
  hint,
  error,
  required,
  className,
  rows = 5,
  ...props
}: FieldProps & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name" | "id">) {
  return (
    <FieldShell label={labelText} name={name} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <textarea
          {...props}
          id={id}
          name={name}
          rows={rows}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(control, "mt-2 resize-y", invalid && "border-accent")}
        />
      )}
    </FieldShell>
  );
}

export function SelectField({
  label: labelText,
  name,
  hint,
  error,
  required,
  className,
  options,
  placeholder = "Select an option",
  ...props
}: FieldProps & {
  options: { value: string; label: string }[];
  placeholder?: string;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "name" | "id">) {
  return (
    <FieldShell label={labelText} name={name} hint={hint} error={error} required={required} className={className}>
      {({ id, describedBy, invalid }) => (
        <select
          {...props}
          id={id}
          name={name}
          required={required}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={cn(control, "mt-2 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%231c1a17%22 stroke-width=%222%22 stroke-linecap=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:1.1rem] bg-[right_1rem_center] bg-no-repeat pr-10", invalid && "border-accent")}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}