import React from 'react';
import { render, screen, findAllByLabelText } from '@testing-library/react';
import NotFound from '../components/NotFound';
import { BrowserRouter } from 'react-router-dom';
it('NotFound component should display appropriate message and link', () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  expect(
    screen.getByRole('heading', { name: /Page you looking is not found/i })
  ).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /go back/i })).toBeInTheDocument();
});
