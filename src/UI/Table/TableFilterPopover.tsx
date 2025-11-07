import { useEffect, useRef, useState } from "react";

import type { FilterState } from "@/types/tableTypes";

import { FilterIcon } from "../Icons/FilterIcon";
import { Checkbox } from "../Inputs/Checkbox";

type TableFilterPopoverProps = {
  filterState: FilterState;
  setFilterState: (f: FilterState) => void;
  popoverValues: { id: string; label: string }[];
};

export const TableFilterPopover = ({
  filterState,
  setFilterState,
  popoverValues,
}: TableFilterPopoverProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [checked, setChecked] = useState<null | string>(filterState.value);

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
    setFilterState({
      dataIndex: filterState.dataIndex,
      value: checked,
    });
  }, [checked]);

  return (
    <div className="relative" ref={popoverRef}>
      <button
        className="cursor-pointer hover:opacity-50"
        onClick={() => setIsVisible((prev) => !prev)}
      >
        <FilterIcon filled={Boolean(checked)} fill="black" />
      </button>
      {isVisible && (
        <div className="box-border absolute bg-[#D9D9D9]/95 flex flex-col gap-[14px] min-w-[164px] font-normal px-[17px] py-[20px] left-[-43px] top-[45px] rounded-[22px]">
          {popoverValues.map((item) => (
            <Checkbox
              key={item.id}
              checked={checked === item.id}
              onChange={() =>
                setChecked((prev) => (prev === item.id ? null : item.id))
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
