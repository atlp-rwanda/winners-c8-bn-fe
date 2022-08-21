//accomodation tests
import React from 'react';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  act,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {
  BrowserRouter as Router,
  MemoryRouter as MemoryRouter,
} from 'react-router-dom';
import thunk from 'redux-thunk';
import CreateAccomodation from '../components/CreateAccomodation';
import configureMockStore from 'redux-mock-store';

// import rootReducer from '../redux/reducers';
let store;
const initialState = {
  auth: { token: '' },
  accommodation: {
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

describe('Testing rendering createAccomodation component', () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          status: 200,
          success: true,
          message: 'Accomodation is created successfully',
        }),
    })
  );
  it('should validate invalid hotel', async () => {
    await act(() =>
      render(
        <Provider store={store}>
          <Router>
            <CreateAccomodation />
          </Router>
        </Provider>
      )
    );
    const hotelNameInput = screen.getByRole('textbox', { name: 'Hotel Name' });
    await act(async () => {
      fireEvent.change(hotelNameInput, { value: 'Hotel Name' });
    });
    const longitudeInput = screen.getByRole('textbox', { name: 'Longitude' });
    await act(async () => {
      fireEvent.change(longitudeInput, { target: { value: '1223' } });
      fireEvent.blur(longitudeInput);
    });
    const latitudeInput = screen.getByRole('textbox', { name: 'Latitude' });
    await act(async () => {
      fireEvent.change(latitudeInput, { target: { value: '5335' } });
    });
    const imageInput = screen.getByRole('img', { name: 'image' });
    await act(async () => {
      fireEvent.change(imageInput, { target: { files: [{}] } });
      fireEvent.blur(imageInput);
    });
    const descriptionInput = screen.getByRole('textbox', {
      name: 'Description',
    });
    await act(async () => {
      fireEvent.change(descriptionInput, {
        target: { value: 'Welcome to 5 stars hotel' },
      });
    });
    const locationInput = screen.getByRole('combobox', { name: 'Location:' });
    await act(async () => {
      fireEvent.change(locationInput, { value: '1' });
    });
    const saveButton = screen.getByRole('button', { name: 'Save' });
    await act(async () => {
      fireEvent.click(saveButton);
    });
  });
});
