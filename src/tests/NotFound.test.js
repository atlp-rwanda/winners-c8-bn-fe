import React from 'react';
import { render, screen, findAllByLabelText } from '@testing-library/react';
import NotFound from '../components/NotFound';
it('NotFound component should display appropriate message and link', () => {
  render(<NotFound />);
  expect(
    screen.getAllByRole('heading', { name: /Page you looking is not found/i })
  ).toBeInTheDocument();
});
