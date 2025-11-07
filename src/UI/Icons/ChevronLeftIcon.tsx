import type { ReactNode } from "react";
import React from "react";

export const ChevronLeftIcon = ({
  size,
  height,
  width,
  className = "",
  ...props
}: {
  size?: string;
  height?: string;
  width?: string;
  className?: string;
}): ReactNode => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 5 8"
      fill="currentColor"
      width={size || width || 5}
      height={size || height || 8}
      className={className}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.29303 4L4.14703 7.854L4.85403 7.147L1.70703 4L4.85403 0.853996L4.14703 0.145996L0.29303 4Z"
      />
    </svg>
  );
};
