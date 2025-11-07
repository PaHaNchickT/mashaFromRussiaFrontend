import { zodResolver } from "@hookform/resolvers/zod";
import cn from "clsx";
import React from "react";
import { useForm } from "react-hook-form";
import type { ZodObject } from "zod";
import { z } from "zod";

import { TickIcon } from "../Icons/TickIcon";
import { Input } from "../Inputs/Input";

type SingleInputFormProps = {
  name: string;
  onSubmit: (values: Record<string, unknown>) => void | Promise<void>;
  schema?: ZodObject;
  label?: string;
  type?: "text" | "email" | "password";
  defaultValue?: string | number;
  placeholder?: string;
  submitLabel?: string;
  classNameWrapper?: string;
  classNameInput?: string;
  classNameLabel?: string;
  errorText?: string;
  isIconAbsolute?: boolean;
};

export const SingleInputForm = ({
  name,
  onSubmit,
  schema,
  label,
  type = "text",
  defaultValue,
  placeholder,
  classNameWrapper = "",
  classNameInput = "",
  classNameLabel = "",
  errorText = "Обязательное поле",
  isIconAbsolute = false,
}: SingleInputFormProps) => {
  const fallbackSchema = z.object({
    [name]: z.string().min(1, errorText),
  });

  const resolverSchema = schema || fallbackSchema;

  const { register, handleSubmit, formState } = useForm<{
    [k: string]: unknown;
  }>({
    resolver: zodResolver(resolverSchema),
    defaultValues: { [name]: defaultValue ?? "" },
    mode: "onTouched",
  });

  const { errors, isSubmitting } = formState;

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="w-full flex items-center relative"
    >
      <Input
        label={label}
        placeholder={placeholder}
        type={type}
        error={errors.username?.message}
        {...register(name, { required: errorText })}
        classNameLabel={classNameLabel}
        classNameInput={classNameInput}
        classNameWrapper={classNameWrapper}
      />
      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          `w-[30px] flex justify-center items-center hover:opacity-50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`,
          isIconAbsolute ? "absolute right-0" : "relative"
        )}
      >
        <TickIcon />
      </button>
    </form>
  );
};
