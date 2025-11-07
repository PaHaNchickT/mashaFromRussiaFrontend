import type { FilterState, SortState } from "@/types/tableTypes";

export const DEFAULT_SORT_STATE: SortState = { dataIndex: null, order: null };

export const DEFAULT_FILTER_STATE: FilterState = {
  dataIndex: null,
  value: null,
};
