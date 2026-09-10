import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "./table";

describe("Table", () => {
  it("renders a table with headers and rows", () => {
    render(
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Skill</TableHeaderCell>
            <TableHeaderCell>Level</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>React</TableCell>
            <TableCell>Expert</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
    expect(table).toHaveClass("table");

    expect(
      screen.getByRole("columnheader", { name: "Skill" })
    ).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: "React" })).toBeInTheDocument();
  });

  it("applies custom classes to the table element", () => {
    render(
      <Table className="table-zebra">
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByRole("table")).toHaveClass("table-zebra");
  });
});
