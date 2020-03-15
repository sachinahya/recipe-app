import React from 'react';

const useToggle = (
  initialValue: boolean
): [boolean, { set: React.Dispatch<React.SetStateAction<boolean>>; toggle(): void }] => {
  const [state, setState] = React.useState(initialValue);
  const toggle = React.useCallback(() => () => setState(v => !v), []);

  return [state, { set: setState, toggle }];
};

export default useToggle;
