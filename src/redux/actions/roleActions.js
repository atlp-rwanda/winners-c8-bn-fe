import axios from 'axios';
import { successToast, errorToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';
import {
  FETCH_ROLE_FAILED,
  FETCH_ROLE_SUCCESS,
  FETCH_ROLE_LOADING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  FETCH_USER_LOADING,
  ASSIGN_ROLE_FAILED,
  ASSIGN_ROLE_LOADING,
  ASSIGN_ROLE_SUCCESS,
} from './actionTypes';

export const fetchUsers = () => async (dispatch) => {
  dispatch({
    type: FETCH_USER_LOADING,
    payload: 'Fetch users is loading',
  });

  return await axiosInstance
    .get('/users')
    .then((res) => {
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_USER_FAILED,
        payload: 'User not found',
      });
    });
};

export const fetchRoles = () => async (dispatch) => {
  dispatch({
    type: FETCH_ROLE_LOADING,
  });

  return await axiosInstance
    .get('/users/roles')
    .then((res) => {
      dispatch({
        type: FETCH_ROLE_SUCCESS,
        payload: res.data.roles,
      });
    })
    .catch((err) => {
      dispatch({
        type: FETCH_ROLE_FAILED,
        payload: 'Fetch roles failed',
      });
    });
};
export const assignRoles =
  (SelectedEmail, SelectedRole) => async (dispatch) => {
    dispatch({
      type: ASSIGN_ROLE_LOADING,
    });

    return axiosInstance
      .patch('/users/assignRole', {
        email: SelectedEmail,
        roleId: SelectedRole,
      })
      .then(async (res) => {
        if (res.data.error) {
          await dispatch({
            type: ASSIGN_ROLE_FAILED,
            payload: res.data.error,
          });
          errorToast(err.response.data.message);
        }
        if (res.status == 200) {
          await dispatch({
            type: ASSIGN_ROLE_SUCCESS,
            payload: res.data.data,
          });
          successToast(res.data.message);
        }
        dispatch(fetchUsers());
      })
      .catch((err) => {
        dispatch({
          type: ASSIGN_ROLE_FAILED,
          payload: err,
        });
        // errorToast(err.response.data.err)
      });
  };
