import cn from "clsx";
import type { ReactNode, MouseEvent as ReactMouseEvent } from "react";
import { useEffect, useState } from "react";

import { INTERACTIVE_SELECTORS } from "@/constants/commonConstants";

type FlipCardProps = {
  frontContent: ReactNode;
  backContent: ReactNode;
  className?: string;
  flipDuration?: number;
  scaleDuringFlip?: number;
  perspective?: number;
  onFlipStart?: () => void;
  onFlipEnd?: () => void;
};

export const FlipCard = ({
  frontContent,
  backContent,
  className = "w-[500px] h-[500px]",
  flipDuration = 700,
  scaleDuringFlip = 1.04,
  perspective = 1200,
  onFlipStart,
  onFlipEnd,
}: FlipCardProps) => {
  const [currentState, setCurrentState] = useState<"front" | "back">("front");
  const [isAnimating, setIsAnimating] = useState(false);

  const isFlipped = currentState === "back";

  const handleCardClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;

    if (target && target.closest(INTERACTIVE_SELECTORS)) return;

    setCurrentState((value) => (value === "front" ? "back" : "front"));
  };

  useEffect(() => {
    setIsAnimating(true);
    onFlipStart?.();

    const timerId = setTimeout(() => {
      setIsAnimating(false);
      onFlipEnd?.();
    }, flipDuration);

    return () => clearTimeout(timerId);
  }, [currentState, flipDuration, onFlipStart, onFlipEnd]);

  return (
    <div
      className={cn(
        "inline-block cursor-pointer relative rounded-[22px] [perspective-origin:50%_45%]",
        className
      )}
      style={{
        perspective,
      }}
      onClick={handleCardClick}
    >
      <div
        className="relative will-change-transform w-full h-full rounded-[22px] shadow-[0_16px_40px_rgba(16,24,40,0.18)]"
        style={{
          transformStyle: "preserve-3d",
          transition: `transform ${flipDuration}ms cubic-bezier(.2,.8,.2,1)`,
          transform: `${isFlipped ? "rotateY(180deg)" : "rotateY(0deg)"} ${
            isAnimating ? `scale(${scaleDuringFlip})` : "scale(1)"
          }`,
          WebkitTransformStyle: "preserve-3d",
        }}
      >
        <div
          className={cn(
            "overflow-hidden absolute inset-0 flex items-center justify-center w-full h-full rounded-[22px] bg-white",
            !isFlipped ? "z-20 pointer-events-auto" : "z-10 pointer-events-none"
          )}
          style={{
            transform: "rotateY(0deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {frontContent}
        </div>

        <div
          className={cn(
            "overflow-hidden absolute inset-0 flex items-center justify-center w-full h-full rounded-[22px] bg-white",
            isFlipped ? "z-20 pointer-events-auto" : "z-10 pointer-events-none"
          )}
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  );
};
