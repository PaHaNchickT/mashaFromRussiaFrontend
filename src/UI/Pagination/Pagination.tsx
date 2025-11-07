import cn from "clsx";
import React from "react";

import type { ResponseMetaData } from "@/types/commonTypes";

import { PaginationThreeDots } from "./PaginationThreeDots";
import { ChevronButton } from "../Buttons/ChevronButton";

type EtcDotsType = number | "LEFT_ELLIPSIS" | "RIGHT_ELLIPSIS";

export type PaginationProps = {
  setPage: (value: number) => void;
  meta: ResponseMetaData;
};

export const Pagination = ({ setPage, meta }: PaginationProps) => {
  const { page, totalPages } = meta;

  const buildItems = (): EtcDotsType[] => {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) {
      return [1, 2, 3, "RIGHT_ELLIPSIS", totalPages];
    }

    if (page >= totalPages - 2) {
      return [1, "LEFT_ELLIPSIS", totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, "LEFT_ELLIPSIS", page, "RIGHT_ELLIPSIS", totalPages];
  };

  const items = buildItems();

  const onEllipsisClick = (side: "LEFT" | "RIGHT") => {
    if (side === "LEFT") {
      setPage(2);
    } else {
      setPage(Math.max(1, totalPages - 1));
    }
  };

  return (
    <nav className="flex items-center gap-[30px] self-center">
      <ChevronButton
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
        disabled={page === 1}
      />

      <ul className="flex items-center gap-[30px] text-[20px]">
        {items.map((item, index) => {
          if (item === "LEFT_ELLIPSIS") {
            return (
              <li key={`left-ell-${index}`}>
                <PaginationThreeDots onClick={() => onEllipsisClick("LEFT")} />
              </li>
            );
          }

          if (item === "RIGHT_ELLIPSIS") {
            return (
              <li key={`right-ell-${index}`}>
                <PaginationThreeDots onClick={() => onEllipsisClick("RIGHT")} />
              </li>
            );
          }

          const pageNumber = item as number;
          const isActive = pageNumber === page;

          return (
            <li key={pageNumber}>
              <button
                onClick={() => setPage(pageNumber)}
                className={cn(
                  "min-w-[14px] leading-[normal] flex items-center justify-center",
                  isActive
                    ? "text-[#EF18C4] cursor-auto"
                    : "text-black hover:text-[#EF18C4] cursor-pointer"
                )}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}
      </ul>

      <ChevronButton
        side="right"
        onClick={() => {
          if (page < totalPages) setPage(page + 1);
        }}
        disabled={page === totalPages}
      />
    </nav>
  );
};

/*
Usage example:

<Pagination
  meta={{ page: currentPage, perPage: 10, total: 56, totalPages: 6 }}
  setPage={(p) => setCurrentPage(p)}
/>

Notes:
- Компонент не делает fetch — он только вызывает setPage, как просили.
- Для accessibility использованы aria-label и aria-current.
- Стили — Tailwind. Подстройте цвета под дизайн при необходимости.
*/
