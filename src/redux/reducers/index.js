// this folder will contain redux's reducers
import { combineReducers } from "redux";
import authReducer from "./authReducer";
import navbarReducer from "./navbarReducer";
import { registration } from "./userReducers";
import {alert} from "./alertReducers"
import resetReducer from "./resetReducer";
import recoverReducer from "./recoverReducer";
import userReducer from "./SocialReducers";
import usersReducer from "./UserReducer";
import { rolesReducer, assignRoleReducer } from "./RoleReducer";

export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  registration,
  alert,
  reset: resetReducer,
  recover: recoverReducer,
  user: userReducer,
  users: usersReducer,
  roles: rolesReducer,
  assignRole: assignRoleReducer
});
  

