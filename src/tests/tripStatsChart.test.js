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
import StatsChart from "../components/dashboard/StatsChart";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const initialState = {
  chartTripStats: { chartStats: [], isLoading: false, isLoaded: false },
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
            pending: (Math.random() * 30).round(),
            approved: (Math.random() * 30).round(),
            denied: (Math.random() * 30).round(),
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

  it("should render a trips stats grid", () => {
    store.clearActions();

    render(
      <Provider store={store}>
        <Router>
          <StatsChart />
        </Router>
      </Provider>
    );

    const chartCanvas = screen.queryByTestId("stats-chart");

    expect(chartCanvas).toBeInTheDocument;
  });
});
