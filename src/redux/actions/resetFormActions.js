const resetActions = {};

resetActions.submit = (values, setSubmitting, token) => {
  return async (dispatch) => {
    const { password, confirmPassword } = values;
    const url = `https://winners-c8-bn-be-staging.herokuapp.com/api/auth/resetPassword/${token}`;
    const data = JSON.stringify({
      newPassword: password,
      confirmPassword: confirmPassword,
    });
    try {
      const result = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      const resultData = await result.json();

      const responseData = {
        isSuccess: resultData.success,
        message: resultData.message,
      };

      dispatch(resetSubmit({ responseData, requestSent: true }));

      setSubmitting(false);
    } catch (err) {
      const responseData = {
        isSuccess: false,
        message: err.message,
      };

      dispatch(resetSubmit({ responseData, requestSent: true }));

      setSubmitting(false);
    }
  };
};

resetActions.return = () => {
  return (dispatch) => {
    dispatch(resetReturn());
  };
};

const resetSubmit = (state) => {
  return {
    type: "RESET_SUBMIT",
    payload: {
      ...state,
    },
  };
};

const resetReturn = () => {
  return {
    type: "RESET_RETURN",
  };
};

export default resetActions;
