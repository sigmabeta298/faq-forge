import { readFileSync } from "node:fs";
import { load as parseYaml } from "js-yaml";
import { parseFaq } from "./parse.js";
import type { FaqDocument } from "./schema.js";

/**
 * Node-only convenience: reads a YAML file from disk,
 * parses it, and validates it against the FAQ schema.
 */
export function loadFaqFromFile(filePath: string): FaqDocument {
  const fileContents = readFileSync(filePath, "utf8");
  const rawObject = parseYaml(fileContents);

  return parseFaq(rawObject);
}