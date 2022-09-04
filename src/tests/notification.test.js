import React from 'react';
import { act, cleanup, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import AxiosMockAdapter from 'axios-mock-adapter';
import axiosInstance from '../helpers/http';
import Notification from '../components/Navbar/Notification';
const mock = new AxiosMockAdapter(axiosInstance);
afterEach(() => {
  cleanup();
});
describe('notification action', () => {
  it('Dashboard should display the test', () => {
    render(
      <Provider store={store}>
        <Router>
          <Notification />
        </Router>
      </Provider>
    );
  });
});
