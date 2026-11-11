"use client";

import { ClientForm } from "@/components/forms/ClientForm";
import { SelectField, TextAreaField, TextField } from "@/components/forms/Fields";
import { validateContact } from "@/lib/validation";
import { contactSubjects } from "@/data/site";

/** General enquiry form. Front-end only — see `ClientForm` for the integration point. */
export function ContactForm() {
  return (
    <ClientForm<Record<string, string>>
      validate={validateContact}
      submitLabel="Send message"
      successTitle="Message composed — in the demo only."
      successBody="Everything validated correctly, but nothing was transmitted. Connect this form to an endpoint to receive real enquiries."
      resetLabel="Write another"
      className="flex flex-col gap-5"
    >
      {({ values, setValue, errors, disabled }) => (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label="Name"
              name="name"
              required
              autoComplete="name"
              placeholder="Your name"
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
            label="Subject"
            name="subject"
            required
            options={contactSubjects.map((subject) => ({ value: subject, label: subject }))}
            value={values.subject ?? ""}
            onChange={(event) => setValue("subject", event.target.value)}
            error={errors.subject}
            disabled={disabled}
          />

          <TextAreaField
            label="Message"
            name="message"
            required
            rows={6}
            hint="Tell me what you need, where you found the artwork, and any deadline that matters."
            placeholder="I would love 100 stickers for a shop opening on…"
            value={values.message ?? ""}
            onChange={(event) => setValue("message", event.target.value)}
            error={errors.message}
            disabled={disabled}
          />
        </>
      )}
    </ClientForm>
  );
}