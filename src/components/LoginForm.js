import React from "react";
import "../../public/styles/LoginForm/index.css"
import authActions from "../redux/actions/authActions";
import navbarActions from "../redux/actions/navbarActions";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

class LoginForm extends React.Component {
  isFormSubmitted = false;
  loginSubmit = (event) => {
    event.preventDefault();
    const fakeToken = event.target["email"].value + " : "+ event.target["password"].value;
    // console.log("my fake token is here : ",fakeToken);
    this.isFormSubmitted = true;
    this.props.LOGIN(fakeToken);
    this.props.SET_PAGE("HOME")
  }
  componentDidMount() {
    this.props.LOGOUT();
  }
  render(){
    return (
      <div className="container">
        {this.isFormSubmitted && (
          <Navigate to="/" replace={true} />
        )}
        <h1>Login </h1>
        <form id="login-form" onSubmit={(event) => this.loginSubmit(event)} >
          <input type="text" name="email" placeholder="email" className="field"></input>
          <input type="password" name="password" placeholder="password" className="field"></input>
          <input type="submit" value="login" className="btn"></input>
        </form>
        <div className="pass-link">
          <a href="#" >Lost your password?</a>
        </div>	
      </div>
    );
  } 
}

const mapStateToProps = state => ({
  token: state.auth.token
});
const {login: LOGIN, logout: LOGOUT} = authActions;
const {setPage: SET_PAGE} = navbarActions;
export default connect(
  mapStateToProps,
  { LOGIN, LOGOUT, SET_PAGE }
)(LoginForm);
// export default LoginForm;
