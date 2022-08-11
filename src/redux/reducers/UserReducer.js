import {FETCH_USER_SUCCESS,FETCH_USER_LOADING,FETCH_USER_FAILED } from '../actions/actionTypes';
const fetcUserInitialState = {
loading: false,
error: null,
users: {}
}
const usersReducer = (state = fetcUserInitialState, action) => {
  switch (action.type) {
    case FETCH_USER_LOADING:
    return {
      ...state,
      loading: true
    }
    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        
      };
    case FETCH_USER_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
    default:
      return state;
  }
};

export default usersReducer;