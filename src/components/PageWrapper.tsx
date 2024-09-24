import React, { memo, PropsWithChildren } from "react";
import SVGIcon from "./SVGIcon";

interface PageWrapperProps extends PropsWithChildren {
  title: string;
  iconId: string;
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = memo(
  ({ title, iconId, children }: PageWrapperProps) => {
    return (
      <>
        <div className="container overflow-auto mb-5 scrollbar-hide">
          <h1
            data-aos="fade-down"
            className="flex items-center justify-center gap-2 p-4 px-0 text-xl font-bold md:py-6 md:text-4xl"
          >
            <span className="inline-block mr-2">
              <SVGIcon classes="" icon={title} />
            </span>
            {iconId}
          </h1>
          {children}
        </div>
      </>
    );
  }
);

export default PageWrapper;
