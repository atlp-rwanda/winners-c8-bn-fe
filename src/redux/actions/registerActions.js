import axios from 'axios';
import { successToast, errorToast } from '../../helpers/generateToast';
import { successAlert } from './alertActions';

const apiUrl = 'https://winners-c8-bn-be-staging.herokuapp.com/api';

export const register = ({ firstName, lastName, email, password }) => {
  let res;
  return (dispatch) => {
    dispatch({
      type: 'REGISTER_USER',
    });

    axios({
      method: 'POST',
      url: `${apiUrl}/auth/register`,
      data: { firstName, lastName, email, password },
      validateStatus: () => true,
    })
      .then((res) => {
        if (res.data.error) {
          dispatch({
            type: 'FAILURE',
            payload: res.data.error,
          });
          errorToast(res.data.error);
        }
        if (res.data.message === 'Ooops! User already exists!') {
          dispatch({
            type: 'USER_EXIST',
            payload: res.message,
          });
          errorToast(res.data.message);
        }
        if (res.data.success && res.data.status === 201) {
          dispatch({
            type: 'SUCCESS',
            payload: res.data,
          });
          dispatch(successAlert(res.data.message));
          // successToast(res.data.message)
          history.push({ pathname: '/login', state: 'verify' });
        }
      })
      .catch((error) => {
        dispatch({
          type: 'FAILURE',
          payload: error.toString(),
        });
        errorToast(error.message);
      });
  };
};

export const userActions = {
  register,
};
