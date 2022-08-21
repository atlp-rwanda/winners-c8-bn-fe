import { REMEMBER_INFO_LOADING, REMEMBER_INFO_SUCCESS, REMEMBER_INFO_FAILED } from '../actions/actionTypes';
const rememberInfoInitialState = {
    loading: false,
    error: null,
    successMsg: null,
    success: false
  }

export function rememberInfoReducer(state = rememberInfoInitialState, action) {
    switch (action.type) {
      case REMEMBER_INFO_LOADING:
        return {
            ...state,
            loading: true
        }
      case REMEMBER_INFO_SUCCESS:
        return {
          loading: false,
          error: null,
          successMsg: "remember info option updated successfully",
          success: true
          
        };
      case REMEMBER_INFO_FAILED:
          return {
            loading: false,
            successMsg: null,
            error: action.payload
          };
      default:
        return state;
    }
  };