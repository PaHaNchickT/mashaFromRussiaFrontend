"use client";

import cn from "clsx";

import { Heading2 } from "@/UI/Text/Heading2";

type WordSingleStatProps = {
  data: { title: string; count: number | string };
  minWidth?: string;
};

export const WordSingleStat = ({
  data,
  minWidth = "min-w-0",
}: WordSingleStatProps) => {
  return (
    <div className={cn("flex flex-col", minWidth)}>
      <Heading2>{data.count}</Heading2>
      <span className="font-medium">{data.title}</span>
    </div>
  );
};
