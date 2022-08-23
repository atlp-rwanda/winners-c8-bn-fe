import { errorToast, successToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';

export const recoverEmail = (values, { setSubmitting }) => {
  return async (dispatch) => {
    const email = values.email;
    const response = await axiosInstance.post('/auth/requestPasswordReset', {
      email,
    });
    const responseData = {
      isSuccess: response?.data?.success || response?.success,
      message: response?.data.message || response?.error,
    };
    if (responseData.isSuccess) {
      dispatch(Submit({ responseData, emailSent: true }));
      successToast(responseData.message);
    } else {
      errorToast(responseData.message);
    }
    setSubmitting(false);
  };
};

export const recoverReturn = () => (dispatch) => {
  return dispatch(Return());
};

const Submit = (state) => {
  return {
    type: 'RECOVER_SUBMIT',
    payload: {
      ...state,
    },
  };
};

const Return = () => {
  return {
    type: 'RECOVER_RETURN',
  };
};
