import axios from 'axios';
import { successToast, errorToast } from '../../helpers/generateToast';
import { SET_LOCATION, ACCOMODATION_LOADING } from '../actions/actionTypes';
export const fetchLocations = () => async (dispatch) => {
  return await axios
    .get(`${process.env.BASE_BACKEND_SERVER_URL}/locations`, {
      headers: authHeader(),
    })
    .then((res) => {
      dispatch({
        type: SET_LOCATION,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      errorToast(err);
    });
};

export const createAccomodation = (body) => async (dispatch) => {
  dispatch({
    type: UPDATE_USER_PROFILE_LOADING,
  });

  return axios
    .post(`${process.env.BASE_BACKEND_SERVER_URL}/accomodations`, body, {
      headers: authHeader(),
    })
    .then(async (res) => {
      if (res.data.error) {
        await dispatch({
          type: UPDATE_USER_PROFILE_FAILED,
          payload: res.data.error,
        });
        errorToast(res.data.error);
      }

      if (res.status == 200) {
        await dispatch({
          type: ACCOMODATION_LOADING,
          payload: res.data.data,
        });
        successToast(res.data.message);
      }

      dispatch(fetchUserProfile());
    })
    .catch((err) => {
      dispatch({
        type: UPDATE_USER_PROFILE_FAILED,
        payload: err,
      });
      errorToast(err.response.data.error);
    });
};
