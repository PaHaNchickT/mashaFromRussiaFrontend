import cn from "clsx";
import type { SyntheticEvent } from "react";

import {
  DEFAULT_FILTER_STATE,
  DEFAULT_SORT_STATE,
} from "@/constants/tableConstants";
import type { ResponseMetaData } from "@/types/commonTypes";
import type {
  FilterState,
  SortState,
  TableColumn,
  TableRow,
} from "@/types/tableTypes";

import { TableFilterPopover } from "./TableFilterPopover";
import { TableSortPopover } from "./TableSortPopover";
import { Checkbox } from "../Inputs/Checkbox";
import { Pagination } from "../Pagination/Pagination";

type TableProps = {
  columns: TableColumn[];
  data: TableRow[];
  meta?: ResponseMetaData;
  setPage?: (value: number) => void;
  selectable?: boolean;
  selectedIds?: Array<string>;
  setSelectedIds?: (value: Array<string>) => void;
  sortState?: SortState;
  setSortState?: (value: SortState) => void;
  filterState?: FilterState;
  setFilterState?: (value: FilterState) => void;
  filterPopoverValues?: { id: string; label: string }[];
  onRowClick?: (value: TableRow) => void;
  onCellClick?: (value: TableRow, subValue?: string) => void;
  isRowHoverable?: boolean;
  classNameTable?: string;
  classNameHeader?: string;
};

export const Table = ({
  columns,
  data,
  meta,
  setPage,
  selectable = false,
  selectedIds = [],
  setSelectedIds,
  sortState = DEFAULT_SORT_STATE,
  setSortState,
  filterState = DEFAULT_FILTER_STATE,
  setFilterState,
  filterPopoverValues,
  onRowClick,
  onCellClick,
  isRowHoverable = false,
  classNameTable = "",
  classNameHeader = "",
}: TableProps) => {
  const allOnPageIds = data.map((r) => r.id);

  const isAllOnPageSelected =
    allOnPageIds.length > 0 &&
    allOnPageIds.every((id) => selectedIds?.includes(id));

  const toggleSelectOne = (id: string) => {
    if (!setSelectedIds) return;

    const prev = selectedIds ?? [];
    const exists = prev.includes(id);
    const next = exists ? prev.filter((x) => x !== id) : [...prev, id];

    setSelectedIds(next);
  };

  const toggleSelectAllOnPage = () => {
    if (!setSelectedIds) return;

    const prev = selectedIds ?? [];

    if (isAllOnPageSelected) {
      const next = prev.filter((id) => !allOnPageIds.includes(id));

      setSelectedIds(next);
    } else {
      const toAdd = allOnPageIds.filter((id) => !prev.includes(id));

      setSelectedIds([...prev, ...toAdd]);
    }
  };

  const handleRowClick = (event: SyntheticEvent, rowData: { id: string }) => {
    const target = event.target as HTMLElement;

    if (
      target.ariaLabel !== "checkbox" &&
      target.tagName !== "INPUT" &&
      onRowClick
    ) {
      onRowClick(rowData);
    }
  };

  const handleCellClick = (rowData: { id: string }, columnName: string) => {
    if (onCellClick) {
      onCellClick(rowData, columnName);
    }
  };

  return (
    <div className="flex flex-col gap-[46px]">
      <div className="bg-white border border-[#e5e5e5] rounded-[8px]">
        <table className={cn("min-w-full table-auto", classNameTable)}>
          <thead className={cn("bg-[#d9d9d9]", classNameHeader)}>
            <tr>
              {selectable && (
                <th className="box-border px-3 text-left w-14">
                  <Checkbox
                    checked={isAllOnPageSelected}
                    onChange={() => toggleSelectAllOnPage()}
                  />
                </th>
              )}

              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    "box-border py-2 px-[14px] text-left font-bold",
                    col.classNameHeader
                  )}
                >
                  <div className="flex items-center gap-[4px]">
                    {!!col.isSort && setSortState && (
                      <TableSortPopover
                        sortState={sortState}
                        setSortState={setSortState}
                      />
                    )}
                    {!!col.isFilter &&
                      setFilterState &&
                      filterPopoverValues && (
                        <TableFilterPopover
                          popoverValues={filterPopoverValues}
                          filterState={filterState}
                          setFilterState={setFilterState}
                        />
                      )}

                    <span>{col.title}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#e5e5e5]">
            {data.map((row) => {
              const selected = selectedIds?.includes(row.id) ?? false;

              return (
                <tr
                  key={row.key}
                  className={cn(
                    isRowHoverable ? "cursor-pointer hover:bg-[#fef3fc]" : "",
                    selected ? "bg-[#fef3fc]" : ""
                  )}
                  onClick={(event) => handleRowClick(event, row)}
                >
                  {selectable && (
                    <td className="px-[12px] box-border w-[53px]">
                      <Checkbox
                        checked={selected}
                        onChange={() => toggleSelectOne(row.id)}
                        classNameWrapper="w-5"
                      />
                    </td>
                  )}

                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "box-border px-[14px] py-[13px]",
                        col.className
                      )}
                      onClick={() => handleCellClick(row, col.dataIndex)}
                    >
                      {col.render &&
                        col.render(row[col.dataIndex] as never, row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {meta && setPage && meta.totalPages > 1 && (
        <Pagination meta={meta} setPage={setPage} />
      )}
    </div>
  );
};
