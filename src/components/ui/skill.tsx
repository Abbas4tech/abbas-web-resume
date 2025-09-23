import { cn } from "@/lib/utils";
import React from "react";

const Skill = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "mockup-window bg-base-300 border-neutral border",
          className
        )}
        {...props}
        ref={ref}
      />
    )
  )
);

Skill.displayName = "Skills";

const SkillsContent = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div className={cn("p-4 bg-base-200", className)} {...props} ref={ref} />
    )
  )
);

SkillsContent.displayName = "SkillContent";

const SkillTitle = React.memo(
  React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
  >(({ className, ...props }, ref) => (
    <h2
      className={cn(
        "flex text-xl font-bold items-center md:text-3xl gap-4 mb-4",
        className
      )}
      {...props}
      ref={ref}
    />
  ))
);
SkillTitle.displayName = "SkillTitle";

const SkillGroup = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-8 p-2 md:p-4",
          className
        )}
        {...props}
        ref={ref}
      />
    )
  )
);
SkillGroup.displayName = "SkillGroup";

const SkillGroupContent = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("grid items-center grid-cols-2", className)}
        {...props}
        ref={ref}
      />
    )
  )
);
SkillGroupContent.displayName = "SkillGroupContent";

const SkillList = React.memo(
  React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("flex gap-4 text-xl md:text-4xl", className)}
        {...props}
        ref={ref}
      />
    )
  )
);

SkillList.displayName = "SkillList";

export {
  Skill,
  SkillsContent,
  SkillTitle,
  SkillGroup,
  SkillGroupContent,
  SkillList,
};
