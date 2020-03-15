import React from 'react';
import { ModalState } from 'hooks/useModalState';
import BaseDialog from './BaseDialog';
import { DialogProps } from './Dialog.types';

export type ConfirmDialogProps = ModalState &
  Omit<DialogProps, 'actions'> & {
    cancelText?: string;
    resolveText?: string;
  };

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  cancelText = 'Cancel',
  resolveText = 'OK',
  ...props
}) => {
  return (
    <BaseDialog
      {...props}
      actions={[
        { label: cancelText, autoFocus: true },
        { label: resolveText, resolves: true },
      ]}
    />
  );
};

export default ConfirmDialog;
