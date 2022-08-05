// this folder will contain redux's reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import navbarReducer from "./navbarReducer";
import { fetchUserProfileReducer, updateUserProfileReducer } from "./userProfileReducer";

export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  userProfile: fetchUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
});