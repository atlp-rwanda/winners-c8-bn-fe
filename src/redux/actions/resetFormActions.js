import { errorToast, successToast } from '../../helpers/generateToast';
import axiosInstance from '../../helpers/http';

const resetActions = {};

resetActions.submit = (values, setSubmitting, token) => {
  return async (dispatch) => {
    const { password, confirmPassword } = values;
    const result = await axiosInstance.post(`/auth/resetPassword/${token}`, {
      newPassword: password,
      confirmPassword: confirmPassword,
    });

    const responseData = {
      isSuccess: result?.data?.success || result?.sucesss,
      message: result?.data?.message || result?.error,
    };
    if (responseData.isSuccess) {
      successToast(responseData.message);
      dispatch(resetSubmit({ responseData, requestSent: true }));
    } else errorToast(responseData.message);

    setSubmitting(false);
  };
};

resetActions.return = () => {
  return (dispatch) => {
    dispatch(resetReturn());
  };
};

const resetSubmit = (state) => {
  return {
    type: 'RESET_SUBMIT',
    payload: {
      ...state,
    },
  };
};

const resetReturn = () => {
  return {
    type: 'RESET_RETURN',
  };
};

export default resetActions;
