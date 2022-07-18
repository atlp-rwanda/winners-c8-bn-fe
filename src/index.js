import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';
import "../public/styles/index.css";
import store from "./redux/store";
import { Provider } from "react-redux";

const el = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    el
);
