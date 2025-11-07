import type { ReactNode } from "react";
import React from "react";

export const HomeIcon = ({
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
      viewBox="0 0 17 9"
      fill={filled ? fill : "black"}
      width={size || width || 17}
      height={size || height || 17}
      {...props}
    >
      <path
        d="M1.20459 1.47095H15.7954M1.20459 7.72413H15.7954"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};
