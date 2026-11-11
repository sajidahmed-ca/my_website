"use client";

import { ClientForm } from "@/components/forms/ClientForm";
import { SelectField, TextAreaField, TextField } from "@/components/forms/Fields";
import { validateCustomRequest } from "@/lib/validation";
import { customSizes, customTypes } from "@/data/site";

/**
 * Custom sticker brief. Front-end only — see `ClientForm` for the single
 * integration point once a form endpoint exists.
 */
export function CustomRequestForm() {
  return (
    <ClientForm<Record<string, string>>
      validate={validateCustomRequest}
      submitLabel="Send my idea"
      successTitle="Brief received — in the demo only."
      successBody="Validation and layout are complete, but nothing was transmitted. Connect this form to an endpoint to receive real briefs."
      resetLabel="Revise my brief"
      className="flex flex-col gap-5"
    >
      {({ values, setValue, errors, disabled }) => (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Your name"
              name="name"
              required
              autoComplete="name"
              placeholder="Sajid Khan"
              value={values.name ?? ""}
              onChange={(event) => setValue("name", event.target.value)}
              error={errors.name}
              disabled={disabled}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email ?? ""}
              onChange={(event) => setValue("email", event.target.value)}
              error={errors.email}
              disabled={disabled}
            />
          </div>

          <SelectField
            label="What kind of sticker?"
            name="subject"
            required
            hint="Pick the closest match — a custom illustration is always possible too."
            placeholder="Choose a type"
            options={customTypes.map((type) => ({ value: type, label: type }))}
            value={values.subject ?? ""}
            onChange={(event) => setValue("subject", event.target.value)}
            error={errors.subject}
            disabled={disabled}
          />

          <TextField
            label="Describe your idea"
            name="notes"
            hint="The place, the memory, the mood, the colours you already have in mind."
            placeholder="A sticker of the Dhaka Old High Court at dusk, warm window light, no text."
            value={values.notes ?? ""}
            onChange={(event) => setValue("notes", event.target.value)}
            disabled={disabled}
          />

          <div className="grid gap-5 sm:grid-cols-3">
            <SelectField
              label="Size"
              name="size"
              required
              options={customSizes.map((size) => ({ value: size, label: size }))}
              value={values.size ?? ""}
              onChange={(event) => setValue("size", event.target.value)}
              error={errors.size}
              disabled={disabled}
            />
            <TextField
              label="Quantity"
              name="quantity"
              type="number"
              min={1}
              max={500}
              placeholder="50"
              value={values.quantity ?? ""}
              onChange={(event) => setValue("quantity", event.target.value)}
              disabled={disabled}
            />
            <TextField
              label="Budget (USD)"
              name="budget"
              inputMode="decimal"
              placeholder="150"
              hint="Optional. Helps set the detail level."
              value={values.budget ?? ""}
              onChange={(event) => setValue("budget", event.target.value)}
              disabled={disabled}
            />
          </div>

          <TextAreaField
            label="Anything else?"
            name="extra"
            rows={4}
            hint="References, links, dates, delivery deadlines, or the story behind the idea."
            placeholder="A photo of the building from my trip last March…"
            value={values.extra ?? ""}
            onChange={(event) => setValue("extra", event.target.value)}
            disabled={disabled}
          />
        </>
      )}
    </ClientForm>
  );
}