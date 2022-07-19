const navbarReducer = (
    state = {
     currentPage: "HOME"
    },
    action
  ) => {
    // console.log(`before ${action.type} action, this is the NAVBAR state: `,JSON.stringify(state));
    switch (action.type) {
      case "SET_PAGE":
        return {
          ...state,
          currentPage: action.pageName
        };
      default:
        return state;
    }
  };
  
  export default navbarReducer;
  