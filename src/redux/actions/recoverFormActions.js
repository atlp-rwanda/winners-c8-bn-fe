export const recoverEmail = (values, { setSubmitting }) => {
  return async (dispatch) => {
    const url = `${process.env.BASE_BACKEND_SERVER_URL}/auth/requestPasswordReset`;
    const email = values.email;
    const data = JSON.stringify({ email: email });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data,
      });
      const resultData = await response.json();
      const responseData = {
        isSuccess: resultData.success,
        message: resultData.message,
      };

      dispatch(Submit({ responseData, emailSent: true }));
      setSubmitting(false);
    } catch (err) {
      const responseData = {
        isSuccess: false,
        message: err.message,
      };
      dispatch(Submit({ responseData, emailSent: true }));
      setSubmitting(false);
    }
  };
};

export const recoverReturn = () => {
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
