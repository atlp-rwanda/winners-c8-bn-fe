//accomodation tests
import React from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
  waitFor,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  MemoryRouter as MemoryRouter,
} from 'react-router-dom';
import thunk from 'redux-thunk';
import CreateLocation from '../components/CreateLocation';
import configureMockStore from 'redux-mock-store';
import renderer from 'react-test-renderer';
import { createRenderer } from 'react-dom/test-utils';

// import rootReducer from '../redux/reducers';
let store;
const initialState = {
  auth: { token: '' },
  location: {
    requestSent: false,
    responseData: {
      isSuccess: undefined,
      message: undefined,
    },
  },
};
beforeEach(() => {
  store = configureMockStore([thunk])(initialState);
});

afterEach(() => {
  cleanup;
});

describe('Testing rendering createLocation component', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 201,
          success: true,
          message: 'Location is created successfully',
        }),
    })
  );
  it('should validate invalid city', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            status: 404,
            success: true,
            message: 'Location is created successfully',
          }),
      })
    );
    await act(() =>
      render(
        <Provider store={store}>
          <Router>
            <CreateLocation />
          </Router>
        </Provider>
      )
    );
    const countryInput = screen.getByRole('textbox', { name: 'Country' });
    await act(async () => {
      fireEvent.change(countryInput, { value: '5335' });
    });
    const saveButton = screen.getByRole('button', { name: 'Save' });
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
});
