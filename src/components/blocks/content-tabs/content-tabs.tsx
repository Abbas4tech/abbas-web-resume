"use client";

import type { Document } from "@contentful/rich-text-types";
import { AnimatePresence, m } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, memo, useState } from "react";
import { Tab, Tabs } from "@/components/elements/ui/tabs/tabs";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import { cn } from "@/lib/utils";

export interface ContentTabItem {
  content: Document;
  label: string;
}

export interface ContentTabsProps extends HTMLAttributes<HTMLDivElement> {
  tabs: ContentTabItem[];
}

const ContentTabs = memo(
  forwardRef<HTMLDivElement, ContentTabsProps>(
    ({ className, tabs, ...props }, ref) => {
      const [activeIndex, setActiveIndex] = useState(0);
      const activeTab = tabs[activeIndex];

      return (
        <div
          className={cn("flex flex-col gap-4", className)}
          ref={ref}
          {...props}
        >
          <Tabs className="gap-1" variant="bordered">
            {tabs.map((tab, index) => (
              <Tab
                active={index === activeIndex}
                aria-selected={index === activeIndex}
                className="relative border-b-0! font-medium"
                href="#"
                key={tab.label}
                onClick={(event) => {
                  event.preventDefault();
                  setActiveIndex(index);
                }}
              >
                {tab.label}
                {index === activeIndex && (
                  <m.span
                    className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-primary"
                    layoutId="content-tabs-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
              </Tab>
            ))}
          </Tabs>
          <AnimatePresence mode="wait">
            {activeTab && (
              <m.div
                animate={{ opacity: 1, y: 0 }}
                className="rounded-b-xl bg-base-100 p-4"
                exit={{ opacity: 0, y: -8 }}
                initial={{ opacity: 0, y: 8 }}
                key={activeIndex}
                role="tabpanel"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <RichText document={activeTab.content} />
              </m.div>
            )}
          </AnimatePresence>
        </div>
      );
    }
  )
);
ContentTabs.displayName = "ContentTabs";

export { ContentTabs };
