"use client";

import { m } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import type { IconProps } from "@/components/elements/ui/icon/icon";
import { Icon } from "@/components/elements/ui/icon/icon";
import {
  Step,
  StepBody,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepTitle,
} from "@/components/elements/ui/step/step";
import { cn } from "@/lib/utils";

export interface ProcessStepItem {
  description?: string;
  icon?: IconProps;
  title: string;
}

export interface ProcessStepsProps extends HTMLAttributes<HTMLDivElement> {
  steps: ProcessStepItem[];
}

const ProcessSteps = memo(
  forwardRef<HTMLDivElement, ProcessStepsProps>(
    ({ className, steps, ...props }, ref) => (
      <MotionStaggerContainer
        as="div"
        className={cn("flex flex-col gap-8 pl-6", className)}
        ref={ref}
        {...props}
      >
        {steps.map((step, index) => (
          <MotionStaggerItem as="div" key={step.title}>
            <Step>
              <StepSeparator className="border-primary/20">
                <StepIndicator className="bg-primary/10 text-primary ring-4 ring-primary/10">
                  <m.span
                    className="flex items-center justify-center"
                    initial={{ scale: 0, rotate: -90 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 18,
                      delay: index * 0.12 + 0.15,
                    }}
                    viewport={{ once: true, margin: "-60px" }}
                    whileInView={{ scale: 1, rotate: 0 }}
                  >
                    {step.icon ? <Icon {...step.icon} /> : index + 1}
                  </m.span>
                </StepIndicator>
              </StepSeparator>
              <StepBody>
                <StepTitle className="text-lg transition-colors duration-300 md:text-xl">
                  {step.title}
                </StepTitle>
                {step.description && (
                  <StepDescription>{step.description}</StepDescription>
                )}
              </StepBody>
            </Step>
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>
    )
  )
);
ProcessSteps.displayName = "ProcessSteps";

export { ProcessSteps };
