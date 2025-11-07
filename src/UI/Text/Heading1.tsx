import cn from "clsx";
import type { ReactNode } from "react";

import { TEXT_COLOR_PALETTE } from "@/constants/commonConstants";

type Heading1Props = {
  children: ReactNode | string;
  color?: keyof typeof TEXT_COLOR_PALETTE;
};

export const Heading1 = ({ children, color = "black" }: Heading1Props) => (
  <h1
    className={cn(
      "text-[69px] font-bold leading-[normal]",
      TEXT_COLOR_PALETTE[color]
    )}
  >
    {children}
  </h1>
);
