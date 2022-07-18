const authActions ={};
authActions.login = token => ({
    type: "LOGIN",
    token
});
  
authActions.logout = () => ({
    type: "LOGOUT"
});

export default authActions;