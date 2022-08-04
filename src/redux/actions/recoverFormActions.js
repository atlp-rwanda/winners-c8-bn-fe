const recoverActions = {};
recoverActions.submit = (state) => {
  return {
    type: "RECOVER_SUBMIT",
    payload: {
      ...state,
    },
  };
};

recoverActions.return = (state) => {
  return {
    type: "RECOVER_RETURN",
  };
};

export default recoverActions;
