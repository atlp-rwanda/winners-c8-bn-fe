// this folder will contain redux's reducers
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navbarReducer from './navbarReducer';
import requestReducer from './requestReducer';
import resetReducer from './resetReducer';
import recoverReducer from './recoverReducer';
export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  requests: requestReducer,
  reset: resetReducer,
  recover: recoverReducer,
});
