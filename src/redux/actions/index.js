// this folder will contain redux's action
const authHeader = () => {
    let token = localStorage.getItem('auth-token');
    if (token) return { 'Authorization': 'Bearer ' + token};
    return {}
  }



export default authHeader;