import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { ModalState } from '@sachinahya/hooks';
import React from 'react';

import Button from '../Button';
import { DialogProps } from './Dialog.types';

interface BaseDialogProps extends DialogProps, ModalState {}

const BaseDialog: React.FC<BaseDialogProps> = ({
  title,
  content,
  actions,
  fullWidth,
  dividers,
  titleId,
  contentId,
  onResolve,
  onCancel,
  open,
  handleClose,
}) => {
  const closeDialog = (resolves?: boolean, cancelReason?: string): void => {
    handleClose();
    resolves ? onResolve && onResolve() : onCancel && onCancel(cancelReason || 'cancelClicked');
  };

  const focusRef = React.useRef<HTMLButtonElement>(null);
  const focusButton = (): void => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  return (
    <Dialog
      open={open}
      fullWidth={fullWidth}
      onClose={(_, reason) => closeDialog(false, reason)}
      onEntered={focusButton}
      aria-labelledby={titleId}
      aria-describedby={contentId}
    >
      {title && <DialogTitle id={titleId}>{title}</DialogTitle>}
      <DialogContent dividers={dividers} id={contentId}>
        <DialogContentText component="div">{content}</DialogContentText>
      </DialogContent>
      {actions && actions.length && (
        <DialogActions>
          {actions.map(action => (
            <Button
              key={action.label}
              ref={action.autoFocus ? focusRef : undefined}
              color="secondary"
              disabled={action.disabled}
              onClick={() => closeDialog(action.resolves)}
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default BaseDialog;
