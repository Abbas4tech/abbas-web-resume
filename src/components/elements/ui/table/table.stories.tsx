import type { Meta, StoryObj } from "@storybook/react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./table";
import { baseMock } from "./table.mock";

const meta = {
  title: "Elements/UI/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Skill</TableHeaderCell>
          <TableHeaderCell>Level</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {baseMock.rows.map((row) => (
          <TableRow key={row.skill}>
            <TableCell>{row.skill}</TableCell>
            <TableCell>{row.level}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
