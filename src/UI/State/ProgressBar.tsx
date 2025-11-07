import cn from "clsx";
import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
} from "react";

import type { ProgressBarHandle } from "@/types/commonTypes";

type ProgressBarProps = {
  className?: string;
  autoStart?: boolean;
  value?: number | null;
  isLabel?: boolean;
};

const clamp = (v: number, a = 0, b = 100) => Math.min(b, Math.max(a, v));

export const ProgressBar = forwardRef<ProgressBarHandle, ProgressBarProps>(
  (
    { className = "", autoStart = false, value = null, isLabel = false },
    ref
  ) => {
    const [percent, setPercent] = useState<number>(value ?? 0);
    const runningRef = useRef(false);
    const timerRef = useRef<number | null>(null);
    const slowTimerRef = useRef<number | null>(null);

    useEffect(() => {
      if (typeof value === "number") {
        setPercent(clamp(value, 0, 100));
      }
    }, [value]);

    useImperativeHandle(ref, () => ({
      start: () => startProgress(),
      finish: () => finishProgress(),
      reset: () => resetProgress(),
    }));

    useEffect(() => {
      if (autoStart) startProgress();
      return cleanupTimers;
    }, []);

    function cleanupTimers() {
      runningRef.current = false;

      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }

      if (slowTimerRef.current) {
        window.clearInterval(slowTimerRef.current);
        slowTimerRef.current = null;
      }
    }

    function startProgress() {
      if (runningRef.current) return;

      runningRef.current = true;

      timerRef.current = window.setInterval(() => {
        setPercent((p) => {
          if (typeof value === "number") return p;

          if (p >= 90) {
            if (timerRef.current) {
              window.clearInterval(timerRef.current);
              timerRef.current = null;
            }

            startSlowPhase();

            return clamp(p, 0, 99);
          }

          const step = Math.random() * 3 + 1;

          return clamp(Math.round((p + step) * 100) / 100, 0, 99);
        });
      }, 200);
    }

    function startSlowPhase() {
      slowTimerRef.current = window.setInterval(() => {
        setPercent((p) => {
          if (typeof value === "number") return p;

          if (p >= 99) {
            if (slowTimerRef.current) {
              window.clearInterval(slowTimerRef.current);

              slowTimerRef.current = null;
            }
            return 99;
          }

          const step = Math.random() * 0.3 + 0.02;

          return clamp(Math.round((p + step) * 100) / 100, 0, 99);
        });
      }, 800);
    }

    function finishProgress() {
      cleanupTimers();
      setPercent(100);
    }

    function resetProgress() {
      cleanupTimers();
      setPercent(0);
    }

    const percentToShow = Math.round(percent);

    return (
      <div className={cn("flex items-center gap-[8px]", className)}>
        <div
          className="flex-1 bg-[#F5F5F5] rounded-full overflow-hidden h-[8px] relative"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percentToShow}
          aria-label="Загрузка"
        >
          <div
            className="h-full rounded-full bg-[#EF18C4]"
            style={{ width: `${clamp(percent, 0, 100)}%` }}
          />
        </div>
        {isLabel && (
          <div className="w-[28px] text-left text-sm">{percentToShow}%</div>
        )}
      </div>
    );
  }
);

ProgressBar.displayName = "ProgressBar";
