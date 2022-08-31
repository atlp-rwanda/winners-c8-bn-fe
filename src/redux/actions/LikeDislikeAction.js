import {
    LikeDislike_ACCOMMODATION_LOADING,
    LikeDislike_ACCOMMODATION_SUCCESS,
    LikeDislike_ACCOMMODATION_FAILURE 
} from './actionTypes'
import axiosInstance from '../../helpers/http';
import { toast } from 'react-toastify';


export const LikeDislikeAction = (accommodationId) => async(dispatch) => {

     try {
        dispatch({ type: LikeDislike_ACCOMMODATION_LOADING });
       const res = await axiosInstance.post(`/accommodations/${accommodationId}/like`, {
       });
       console.log(res)
       dispatch({
         type: LikeDislike_ACCOMMODATION_SUCCESS,
         payload: { accommodationId, res: res.data},
         error: null,
       });

       toast.success(res.data.message);
       console.log(res);
     } catch (err) {
       console.log(err);

       dispatch({ type: LikeDislike_ACCOMMODATION_FAILURE });
     }
}