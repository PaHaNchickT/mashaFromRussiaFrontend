import { ConfirmModal } from "@/UI/Modals/ConfirmModal";
import { Heading3 } from "@/UI/Text/Heading3";

type PraxisExitConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
};

export const PraxisExitConfirmModal = ({
  isOpen,
  onClose,
  handleConfirm,
  handleCancel,
}: PraxisExitConfirmModalProps) => (
  <ConfirmModal
    isOpen={isOpen}
    onClose={onClose}
    handleConfirm={handleConfirm}
    handleCancel={handleCancel}
    confirmText="Да, прервать"
    cancelText="Нет, продолжить"
    wrapperPaddings="p-[50px] pl-[70px]"
    wrapperGap="gap-[70px]"
    wrapperWidth="w-[638px] h-[416px]"
    innerGap="gap-[40px]"
  >
    <Heading3>Вы уверены что хотите прервать практику?</Heading3>
  </ConfirmModal>
);
