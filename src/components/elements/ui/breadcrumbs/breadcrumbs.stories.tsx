import type { Meta, StoryObj } from "@storybook/react";
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsList } from "./breadcrumbs";
import { baseMock } from "./breadcrumbs.mock";

const meta = {
  title: "Elements/UI/Breadcrumbs",
  component: Breadcrumbs,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbsList>
        {baseMock.crumbs.map((crumb) => (
          <BreadcrumbsItem key={crumb.href}>
            <a href={crumb.href}>{crumb.label}</a>
          </BreadcrumbsItem>
        ))}
      </BreadcrumbsList>
    </Breadcrumbs>
  ),
};
