import React, { memo, PropsWithChildren } from "react";
import SVGIcon from "./SVGIcon";

interface PageWrapperProps {
  title: string;
  headingAnimation: string;
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = memo(
  ({ title, children, headingAnimation }) => {
    return (
      <>
        <div className="container overflow-auto mb-5 scrollbar-hide">
          <h1
            data-aos={headingAnimation}
            className="flex items-center justify-center gap-2 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl"
          >
            <span className="inline-block mr-2">
              <SVGIcon icon={title} />
            </span>
            {title}
          </h1>
          {children}
        </div>
      </>
    );
  }
);

export default PageWrapper;