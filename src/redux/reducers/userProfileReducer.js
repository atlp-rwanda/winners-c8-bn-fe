
const initialState = {};

export const userProfileReducer = ( state = initialState, action) =>{
    switch(action.type){

        case "GET_TRIP_BY_ID" :
          return {
            ...state,
            trip:action.payload
          }
        default:
            return state

}   }