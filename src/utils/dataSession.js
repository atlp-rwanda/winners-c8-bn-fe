const authHeader = () => {
  let token = localStorage.getItem('auth-token');
  if (token) return { Authorization: 'Bearer ' + token };
  return {};
};

export { authHeader };
