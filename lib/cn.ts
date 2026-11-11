/** Tiny class-name joiner — avoids pulling in a dependency for this. */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}