// this folder will contain redux's reducers
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import navbarReducer from './navbarReducer';
import requestReducer from './requestReducer';
export default combineReducers({
  auth: authReducer,
  navbar: navbarReducer,
  requests: requestReducer,
});
