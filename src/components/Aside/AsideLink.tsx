"use client";

import cn from "clsx";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import {
  ASIDE_LINK_BASE_STYLES,
  TOOLTIP_STYLES_ACTIVE,
  TOOLTIP_STYLES_HIDDEN,
  TOOLTIP_STYLES_PREPARE,
} from "@/constants/asideConstants";

import { ProgressLink } from "../../UI/Links/ProgressLink";

type AsideLinkProps = {
  href: string;
  children: ReactNode;
  innerText: string;
};

const TOOLTIP_STYLES_MAP = {
  hidden: TOOLTIP_STYLES_HIDDEN,
  preparing: TOOLTIP_STYLES_PREPARE,
  active: TOOLTIP_STYLES_ACTIVE,
} as const;

export const AsideLink = ({ href, children, innerText }: AsideLinkProps) => {
  const [wrapperBg, setWrapperBg] = useState("bg-[#d9d9d9]");
  const [tooltipState, setTooltipState] = useState<
    "hidden" | "preparing" | "active"
  >("hidden");

  const prepareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipStateRef = useRef<typeof tooltipState>("hidden");

  const pathname = usePathname();
  const isActive = pathname === href;

  const setTooltipStateAndRef = (state: "hidden" | "preparing" | "active") => {
    tooltipStateRef.current = state;
    setTooltipState(state);
  };

  const handlerOnMouseEnter = () => {
    // PRE_ACTIVE
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }

    setWrapperBg("bg-[#a3a3a3]");
    setTooltipStateAndRef("preparing");

    // ACTIVE
    if (prepareTimer.current) {
      clearTimeout(prepareTimer.current);
    }
    prepareTimer.current = setTimeout(() => {
      prepareTimer.current = null;
      setTooltipStateAndRef("active");
    }, 500);
  };

  const hiddenPhaseOn = () => {
    setWrapperBg("bg-[#d9d9d9]");
    setTooltipStateAndRef("hidden");
  };

  const handlerOnMouseLeave = () => {
    if (prepareTimer.current) {
      clearTimeout(prepareTimer.current);
      prepareTimer.current = null;
    }

    if (tooltipStateRef.current === "active") {
      // PRE_HIDDEN
      setTooltipStateAndRef("preparing");

      // HIDDEN
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
      }
      hideTimer.current = setTimeout(() => {
        hideTimer.current = null;
        hiddenPhaseOn();
      }, 300);
    } else {
      hiddenPhaseOn();
    }
  };

  const handleInteractionCancel = () => {
    setTimeout(() => {
      if (prepareTimer.current) {
        clearTimeout(prepareTimer.current);
        prepareTimer.current = null;
      }

      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }

      hiddenPhaseOn();
    }, 500);
  };

  useEffect(() => {
    handleInteractionCancel();
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (prepareTimer.current) clearTimeout(prepareTimer.current);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div className="relative font-anonymous">
      {isActive ? (
        <div
          className={cn(ASIDE_LINK_BASE_STYLES, "relative z-2 bg-[#a3a3a3]")}
          onMouseEnter={handlerOnMouseEnter}
          onMouseLeave={handlerOnMouseLeave}
        >
          {children}
        </div>
      ) : (
        <ProgressLink
          href={href}
          className={cn(ASIDE_LINK_BASE_STYLES, wrapperBg, "relative z-2")}
          onMouseEnter={handlerOnMouseEnter}
          onMouseLeave={handlerOnMouseLeave}
          onClick={handleInteractionCancel}
          onPointerDown={handleInteractionCancel}
        >
          {children}
        </ProgressLink>
      )}

      <div
        className={cn(
          ASIDE_LINK_BASE_STYLES,
          "box-border absolute z-1 pl-[20px] font-bold top-0 bg-[#a3a3a3]"
        )}
        style={TOOLTIP_STYLES_MAP[tooltipState]}
      >
        {innerText}
      </div>
    </div>
  );
};
