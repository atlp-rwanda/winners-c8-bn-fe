import React from 'react';
import {
  fireEvent,
  screen,
  render,
  cleanup,
  waitFor,
} from '@testing-library/react';
import thunk from 'redux-thunk';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import StatsChart from '../components/dashboardElements/StatsChart';
import configureMockStore from 'redux-mock-store';
import axiosInstance from '../helpers/http';
import AxiosMockAdapter from 'axios-mock-adapter';
const mock = new AxiosMockAdapter(axiosInstance);

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  chartTripStats: { chartStats: [], isLoading: false, isLoaded: false },
};

describe('Test trips stats chart', () => {
  let store;
  mock.onPost(/tripstatistics/i).reply(200, {
    status: 200,
    success: true,
    Tripstatistics: {
      Pending: '20',
      Approved: '10',
      Rejected: '5',
    },
  });

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render a trips stats grid', () => {
    store.clearActions();

    render(
      <Provider store={store}>
        <Router>
          <StatsChart />
        </Router>
      </Provider>
    );

    const chartCanvas = screen.queryByTestId('stats-chart');

    expect(chartCanvas).toBeInTheDocument;
  });
});
