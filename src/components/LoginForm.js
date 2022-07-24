import React from "react";
import "../../public/styles/LoginForm/index.css"
import authActions from "../redux/actions/authActions";
import navbarActions from "../redux/actions/navbarActions";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import fbLogo from "../../public/images/login/facebook_icon.png"
import googleLogo from "../../public/images/login/google_icon.png"

class LoginForm extends React.Component {
  isFormSubmitted = false;
  loginSubmit = async (event) => {
    event.preventDefault();
    // const fakeToken = event.target["email"].value + " : "+ event.target["password"].value;
    try{
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      
      let raw = JSON.stringify({
        "email": event.target["email"].value,
        "password": event.target["password"].value
      });
      
      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
      let result =  await fetch("https://winners-c8-bn-be-staging.herokuapp.com/api/auth/signin", requestOptions)
      .then(response => response.json())
      console.log("zzzzzzzzzzzzzzzz",result)
      this.isFormSubmitted = true;
      this.props.LOGIN(JSON.stringify(result.message));
      this.props.SET_PAGE("HOME")
    }
    catch(error) {
      alert(error);
    }
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
        <h1>Sign in </h1>
        <form id="login-form" onSubmit={(event) => this.loginSubmit(event)} >
          <input type="text" name="email" placeholder="email" className="field"></input>
          <input type="password" name="password" placeholder="password" className="field"></input>
          <input type="submit" value="login" className="btn"></input>
        </form>
        <div>Or Sign in with</div>
        <a href=""><img src={googleLogo}/></a>
        <a href=""><img src={fbLogo}/></a>
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
