import { render } from '@testing-library/react';
import { FC } from 'react';

import ErrorBoundary from './ErrorBoundary';
import ErrorMessage from './ErrorMessage';

const CauseError: FC = () => {
  throw new Error('Something went wrong here');
};

it('should render the friendly message', () => {
  // Prevent the error from polluting the console window
  jest.spyOn(console, 'error').mockImplementation(() => null);

  // Arrange
  const { queryByText } = render(
    <ErrorBoundary friendlyMessage="Friendly message">
      <CauseError />
    </ErrorBoundary>
  );

  // Act
  const result = queryByText(/Friendly message/);
  // Assert
  expect(result).not.toBeNull();
});

it('should render children when there is no error', () => {
  // Arrange
  const { queryByText } = render(
    <ErrorBoundary>
      <div>Hello</div>
    </ErrorBoundary>
  );

  // Act
  const result = queryByText('Hello');

  // Assert
  expect(result).not.toBeNull();
});

it('should render the friendly message', () => {
  // Arrange
  const { findByText } = render(
    <ErrorMessage friendlyMessage="Oh dear!" error={new Error('Unexpected error occurred')} />
  );

  // Act
  const result = findByText(/Oh dear!/);

  // Assert
  expect(result).toBeDefined();
});
