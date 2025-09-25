import React, { FC, PropsWithChildren } from "react";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";

import { cn } from "@/lib/utils";

export interface RichTextProps {
  document: Document;
  className?: string;
  paragraphClass?: string;
  headingClass?: string | ((_level: number) => string);
  listClass?: string;
  listItemClass?: string;
  tableClass?: string;
  tableRowClass?: string;
  tableCellClass?: string;
  blockquoteClass?: string;
  codeClass?: string;
}

const defaultGetHeadingClass =
  (headingClass: RichTextProps["headingClass"]) =>
  (level: number): string =>
    typeof headingClass === "function"
      ? headingClass(level)
      : headingClass ?? "text-2xl font-semibold";

const RichText: FC<RichTextProps> = ({
  document,
  className = "",
  paragraphClass = "text-base-content",
  headingClass,
  listClass = "",
  listItemClass = "my-2 leading-6",
  tableClass = "",
  tableRowClass = "",
  tableCellClass = "",
  blockquoteClass = "",
  codeClass = "font-mono text-sm p-1 rounded",
}) => {
  const getHeadingClass = defaultGetHeadingClass(headingClass);

  const Text: FC<PropsWithChildren<{ className?: string }>> = ({
    children,
    className,
  }) => <p className={cn("", className || paragraphClass)}>{children}</p>;

  const options: Options = {
    renderMark: {
      bold: (text) => <strong>{text}</strong>,
      italic: (text) => <em>{text}</em>,
      underline: (text) => <u>{text}</u>,
      code: (text) => <code className={codeClass}>{text}</code>,
    },

    renderNode: {
      [BLOCKS.DOCUMENT]: (_node, children) => (
        <div className={className}>{children}</div>
      ),

      [BLOCKS.PARAGRAPH]: (_node, children) => <Text>{children}</Text>,

      [BLOCKS.HEADING_1]: (_node, children) => (
        <h1 className={getHeadingClass(1)}>{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node, children) => (
        <h2 className={getHeadingClass(2)}>{children}</h2>
      ),
      [BLOCKS.HEADING_3]: (_node, children) => (
        <h3 className={getHeadingClass(3)}>{children}</h3>
      ),
      [BLOCKS.HEADING_4]: (_node, children) => (
        <h4 className={getHeadingClass(4)}>{children}</h4>
      ),
      [BLOCKS.HEADING_5]: (_node, children) => (
        <h5 className={getHeadingClass(5)}>{children}</h5>
      ),
      [BLOCKS.HEADING_6]: (_node, children) => (
        <h6 className={getHeadingClass(6)}>{children}</h6>
      ),

      [BLOCKS.OL_LIST]: (_node, children) => (
        <ol className={cn("list-decimal", listClass)}>{children}</ol>
      ),
      [BLOCKS.UL_LIST]: (_node, children) => (
        <ul className={cn("list-disc", listClass)}>{children}</ul>
      ),
      [BLOCKS.LIST_ITEM]: (_node, children) => (
        <li className={listItemClass}>{children}</li>
      ),

      [BLOCKS.QUOTE]: (_node, children) => (
        <blockquote className={blockquoteClass}>{children}</blockquote>
      ),

      [BLOCKS.TABLE]: (_node, children) => (
        <table className={tableClass}>
          <tbody>{children}</tbody>
        </table>
      ),
      [BLOCKS.TABLE_ROW]: (_node, children) => (
        <tr className={tableRowClass}>{children}</tr>
      ),
      [BLOCKS.TABLE_CELL]: (_node, children) => (
        <td className={tableCellClass}>{children}</td>
      ),
    },
  };

  return <>{documentToReactComponents(document, options)}</>;
};

export { RichText };
