import cn from "clsx";
import type { ChangeEvent } from "react";
import { useRef } from "react";

import Button from "../Buttons/Button";

type FileInputProps = {
  setFileData: (value: File) => void;
  isDisabled?: boolean;
  className?: string;
};

export const FileInput = ({
  setFileData,
  isDisabled = false,
  className = "",
}: FileInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileData(event.target.files[0]);
    }
  };

  return (
    <div className={cn("flex", className)}>
      <input
        ref={inputRef}
        type="file"
        accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        onChange={handleChange}
        className="hidden"
      />
      <Button size="primary" onClick={handleClick} disabled={isDisabled}>
        Загрузить
      </Button>
    </div>
  );
};
