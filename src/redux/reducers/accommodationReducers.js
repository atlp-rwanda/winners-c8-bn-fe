import { 
    FETCH_ACCOMMODATIONS_LOADING, 
    FETCH_ACCOMMODATIONS_SUCCESS, 
    FETCH_ACCOMMODATIONS_FAILED,
    FETCH_SINGLE_ACCOMMODATION_FAILED,
    FETCH_SINGLE_ACCOMMODATION_LOADING,
    FETCH_SINGLE_ACCOMMODATION_SUCCESS
} from "../actions/actionTypes";


const initialState = {
    loading:false,
    accommodations: [],
    // singleAccommodation: {},
    error: ''
}

export function accommodationsReducer(state = initialState, action) {
  switch (action.type) {

      case FETCH_ACCOMMODATIONS_LOADING:
          return {
              loading: true
          }

      case FETCH_ACCOMMODATIONS_SUCCESS:
          return {
            ...state,
              loading: false,
              accommodations: action.payload.data.slice(0, 3)
          }

      case FETCH_ACCOMMODATIONS_FAILED:
        return {
            ...state,
              loading: false,
              error: action.payload
        }

        
      default:
          return state
  }
}

export function detailsAccommodationReducer(state =initialState, action){
  switch(action.type){
        case FETCH_SINGLE_ACCOMMODATION_LOADING:
                console.log('loading', state)
                  return {
                      loading: true
                  }

        case FETCH_SINGLE_ACCOMMODATION_SUCCESS:
          console.log('success', action.payload)
            return {
              ...state,
                loading: false,
                singleAccommodation: action.payload.data
            }

        case FETCH_SINGLE_ACCOMMODATION_FAILED:
          console.log('failed', action.payload)
            return {
              ...state,
                loading: false,
            }
        default:
          return state
    }
}