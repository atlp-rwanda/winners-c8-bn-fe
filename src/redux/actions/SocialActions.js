import * as types from './actionTypes'
import {FcGoogle ,ImFacebook } from '../../components/SocialOAuth'

const googleSignInStart = () => ({
    type: types.GOOGLE_SIGN_IN_START
})
const googleSignInSuccess = (token) => ({
	type: types.GOOGLE_SIGN_IN_SUCCESS,
    payload: token
});

const googleSignInFail = (error) => ({
	type: types.GOOGLE_SIGN_IN_FAIL,
    payload: error
});

const facebookSignInStart = () => ({
	type: types.FACEBOOK_SIGN_IN_START,
});
const facebookSignInSuccess = (token) => ({
	type: types.FACEBOOK_SIGN_IN_SUCCESS,
	payload: token,
});

const facebookSignInFail = (error) => ({
	type: types.FACEBOOK_SIGN_IN_FAIL,
	payload: error,
});


export const googleSignInInitiate = () => async (dispatch) => {
	try {
		 dispatch(googleSignInStart());
		const res = await FcGoogle(token);
		return dispatch(googleSignInSuccess(res.message));
	} catch (error) {
		if (error.message) {
			return dispatch(googleSignInFail(error.message));
		}
		return dispatch(googleSignInFail(error.Error));
	}
};

export const facebookSignInInitiate = () => async (dispatch) => {
	try {
		dispatch(facebookSignInStart());
		const res = await ImFacebook(token);
		return dispatch(facebookSignInSuccess(res.message));
	} catch (error) {
		if (error.message) {
			return dispatch(facebookSignInFail(error.message));
		}
		return dispatch(facebookSignInFail(error.Error));
	}
};