import type { ReactNode } from "react";

export type TableRow = { id: string; [key: string]: string };

export type RenderString = (value: string | null, row?: TableRow) => string;
type RenderJsx = (value: string, row?: TableRow) => ReactNode;

export type TableColumn = {
  title: string;
  dataIndex: string;
  key: string;
  render?: RenderString | RenderJsx;
  isFilter?: boolean;
  isSort?: boolean;
  className?: string;
  classNameHeader?: string;
};

export type SortState = {
  dataIndex: string | null;
  order: "asc" | "desc" | null;
};

export type FilterState = {
  dataIndex: string | null;
  value: string | null;
};
