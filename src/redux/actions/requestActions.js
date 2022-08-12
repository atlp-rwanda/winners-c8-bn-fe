import { FECTH_REQUESTS } from './actionTypes';
import axios from 'axios';
import { errorToast } from '../../helpers/generateToast';
import { authHeader } from '../utils/dataSession';
export const fetchRequest = async (dispatch) => {
  const result = await axios.get(
    `${process.env.BASE_BACKEND_SERVER_URL}/trips`,
    {
      headers: authHeader(),
    }
  );
  console.log(result);
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
