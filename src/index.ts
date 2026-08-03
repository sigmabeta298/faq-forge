export {
  FaqItemSchema,
  FaqSectionSchema,
  FaqGroupSchema,
  FaqDocumentSchema,
} from "./schema.js";

export type {
  FaqItem,
  FaqSection,
  FaqGroup,
  FaqDocument,
} from "./schema.js";

export { parseFaq, loadFaqFromFile } from "./parse.js";
export { getAudience, listAudiences } from "./audience.js";