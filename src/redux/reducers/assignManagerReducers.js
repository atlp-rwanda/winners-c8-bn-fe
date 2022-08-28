import { FETCH_MANAGERS ,FETCH_MANAGERS_FAILED, ASSIGN_MANAGER ,ASSIGN_MANAGER_FAILED } from '../actions/actionTypes'




export const managers = (state = [], action) => {
    switch (action.type) {
      case FETCH_MANAGERS:
        return {
          ...state,
          requests: action.payload,
        };
      case FETCH_MANAGERS_FAILED:
        return {
          ...state,
          requests: action.payload,
        };
      default:
        return state;
    }
  };

export const assign_manager = (state = [], action) => {
    switch (action.type) {
      case ASSIGN_MANAGER:
        return {
          ...state,
          requests: action.payload,
        };
      case ASSIGN_MANAGER_FAILED:
        return {
          ...state,
          requests: action.payload,
        };
      default:
        return state;
    }
  };