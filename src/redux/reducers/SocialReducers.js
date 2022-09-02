import * as types from '../actions/actionTypes';
import { SET_USER_ONLINE_STATUS } from '../types/notificationTypes';

const initialState = {
  loading: false,
  currentUser: null,
  error: null,
  status: 'offline',
};
const userReducer = (state = initialState, action) => {
  /* istanbul ignore next */
  switch (action.type) {
    case types.GOOGLE_SIGN_IN_START:
      return {
        ...state,
        loading: true,
      };
    case types.FACEBOOK_SIGN_IN_START:
      return {
        ...state,
        loading: true,
      };
    case types.GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.FACEBOOK_SIGN_IN_SUCCESS:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.GOOGLE_SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case types.FACEBOOK_SIGN_IN_FAIL:
      return {
        ...state,
        loading: false,
        currentUser: action.payload,
      };
    case SET_USER_ONLINE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
