// this file will configure the redux's store
import { createStore } from "redux";
import rootReducer from "./reducers";

let authToken = "";
if (window.localStorage.getItem("auth-token")) {
  authToken = window.localStorage.getItem("auth-token");
}

const initialState = {
  auth: { token: authToken },
  navbar: { currentPage: "HOME" },
};
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
