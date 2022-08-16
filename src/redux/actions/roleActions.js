import axios from 'axios';
import { successToast, errorToast } from '../../helpers/generateToast';
import { FETCH_ROLE_FAILED, FETCH_ROLE_SUCCESS, FETCH_ROLE_LOADING, FETCH_USER_SUCCESS, FETCH_USER_FAILED, FETCH_USER_LOADING, ASSIGN_ROLE_FAILED, ASSIGN_ROLE_LOADING, ASSIGN_ROLE_SUCCESS } from './actionTypes';
import { authHeader } from '../utils/dataSession';

export const fetchUsers = () => async dispatch => {
  dispatch({
    type: FETCH_USER_LOADING,
    payload: "Fetch users is loading",
  });

return await axios.get(`https://winners-c8-bn-be-staging.herokuapp.com/api/users`, {headers: authHeader()})
  .then(res=> {
  
    dispatch({
    type: FETCH_USER_SUCCESS,
    payload: res.data,
  })
})
.catch(err =>{
  dispatch({
    type: FETCH_USER_FAILED,
    payload: "User not found",
  })
})
}

export const fetchRoles = () => async dispatch => {
      dispatch({
        type: FETCH_ROLE_LOADING,
      });
    
  return await axios.get(`https://winners-c8-bn-be-staging.herokuapp.com/api/users/roles`, {headers: authHeader()})
      .then(res=> {
        dispatch({
        type: FETCH_ROLE_SUCCESS,
        payload: res.data.roles,
      })
    })
    .catch(err => {
      dispatch({
        type: FETCH_ROLE_FAILED,
        payload: "Fetch roles failed",
      })
    })
  }
  export const assignRoles = (SelectedEmail, SelectedRole) => async dispatch => {
    dispatch({
      type: ASSIGN_ROLE_LOADING,
    });
  
return axios.patch(`https://winners-c8-bn-be-staging.herokuapp.com/api/users/assignRole`,{email: SelectedEmail, roleId: SelectedRole}, {headers: authHeader()})
    .then( async res => {
      if(res.data.error){
        await dispatch({
             type: ASSIGN_ROLE_FAILED,
             payload: res.data.error
         })
         errorToast(err.response.data.message)
     }
      // console.log("data", res.status)
      if(res.status == 200){
     await dispatch({
      type: ASSIGN_ROLE_SUCCESS,
      payload: res.data.data
    })
    successToast(res.data.message)
  }
    dispatch(fetchUsers())
  })
  .catch(err =>{
    console.log(err.response.data.message)
    dispatch({
      type: ASSIGN_ROLE_FAILED,
      payload: err,
    });
    errorToast(err.response.data.message)
  })

}

  