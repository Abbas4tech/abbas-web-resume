import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { baseMock } from "./divider.mock";
import { Divider } from "./index";

const meta = {
  title: "Elements/Divider",
  component: Divider,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-40 w-full">
      <div className="card grid h-20 flex-grow place-items-center rounded-box bg-base-300">
        Content
      </div>
      <Divider orientation="vertical">OR</Divider>
      <div className="card grid h-20 flex-grow place-items-center rounded-box bg-base-300">
        Content
      </div>
    </div>
  ),
};
