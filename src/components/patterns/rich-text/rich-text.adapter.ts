import type { Document } from "@contentful/rich-text-types";
import type { RichTextProps } from "./rich-text";

/**
 * Passthrough adapter — no transformation needed today.
 * Future: accept Contentful's auto-generated json field and map to RichTextProps.
 */
export function adaptRichText(input: { json: Document }): RichTextProps {
  return { document: input.json };
}
