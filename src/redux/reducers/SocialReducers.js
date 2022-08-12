import * as types from '../actions/actionTypes'

const initialState = {
    loading: false,
    currentUser: null,
    error: null,
}
const userReducer = (state= initialState , action) =>{
	/* istanbul ignore next */
	switch (action.type) {
		case types.GOOGLE_SIGN_IN_START:
			return {
				...state,
				loading: true,
			};
		case types.FACEBOOK_SIGN_IN_START:
			return {
				...state,
				loading: true,
			};
		case types.GOOGLE_SIGN_IN_SUCCESS:
			return {
				...state,
				loading: false,
				currentUser: action.payload,
			};
		case types.FACEBOOK_SIGN_IN_SUCCESS:
			return {
				...state,
				loading: false,
				currentUser: action.payload,
			};
		case types.GOOGLE_SIGN_IN_FAIL:
			return {
				...state,
				loading: false,
				currentUser: action.payload,
			};
		case types.FACEBOOK_SIGN_IN_FAIL:
			return {
				...state,
				loading: false,
				currentUser: action.payload,
			};
		default:
			return state;
	}
};
export default userReducer;