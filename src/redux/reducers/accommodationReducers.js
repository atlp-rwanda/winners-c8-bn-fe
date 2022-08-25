import { 
    FETCH_ACCOMMODATIONS_LOADING, 
    FETCH_ACCOMMODATIONS_SUCCESS, 
    FETCH_ACCOMMODATIONS_FAILED,
    FETCH_SINGLE_ACCOMMODATION_FAILED,
    FETCH_SINGLE_ACCOMMODATION_LOADING,
    FETCH_SINGLE_ACCOMMODATION_SUCCESS,
    ACCOMMODATION_UPDATE_LOADING,
    ACCOMMODATION_UPDATE_SUCCESS,
    ACCOMMODATION_UPDATE_FAILURE,
    ACCOMMODATION_DELETE_SUCCESS,
    ACCOMMODATION_DELETE_LOADING,
    ACCOMMODATION_DELETE_FAILURE
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
              accommodations: action.payload.data
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

// UPDATING REDUCER

export const AccommodationUpdateReducer = (state = initialState, action) => {
	switch (action.type) {
		case ACCOMMODATION_UPDATE_LOADING:
			return {
				loading: true,
				isUpdated: false
			}
	
		case ACCOMMODATION_UPDATE_SUCCESS:
			return {
				loading:false,
				data: action.payload,
				isUpdated: true
			}
		
		case ACCOMMODATION_UPDATE_FAILURE:
			return{
				loading: false,
				error: action.payload,
				isUpdated: false
			}

		default:
			return state;
	}
}

export const deleteAccommodationReducer=(state=initialState, action)=>{
  switch (action.type) {
		case ACCOMMODATION_DELETE_LOADING:
			return {
				loading: true,
				isDeleted: false
			}
	
		case ACCOMMODATION_DELETE_SUCCESS:
			return {
				loading:false,
				isDeleted: true
			}
		
		case ACCOMMODATION_DELETE_FAILURE:
			return{
				loading: false,
				error: action.payload,
				isDeleted: false
			}

		default:
			return state;
	}
}

export const viewAccommodationReducer=(state=initialState, action)=>{
  switch (action.type) {
		case ACCOMMODATION_DELETE_LOADING:
			return {
				loading: true,
				isDeleted: false
			}
	
		case ACCOMMODATION_DELETE_SUCCESS:
			return {
				loading:false,
				isDeleted: true
			}
		
		case ACCOMMODATION_DELETE_FAILURE:
			return{
				loading: false,
				error: action.payload,
				isDeleted: false
			}

		default:
			return state;
	}
}