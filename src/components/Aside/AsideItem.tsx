import cn from "clsx";
import type { ReactNode } from "react";

import { AsideLink } from "@/components/Aside/AsideLink";
import { ASIDE_LINK_BASE_STYLES } from "@/constants/asideConstants";

type AsideItemProps = {
  href: string;
  innerText: string;
  children: ReactNode;
  isDisabled?: boolean;
};

export const AsideItem = ({
  href,
  innerText,
  children,
  isDisabled = false,
}: AsideItemProps) => (
  <>
    {isDisabled ? (
      <div
        className={cn(ASIDE_LINK_BASE_STYLES, "opacity-50 cursor-not-allowed")}
      >
        {children}
      </div>
    ) : (
      <AsideLink href={href} innerText={innerText}>
        {children}
      </AsideLink>
    )}
  </>
);
