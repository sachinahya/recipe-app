import { ModalState } from '@sachinahya/hooks';
import { FC } from 'react';

import BaseDialog from './BaseDialog';
import { DialogProps } from './Dialog.types';

export type ConfirmDialogProps = ModalState &
  Omit<DialogProps, 'actions'> & {
    cancelText?: string;
    resolveText?: string;
  };

const ConfirmDialog: FC<ConfirmDialogProps> = ({
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
