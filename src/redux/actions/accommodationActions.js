import axios from 'axios'
import { successToast, errorToast } from '../../helpers/generateToast';
import { successAlert, failureAlert} from './alertActions';
import { FETCH_ACCOMMODATIONS_LOADING, 
         FETCH_ACCOMMODATIONS_SUCCESS, 
         FETCH_ACCOMMODATIONS_FAILED,
         FETCH_SINGLE_ACCOMMODATION_LOADING,
         FETCH_SINGLE_ACCOMMODATION_SUCCESS,
         FETCH_SINGLE_ACCOMMODATION_FAILED} from "./actionTypes";
import {accommodationsUrl} from "../utils/apiUrls";
import {authHeader} from '../utils/dataSession';

export const listAccommodations = () => async dispatch => {
    dispatch({
        type: FETCH_ACCOMMODATIONS_LOADING
    });

  return await axios.get(accommodationsUrl, { headers: authHeader() })
      .then(res => {
          dispatch({
              type: FETCH_ACCOMMODATIONS_SUCCESS,
              payload: res.data
          });
      })
      .catch(err => {
          dispatch({
              type: FETCH_ACCOMMODATIONS_FAILED,
              payload: err.message,
              message: err
          });
          errorToast(err)
      })
}

export const detailsAccommodation = (accommodationId) => async dispatch => {
    dispatch({
        type: FETCH_SINGLE_ACCOMMODATION_LOADING
    });

  return await axios.get(accommodationsUrl+`${accommodationId}`, { headers: authHeader() })
      .then(res => {
          dispatch({
              type: FETCH_SINGLE_ACCOMMODATION_SUCCESS,
              payload: res.data
          });
      })
      .catch(err => {
          dispatch({
              type: FETCH_SINGLE_ACCOMMODATION_FAILED,
              payload: "failed to fetch",
              message: err
          });
      })
}
