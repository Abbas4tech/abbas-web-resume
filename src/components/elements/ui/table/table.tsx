import {
  forwardRef,
  type HTMLAttributes,
  memo,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export type TableProps = HTMLAttributes<HTMLTableElement>;
export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;
export type TableHeaderCellProps = ThHTMLAttributes<HTMLTableCellElement>;
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>;

/** DaisyUI table wrapper — pair with the `overflow-x-auto` div DaisyUI's own docs recommend. */
const Table = memo(
  forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => (
    <div className="overflow-x-auto">
      <table className={cn("table", className)} ref={ref} {...props} />
    </div>
  ))
);
Table.displayName = "Table";

const TableHead = memo(
  forwardRef<HTMLTableSectionElement, TableHeadProps>((props, ref) => (
    <thead ref={ref} {...props} />
  ))
);
TableHead.displayName = "TableHead";

const TableBody = memo(
  forwardRef<HTMLTableSectionElement, TableBodyProps>((props, ref) => (
    <tbody ref={ref} {...props} />
  ))
);
TableBody.displayName = "TableBody";

const TableRow = memo(
  forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => (
    <tr ref={ref} {...props} />
  ))
);
TableRow.displayName = "TableRow";

const TableHeaderCell = memo(
  forwardRef<HTMLTableCellElement, TableHeaderCellProps>((props, ref) => (
    <th ref={ref} {...props} />
  ))
);
TableHeaderCell.displayName = "TableHeaderCell";

const TableCell = memo(
  forwardRef<HTMLTableCellElement, TableCellProps>((props, ref) => (
    <td ref={ref} {...props} />
  ))
);
TableCell.displayName = "TableCell";

export { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow };
