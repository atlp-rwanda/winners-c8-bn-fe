/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import Home from "../components/Home";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import store from "../redux/store";
import { Provider } from "react-redux";
import App from "../App";
import { BrowserRouter as Router } from 'react-router-dom';

afterEach(cleanup);

describe("test the navBar reducer", () => {
    it("should render Home component", ()=>{
        render(<Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>);
        fireEvent.click(screen.getByTestId("login-btn-1"));
    });
    it("should render LoginForm component", ()=>{
        render(<Provider store={store}>
            <LoginForm/>
        </Provider>);
    });
});
