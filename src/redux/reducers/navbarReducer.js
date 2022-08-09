const navbarReducer = (
  state = {
    currentPage: "HOME",
  },
  action
) => {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        currentPage: action.pageName,
      };
    default:
      return state;
  }
};

export default navbarReducer;
