import React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import store from "../redux/store";
import { Provider } from "react-redux";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

describe("Testing the Home and LoginForm components", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 200,
          success: true,
          message: "User loggedIn",
          data: "thisShouldBeAToken",
        }),
    })
  );

  render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
  it("should navigate to login when login navbar btn is clicked", () => {
    fireEvent.click(screen.getByTestId("login-btn-1"));
  });
  it("should invalidate bad email", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    fireEvent.click(screen.getByTestId("login-btn-1"));
    fireEvent.change(screen.getByTestId("login-email"), {
      target: { value: "pacome.bad_email.com" },
    });
    fireEvent.blur(screen.getByTestId("login-email"));
    await waitFor(() => {
      // assertions can be put here
    });
  });
  it("should validate good email", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    fireEvent.click(screen.getByTestId("login-btn-1"));
    fireEvent.change(screen.getByTestId("login-email"), {
      target: { value: "pacome@goodemail.com" },
    });
    fireEvent.blur(screen.getByTestId("login-email"));
    await waitFor(() => {
      // assertions can be put here
    });
  });
  it("should invalidate password with empty string", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    fireEvent.click(screen.getByTestId("login-btn-1"));
    fireEvent.change(screen.getByTestId("login-password"), {
      target: { value: "" },
    });
    fireEvent.blur(screen.getByTestId("login-password"));
    await waitFor(() => {
      // assertions can be put here
    });
  });
  it("should validate password without an empty string", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    fireEvent.click(screen.getByTestId("login-btn-1"));
    fireEvent.change(screen.getByTestId("login-password"), {
      target: { value: "pacome#password250" },
    });
    fireEvent.blur(screen.getByTestId("login-password"));
    await waitFor(() => {
      // assertions can be put here
    });
  });
  it("should login", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      );
    });

    fireEvent.click(screen.getByTestId("login-btn-1"));
    await act(async () => {
      await fireEvent.submit(screen.getByTestId("login-form"), {
        target: {
          email: { value: "spaziltonx@soccerfit.com.bees" },
          password: { value: "Simon@2022" },
        },
      });
    });
    await waitFor(() => {
      // assertions can be put here
    });
  });
});