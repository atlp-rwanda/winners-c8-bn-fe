import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../public/styles/App.scss";
import store from "./redux/store";
import { Provider } from "react-redux";

const el = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    el
);