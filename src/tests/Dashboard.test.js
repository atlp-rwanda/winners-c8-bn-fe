import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
it('Dashboard should display the test', () => {
  render(<Dashboard />);
  expect(screen.getAllByRole('heading', { name: /this is the dashboard/i }))
    .toBeInTheDocument;
});
