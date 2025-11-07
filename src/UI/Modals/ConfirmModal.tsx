import cn from "clsx";
import type { ReactNode } from "react";

import { Modal } from "./Modal";
import Button from "../Buttons/Button";

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleConfirm: () => void;
  handleCancel: () => void;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  wrapperPaddings?: string;
  wrapperGap?: string;
  wrapperWidth?: string;
  innerGap?: string;
};

export const ConfirmModal = ({
  isOpen,
  onClose,
  handleConfirm,
  handleCancel,
  children,
  confirmText = "Да",
  cancelText = "Нет",
  wrapperPaddings = "",
  wrapperGap = "",
  wrapperWidth = "",
  innerGap = "gap-[120px]",
}: ConfirmModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      wrapperPaddings={wrapperPaddings}
      wrapperGap={wrapperGap}
      wrapperWidth={wrapperWidth}
    >
      <div className={cn("flex flex-col", innerGap)}>
        <div className="flex flex-col gap-[10px]">{children}</div>
        <div className="flex gap-[10px]">
          <Button size="primary" onClick={handleCancel}>
            {cancelText}
          </Button>
          <Button size="secondary" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
