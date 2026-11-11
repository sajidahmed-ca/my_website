const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** `required` + rough email shape check; returns a message per invalid field. */
export function validateContact(values: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!values.name?.trim()) errors.name = "Please tell me your name.";
  if (!values.email?.trim()) errors.email = "An email address is required for a reply.";
  else if (!EMAIL.test(values.email.trim())) errors.email = "That email address looks incomplete.";
  if (!values.subject?.trim()) errors.subject = "Pick a subject so I know where to start.";
  if (!values.message?.trim()) errors.message = "Add a short message.";
  else if (values.message.trim().length < 12) errors.message = "A little more detail helps — at least a sentence.";

  return errors;
}

/** Custom-sticker brief: a few required answers, everything else optional. */
export function validateCustomRequest(values: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!values.name?.trim()) errors.name = "Please tell me your name.";
  if (!values.email?.trim()) errors.email = "An email address is required for a quote.";
  else if (!EMAIL.test(values.email.trim())) errors.email = "That email address looks incomplete.";
  if (!values.subject?.trim()) errors.subject = "Tell me what you have in mind.";
  else if (values.subject.trim().length < 12) errors.subject = "A sentence about the idea helps — tell me a bit more.";
  if (!values.size?.trim()) errors.size = "Choose a size so the quote is accurate.";

  return errors;
}

export function validateNewsletter(values: Record<string, string>) {
  const errors: Record<string, string> = {};
  if (!values.email?.trim()) errors.email = "Enter your email address.";
  else if (!EMAIL.test(values.email.trim())) errors.email = "That email address looks incomplete.";
  return errors;
}