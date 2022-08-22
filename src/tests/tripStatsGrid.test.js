import React from "react";
import {
  fireEvent,
  screen,
  render,
  cleanup,
  waitFor,
} from "@testing-library/react";
import thunk from "redux-thunk";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import StatsGrid from "../components/Dashboard/statsGrid";
import TimeFrame from "../components/Dashboard/TimeFrame";
import getPeriod from "../redux/utils/getPeriod";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  tripStats: {
    stats: {},
    period: getPeriod("month"),
    selected: "month",
    isLoading: false,
    isLoaded: false,
  },
};

describe("Test trips stats chart", () => {
  let store;
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 200,
          success: true,
          Tripstatistics: {
            pending: 20,
            approved: 15,
            denied: 5,
          },
        }),
    })
  );
  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render trips stats grid and timeframe options", () => {
    store.clearActions();

    render(
      <Provider store={store}>
        <Router>
          <TimeFrame />
          <StatsGrid />
        </Router>
      </Provider>
    );

    const pendingStatsCard = screen.queryByText("20");
    const approvedStatsCard = screen.queryByText("15");
    const deniedStatsCard = screen.queryByText("5");

    expect(pendingStatsCard).toBeInTheDocument;
    expect(approvedStatsCard).toBeInTheDocument;
    expect(deniedStatsCard).toBeInTheDocument;
  });

  it("should change the months in timeframe", () => {
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
      const timeframeSelection = screen.queryByTestId("timeframe-selection");

      fireEvent.change(timeframeSelection, {
        target: { value: "other" },
      });
    });

    const timeframeForm = screen.queryByTestId("timeframe-form");

    expect(timeframeForm).toBeInTheDocument;
  });
});
