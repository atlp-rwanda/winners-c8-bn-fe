import {
  ACCOMODATION_LOADING,
  ADD_LOCATION,
  SET_LOCATION,
} from '../actions/actionTypes';
export const alert = (state = {}, action) => {
  switch (action.type) {
    case ACCOMODATION_LOADING:
      return {
        ...state,
        loading: !!action.payload,
      };
    case ADD_LOCATION:
      return {
        ...state,
        location: [...state.location, action.payload],
      };
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};
ACCOMODATION_LOADING;
