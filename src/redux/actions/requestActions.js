import { FECTH_REQUESTS, FECTH_REQUESTS_COMMENTS, FECTH_REQUESTS_COMMENTS_FAILED, POST_REQUESTS_COMMENT, POST_REQUESTS_COMMENT_FAILED,DELETE_REQUESTS_COMMENT_FAILED, DELETE_REQUESTS_COMMENT } from './actionTypes';
import axios from 'axios';
import { errorToast, successToast } from '../../helpers/generateToast';
import { authHeader } from '../utils/dataSession';
let tripId = localStorage.getItem('tripId');

// let commentId = localStorage.getItem('commentId');

export const fetchRequest = async (dispatch) => {
  const result = await axios.get(
    `${process.env.BASE_BACKEND_SERVER_URL}/trips`,
    {
      headers: authHeader(),
    }
  );
  // console.log(result);
  if (result.status == 200) {
    const requests = result.data;
    dispatch({
      type: FECTH_REQUESTS,
      payload: requests,
    });
  } else {
    errorToast(result.data?.error || result.data?.message || result.data);
  }
};


export const fetchRequestComments = () => async (dispatch) => {

  return await axios
    .get(`${process.env.BASE_BACKEND_SERVER_URL}/trips/${tripId}/comments`, {
      headers: authHeader(),
    })
    .then((res) => {
      dispatch({
        type: FECTH_REQUESTS_COMMENTS,
        payload: res.data,
      });
      // localStorage.removeItem('tripId')

    })
    .catch((err) => {
      dispatch({
        type: FECTH_REQUESTS_COMMENTS_FAILED,
        payload: 'Comments not found',
      });
    });
    
};


export const postRequestComment = (body) => async (dispatch) => {

  return axios
    .post(`${process.env.BASE_BACKEND_SERVER_URL}/trips/${tripId}/comment`, body, {
      headers: authHeader(),
    })
    .then(async (res) => {

        await dispatch({
          type: POST_REQUESTS_COMMENT,
          payload: res.data.data,
        });


      dispatch(fetchRequestComments());
    })
    .catch((err) => {
      dispatch({
        type: POST_REQUESTS_COMMENT_FAILED,
        payload: err,
      });
    });
};




export const deleteRequestComment = (commentId) => async (dispatch) => {
 console.log(commentId)
  return axios
    .delete(`${process.env.BASE_BACKEND_SERVER_URL}/trips/${tripId}/comments/${commentId}`, {
      headers: authHeader(),
    })
    .then(async (res) => {

        if(res.status == 200){
          await dispatch({
            type: DELETE_REQUESTS_COMMENT,
            payload: res.data.data,
          });

          successToast(res.data.message)

        }else{
          errorToast(res.data?.error || res.data?.message || result.data)
        }
      dispatch(fetchRequestComments());
    })
    .catch((err) => {
      dispatch({
        type: DELETE_REQUESTS_COMMENT_FAILED,
        payload: err,
      });
      errorToast("comment was not deleted")
    });
};
