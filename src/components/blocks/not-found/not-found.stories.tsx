import type { Meta, StoryObj } from "@storybook/react";
import { NotFoundBlock } from "./not-found";
import { baseMock } from "./not-found.mock";

const meta = {
  title: "Blocks/Not Found",
  component: NotFoundBlock,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    message: { control: "text" },
    actionLabel: { control: "text" },
    actionHref: { control: "text" },
  },
} satisfies Meta<typeof NotFoundBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const CustomMessage: Story = {
  args: {
    ...baseMock,
    title: "Project Not Found",
    message: "The project you are looking for does not exist in our database.",
    actionLabel: "View all projects",
    actionHref: "/projects",
  },
};
