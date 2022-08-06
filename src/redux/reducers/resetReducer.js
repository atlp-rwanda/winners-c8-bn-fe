const initialValues = {
  requestSent: false,
  responseData: {
    isSuccess: undefined,
    message: undefined,
  },
};

const resetReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "RESET_SUBMIT":
      return {
        ...action.payload,
      };
    case "RESET_RETURN":
      return { ...initialValues };
    default:
      return state;
  }
};

export default resetReducer;
