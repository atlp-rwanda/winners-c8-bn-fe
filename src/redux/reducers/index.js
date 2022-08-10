// this folder will contain redux's reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import navbarReducer from "./navbarReducer";
<<<<<<< HEAD
import { fetchUserProfileReducer, updateUserProfileReducer } from "./userProfileReducer";
=======
import { registration } from "./userReducers";
import {alert} from "./alertReducers"
>>>>>>> ce28806d4ca01cfdca8d3980d9f6ecfec37dc44c
import resetReducer from "./resetReducer";
import recoverReducer from "./recoverReducer";
import userReducer from "./SocialReducers";

export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
<<<<<<< HEAD
  userProfile: fetchUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
=======
  registration,
  alert,
>>>>>>> ce28806d4ca01cfdca8d3980d9f6ecfec37dc44c
  reset: resetReducer,
  recover: recoverReducer,
  user: userReducer,
});
  

