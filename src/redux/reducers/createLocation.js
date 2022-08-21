import {
    LOCATION_LOADING,
    ADD_CITY,
    SET_CITY,
  } from '../actions/actionTypes';
  export const alert = (state = {}, action) => {
    switch (action.type) {
      case LOCATION_LOADING:
        return {
          ...state,
          loading: !!action.payload,
        };
      case ADD_CITY:
        return {
          ...state,
          location: [...state.location, action.payload],
        };
      case SET_CITY:
        return {
          ...state,
          location: action.payload,
        };
      default:
        return state;
    }
  };
  LOCATION_LOADING;
  