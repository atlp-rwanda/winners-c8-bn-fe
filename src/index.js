import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from 'react-router-dom';

import "../public/styles/index.css";


const el = document.getElementById("app");



ReactDOM.render(
    <Router>
        <App />
    </Router>, 
    el);