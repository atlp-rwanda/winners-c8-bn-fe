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
import usersReducer from "./UserReducer";
import { rememberInfoReducer } from './rememberInfoReducer';
import { rolesReducer, assignRoleReducer } from "./RoleReducer";
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
  users: usersReducer,
  rememberInfo: rememberInfoReducer,
  roles: rolesReducer,
  assignRole: assignRoleReducer
});


