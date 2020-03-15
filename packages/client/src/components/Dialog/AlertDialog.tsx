import React from 'react';
import { ModalState } from 'hooks/useModalState';
import BaseDialog from './BaseDialog';
import { DialogProps } from './Dialog.types';

export type AlertDialogProps = Omit<DialogProps & ModalState, 'actions'> & {
  actionText?: string;
};

const AlertDialog: React.FC<AlertDialogProps> = ({
  actionText = 'OK',
  ...props
}) => {
  return (
    <BaseDialog
      {...props}
      actions={[{ label: actionText, resolves: true, autoFocus: true }]}
    />
  );
};

export default AlertDialog;
