  import axios from 'axios';
  import { successToast, errorToast } from '../../helpers/generateToast';  
  export const fetchCreateLocation = () => async (dispatch) => {
    dispatch({
      type: FETCH_USER_PROFILE_LOADING,
    });
  
    return await axios
      .get(`${process.env.BASE_BACKEND_SERVER_URL}/user/user`, {
        headers: authHeader(),
      })
      .then((res) => {
        dispatch({
          type: FETCH_USER_PROFILE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch({
          type: FETCH_USER_PROFILE_FAILED,
          payload: 'User Profile not found',
        });
      });
  };
  
  export const updateUserProfile = (body) => async (dispatch) => {
    dispatch({
      type: UPDATE_USER_PROFILE_LOADING,
    });
  
    return axios
      .patch(`${process.env.BASE_BACKEND_SERVER_URL}/user/update`, body, {
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
            type: UPDATE_USER_PROFILE_SUCCESS,
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
  