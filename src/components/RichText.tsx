import React, { FC, PropsWithChildren } from "react";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, Document } from "@contentful/rich-text-types";

interface RichTextProps {
  document: Document;
  paragraphClass: string;
}

const RichText: FC<RichTextProps> = ({ document, paragraphClass }) => {
  const Text: FC<PropsWithChildren> = ({ children }) => (
    <p className={paragraphClass}>{children}</p>
  );

  const options: Options = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
    },
  };
  return documentToReactComponents(document, options);
};

export { RichText };
