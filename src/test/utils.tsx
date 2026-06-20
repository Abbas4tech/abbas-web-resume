import {
  type RenderOptions,
  render as rtlRender,
} from "@testing-library/react";
import type { ReactElement } from "react";
import { DrawerProvider } from "@/components/elements/drawer/drawer";

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <DrawerProvider>{children}</DrawerProvider>;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => rtlRender(ui, { wrapper: AllTheProviders, ...options });

// biome-ignore lint/performance/noBarrelFile: test util wrapper
export * from "@testing-library/react";
export { customRender as render };
