import { forwardRef, type HTMLAttributes, memo } from "react";

import { cn } from "@/lib/utils";

const Skill = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
      className={cn("mockup-window border border-neutral bg-base-300", className)}
      {...props}
      ref={ref}
    />
  ))
);

Skill.displayName = "Skills";

const SkillsContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("bg-base-200 p-4", className)} {...props} ref={ref} />
  ))
);

SkillsContent.displayName = "SkillContent";

const SkillTitle = memo(
  forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
      <h2
        className={cn("mb-4 flex items-center gap-4 font-bold text-xl md:text-3xl", className)}
        {...props}
        ref={ref}
      />
    )
  )
);
SkillTitle.displayName = "SkillTitle";

const SkillGroup = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div
      className={cn("grid grid-cols-1 gap-8 p-2 md:grid-cols-2 md:p-4", className)}
      {...props}
      ref={ref}
    />
  ))
);
SkillGroup.displayName = "SkillGroup";

const SkillGroupContent = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("grid grid-cols-2 items-center", className)} {...props} ref={ref} />
  ))
);
SkillGroupContent.displayName = "SkillGroupContent";

const SkillList = memo(
  forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
    <div className={cn("flex gap-4 text-xl md:text-4xl", className)} {...props} ref={ref} />
  ))
);

SkillList.displayName = "SkillList";

export { Skill, SkillsContent, SkillTitle, SkillGroup, SkillGroupContent, SkillList };
