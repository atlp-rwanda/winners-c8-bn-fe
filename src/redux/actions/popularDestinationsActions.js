import { errorToast, successToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';

export const fetchPopularDestinations = () => {
  return async (dispatch) => {
    const response = await axiosInstance.get(`/locations/stats`);

    const result = {
      isSuccess: response?.data?.success || response?.sucesss,
      data: response?.data.data || response?.data,
    };

    const message = response?.data.message || response?.error;

    if (result.isSuccess) {
      dispatch(setDestinations(result));
      return;
    } else {
      errorToast(message);
    }
  };
};

const setDestinations = (state) => {
  return {
    type: 'SET_POPULAR_DESTINATIONS',
    payload: {
      ...state,
    },
  };
};
