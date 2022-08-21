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
import CreateAccomodation from '../components/createAccomodation';
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
    // const component = renderer.create(
    //   <Provider store={store}>
    //     <Router>
    //       <CreateAccomodation />
    //     </Router>
    //   </Provider>
    // );
    await act(() =>
      render(
        <Provider store={store}>
          <Router>
            <CreateAccomodation />
          </Router>
        </Provider>
      )
    );

    const saveButton = screen.getByRole('button', { name: 'Save' });
    await act(async () => {
      fireEvent.click(saveButton);
    });

    // const hotel = screen.getVy(/Enter the hotel name/i);

    // fireEvent.change(hotel, {
    //   target: { value: 'Ubumwe Grand hotel' },
    // });
    // fireEvent.blur(hotel);
    // await waitFor(() => {
    //   // assertions can be put here
    //   expect(screen.getByText(/Hotel name must contain/i)).toBeInTheDocument;
    // });
  });

  // it('should invalidate description', async () => {
  //   const descriptionField = screen.getByTestId(/Description/i);

  //   fireEvent.change(descriptionField, {
  //     target: { value: 'Welcome to us' },
  //   });
  //   fireEvent.blur(descriptionField);
  //   await waitFor(() => {
  //     expect(screen.getByText(/Required/i)).toBeInTheDocument;
  //   });
  // });

  // it('should validate good description', async () => {
  //   render(
  //     <Provider store={store}>
  //       <Router>
  //         <CreateAccomodation />
  //       </Router>
  //     </Provider>
  //   );
  //   const descriptionField = screen.getByTestId(/New description/i);

  //   fireEvent.change(descriptionField, {
  //     target: { value: 'Welcome to us' },
  //   });
  //   fireEvent.blur(descriptionField);
  //   await waitFor(() => {
  //     expect(screen.queryByText(/descrption must contain/i)).toBeNull;
  //     expect(screen.queryByText(/Required/i)).toBeNull;
  //   });
  // });
});
