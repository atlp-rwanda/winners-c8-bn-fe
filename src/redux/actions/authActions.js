const authActions ={};
authActions.login = (token) => {
    return ({
        type: "LOGIN",
        token
    });
}
  
authActions.logout = () => {
return ({
        type: "LOGOUT"
    });
}

export default authActions;