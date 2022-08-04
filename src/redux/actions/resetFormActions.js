const resetActions = {};
resetActions.submit = (state) => {
  return {
    type: "RESET_SUBMIT",
    payload:{
        ...state
    },
  };
};

resetActions.return = (state) => {
  return {
    type: "RESET_RETURN",
  };
};

export default resetActions;
