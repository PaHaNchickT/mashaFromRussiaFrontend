import cn from "clsx";
import type { ReactNode } from "react";

import { TEXT_COLOR_PALETTE } from "@/constants/commonConstants";

type Heading2Props = {
  children: ReactNode | string;
  color?: keyof typeof TEXT_COLOR_PALETTE;
  isBold?: boolean;
  isCenterAlign?: boolean;
  className?: string;
};

export const Heading2 = ({
  children,
  color = "black",
  isBold = false,
  isCenterAlign = false,
  className = "leading-[normal]",
}: Heading2Props) => (
  <h2
    className={cn(
      "text-[50px]",
      TEXT_COLOR_PALETTE[color],
      isBold ? "font-bold" : "font-normal",
      isCenterAlign ? "text-center" : "text-left",
      className
    )}
  >
    {children}
  </h2>
);
