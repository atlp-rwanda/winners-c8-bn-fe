import { FETCH_ROLE_FAILED, FETCH_ROLE_SUCCESS,ASSIGN_ROLE_SUCCESS, FETCH_ROLE_LOADING ,ASSIGN_ROLE_FAILED, ASSIGN_ROLE_LOADING} from '../actions/actionTypes';
const fetcRoleInitialState = {
  loading: false,
  error: null,
  roles: []
  }
const assignRoleInitialState = {
  loading: false,
  error: null,
  success: false
}
 export function rolesReducer(state = fetcRoleInitialState, action) {
    switch (action.type) {
      case FETCH_ROLE_LOADING:
        return {
          ...state,
          loading: true
          
        }
      
      case FETCH_ROLE_SUCCESS:
        return {
          loading: false,
          roles: action.payload,
        };
        
      case FETCH_ROLE_FAILED:
          return {
            ...state,
            loading: false,
            error: action.payload
          };
      default:
        return state;
    }
 }
export function assignRoleReducer(state = assignRoleInitialState, action) {
    switch (action.type) {
      case ASSIGN_ROLE_LOADING:
        return {
            ...state,
            loading: true
        }
      case ASSIGN_ROLE_SUCCESS:
        return {
          loading: false,
          error: null,
          successMsg: "role assigned successfully",
          success: true
          
        };
      case ASSIGN_ROLE_FAILED:
          return {
            loading: false,
            successMsg: null,
            error: action.payload
          };
      default:
        return state;
    }
  };
  
  
