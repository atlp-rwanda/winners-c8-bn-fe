import { REMEMBER_INFO_LOADING, REMEMBER_INFO_SUCCESS, REMEMBER_INFO_FAILED } from './actionTypes';
  import axios from 'axios';
  import { successToast, errorToast } from '../../helpers/generateToast';
  import { authHeader } from '../utils/dataSession';

  export const rememberInfo = () => async (dispatch) => {
    dispatch({
      type: REMEMBER_INFO_LOADING,
    });
  
    return axios
      .put(`${process.env.BASE_BACKEND_SERVER_URL}/user/remember-info`, {
        headers: authHeader(),
      })
      .then(async (res) => {
        if (res.data.error) {
          await dispatch({
            type: REMEMBER_INFO_FAILED,
            payload: res.data.error,
          });
          errorToast(res.data.error);
        }
  
        if (res.status == 200) {
          await dispatch({
            type: REMEMBER_INFO_SUCCESS,
            payload: res.data.data,
          });
          successToast(res.data.message);
        }
  
      })
      .catch((err) => {
        dispatch({
          type: REMEMBER_INFO_FAILED,
          payload: err,
        });
        errorToast(err.response.data.error);
      });
  };
  