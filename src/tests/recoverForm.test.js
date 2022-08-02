import React from "react";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { BrowserRouter as Router } from "react-router-dom";
import RecoverForm from "../components/recoveryForm";

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
          message: "Link sent successfully",
        }),
    })
  );

  it("should invalidate bad email", async () => {
    render(
      <Router>
        <RecoverForm />
      </Router>
    );
    const emailField = screen.getByPlaceholderText(/Enter your email/i);

    fireEvent.change(emailField, {
      target: { value: "12345" },
    });
    fireEvent.blur(emailField);
    await waitFor(() => {
      // assertions can be put here
      expect(screen.getByText(/email must be a valid email/i))
        .toBeInTheDocument;
    });
  });

  it("should invalidate empty email", async () => {
    render(
      <Router>
        <RecoverForm />
      </Router>
    );
    const emailField = screen.getByPlaceholderText(/Enter your email/i);

    fireEvent.change(emailField, {
      target: { value: "" },
    });
    fireEvent.blur(emailField);
    await waitFor(() => {
      expect(screen.getByText(/Required/i)).toBeInTheDocument;
    });
  });

  it("should validate good email", async () => {
    render(
      <Router>
        <RecoverForm />
      </Router>
    );
    const emailField = screen.getByPlaceholderText(/Enter your email/i);

    fireEvent.change(emailField, {
      target: { value: "tester@admin.com" },
    });

    fireEvent.blur(emailField);

    await waitFor(() => {
      expect(screen.queryByText(/email must be a valid email/i)).toBeNull;
      expect(screen.queryByText(/Required/i)).toBeNull;
    });
  });

  it("should recover email", async () => {
    await act(async () => {
      render(
        <Router>
          <RecoverForm />
        </Router>
      );
    });
    const emailField = screen.getByPlaceholderText(/Enter your email/i);

    fireEvent.change(emailField, {
      target: { value: "tester@admin.com" },
    });

    await act(async () => {
      const submitButton = screen.getByRole("button", {
        name: /Recover Password/i,
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.queryByText(/link sent successfully/i)).toBeInTheDocument;
    });
  });

  it("should return to form when return button clicked", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 200,
            success: false,
            message: "Failure to send link",
          }),
      })
    );
    await act(async () => {
      render(
        <Router>
          <RecoverForm />
        </Router>
      );
    });
    const emailField = screen.getByPlaceholderText(/Enter your email/i);

    fireEvent.change(emailField, {
      target: { value: "tester@admin.com" },
    });

    await act(async () => {
      const submitButton = screen.getByRole("button", {
        name: /Recover Password/i,
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
          name: /Recover Password/i,
        })
      ).toBeInTheDocument;
    });
  });

  it("should return error when fetch fails", async () => {
    fetch.mockImplementationOnce(() => Promise.reject("API is down"));
    await act(async () => {
      render(
        <Router>
          <RecoverForm />
        </Router>
      );
    });
    const emailField = screen.getByPlaceholderText(/Enter your email/i);

    fireEvent.change(emailField, {
      target: { value: "tester@admin.com" },
    });

    await act(async () => {
      const submitButton = screen.getByRole("button", {
        name: /Recover Password/i,
      });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.queryByText(/API is down/i)).toBeInTheDocument;
    });
  });
});
