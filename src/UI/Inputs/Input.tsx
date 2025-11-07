import cn from "clsx";
import type { InputHTMLAttributes } from "react";
import React, { forwardRef } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: string;
  register?: UseFormRegisterReturn;
  classNameLabel?: string;
  classNameInput?: string;
  classNameWrapper?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      register,
      name,
      classNameLabel = "font-normal",
      classNameInput = "placeholder:text-[20px]",
      classNameWrapper = "gap-[21px]",
      ...props
    },
    ref
  ) => (
    <div className={cn("flex items-end", classNameWrapper)}>
      {label && (
        <label
          className={cn("leading-[normal]", classNameLabel)}
          htmlFor={name}
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        {...props}
        {...(register && { ...register })}
        ref={ref}
        className={cn(
          "italic border-0 border-b border-black focus:outline-none pl-[17px] focus:outline-none leading-[0] placeholder:opacity-50",
          error ? "border-red-500" : "border-black",
          classNameInput
        )}
      />
      {error && (
        <span className="text-red-500 text-sm self-center leading-[normal]">
          {error}
        </span>
      )}
    </div>
  )
);

Input.displayName = "TextInput";
