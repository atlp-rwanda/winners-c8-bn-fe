const authActions = {};
authActions.login = (token) => {
  return {
    type: 'LOGIN',
    token,
  };
};

authActions.logout = () => {
  return {
    type: 'LOGOUT',
  };
};
authActions.isLoggedIn = () => (dispatch) => {
  const token = localStorage.getItem('auth-token');
  if (!token) return false;
  dispatch(authActions.login(token));
  return true;
};

export default authActions;
