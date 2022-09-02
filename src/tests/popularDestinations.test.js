import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import PopularDestinations from '../components/popularDestinations';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axiosInstance from '../helpers/http';
import AxiosMockAdapter from 'axios-mock-adapter';
const mock = new AxiosMockAdapter(axiosInstance);
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const initialState = {
  PopularDestinations: {
    data: [],
    isSuccess: false,
  },
};

let store;
beforeEach(() => {
  store = mockStore(initialState);
});

afterEach(cleanup);

describe('Testing rendering popular destinations components', () => {
  mock.onGet(/stats/i).reply(200, {
    status: 200,
    success: true,
    message: 'Destination statistics fetched successfully',
    data: [
      { visitCount: '13', Locations: [{ city: 'Nairobi City' }] },
      { visitCount: '3', Locations: [{ city: 'Buffalo' }] },
      { visitCount: '1', Locations: [{ city: 'Kigali City' }] },
    ],
  });

  it('should render popular destinations', async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <PopularDestinations />
          </Router>
        </Provider>
      );
    });

    expect(screen.queryByText(/Nairobi City/i)).toBeInTheDocument;
    expect(screen.queryByText(/Buffalo/i)).toBeInTheDocument;
    expect(screen.queryByText(/Kigali City/i)).toBeInTheDocument;
  });
});
