import { FECTH_REQUESTS } from './actionTypes';
import { errorToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';

export const fetchRequest = async (dispatch) => {
  const result = await axiosInstance.get('/trips');
  if (!result?.error) {
    const requests = result.data;
    dispatch({
      type: FECTH_REQUESTS,
      payload: requests,
    });
  } else {
    errorToast(result?.error || result?.message);
  }
};
