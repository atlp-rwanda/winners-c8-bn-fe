import { FECTH_REQUESTS } from '../actions/actionTypes';
const requests = (state = [], action) => {
  switch (action.type) {
    case FECTH_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    default:
      return state;
  }
};

export default requests;
