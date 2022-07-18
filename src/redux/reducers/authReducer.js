const authReducer = (
    state = {
     token: ""
    },
    action
  ) => {
    console.log(JSON.stringify(state));
    switch (action.type) {
      case "LOGIN":
        return {
          ...state,
          token: action.token
        };
      case "LOGOUT":
        return {
          ...state,
          token: ""
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  