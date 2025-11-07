import { useState } from "react";

import { WORD_FORM_FIELDS, WORD_FORM_SCHEMA } from "@/constants/wordsConstants";
import { useUpdateWordMutation } from "@/store/slices/wordsApi";
import type { SpeakFn } from "@/types/commonTypes";
import type { Word } from "@/types/wordsTypes";
import { SimpleForm } from "@/UI/Forms/SimpleForm";

import { WordCard } from "./WordCard";
import { Modal } from "../../UI/Modals/Modal";

interface VocabularyWordModalProps {
  wordData: Word;
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  isSpeaking: boolean;
  speak: SpeakFn;
}

export const VocabularyWordModal = ({
  wordData,
  isModalOpen,
  setIsModalOpen,
  isSpeaking,
  speak,
}: VocabularyWordModalProps) => {
  const [updateWord, { isLoading }] = useUpdateWordMutation();

  const [isEditMode, setIsEditMode] = useState(false);

  const handlerClick = (data: Word) => {
    updateWord({ id: wordData.word_id, data })
      .unwrap()
      .then(() => setIsModalOpen(false))
      .catch((error) => {
        // TODO: Error handler
        console.error(error);
      });
  };

  return (
    <>
      {isEditMode ? (
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
            defaultValues={wordData}
            formGap="gap-[25px]"
            inputsGap="gap-[17px]"
          />
        </Modal>
      ) : (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          wrapperWidth="w-[637px]"
          wrapperPaddings="px-[50px] py-[72px] pb-[60px]"
          wrapperBgColor="pink"
        >
          <WordCard
            wordData={wordData}
            setIsEdit={setIsEditMode}
            isSpeaking={isSpeaking}
            speak={speak}
          />
        </Modal>
      )}
    </>
  );
};
