import { FETCH_USER_PROFILE_SUCCESS, FETCH_USER_PROFILE_FAILED, UPDATE_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_FAILED, UPDATE_USER_PROFILE_LOADING } from "../types/userProfileTypes";
import axios from "axios";
import {authHeader} from '../utils/dataSession';

export const fetchUserProfile = () => async dispatch => {


  return await axios.get(`https://winners-c8-bn-be-staging.herokuapp.com/api/user/user`, { headers: authHeader() })
      .then(res => {
          dispatch({
              type: FETCH_USER_PROFILE_SUCCESS,
              payload: res.data
          });
      })
      .catch(err => {
          dispatch({
              type: FETCH_USER_PROFILE_FAILED,
              payload: "User Profile not found"
          });
      })
}



export const updateUserProfile = (body) => async dispatch => {
    
        dispatch({
            type: UPDATE_USER_PROFILE_LOADING
        })

        return axios.patch(`https://winners-c8-bn-be-staging.herokuapp.com/api/user/update`, body, { headers: authHeader() })
            .then(async res => {
                await dispatch({
                    type: UPDATE_USER_PROFILE_SUCCESS,
                    payload: res.data.data
                });
                dispatch(fetchUserProfile())
            })
            .catch(err => {
                dispatch({
                    type: UPDATE_USER_PROFILE_FAILED,
                    payload: "Updating user failed"
                });
            })

}