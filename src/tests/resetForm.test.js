import React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import {
  BrowserRouter as Router,
  MemoryRouter as MemoryRouter,
} from "react-router-dom";
import ResetForm from "../components/resetForm";

beforeEach(() => {
  fetch.mockClear();
});

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
      <Router>
        <ResetForm />
      </Router>
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
      <Router>
        <ResetForm />
      </Router>
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
      <Router>
        <ResetForm />
      </Router>
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
      <Router>
        <ResetForm />
      </Router>
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
      <Router>
        <ResetForm />
      </Router>
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
        <MemoryRouter initialEntries={["/resetForm?t=/MyToken"]}>
          <ResetForm />
        </MemoryRouter>
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

  it("should return to form when return button clicked", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 200,
            success: false,
            message: "Failure to reset password",
          }),
      })
    );
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/resetForm?t=/MyToken"]}>
          <ResetForm />
        </MemoryRouter>
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

  it("should return error when fetch fails", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/resetForm?t=/MyToken"]}>
          <ResetForm />
        </MemoryRouter>
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
      expect(screen.queryByText(/API is down/i)).toBeInTheDocument;
    });
  });
});
