import React from 'react';
import UserProfile from '../components/UserProfile/UserProfile';
import renderer from 'react-test-renderer';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk';
import rootReducer from '../redux/reducers';
import configureMockStore from 'redux-mock-store';
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

const initialState = {
  userProfile: {
    requestSent: false,
    responseData: {
      isSuccess: undefined,
      message: undefined,
    },
  },
};

let store;
beforeEach(() => {
  store = mockStore(initialState);
});

afterEach(() => {
  cleanup;
});
test('should render user update component', () => {
  render(
    <Provider store={store}>
      <Router>
        <UserProfile />
      </Router>
    </Provider>
  );

  const userUpdateElement = screen.getByTestId('update-1');
  expect(userUpdateElement).toBeInTheDocument();
  expect(userUpdateElement).toHaveTextContent('Personal information');
});

test('<UserUpdate /> matches snapshot', () => {
  const component = renderer
    .create(
      <Provider store={store}>
        <MemoryRouter>
          <UserProfile />
        </MemoryRouter>
      </Provider>
    )
    .toJSON();
  expect(component).toMatchSnapshot();
});
