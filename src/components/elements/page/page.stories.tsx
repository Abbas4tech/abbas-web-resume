import type { Meta, StoryObj } from "@storybook/react";
import { PageContent } from "./page";
import { baseMock } from "./page.mock";

const meta = {
  title: "Elements/Page",
  component: PageContent,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PageContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};
