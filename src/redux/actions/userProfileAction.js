import {
  FETCH_USER_PROFILE_SUCCESS,
  FETCH_USER_PROFILE_FAILED,
  FETCH_USER_PROFILE_LOADING,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_FAILED,
  UPDATE_USER_PROFILE_LOADING,
} from '../types/userProfileTypes';
import axios from 'axios';
import { successToast, errorToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';

export const fetchUserProfile = () => async (dispatch) => {
  dispatch({
    type: FETCH_USER_PROFILE_LOADING,
  });

  return await axiosInstance
    .get('/user/user')
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

  return axiosInstance
    .patch('/user/update', body)
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
          payload: res.data,
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
