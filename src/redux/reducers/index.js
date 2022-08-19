// this folder will contain redux's reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import navbarReducer from "./navbarReducer";
import { registration } from "./userReducers";
import {alert} from "./alertReducers"
import resetReducer from "./resetReducer";
import {fetchUserProfileReducer, updateUserProfileReducer} from "./userProfileReducer"
import recoverReducer from "./recoverReducer";
import userReducer from "./SocialReducers";
import {accommodationsReducer, detailsAccommodationReducer} from "./accommodationReducers"

export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  userProfile: fetchUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
  registration,
  alert,
  reset: resetReducer,
  recover: recoverReducer,
  user: userReducer,
  accommodations:accommodationsReducer,
  singleAccommodation: detailsAccommodationReducer,
});
  

