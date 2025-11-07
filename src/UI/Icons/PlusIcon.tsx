import type { ReactNode } from "react";
import React from "react";

export const PlusIcon = ({
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
      viewBox="0 0 15 14"
      fill={filled ? fill : "white"}
      width={size || width || 15}
      height={size || height || 14}
      {...props}
    >
      <path d="M7.96863 1.37573H7.03113C6.94779 1.37573 6.90613 1.4174 6.90613 1.50073V6.40698H2.25024C2.16691 6.40698 2.12524 6.44865 2.12524 6.53198V7.46948C2.12524 7.55282 2.16691 7.59448 2.25024 7.59448H6.90613V12.5007C6.90613 12.5841 6.94779 12.6257 7.03113 12.6257H7.96863C8.05196 12.6257 8.09363 12.5841 8.09363 12.5007V7.59448H12.7502C12.8336 7.59448 12.8752 7.55282 12.8752 7.46948V6.53198C12.8752 6.44865 12.8336 6.40698 12.7502 6.40698H8.09363V1.50073C8.09363 1.4174 8.05196 1.37573 7.96863 1.37573Z" />
    </svg>
  );
};
