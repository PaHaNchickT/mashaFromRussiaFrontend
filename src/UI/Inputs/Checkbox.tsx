import cn from "clsx";
import React from "react";

type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  classNameWrapper?: string;
  classNameCheckbox?: string;
  classNameLabel?: string;
};

export const Checkbox = ({
  checked,
  onChange,
  label,
  disabled,
  classNameWrapper = "self-start",
  classNameCheckbox = "bg-[#bfbfbf]",
  classNameLabel = "",
}: CheckboxProps) => (
  <label
    className={cn(
      "flex items-center gap-2 cursor-pointer select-none",
      classNameWrapper
    )}
  >
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      className="hidden"
    />
    <span
      className={cn(
        "w-5 h-5 rounded-[5px] flex items-center justify-center",
        checked ? "bg-black" : classNameCheckbox,
        disabled ? "bg-[#bfbfbf] opacity-50 cursor-not-allowed" : ""
      )}
      aria-label="checkbox"
    />
    {label && (
      <span className={cn("leading-[normal]", classNameLabel)}>{label}</span>
    )}
  </label>
);
