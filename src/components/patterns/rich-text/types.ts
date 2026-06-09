import type { Document } from "@contentful/rich-text-types";

export interface RichTextProps {
  blockquoteClass?: string;
  className?: string;
  codeClass?: string;
  /** Contentful rich-text Document (from @contentful/rich-text-types library) */
  document: Document;
  headingClass?: string | ((_level: number) => string);
  listClass?: string;
  listItemClass?: string;
  paragraphClass?: string;
  tableCellClass?: string;
  tableClass?: string;
  tableRowClass?: string;
}
