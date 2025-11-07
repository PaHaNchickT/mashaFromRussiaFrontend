import cn from "clsx";
import type { ReactNode } from "react";

import { TEXT_COLOR_PALETTE } from "@/constants/commonConstants";

type Heading3Props = {
  children: ReactNode | string;
  color?: keyof typeof TEXT_COLOR_PALETTE;
  className?: string;
};

export const Heading3 = ({
  children,
  color = "black",
  className = "leading-[normal]",
}: Heading3Props) => (
  <h3 className={cn("text-[30px]", TEXT_COLOR_PALETTE[color], className)}>
    {children}
  </h3>
);
