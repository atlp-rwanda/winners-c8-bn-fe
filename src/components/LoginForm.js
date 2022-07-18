import React from "react";
import "../../public/styles/LoginForm/index.css"
import authActions from "../redux/actions/authActions";
import { connect } from "react-redux";

class LoginForm extends React.Component {
  loginSubmit = (event) => {
    event.preventDefault();
    const fakeToken = event.target["email"].value + " : "+ event.target["password"].value;
    // console.log("my fake token is here : ",fakeToken);
    this.props.LOGIN(fakeToken);
  }
  componentDidMount() {
    this.props.LOGOUT();
  }
  render(){
    return (
      <div className="container">
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
  token: state.token
});
const {login: LOGIN, logout: LOGOUT} = authActions;
export default connect(
  mapStateToProps,
  { LOGIN, LOGOUT }
)(LoginForm);
// export default LoginForm;