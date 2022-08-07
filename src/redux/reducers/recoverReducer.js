const initialValues = {
  emailSent: false,
  responseData: {
    isSuccess: undefined,
    message: undefined,
  },
};

const resetReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "RECOVER_SUBMIT":
      return {
        ...action.payload,
      };
    case "RECOVER_RETURN":
      return { ...initialValues };
    default:
      return state;
  }
};

export default resetReducer;
