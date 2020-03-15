import React from 'react';

export interface ModalState {
  anchorEl?: Element;
  open: boolean;
  handleOpen(evt?: React.MouseEvent<Element>): void;
  handleClose(): void;
}

interface UseModalStateOptions {
  openByDefault?: boolean;
}

const useModalState = ({ openByDefault = false }: UseModalStateOptions = {}): ModalState => {
  const [anchorEl, setAnchorEl] = React.useState<Element>();
  const [open, setOpen] = React.useState(openByDefault);

  const handleOpen = (evt?: React.MouseEvent<Element>): void => {
    evt && setAnchorEl(evt.currentTarget);
    setOpen(true);
  };

  const handleClose = (): void => {
    setAnchorEl(undefined);
    setOpen(false);
  };

  return { anchorEl, open, handleOpen, handleClose };
};

export default useModalState;
