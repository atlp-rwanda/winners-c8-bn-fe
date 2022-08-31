import {
    LOGOUT_FAILED,
    LOGOUT_SUCCESS 
    } from "../actions/actionTypes";
const logoutInitialState = {
    loading: false,
    error: null,
    successMsg: null,
    success: false
  }
export function logoutReducer(state = logoutInitialState, action) {
    switch (action.type) {
      case LOGOUT_SUCCESS:
        return {
          loading: false,
          error: null,
          successMsg: "logout successfully",
          success: true
          
        };
      case LOGOUT_FAILED:
          return {
            loading: false,
            successMsg: null,
            error: action.payload
          };
      default:
        return state;
    }
  };