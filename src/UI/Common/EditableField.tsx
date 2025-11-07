import cn from "clsx";
import React, { useState } from "react";

import { SingleInputForm } from "../Forms/SingleInputForm";
import { EditIcon } from "../Icons/EditIcon";
import { DailyLimitInput } from "../Inputs/DailyLimitInput";

interface EditableFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string | number;
  inputType?: "text" | "email" | "password" | "dailyLimit";
  classNameLabel?: string;
  classNameInput?: string;
  classNameWrapper?: string;
  isIconAbsolute?: boolean;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
}

export const EditableField = ({
  name,
  label,
  placeholder = "Введите текст",
  defaultValue = "",
  inputType = "text",
  classNameLabel = "font-normal",
  classNameInput = "placeholder:text-[20px]",
  classNameWrapper = "gap-[21px]",
  isIconAbsolute = false,
  onSubmit,
}: EditableFieldProps) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const submitHandler = (data: Record<string, unknown>) => {
    onSubmit(data)
      .then(() => setIsEditMode(false))
      .catch((error) => {
        // TODO: error handling
        console.error(error);
      });
  };

  return (
    <>
      {isEditMode ? (
        <>
          {inputType === "dailyLimit" ? (
            <DailyLimitInput
              value={+defaultValue || 10}
              label={label}
              onSubmit={(value) => submitHandler({ daily_limit: value })}
              isIconAbsolute={isIconAbsolute}
            />
          ) : (
            <SingleInputForm
              defaultValue={defaultValue}
              label={label}
              placeholder={placeholder}
              name={name}
              type={inputType}
              onSubmit={submitHandler}
              classNameLabel={classNameLabel}
              classNameInput={classNameInput}
              classNameWrapper={classNameWrapper}
              isIconAbsolute={isIconAbsolute}
            />
          )}
        </>
      ) : (
        <div className={cn("flex items-end relative", classNameWrapper)}>
          {label && (
            <label
              className={cn("leading-[normal]", classNameLabel)}
              htmlFor={name}
            >
              {label}
            </label>
          )}

          <span
            className={cn(
              "grow italic border-0 border-b border-black focus:outline-none pl-[17px] focus:outline-none leading-[normal] placeholder:opacity-50",
              classNameInput
            )}
          >
            {defaultValue}
          </span>

          <button
            onClick={() => setIsEditMode(true)}
            className={cn(
              "leading-[normal] hover:opacity-50 cursor-pointer w-[30px] h-[30px] flex justify-center items-center",
              isIconAbsolute ? "absolute right-0" : "relative"
            )}
          >
            <EditIcon />
          </button>
        </div>
      )}
    </>
  );
};
