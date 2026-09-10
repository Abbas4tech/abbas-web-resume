import type { Meta, StoryObj } from "@storybook/react";
import { MockupCode, MockupCodeLine } from "./mockup-code";
import { baseMock } from "./mockup-code.mock";

const meta = {
  title: "Elements/UI/Mockup Code",
  component: MockupCode,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MockupCode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <MockupCode>
      {baseMock.lines.map((line) => (
        <MockupCodeLine key={line.text} prefix={line.prefix}>
          {line.text}
        </MockupCodeLine>
      ))}
    </MockupCode>
  ),
};
