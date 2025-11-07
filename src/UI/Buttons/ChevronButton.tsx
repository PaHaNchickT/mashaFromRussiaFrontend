import cn from "clsx";
import type { ButtonHTMLAttributes } from "react";

import { ChevronLeftIcon } from "../Icons/ChevronLeftIcon";

type ChevronButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  side?: "left" | "right";
  className?: string;
};

export const ChevronButton = ({
  onClick,
  side = "left",
  className = "",
  ...props
}: ChevronButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "cursor-pointer w-[16px] h-[16px] flex justify-center items-center hover:text-[#ef18c4] disabled:hover:text-black disabled:opacity-50 disabled:cursor-not-allowed",
      side === "right" ? "rotate-180" : "",
      className
    )}
    {...props}
  >
    <ChevronLeftIcon />
  </button>
);
