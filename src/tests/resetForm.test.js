import React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import store from "../redux/store";
import { Provider } from "react-redux";
import App from "../App";
import { act } from "react-dom/test-utils";
import {
  BrowserRouter as Router,
  MemoryRouter as MemoryRouter,
} from "react-router-dom";
import ResetForm from "../components/resetForm";

afterEach(cleanup);

describe("Testing rendering resetForm components", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 200,
          success: true,
          message: "Password updated successfully",
        }),
    })
  );
  it("should invalidate bad password", async () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetForm />
        </Router>
      </Provider>
    );
    const passwordField = screen.getByPlaceholderText(/New password/i);

    fireEvent.change(passwordField, {
      target: { value: "12345" },
    });
    fireEvent.blur(passwordField);
    await waitFor(() => {
      // assertions can be put here
      expect(screen.getByText(/Password must contain/i)).toBeInTheDocument;
    });
  });

  it("should invalidate empty password", async () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetForm />
        </Router>
      </Provider>
    );
    const passwordField = screen.getByPlaceholderText(/New password/i);

    fireEvent.change(passwordField, {
      target: { value: "" },
    });
    fireEvent.blur(passwordField);
    await waitFor(() => {
      expect(screen.getByText(/Required/i)).toBeInTheDocument;
    });
  });

  it("should validate good password", async () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetForm />
        </Router>
      </Provider>
    );
    const passwordField = screen.getByPlaceholderText(/New password/i);

    fireEvent.change(passwordField, {
      target: { value: "Password@123" },
    });
    fireEvent.blur(passwordField);
    await waitFor(() => {
      expect(screen.queryByText(/Password must contain/i)).toBeNull;
      expect(screen.queryByText(/Required/i)).toBeNull;
    });
  });

  it("should invalidate confirm password not matching password", async () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetForm />
        </Router>
      </Provider>
    );
    const passwordField = screen.getByPlaceholderText(/New password/i);

    const confirmPasswordField =
      screen.getByPlaceholderText(/Confirm password/i);

    fireEvent.change(passwordField, {
      target: { value: "Password@123" },
    });

    fireEvent.change(confirmPasswordField, {
      target: { value: "Password" },
    });
    fireEvent.blur(confirmPasswordField);
    await waitFor(() => {
      expect(screen.getByText(/don't match/i)).toBeInTheDocument;
    });
  });

  it("should validate good confirm password", async () => {
    render(
      <Provider store={store}>
        <Router>
          <ResetForm />
        </Router>
      </Provider>
    );
    const passwordField = screen.getByPlaceholderText(/New password/i);

    const confirmPasswordField =
      screen.getByPlaceholderText(/Confirm password/i);

    fireEvent.change(passwordField, {
      target: { value: "Password@123" },
    });

    fireEvent.change(confirmPasswordField, {
      target: { value: "Password@123" },
    });

    fireEvent.blur(confirmPasswordField);
    await waitFor(() => {
      expect(screen.queryByText(/Password must contain/i)).toBeNull;
      expect(screen.queryByText(/Required/i)).toBeNull;
      expect(screen.queryByText(/don't match/i)).toBeNull;
    });
  });

  it("should reset password", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/resetForm?t=/MyToken"]}>
            <ResetForm />
          </MemoryRouter>
        </Provider>
      );
    });
    const passwordField = screen.getByPlaceholderText(/New password/i);

    const confirmPasswordField =
      screen.getByPlaceholderText(/Confirm password/i);

    fireEvent.change(passwordField, {
      target: { value: "Password@123" },
    });

    fireEvent.change(confirmPasswordField, {
      target: { value: "Password@123" },
    });

    await act(async () => {
      const submitButton = screen.getByRole("button", {
        name: /Reset Password/i,
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.queryByText(/Password updated successfully/i))
        .toBeInTheDocument;
    });
  });
});

describe("Testing rendering return button", () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 200,
          success: false,
          message: "Failure to reset password",
        }),
    })
  );

  it("should return to form when return button clicked", async () => {
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/resetForm?t=/MyToken"]}>
            <ResetForm />
          </MemoryRouter>
        </Provider>
      );
    });

    await act(async () => {
      const returnButton = screen.getByRole("button", {
        name: /Return/i,
      });

      await fireEvent.click(returnButton);
    });

    await waitFor(() => {
      expect(
        screen.getByRole("button", {
          name: /Reset Password/i,
        })
      ).toBeInTheDocument;
    });
  });
});
