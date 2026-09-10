import { forwardRef, type HTMLAttributes, memo } from "react";
import { cn } from "@/lib/utils";

export type MockupPhoneProps = HTMLAttributes<HTMLDivElement>;
export type MockupPhoneCameraProps = HTMLAttributes<HTMLDivElement>;
export type MockupPhoneDisplayProps = HTMLAttributes<HTMLDivElement>;

/** DaisyUI mockup-phone wrapper */
const MockupPhone = memo(
  forwardRef<HTMLDivElement, MockupPhoneProps>(
    ({ className, ...props }, ref) => (
      <div className={cn("mockup-phone", className)} {...props} ref={ref} />
    )
  )
);
MockupPhone.displayName = "MockupPhone";

const MockupPhoneCamera = memo(
  forwardRef<HTMLDivElement, MockupPhoneCameraProps>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("mockup-phone-camera", className)}
        {...props}
        ref={ref}
      />
    )
  )
);
MockupPhoneCamera.displayName = "MockupPhoneCamera";

const MockupPhoneDisplay = memo(
  forwardRef<HTMLDivElement, MockupPhoneDisplayProps>(
    ({ className, ...props }, ref) => (
      <div
        className={cn("mockup-phone-display", className)}
        {...props}
        ref={ref}
      />
    )
  )
);
MockupPhoneDisplay.displayName = "MockupPhoneDisplay";

export { MockupPhone, MockupPhoneCamera, MockupPhoneDisplay };
