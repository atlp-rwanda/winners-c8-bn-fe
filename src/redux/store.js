// this file will configure the redux's store
import { createStore } from "redux";
import rootReducer from "./reducers";

const initialState = {
    token: "",
};
const store = createStore(
    rootReducer,
    initialState // sets initial state
  );

export default store;
