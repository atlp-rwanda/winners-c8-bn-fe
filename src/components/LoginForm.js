import React from "react";
import "../../public/styles/LoginForm/index.css"
import authActions from "../redux/actions/authActions";
import navbarActions from "../redux/actions/navbarActions";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import fbLogo from "../../public/images/login/facebook_icon.png"
import googleLogo from "../../public/images/login/google_icon.png";
import Joi, { disallow } from "joi";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: undefined,
      emailValidationMessage: "",
      isPasswordValid: undefined,
      passwordValidationMessage: "",
      wait: false,
      success: false,
      error: false,
      responseMessage: "Signing in . . .",
    };
  }
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
      this.setState({wait: true});
      toast(this.state.responseMessage);
      let result =  await fetch("https://winners-c8-bn-be-staging.herokuapp.com/api/auth/signin", requestOptions)
      .then(response => response.json())
      this.setState({responseMessage: result.message});
      if(result.status == 200) {
        toast.success("Logged in successfully!");
        this.isFormSubmitted = true;
        this.setState({success : true});
        this.props.LOGIN(result.data);
        window.localStorage.setItem("auth-token", result.data);
        this.props.SET_PAGE("HOME")
      }
      else{
        this.setState({error : true});
        toast.error(this.state.responseMessage);
      }
    }
    catch(error) {
      toast.error(`Error: ${error}`);
    }
  }
  validateEmail = async (emailAddress)=>{
    const validator = Joi.string().required().email({ tlds: { allow: false } });
    const {error} = await validator.validate(emailAddress);
    if(error){
      this.setState({isEmailValid: false});
      this.setState({emailValidationMessage: error.details[0].message.replace(/[/"'`]+/g, "").replace("value", "Input")});
    }
    else{
      this.setState({isEmailValid: true});
      this.setState({emailValidationMessage: ""});
    }
  }
  validatePassword = async (password)=>{
    const validator = Joi.string().required();
    const {error} = await validator.validate(password);
    if(error){
      this.setState({isPasswordValid: false});
      this.setState({passwordValidationMessage: error.details[0].message.replace(/[/"'`]+/g, "").replace("value", "Input")});
    }
    else{
      this.setState({isPasswordValid: true});
      this.setState({passwordValidationMessage: ""});
    }
  }
  componentDidMount() {
    this.props.LOGOUT();
    if(window.localStorage.getItem("auth-token")) {
      window.localStorage.removeItem("auth-token");
    }
  }
  socialImageStyle = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "auto",
  }
  inputSuccessStyle = {
    border: "3px solid lightgreen",
  }
  inputErrorStyle = {
    border: "2px solid red",
  }
  render(){
    return (
      <div className="formBody">
        {this.isFormSubmitted && (
          <Navigate to="/" replace={true} />
        )}
        <div className="container d-flex justify-content-center">
          {/* {(this.state.wait | this.state.success | this.state.error)
            &&
            <div className="col-md-8 formWhite">
              <h5 className="header5">{this.state.responseMessage}</h5>
            </div>
          } */}
          {/* {(!(this.state.wait | this.state.success | this.state.error))
            && */
            <div className="col-md-8 formWhite">
              <ToastContainer />
              <div className="row d-flex justify-content-center">
                <div className="col-xs-12 col-md-8">
                  <h1 className="header1">Sign in </h1>
                  <form id="login-form" className="form-login" onSubmit={(event) => this.loginSubmit(event)} >
                    <input type="text" name="email" placeholder="email" className="field input-login" onBlur={async (event) => await this.validateEmail(event.target.value)} style={(this.state.isEmailValid==true)? this.inputSuccessStyle : (this.state.isEmailValid==false)? this.inputErrorStyle : {}}></input>
                    <div className="redErrorMessage">{this.state.emailValidationMessage}</div>
                    <input type="password" name="password" placeholder="password" className="field input-login" onBlur={async (event) => await this.validatePassword(event.target.value)} style={(this.state.isPasswordValid==true)? this.inputSuccessStyle : (this.state.isPasswordValid==false)? this.inputErrorStyle : {}}></input>
                    <div className="redErrorMessage">{this.state.passwordValidationMessage}</div>
                    <button type={(this.state.isEmailValid==true && this.state.isPasswordValid==true)? "submit" : ""} value="login" className="btn" disabled={!(this.state.isEmailValid==true && this.state.isPasswordValid==true)}>Sign in</button>
                  </form>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-xs-12 col-md-8">
                  <h5 className="header5">Or Sign in with</h5>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-2">
                  <a href=""><img src={googleLogo} style={this.socialImageStyle}/></a>
                  <div className="pass-link"><a href="">Google</a></div>
                </div>
                <div className="col-2">
                  <a href=""><img src={fbLogo} style={this.socialImageStyle}/></a>
                  <div className="pass-link"><a href="">Facebook</a></div>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-xs-12 col-md-8">
                  <div className="pass-link">
                    <a href="#" >Lost your password?</a>
                  </div>
                </div>
              </div>
            </div>
          }
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
