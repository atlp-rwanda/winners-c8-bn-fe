import { FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILED, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_LOADING, UPDATE_USER_PROFILE_FAILED } from "../types/userProfileTypes";

const fetchUserInitialState = {
  loading: false,
  user: {},
  error: null
}

const updateUserProfileInitialState = {
  profileLoading:false,
  loading: false,
  successMsg: null,
  error: null,
  snackbarOpen: false,
  success: false
}

export function fetchUserProfileReducer(state = fetchUserInitialState, action) {
  switch (action.type) {

      case FETCH_USER_PROFILE_SUCCESS:
          return {
              loading: false,
              user: action.payload,
          }
      case FETCH_USER_PROFILE_FAILED:
          return {
            ...state,
              loading: false,
              error: action.payload
          }
      default:
          return state
  }
}

export function updateUserProfileReducer(state = updateUserProfileInitialState, action) {
  /* istanbul ignore next */
  switch (action.type) {
    case UPDATE_USER_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        loading: false,
        profileLoading: false,
        successMsg: 'successfully update your profile',
        error: null,
        success: true,
        snackbarOpen: true,
      };
    case UPDATE_USER_PROFILE_FAILED:
      return {
        loading: false,
        profileLoading: false,
        successMsg: null,
        error: action.payload,
        success: false,
        snackbarOpen: true,
      };
    default:
      return state;
  }
}