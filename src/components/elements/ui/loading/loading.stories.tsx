import type { Meta, StoryObj } from "@storybook/react";
import { Loading } from "./loading";
import { baseMock } from "./loading.mock";

const meta = {
  title: "Elements/UI/Loading",
  component: Loading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Loading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ...baseMock,
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Loading variant="spinner" />
      <Loading variant="dots" />
      <Loading variant="ring" />
      <Loading variant="ball" />
      <Loading variant="bars" />
      <Loading variant="infinity" />
    </div>
  ),
};
