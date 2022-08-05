// this file will configure the redux's store
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

let authToken = "";
if (window.localStorage.getItem("auth-token")) {
  authToken = window.localStorage.getItem("auth-token");
}

const initialState = {
  auth: { token: authToken },
  navbar: { currentPage: "HOME" },
};
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
