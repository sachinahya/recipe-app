import React from 'react';

export interface DialogProps {
  title: string;
  content: React.ReactNode;
  actions?: DialogAction[];
  fullWidth?: boolean;
  dividers?: boolean;
  titleId?: string;
  contentId?: string;
  onResolve?(): void;
  onCancel?(reason: string): void;
}

export interface DialogAction {
  label: string;
  resolves?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
}
