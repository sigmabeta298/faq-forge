import { FaqDocumentSchema, type FaqDocument } from "./schema.js";

/**
 * Validates a raw parsed object against the FAQ schema.
 * Works in any environment — browser, Node, Cloudflare Workers, etc.
 * Throws a descriptive error if validation fails.
 */
export function parseFaq(rawObject: unknown): FaqDocument {
  const result = FaqDocumentSchema.safeParse(rawObject);

  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");

    throw new Error(`Invalid FAQ document:\n${issues}`);
  }

  return result.data;
}