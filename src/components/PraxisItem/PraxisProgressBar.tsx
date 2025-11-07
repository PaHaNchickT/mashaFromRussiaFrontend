import { memo } from "react";

import { ProgressBar } from "@/UI/State/ProgressBar";

type PraxisProgressBarProps = {
  currentWord: number;
  dataLength: number;
};

export const PraxisProgressBar = memo(
  ({ currentWord, dataLength }: PraxisProgressBarProps) => (
    <div className="flex flex-col items-center gap-[10px]">
      <ProgressBar
        className="w-[364px]"
        value={(currentWord / dataLength) * 100}
      />
      <p className="text-[14px] leading-[normal]">
        {`${currentWord} из ${dataLength}`}
      </p>
    </div>
  )
);

PraxisProgressBar.displayName = "PraxisProgressBar";
