import { FECTH_REQUESTS } from './actionTypes';
import * as apiRequest from '../../utils/apiRequest';
export const fetchRequest = async (dispatch) => {
  const result = await apiRequest.get('/trips');
  if (result.status == 200) {
    const requests = await result.json();
    dispatch({
      type: FECTH_REQUESTS,
      payload: requests,
    });
  }
  if (result.status == 401) {
    alert('Unauthorized access ');
  }
};
