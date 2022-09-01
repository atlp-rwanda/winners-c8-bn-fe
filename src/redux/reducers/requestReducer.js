import {  FECTH_REQUESTS_COMMENTS,POST_REQUESTS_COMMENT, POST_REQUESTS_COMMENT_FAILED, DELETE_REQUESTS_COMMENT, DELETE_REQUESTS_COMMENT_FAILED } from '../actions/actionTypes';
import {
  FECTH_REQUESTS,
  APPROVEREJECT_PENDING_REQUEST,
  APPROVEREJECT_SUCCESS,
  APPROVEREJECT_ERROR,
} from '../actions/actionTypes';
const initialState = {
  requests : [] ,
  loading: false,
};

const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FECTH_REQUESTS:
      return {
        ...state,
        requests: action.payload,
      };
    case APPROVEREJECT_PENDING_REQUEST:
      return { ...state, loading: true };
    case APPROVEREJECT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
            requests: state.requests.map((result) =>
              result.id === action.payload.tripId
                ? { ...result, status: action.payload.reviewStatus }
                : result
            ),
        error: null,
      };
    case APPROVEREJECT_ERROR:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export const requestComments = (state = [], action) => {
  switch (action.type) {
    case FECTH_REQUESTS_COMMENTS:
      return {
        ...state,
        requestComments: action.payload,
      };
    default:
      return state;
  }
};

export function postRequestCommentReducer(state = [], action) {
  switch (action.type) {

      case POST_REQUESTS_COMMENT:
          return {
              loading: false,
              profileLoading: false,
              successMsg: "successfully update your profile",
              error: null,
              success: true,
          }
      case POST_REQUESTS_COMMENT_FAILED:
          return {
              loading: false,
              profileLoading: false,
              successMsg: null,
              error: action.payload,
              success: false,
          }
      default:
          return state
  }
}


export function deleteRequestCommentReducer(state = [], action) {
  switch (action.type) {

      case DELETE_REQUESTS_COMMENT:
          return {
              loading: false,
              profileLoading: false,
              successMsg: "successfully update your profile",
              error: null,
              success: true,
          }
      case DELETE_REQUESTS_COMMENT_FAILED:
          return {
              loading: false,
              profileLoading: false,
              successMsg: null,
              error: action.payload,
              success: false,
          }
      default:
          return state
  }
}

export default requestsReducer;
