const navbarActions ={};
navbarActions.setPage = (pageName) => {
    return ({
        type: "SET_PAGE",
        pageName
    });
}

export default navbarActions;