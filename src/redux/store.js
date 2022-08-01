// this file will configure the redux's store
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {
    auth: {token: ""},
    navbar: {currentPage: "HOME"},
};
const store = createStore(
    rootReducer,
    initialState, // sets initial state
    applyMiddleware(
      thunk
    )
  );

export default store;
