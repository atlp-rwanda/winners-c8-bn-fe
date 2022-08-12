import React from 'react';
import { render, act, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import store from '../redux/store';
import App from '../App';
import { Provider } from 'react-redux';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});
it('trips  link should be mounted at /dashboard/ sidebar', () => {
  act(() =>
    render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <Provider store={store}>
          <App />
        </Provider>
      </MemoryRouter>,
      container
    )
  );
  screen.findByRole('');
});
