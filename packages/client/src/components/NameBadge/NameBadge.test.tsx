import NameBadge from './NameBadge';
import * as React from 'react';
import { render } from 'test/utils';

it('displays a name', () => {
  const { getByText } = render(<NameBadge name="Bilbo Baggins" />);
  expect(getByText('Bilbo Baggins')).toBeDefined();
});

it('displays a name and an avatar with the initials of the name', () => {
  const { getByText } = render(<NameBadge name="Bilbo Baggins" showAvatar />);
  expect(getByText('Bilbo Baggins')).toBeDefined();
  expect(getByText('BB')).toBeDefined();
});
