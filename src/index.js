
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import '../public/styles/index.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
const el = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Router>
  </Provider>,
  el
);
