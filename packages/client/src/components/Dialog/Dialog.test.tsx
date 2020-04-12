import React from 'react';
import { render, userEvent } from 'test/utils';

import AlertDialog from './AlertDialog';
import BaseDialog from './BaseDialog';

describe('Base dialog', () => {
  const handleClose = jest.fn();
  const handleOpen = jest.fn();
  const onResolve = jest.fn();
  const onCancel = jest.fn();

  it('should call onResolve', () => {
    const { getByText } = render(
      <BaseDialog
        open={true}
        handleClose={handleClose}
        handleOpen={handleOpen}
        content="Dialog Content"
        title="Dialog Title"
        onResolve={onResolve}
        onCancel={onCancel}
        actions={[
          {
            label: 'OK',
            resolves: true,
          },
          {
            label: 'Cancel',
            autoFocus: true,
          },
        ]}
      />
    );

    const title = getByText('Dialog Title');
    const content = getByText('Dialog Content');
    const ok = getByText('OK');
    const cancel = getByText('Cancel');

    userEvent.click(ok);
    userEvent.click(cancel);

    expect(title).toBeDefined();
    expect(content).toBeDefined();
    expect(handleClose).toBeCalledTimes(2);
    expect(onResolve).toBeCalledTimes(1);
    expect(onCancel).toBeCalledWith('cancelClicked');
  });
});

describe('Alert dialog', () => {
  const handleClose = jest.fn();
  const handleOpen = jest.fn();

  it('should close the dialog when the action is clicked', () => {
    const { getByRole } = render(
      <AlertDialog
        title="My Alert Dialog Title"
        open={true}
        handleClose={handleClose}
        handleOpen={handleOpen}
        content="My Alert Dialog Content"
        actionText="Got it!"
      />
    );

    const button = getByRole('button');

    // expect(document.activeElement === button).toBeTruthy();
    expect(button).toHaveTextContent('Got it!');
    userEvent.click(button);
    expect(handleClose).toBeCalledTimes(1);
  });
});
