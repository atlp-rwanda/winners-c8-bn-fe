import { FECTH_REQUESTS, FECTH_REQUESTS_COMMENTS,POST_REQUESTS_COMMENT, POST_REQUESTS_COMMENT_FAILED, DELETE_REQUESTS_COMMENT, DELETE_REQUESTS_COMMENT_FAILED } from '../actions/actionTypes';
export const requests = (state = [], action) => {
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
              successMsg: "successfully deleted",
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

