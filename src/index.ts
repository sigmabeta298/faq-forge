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

export { parseFaq } from "./parse.js";
export { loadFaqFromFile } from "./node.js";
export { getAudience, listAudiences } from "./audience.js";