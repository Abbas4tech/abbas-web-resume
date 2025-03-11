import React from "react";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";

interface RichTextProps {
  document: Document;
  paragraphClass: string;
}

const RichText: React.FC<RichTextProps> = ({ document, paragraphClass }) => {
  const Text: React.FC<React.PropsWithChildren> = ({ children }) => (
    <p className={paragraphClass}>{children}</p>
  );

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    },
  };
  return documentToReactComponents(document, options);
};

export { RichText };
