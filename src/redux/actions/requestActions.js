import {  FECTH_REQUESTS_COMMENTS, FECTH_REQUESTS_COMMENTS_FAILED, POST_REQUESTS_COMMENT, POST_REQUESTS_COMMENT_FAILED,DELETE_REQUESTS_COMMENT_FAILED, DELETE_REQUESTS_COMMENT } from './actionTypes';
import { errorToast, successToast } from '../../helpers/generateToast';

import {
  FECTH_REQUESTS,
  APPROVEREJECT_SUCCESS,
  APPROVEREJECT_ERROR,
} from './actionTypes';
import {toast} from 'react-toastify'
// import { errorToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';

export const fetchRequest = async (dispatch) => {
  const result = await axiosInstance.get('/trips');
  if (result.status == 200) {
    const requests = result.data;
    dispatch({
      type: FECTH_REQUESTS,
      payload: requests,
    });
  } else {
    errorToast(result?.error || result?.message);
  }
};


export const fetchRequestComments = (tripid) => async (dispatch) => {
  return await 
  axiosInstance.get(`/trips/${tripid}/comments`)
    .then((res) => {
      dispatch({
        type: FECTH_REQUESTS_COMMENTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: FECTH_REQUESTS_COMMENTS_FAILED,
        payload: 'Comments not found',
      });
    });
    
};


export const postRequestComment = ({formData, tripid}) => async (dispatch) => {

  return await
  axiosInstance.post(`/trips/${tripid}/comment`, formData )
    .then(async (res) => {

       if(res.status == 201){
        await dispatch({
          type: POST_REQUESTS_COMMENT,
          payload: res.data.data,
        });
        successToast(res.data.message)
      }else{
         errorToast("Posting Comment failed")
       }

      dispatch(fetchRequestComments(tripid));
    })
    .catch((err) => {
      dispatch({
        type: POST_REQUESTS_COMMENT_FAILED,
        payload: err,
      });
    });
};




export const deleteRequestComment = ({commentId, tripid}) => async (dispatch) => {
  return axiosInstance
    .delete(`/trips/${tripid}/comments/${commentId}`)
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
      dispatch(fetchRequestComments(tripid));
    })
    .catch((err) => {
      dispatch({
        type: DELETE_REQUESTS_COMMENT_FAILED,
        payload: err,
      });
      errorToast("comment was not deleted")
    });
};
export const approveRequestAction = (tripId, reviewStatus) => async (dispatch) => {
  /* istanbul ignore next */
  try {
    const res = await axiosInstance.put(
      `/trips/${tripId}/status`,
      { status: reviewStatus },
    );
    dispatch({
      type: APPROVEREJECT_SUCCESS,
      payload: { tripId, res: res.data.trip, reviewStatus },
      error: null,
    });
    toast.success(res.data.message);
    console.log(res);
  } catch (err) {
    console.log(err);

    dispatch({ type: APPROVEREJECT_ERROR });
  }
};


