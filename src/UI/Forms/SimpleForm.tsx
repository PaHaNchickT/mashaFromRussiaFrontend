import { zodResolver } from "@hookform/resolvers/zod";
import cn from "clsx";
import React from "react";
import type { DefaultValues, Path, SubmitHandler } from "react-hook-form";
import { useForm, type Resolver } from "react-hook-form";
import type { output, z, ZodObject, ZodRawShape } from "zod";

import Button from "../Buttons/Button";
import { Input } from "../Inputs/Input";

export interface SimpleFormFields {
  name: string;
  label?: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

interface SimpleFormProps<T extends ZodObject<ZodRawShape>> {
  fields: SimpleFormFields[];
  schema: T;
  onSubmit: (data: z.infer<T>) => void;
  isLoading?: boolean;
  defaultValues?: DefaultValues<z.infer<T>>;
  submitLabel: string;
  formGap?: string;
  inputsGap?: string;
}

export function SimpleForm<T extends ZodObject<ZodRawShape>>({
  fields,
  schema,
  onSubmit,
  isLoading = false,
  defaultValues,
  formGap = "gap-[15px]",
  inputsGap = "gap-[15px]",
  submitLabel,
}: SimpleFormProps<T>) {
  const resolver = zodResolver(schema) as unknown as Resolver<
    z.infer<T>,
    unknown,
    z.infer<T>
  >;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<z.infer<T>>({
    resolver,
    defaultValues,
  });

  const submitHandler: SubmitHandler<z.infer<T>> = (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className={cn("flex flex-col", formGap)}
    >
      <div className={cn("flex flex-col", inputsGap)}>
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            {...register(field.name as Path<output<T>>)}
            error={
              errors[field.name as keyof z.infer<T>]?.message as
                | string
                | undefined
            }
            classNameInput="grow placeholder:text-[16px]"
            classNameLabel="font-bold"
          />
        ))}
      </div>

      <Button size="primary" type="submit" disabled={isLoading || !isDirty}>
        {submitLabel}
      </Button>
    </form>
  );
}
