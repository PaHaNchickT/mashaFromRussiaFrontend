import cn from "clsx";
import { useState } from "react";

import { DAILY_LIMIT_VALUES } from "@/constants/commonConstants";

import { TickIcon } from "../Icons/TickIcon";

type DailyLimitInputProps = {
  value?: number;
  label?: string;
  onSubmit: (value: number) => void;
  isLoading?: boolean;
  classNameInput?: string;
  classNameLabel?: string;
  classNameWrapper?: string;
  isIconAbsolute?: boolean;
};

export const DailyLimitInput = ({
  value = 10,
  label,
  onSubmit,
  isLoading = false,
  classNameInput = "gap-[18px]",
  classNameLabel = "",
  classNameWrapper = "gap-[18px]",
  isIconAbsolute = false,
}: DailyLimitInputProps) => {
  const [selectedId, setSelectedId] = useState(
    DAILY_LIMIT_VALUES.indexOf(value)
  );

  return (
    <div className={cn("flex relative", classNameWrapper)}>
      {label && (
        <label className={cn("leading-[normal]", classNameLabel)}>
          {label}
        </label>
      )}
      <div className={cn("flex", classNameInput)}>
        {DAILY_LIMIT_VALUES.map((item, index) => (
          <button
            key={item}
            className={cn(
              "w-[45px] h-[33px] text-[30px] leading-0 rounded-[12px] pl-[3px] disabled:opacity-50",
              selectedId === index
                ? "bg-[#EF18C4] text-white cursor-auto"
                : "bg-transparent text-black hover:bg-[#EF18C4] hover:text-white cursor-pointer disabled:cursor-auto disabled:bg-transparent disabled:text-black"
            )}
            onClick={() => setSelectedId(index)}
          >
            {item}
          </button>
        ))}
      </div>
      <button
        className={cn(
          "w-[30px] h-[30px] flex justify-center items-center hover:opacity-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          isIconAbsolute ? "absolute right-0" : "relative"
        )}
        onClick={() => onSubmit(DAILY_LIMIT_VALUES[selectedId])}
        disabled={isLoading}
      >
        <TickIcon />
      </button>
    </div>
  );
};
