import { z } from "zod";

export const FaqItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const FaqSectionSchema = z.object({
  title: z.string(),
  faqs: z.array(FaqItemSchema),
});

export const FaqGroupSchema = z.record(z.string(), FaqSectionSchema);

export const FaqDocumentSchema = z.object({
  title: z.string(),
  audiences: z.record(z.string(), FaqGroupSchema),
});

export type FaqItem = z.infer<typeof FaqItemSchema>;
export type FaqSection = z.infer<typeof FaqSectionSchema>;
export type FaqGroup = z.infer<typeof FaqGroupSchema>;
export type FaqDocument = z.infer<typeof FaqDocumentSchema>;