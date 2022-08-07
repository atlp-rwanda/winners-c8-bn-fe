// this folder will contain redux's reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import navbarReducer from "./navbarReducer";
import { fetchUserProfileReducer, updateUserProfileReducer } from "./userProfileReducer";
import resetReducer from "./resetReducer";
import recoverReducer from "./recoverReducer";

export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  userProfile: fetchUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
  reset: resetReducer,
  recover: recoverReducer,
});
