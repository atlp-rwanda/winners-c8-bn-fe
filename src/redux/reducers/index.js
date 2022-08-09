// this folder will contain redux's reducers
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navbarReducer from './navbarReducer';
import requestReducer from './requestReducer';
import resetReducer from './resetReducer';
import recoverReducer from './recoverReducer';
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
  reset: resetReducer,
  recover: recoverReducer,
});
