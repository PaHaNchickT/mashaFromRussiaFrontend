"use client";

import type { ButtonHTMLAttributes } from "react";

import { AudioIcon } from "../Icons/AudioIcon";

type SpeechButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  onClick: () => void;
  width?: number;
  height?: number;
};

export const SpeechButton = ({
  onClick,
  width = 15,
  height = 15,
  ...props
}: SpeechButtonProps) => (
  <button
    className="cursor-pointer hover:opacity-50 disabled:cursor-not-allowed disabled:opacity-50"
    onClick={onClick}
    {...props}
  >
    <AudioIcon width={width} height={height} />
  </button>
);
