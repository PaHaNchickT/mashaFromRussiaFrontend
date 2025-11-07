import type { ReactNode } from "react";
import React from "react";

export const SortIcon = ({
  fill = "currentColor",
  filled,
  size,
  height,
  width,
  ...props
}: {
  fill?: string;
  filled?: boolean;
  size?: string;
  height?: string;
  width?: string;
}): ReactNode => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? fill : "none"}
      width={size || width || 15}
      height={size || height || 15}
      {...props}
    >
      <path
        d="M6 9l6-6 6 6"
        stroke="black"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 15l6 6 6-6"
        stroke="black"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
