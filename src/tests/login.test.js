/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { act } from 'react-dom/test-utils';
import Home from "../components/Home";
import LoginForm from "../components/LoginForm";
import Navbar from "../components/Navbar";
import store from "../redux/store";
import { Provider } from "react-redux";
import App from "../App";
import { BrowserRouter as Router } from 'react-router-dom';

// afterEach(cleanup);

describe("Testing the Home and LoginForm components", () => {
    
        render(<Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>);
    it("should navigate to login when login navbar btn is clicked", ()=>{
        fireEvent.click(screen.getByTestId("login-btn-1"));
    });
    it("should invalidate bad email", ()=>{
        render(<Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>);
        fireEvent.click(screen.getByTestId("login-btn-1"));
        fireEvent.change(screen.getByTestId("login-email"), {target: {value: 'pacome.bad_email.com'}});
        fireEvent.blur(screen.getByTestId("login-email"));
    });
    it("should validate good email", ()=>{
        render(<Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>);
        fireEvent.click(screen.getByTestId("login-btn-1"));
        fireEvent.change(screen.getByTestId("login-email"), {target: {value: 'pacome@goodemail.com'}});
        fireEvent.blur(screen.getByTestId("login-email"));
    });
    it("should invalidate password with empty string", ()=>{
        render(<Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>);
        fireEvent.click(screen.getByTestId("login-btn-1"));
        fireEvent.change(screen.getByTestId("login-password"), {target: {value: ''}});
        fireEvent.blur(screen.getByTestId("login-password"));
    });
    it("should validate password without an empty string", ()=>{
        render(<Provider store={store}>
            <Router>
                <App />
            </Router>
        </Provider>);
        fireEvent.click(screen.getByTestId("login-btn-1"));
        fireEvent.change(screen.getByTestId("login-password"), {target: {value: 'pacome#password250'}});
        fireEvent.blur(screen.getByTestId("login-password"));
    });
    it("should login", async ()=>{
            render(<Provider store={store}>
                <Router>
                    <App />
                </Router>
            </Provider>);
        
        fireEvent.click(screen.getByTestId("login-btn-1"));
        fireEvent.change(screen.getByTestId("login-email"), {target: {value: 'spaziltonx@soccerfit.com'}});
        fireEvent.change(screen.getByTestId("login-password"), {target: {value: 'Simon@2022'}});
        act(async()=>{
            await fireEvent.click(screen.getByTestId("login-submit"));
        });
    });
    // it("should render LoginForm component", ()=>{
    //     render(<Provider store={store}>
    //         <LoginForm/>
    //     </Provider>);
    // });
});
