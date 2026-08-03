import type { FaqDocument, FaqGroup } from "./schema.js";

/**
 * Retrieves the FAQ sections for a given audience key
 * (e.g. "public", "users", or any custom audience name).
 * Throws if the audience doesn't exist in the document.
 */
export function getAudience(faq: FaqDocument, audienceKey: string): FaqGroup {
  const group = faq.audiences[audienceKey];

  if (!group) {
    const available = Object.keys(faq.audiences).join(", ");
    throw new Error(
      `Audience "${audienceKey}" not found. Available audiences: ${available}`
    );
  }

  return group;
}

/**
 * Lists all audience keys available in a FAQ document.
 * Useful for consumers who want to dynamically discover audiences
 * rather than hardcoding names.
 */
export function listAudiences(faq: FaqDocument): string[] {
  return Object.keys(faq.audiences);
}