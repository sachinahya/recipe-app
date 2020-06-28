import { render } from '@testing-library/react';
import React from 'react';

import Heading from './Heading';
import Paragraph from './Paragraph';

describe('Heading', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Heading>My heading</Heading>);
    expect(getByText(/My heading/)).toBeDefined();
  });
});

describe('Paragraph', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Paragraph>Lorem ipsum dolor sit amet</Paragraph>);
    expect(getByText(/Lorem ipsum dolor sit amet/)).toBeDefined();
  });
});
