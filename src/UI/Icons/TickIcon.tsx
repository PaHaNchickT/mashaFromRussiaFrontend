import type { ReactNode } from "react";
import React from "react";

export const TickIcon = ({
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
      viewBox="0 0 20 14"
      fill={filled ? fill : "black"}
      width={size || width || 20}
      height={size || height || 14}
      {...props}
    >
      <path d="M6.9376 13.635L0.725098 7.4225L1.6176 6.53125L6.9376 11.8512L18.3826 0.40625L19.2738 1.29875L6.9376 13.635Z" />
    </svg>
  );
};
