import React from "react";
import { FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILED, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_LOADING, UPDATE_USER_PROFILE_FAILED } from "../redux/types/userProfileTypes";
import { fetchUserProfile } from "../redux/actions/userProfileAction";
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { act } from "react-dom/test-utils";
import configureStore from "redux-mock-store";
import {
  BrowserRouter as Router,
  MemoryRouter as MemoryRouter,
} from "react-router-dom";
import thunk from "redux-thunk";
import rootReducer from "../redux/reducers";


const initialState = {
    userProfile: {
  
    },
  };
  let store;
  beforeEach(() => {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  });
  
  afterEach(() => {
    cleanup;
  });
  
  describe("It should fetch the user information", () => {
    const userData = fetchUserProfile()(dispatch);
    console.log(userData)
  });