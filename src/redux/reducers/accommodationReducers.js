import {
  FETCH_ACCOMMODATIONS_LOADING,
  FETCH_ACCOMMODATIONS_SUCCESS,
  FETCH_ACCOMMODATIONS_FAILED,
  LikeDislike_ACCOMMODATION_LOADING,
  LikeDislike_ACCOMMODATION_SUCCESS,
  LikeDislike_ACCOMMODATION_FAILURE,
  ACCOMMODATION_UPDATE_LOADING,
  ACCOMMODATION_UPDATE_SUCCESS,
  ACCOMMODATION_UPDATE_FAILURE,
  ACCOMMODATION_DELETE_SUCCESS,
  ACCOMMODATION_DELETE_LOADING,
  ACCOMMODATION_DELETE_FAILURE,
} from '../actions/actionTypes';


const initialState = {
    loading:false,
    accommodations: [],
    error: ''
}

export function accommodationsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ACCOMMODATIONS_LOADING:
      return {
        loading: true,
      };

    case FETCH_ACCOMMODATIONS_SUCCESS:
      console.log(action.payload.data);
      return {
        ...state,
        loading: false,
        accommodations: action.payload.data,
      };

    case FETCH_ACCOMMODATIONS_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LikeDislike_ACCOMMODATION_SUCCESS:
      console.log(state.accommodations);
      return {
        ...state,
        
          accommodations: state.accommodations.map(accommodations => accommodations.id === action.payload.accommodationId? { ...accommodations, isLiked :!accommodations.isLiked, likes:accommodations.isLiked ? accommodations.likes-1 : accommodations.likes+1} : accommodations),
        
        loading: false,
        message: action.payload.res,
      };
    case LikeDislike_ACCOMMODATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
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

// DELETE REDUCER
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
// export const LikeDislikeReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case LikeDislike_ACCOMMODATION_LOADING:
//       return {
//         ...state,
//         loading: true,
//       };
//     case LikeDislike_ACCOMMODATION_SUCCESS:
// 		console.log(state.accommodations)
//       return {
//         ...state,
// 		accommodations:{
// 			...state.accommodations.accommodations,
// 			// accommodations: state.accommodations.map(accommodations => accommodations.id === action.payload.accommodationId? { ...accommodations, isLiked :!accommodations.isLiked, likes:accommodations.likes+1 } : accommodations)
// 		},
//         loading: false,
//         message: action.payload.res,
//       };
	 
// 		 default:
//           return state

//   }
// };