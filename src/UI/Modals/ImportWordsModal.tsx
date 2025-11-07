import { useRef, useState } from "react";

import { IMPORT_REQUIREMENTS } from "@/constants/commonConstants";
import { useImportWordsMutation } from "@/store/slices/wordsApi";
import type { ProgressBarHandle } from "@/types/commonTypes";

import { Modal } from "./Modal";
import Button from "../Buttons/Button";
import { FileInput } from "../Inputs/FileInput";
import { ProgressBar } from "../State/ProgressBar";
import { Heading3 } from "../Text/Heading3";

type ImportWordsModalProps = {
  label?: string;
  onSubmit?: (value: unknown) => void;
  buttonSize?: "default" | "primary" | "secondary" | "alternate";
};

export const ImportWordsModal = ({
  label = "Импорт файла",
  onSubmit,
  buttonSize = "primary",
}: ImportWordsModalProps) => {
  const [importWords, { error }] = useImportWordsMutation();

  const progressRef = useRef<ProgressBarHandle>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const clickHandler = async (file: File) => {
    setIsLoading(true);
    progressRef.current?.start();

    const fd = new FormData();
    fd.append("file", file);

    importWords(fd)
      .unwrap()
      .then(() => {
        progressRef.current?.finish();

        setTimeout(() => {
          handlerOnClose();

          if (onSubmit) onSubmit(3);
        }, 1000);
      })
      .catch((error) => {
        progressRef.current?.reset();
        setIsLoading(false);
        console.error(error);
      });
  };

  const modalReset = () => {
    progressRef.current?.reset();
    setIsLoading(false);
  };

  const handlerOnClose = () => {
    setIsModalOpen(false);
    modalReset();
  };

  return (
    <>
      <Button size={buttonSize} onClick={() => setIsModalOpen(true)}>
        {label}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={handlerOnClose}
        wrapperWidth="w-[621px] h-[408px]"
        wrapperPaddings="p-[50px]"
      >
        <div className="flex flex-col gap-[20px]">
          <div className="flex flex-col gap-[7px]">
            <Heading3>
              {error ? "Что-то пошло не так..." : "Загрузите файл для импорта"}
            </Heading3>
            <div className="flex flex-col gap-[12px]">
              <p>Требования к файлу:</p>
              <ul className="list-disc pl-[20px] flex flex-col">
                {IMPORT_REQUIREMENTS.map((item, index) => (
                  <li key={index} className="leading-[normal] pl-[7px]">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ProgressBar
            ref={progressRef}
            className={isLoading ? "" : "hidden"}
            isLabel
          />
          <div className="flex gap-[10px]">
            <FileInput setFileData={clickHandler} isDisabled={isLoading} />
            <a
              href="/tableExamples/ExcelTableExample.xlsx"
              download="Table Example"
            >
              <Button size="secondary" disabled={isLoading}>
                Скачать шаблон
              </Button>
            </a>
          </div>
        </div>
      </Modal>
    </>
  );
};
