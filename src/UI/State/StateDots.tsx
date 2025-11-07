import cn from "clsx";
import { memo } from "react";

interface StateDotsProps {
  dotsCount: number;
  activeIndex?: number;
  classNameWrapper?: string;
  classNameDot?: string;
}

export const StateDots = memo(
  ({
    dotsCount,
    activeIndex = 0,
    classNameWrapper = "",
    classNameDot = "",
  }: StateDotsProps) => {
    const dots = Array.from(
      { length: Math.max(0, Math.floor(dotsCount)) },
      (_, i) => i
    );

    if (dotsCount <= 0) return null;

    return (
      <div className={cn("flex gap-[12px]", classNameWrapper)}>
        {dots.map((index) => (
          <div
            key={index}
            className={cn(
              "rounded-full w-[15px] h-[15px]",
              activeIndex >= index ? "bg-black" : "bg-[#D9D9D9]",
              classNameDot
            )}
          ></div>
        ))}
      </div>
    );
  }
);

StateDots.displayName = "StateDots";
