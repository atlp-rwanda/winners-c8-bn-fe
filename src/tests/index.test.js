import React from 'react';
import ReactDOM from 'react-dom';
import navBarReducer from '../redux/reducers/navbarReducer';
import { render, fireEvent, cleanup } from '@testing-library/react';
import NavBar from '../components/Navbar';
import Actions from '../redux/actions/navbarActions';

afterEach(cleanup);

describe('test the navBar reducer', () => {
  it('should return initial state', () => {
    expect(navBarReducer(undefined, { action: null })).toEqual({
      currentPage: 'HOME',
    });
  });
  it('should change currentPage from home to login', () => {
    expect(navBarReducer(undefined, Actions.setPage('LOGIN'))).toEqual({
      currentPage: 'LOGIN',
    });
  });
});
