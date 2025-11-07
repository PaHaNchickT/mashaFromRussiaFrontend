import { useState } from "react";

import { useDeleteSeveralWordsMutation } from "@/store/slices/wordsApi";
import { pluralizator } from "@/utils/pluralizator";

import { ConfirmModal } from "./ConfirmModal";
import Button from "../Buttons/Button";
import { Heading3 } from "../Text/Heading3";

type DeleteConfirmModalProps = {
  ids: string[];
  setSelectedIds: (value: string[]) => void;
};

export const DeleteConfirmModal = ({
  ids,
  setSelectedIds,
}: DeleteConfirmModalProps) => {
  const [deleteSeveralWords] = useDeleteSeveralWordsMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerConfirmClick = () => {
    deleteSeveralWords(ids)
      .unwrap()
      .then(() => setSelectedIds([]))
      .catch((error) => {
        // TODO: какое поведение?
        console.error(error);
      })
      .finally(() => setIsModalOpen(false));
  };

  return (
    <>
      <Button
        size="secondary"
        onClick={() => setIsModalOpen(true)}
        disabled={!ids.length}
      >
        Удалить
      </Button>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        handleConfirm={handlerConfirmClick}
        handleCancel={() => setIsModalOpen(false)}
        confirmText="Да, удалить"
        cancelText="Нет, не удалять"
        wrapperPaddings="p-[50px] pl-[70px]"
        wrapperGap="gap-[40px]"
      >
        <Heading3>
          Вы уверены что хотите удалить
          <br />
          {`${ids.length} ${pluralizator("слово", ids.length)}?`}
        </Heading3>
        <p>Вы не сможете восстановить слова</p>
      </ConfirmModal>
    </>
  );
};
