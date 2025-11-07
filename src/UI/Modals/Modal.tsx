import cn from "clsx";
import type { MouseEvent, ReactNode } from "react";

import { CrossIcon } from "../Icons/CrossIcon";

const BACKGROUND_COLOR_VALUES = {
  white: "bg-white",
  pink: "bg-[#FDE8F9]",
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  onModalClick?: () => void;
  wrapperGap?: string;
  wrapperBgColor?: "white" | "pink";
  wrapperWidth?: string;
  wrapperPaddings?: string;
  headerContent?: ReactNode | Element;
}

export const Modal = ({
  isOpen,
  onClose,
  children,
  onModalClick,
  wrapperGap = "gap-[15px]",
  wrapperBgColor = "white",
  wrapperWidth = "w-[638px]",
  wrapperPaddings = "px-[50px] py-[72px] pb-[60px]",
  headerContent,
}: ModalProps) => {
  if (!isOpen) return null;

  const handleBackgroundClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose();
  };

  const handleModalClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (
      onModalClick &&
      target.tagName !== "svg" &&
      target.tagName !== "BUTTON" &&
      target.tagName !== "path"
    )
      onModalClick();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#D9D9D9E5] bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className={cn(
          "flex flex-col rounded-[22px] shadow-sm",
          wrapperGap,
          BACKGROUND_COLOR_VALUES[wrapperBgColor],
          wrapperWidth,
          wrapperPaddings
        )}
        onClick={handleModalClick}
      >
        <div
          className={cn(
            "flex items-center",
            headerContent ? "justify-between" : "justify-end"
          )}
        >
          {headerContent && (
            <>
              <div className="w-[12px] h-[12px]"></div>
              {headerContent}
            </>
          )}
          <button
            onClick={onClose}
            className="self-start hover:opacity-50 cursor-pointer"
          >
            <CrossIcon fill="#8c8c8c" filled />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};
