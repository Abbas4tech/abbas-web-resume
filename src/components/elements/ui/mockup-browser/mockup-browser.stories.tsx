import type { Meta, StoryObj } from "@storybook/react";
import { MockupBrowser, MockupBrowserToolbar } from "./mockup-browser";
import { baseMock } from "./mockup-browser.mock";

const meta = {
  title: "Elements/UI/Mockup Browser",
  component: MockupBrowser,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MockupBrowser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const WithUrl: Story = {
  render: () => (
    <MockupBrowser className="w-full max-w-md border bg-base-300">
      <MockupBrowserToolbar url="https://example.com" />
      <div className="flex justify-center border-base-300 border-t px-4 py-16">
        Hello world!
      </div>
    </MockupBrowser>
  ),
};
