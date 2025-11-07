import { useEffect, useRef, useState } from "react";

import type { SortState } from "@/types/tableTypes";

import { SortIcon } from "../Icons/SortIcon";
import { Checkbox } from "../Inputs/Checkbox";

const POPOVER_VALUES: { id: "asc" | "desc"; label: string }[] = [
  { id: "asc", label: "По возрастанию" },
  { id: "desc", label: "По убыванию" },
];

type TableSortPopoverProps = {
  sortState: SortState;
  setSortState: (f: SortState) => void;
};

export const TableSortPopover = ({
  sortState,
  setSortState,
}: TableSortPopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [order, setOrder] = useState<null | "asc" | "desc">(sortState.order);

  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSortState({
      dataIndex: sortState.dataIndex,
      order: order,
    });
  }, [order]);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        className="cursor-pointer hover:opacity-50"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <SortIcon />
      </button>
      {isVisible && (
        <div className="box-border absolute bg-[#D9D9D9]/95 flex flex-col gap-[14px] min-w-[184px] font-normal px-[17px] py-[20px] left-[-43px] top-[45px] rounded-[22px]">
          {POPOVER_VALUES.map((item) => (
            <Checkbox
              key={item.id}
              checked={order === item.id}
              onChange={() =>
                setOrder((prev) => (prev === item.id ? null : item.id))
              }
              label={item.label}
              classNameWrapper="gap-[7px]"
              classNameCheckbox="bg-white"
            />
          ))}
        </div>
      )}
    </div>
  );
};
