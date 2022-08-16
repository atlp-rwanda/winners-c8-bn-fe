// this folder will contain redux's reducers
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navbarReducer from './navbarReducer';
import { registration } from './userReducers';
import { alert } from './alertReducers';
import requestReducer from './requestReducer';
import resetReducer from './resetReducer';
import recoverReducer from './recoverReducer';
import userReducer from './SocialReducers';
import {
  fetchUserProfileReducer,
  updateUserProfileReducer,
} from './userProfileReducer';

export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  requests: requestReducer,
  userProfile: fetchUserProfileReducer,
  updateUserProfile: updateUserProfileReducer,
  registration,
  alert,
  reset: resetReducer,
  recover: recoverReducer,
  user: userReducer,
});
