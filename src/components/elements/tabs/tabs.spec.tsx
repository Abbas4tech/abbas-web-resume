import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Tab, Tabs } from "./tabs";

describe("Tabs Components", () => {
  it("renders tablist and tabs correctly", () => {
    render(
      <Tabs data-testid="tabs" variant="boxed">
        <Tab>Tab 1</Tab>
        <Tab active>Tab 2</Tab>
      </Tabs>
    );

    const tablist = screen.getByTestId("tabs");
    expect(tablist).toBeInTheDocument();
    expect(tablist).toHaveClass("tabs", "tabs-boxed");
    expect(tablist).toHaveAttribute("role", "tablist");

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveTextContent("Tab 1");
    expect(tabs[1]).toHaveTextContent("Tab 2");
    expect(tabs[1]).toHaveClass("tab-active");
  });
});
