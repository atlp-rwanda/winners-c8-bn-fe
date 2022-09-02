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
import configureMockStore from 'redux-mock-store';
import StatsGrid from '../components/dashboardElements/statsGrid';
import TimeFrame from '../components/dashboardElements/TimeFrame';
import getPeriod from '../redux/utils/getPeriod';
import axiosInstance from '../helpers/http';
import AxiosMockAdapter from 'axios-mock-adapter';
const mock = new AxiosMockAdapter(axiosInstance);

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  tripStats: {
    stats: {},
    period: getPeriod('month'),
    selected: 'month',
    isLoading: false,
    isLoaded: false,
  },
};

describe('Test trips stats chart', () => {
  let store;
  mock.onPost(/tripstatistics/i).reply(200, {
    status: 200,
    success: true,
    Tripstatistics: {
      pending: '20',
      Approved: '10',
      Denied: '5',
    },
  });

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    cleanup();
  });

  it('should render trips stats grid and timeframe options', () => {
    store.clearActions();

    render(
      <Provider store={store}>
        <Router>
          <TimeFrame />
          <StatsGrid />
        </Router>
      </Provider>
    );

    const pendingStatsCard = screen.queryByText('20');
    const approvedStatsCard = screen.queryByText('15');
    const rejectedStatsCard = screen.queryByText('5');

    expect(pendingStatsCard).toBeInTheDocument;
    expect(approvedStatsCard).toBeInTheDocument;
    expect(rejectedStatsCard).toBeInTheDocument;
  });

  it('should change the months in timeframe', () => {
    store.clearActions();

    render(
      <Provider store={store}>
        <Router>
          <TimeFrame />
          <StatsGrid />
        </Router>
      </Provider>
    );

    act(() => {
      const timeframeSelection = screen.queryByTestId('timeframe-selection');

      fireEvent.change(timeframeSelection, {
        target: { value: 'other' },
      });
    });

    const timeframeForm = screen.queryByTestId('timeframe-form');

    expect(timeframeForm).toBeInTheDocument;
  });
});
