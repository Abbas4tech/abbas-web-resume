import type { LinkButtonProps, NativeButtonProps } from "./button";

export const nativeMock: NativeButtonProps = {
  children: "Click Me",
  asLink: false,
};

export const linkMock: LinkButtonProps = {
  children: "Go to Projects",
  asLink: true,
  href: "/projects",
};
