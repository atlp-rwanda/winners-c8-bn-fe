import { FECTH_REQUESTS } from '../actions/actionTypes';
const requests = (state = [], action) => {
  // console.log(`before ${action.type} action, this is the AUTH state: `,JSON.stringify(state));
  switch (action.type) {
    case FECTH_REQUESTS:
      console.log('State is moving', action.payload);
      return {
        ...state,
        requests: action.payload,
      };
    default:
      return state;
  }
};

export default requests;
