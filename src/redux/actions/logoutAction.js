import {
   LOGOUT_FAILED,
   LOGOUT_SUCCESS
} from './actionTypes';
import { successToast, errorToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';

export const logout = () => async (dispatch, navigate) => {
    return axiosInstance
      .put('/auth/signout')
      .then((res) => {
        if (res.data.error) {
           dispatch({
            type: LOGOUT_FAILED,
            payload: res.data.error,
          });
          errorToast(res.data.error);
        }
  
        if (res.status == 200) {
          if (window.localStorage.getItem('auth-token')) {
            window.localStorage.removeItem('auth-token');
          }
           dispatch({
            type: LOGOUT_SUCCESS,
            payload: res.data,
          });
          successToast(res.data.message);
            navigate('/login', {replace: true})


        }

  
      })
      .catch((err) => {
        dispatch({
          type: LOGOUT_FAILED,
          payload: err,
        });
        errorToast(err.response.data.error);
      });
  };