import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import Dashboard from '../components/Dashboard';
import { MemoryRouter, Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/store';
afterEach(() => {
  cleanup();
});
it('Dashboard should display the test', () => {
  render(<Dashboard />);
  expect(screen.getByRole('heading', { name: /this is the dashboard/i }))
    .toBeInTheDocument;
});
it('Accessing dashboard without token should redirect to login', async () => {
  await act(() =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
  );
  expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
});
it('Accessing dashboard without token should redirect to login', async () => {
  await act(() =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
  );
  expect(screen.getByRole('button', { name: /Sign in/i })).toBeInTheDocument();
});
it('Accessing dashboard with token should not redrict and the it should have the link to trip', async () => {
  window.localStorage.setItem('auth-token', 'testing');
  await act(() =>
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/dashboard']}>
          <App />
        </MemoryRouter>
      </Provider>
    )
  );
  expect(screen.getByRole('link', { name: /Trips/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /Profile/i })).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { name: /this is the dashboard/i })
  ).toBeInTheDocument();
});
