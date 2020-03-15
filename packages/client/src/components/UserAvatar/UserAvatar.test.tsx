import { render } from 'test/utils';
import UserAvatar from './UserAvatar';
import * as React from 'react';

it('should show the initials of the name provided', () => {
  const { getByText } = render(<UserAvatar name="Bilbo Baggins" />);
  expect(getByText('BB')).toBeDefined();
});

it('only uses the first two words of the name', () => {
  const { container } = render(<UserAvatar name="Bilbo Baggins (The Hobbit)" />);
  expect(container.querySelector('.MuiAvatar-root')?.textContent).toEqual('BB');
});
