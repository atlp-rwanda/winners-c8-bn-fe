/**
 * @jest-environment jsdom
 */
import React from 'react';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { register } from '../../src/redux/actions/registerActions';
const middleware = [thunk];
const mockStore = configureStore(middleware);
const mock = new MockAdapter(axios);
const store = mockStore({});
import { registration } from '../../src/redux/reducers/userReducers';
import { cleanup } from '@testing-library/react';
import UserRegisterForm from '../components/RegisterForm';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  MemoryRouter as MemoryRouter,
} from 'react-router-dom';
import '@testing-library/jest-dom';
import renderer, { act } from 'react-test-renderer';

const apiUrl = `${process.env.BASE_BACKEND_SERVER_URL}/auth/register`;

afterEach(() => {
  cleanup();
});

describe('Connected Register Form React-Redux Component', () => {
  let store;
  let component;

  beforeEach(() => {
    store = mockStore({
      registration: false,
      alert: '',
    });

    component = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <UserRegisterForm />
        </MemoryRouter>
      </Provider>
    );
  });

  it('should render with given state from Redux store', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});

describe('register(user) for actions', () => {
  it('dispatches SUCCESS after signup', async () => {
    store.clearActions();
    const userObj = {
      firstName: 'kamali',
      lastName: 'elia',
      email: `kamali${new Date().getMilliseconds()}@gmail.com`,
      password: 'Password@12345',
    };

    await store.dispatch(register(userObj));
  });

  it('dispatches FAILURE after signup failure', async () => {
    store.clearActions();
    const userObj = {
      firstName: 'kamali',
      lastName: 'elia',
      email: `kamali${new Date().getMilliseconds()}@gmail.com`,
      password: 'password@12345',
    };

    await store.dispatch(register(userObj));
  });
});

describe('registration(state, action)', () => {
  const state = {};

  const RegisterUserAction = {
    type: 'REGISTER_USER',
  };

  const FailureAction = {
    type: 'FAILURE',
    payload: 'payload',
  };

  const SuccessAction = {
    type: 'SUCCESS',
    payload: 'payload',
  };

  const userExistAction = {
    type: 'USER_EXIST',
    payload: 'payload',
  };

  it('should return registering true', () => {
    const updatedState = registration(state, RegisterUserAction);
    expect(updatedState).toEqual({ registering: true });
  });

  it('should return registering false on failure', () => {
    const updatedState = registration(state, FailureAction);
    expect(updatedState).toEqual({ registering: false });
  });

  it('should return registering false on success', () => {
    const updatedState = registration(state, SuccessAction);
    expect(updatedState).toEqual({ registering: false });
  });

  it('should return registering false on user exists', () => {
    const updatedState = registration(state, userExistAction);
    expect(updatedState).toEqual({ registering: false });
  });
});
