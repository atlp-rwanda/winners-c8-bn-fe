import { FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILED } from "../types/userProfileTypes";

const fetchUserInitialState = {
  loading: false,
  user: {},
  error: null
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