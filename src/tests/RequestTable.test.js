import React from 'react';
import {
  act,
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from '../App';
import store from '../redux/store';
import { userResponse, tripRequestResponse } from './mocks/data';
import MockAxiosAdapter from 'axios-mock-adapter';
const mock = new MockAxiosAdapter(axios);
describe('Request table', () => {
  beforeEach(() => {
    mock.onGet(/trips/gi).reply(200, tripRequestResponse);
    mock.onGet(/user/gi).reply(200, userResponse);
  });
  afterEach(() => {
    cleanup();
    window.localStorage.clear();
    mock.reset();
  });

  it('Clicking the Trips link on the dashboard should go the trip request tables', async () => {
    window.localStorage.setItem('auth-token', 'testing');
    act(() =>
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
            <App />
          </MemoryRouter>
        </Provider>
      )
    );
    const tripsLink = screen.getByRole('link', { name: /Trips/i });
    await act(async () => {
      fireEvent.click(tripsLink);
    });
    expect(screen.getByRole('heading', /Trips requests/i)).toBeInTheDocument();
    expect(
      screen.getAllByRole('columnheader').map((h) => h.textContent)
    ).toEqual(['Trip Id', 'Manager', 'Requester']);
  });

  it('The pages should render', async () => {
    window.localStorage.setItem('auth-token', 'testing');
    await act(() =>
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard/trips']}>
            <App />
          </MemoryRouter>
        </Provider>
      )
    );
    await waitFor(() => {
      expect(store.getState()?.requests?.requests?.length).toBeGreaterThan(0);
    });
    expect(screen.getByRole('heading', /Trips requests/i)).toBeInTheDocument();
  });
});
