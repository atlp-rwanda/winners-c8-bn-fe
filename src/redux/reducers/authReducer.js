const authReducer = (
    state = {
     token: ""
    },
    action
  ) => {
    // console.log(`before ${action.type} action, this is the AUTH state: `,JSON.stringify(state));
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
  