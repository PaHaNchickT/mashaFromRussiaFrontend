import { useState } from "react";

import { WORD_FORM_FIELDS, WORD_FORM_SCHEMA } from "@/constants/wordsConstants";
import { useCreateWordMutation } from "@/store/slices/wordsApi";
import type { Word } from "@/types/wordsTypes";

import { Modal } from "./Modal";
import Button from "../Buttons/Button";
import { SimpleForm } from "../Forms/SimpleForm";

type NewWordModalProps = {
  label?: string;
  onSubmit?: () => void;
  buttonSize?: "default" | "primary" | "secondary" | "alternate";
};

export const NewWordModal = ({
  label = "Новое слово",
  onSubmit,
  buttonSize = "primary",
}: NewWordModalProps) => {
  const [createWord, { isLoading }] = useCreateWordMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerClick = (data: Word) => {
    createWord(data)
      .unwrap()
      .then(() => {
        if (onSubmit) onSubmit();
      })
      .catch((error) => {
        // TODO: какое поведение?
        console.error(error);
      })
      .finally(() => setIsModalOpen(false));
  };

  return (
    <>
      <Button size={buttonSize} onClick={() => setIsModalOpen(true)}>
        {label}
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        wrapperPaddings="p-[50px]"
        wrapperGap="gap-[30px]"
      >
        <SimpleForm
          fields={WORD_FORM_FIELDS}
          schema={WORD_FORM_SCHEMA}
          onSubmit={(data) => handlerClick(data as Word)}
          isLoading={isLoading}
          submitLabel="Сохранить"
          formGap="gap-[25px]"
          inputsGap="gap-[17px]"
        />
      </Modal>
    </>
  );
};
