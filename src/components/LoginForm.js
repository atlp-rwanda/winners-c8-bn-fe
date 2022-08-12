import React from 'react';
import '../../public/styles/LoginForm/index.css';
import authActions from '../redux/actions/authActions';
import { connect } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import Joi, { disallow, version } from 'joi';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook } from 'react-icons/im';
import { errorToast, successToast } from '../helpers/generateToast';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailValid: undefined,
      emailValidationMessage: '',
      isPasswordValid: undefined,
      passwordValidationMessage: '',
      wait: false,
      success: false,
      error: false,
      responseMessage: 'Signing in . . .',
      verify: '',
    };
  }
  isFormSubmitted = false;
  loginSubmit = async (event) => {
    event.preventDefault();
    try {
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      let raw = JSON.stringify({
        email: event.target['email'].value,
        password: event.target['password'].value,
      });

      let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      this.setState({ wait: true });
      toast('Signing in . . .', { position: toast.POSITION.TOP_CENTER });
      let result = await fetch(
        `${process.env.BASE_BACKEND_SERVER_URL}/auth/signin`,
        requestOptions
      ).then((response) => response.json());
      this.setState({ responseMessage: result.message });
      toast.dismiss();
      if (result.status == 200) {
        toast.success('Logged in successfully!', {
          position: toast.POSITION.TOP_CENTER,
        });
        // await new Promise(resolve => setTimeout(resolve, 1500));
        this.isFormSubmitted = true;
        this.setState({ success: true });
        this.props.LOGIN(result.data);
        window.localStorage.setItem('auth-token', result.data);
      } else {
        this.setState({ error: true });
        toast.error(this.state.responseMessage, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      toast.error(`Error: ${error}`, { position: toast.POSITION.TOP_CENTER });
    }
  };
  validateEmail = async (emailAddress) => {
    const validator = Joi.string()
      .required()
      .email({ tlds: { allow: false } });
    const { error } = await validator.validate(emailAddress);
    if (error) {
      this.setState({ isEmailValid: false });
      this.setState({
        emailValidationMessage: error.details[0].message
          .replace(/[/"'`]+/g, '')
          .replace('value', 'Input'),
      });
    } else {
      this.setState({ isEmailValid: true });
      this.setState({ emailValidationMessage: '' });
    }
  };
  validatePassword = async (password) => {
    const validator = Joi.string().required();
    const { error } = await validator.validate(password);
    if (error) {
      this.setState({ isPasswordValid: false });
      this.setState({
        passwordValidationMessage: error.details[0].message
          .replace(/[/"'`]+/g, '')
          .replace('value', 'Input'),
      });
    } else {
      this.setState({ isPasswordValid: true });
      this.setState({ passwordValidationMessage: '' });
    }
  };
  componentDidMount() {
    this.props.LOGOUT();
    if (window.localStorage.getItem('auth-token')) {
      window.localStorage.removeItem('auth-token');
    }
  }
  socialImageStyle = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'auto',
  };
  inputSuccessStyle = {
    border: '3px solid lightgreen',
  };
  inputErrorStyle = {
    border: '2px solid red',
  };

  render() {
    let { message_success } = this.props.alert;
    return (
      <div className="formBody">
        {this.isFormSubmitted && <Navigate to="/dashboard" replace={true} />}
        <div className="container d-flex justify-content-center">
          {
            <div className="col-md-8 formWhite">
              <ToastContainer />
              <div>
                {message_success ? (
                  <p>{'Account created, Now verify email!'}</p>
                ) : (
                  ''
                )}
              </div>

              <div className="row d-flex justify-content-center">
                <div className="col-xs-12 col-md-8">
                  <h2 className="header1">Sign in </h2>
                  <form
                    data-testid="login-form"
                    id="login-form"
                    className="form-login"
                    onSubmit={async (event) => await this.loginSubmit(event)}
                  >
                    <input
                      data-testid="login-email"
                      type="text"
                      name="email"
                      placeholder="Email"
                      className="field input-login"
                      onBlur={async (event) =>
                        await this.validateEmail(event.target.value)
                      }
                      style={
                        this.state.isEmailValid == true
                          ? this.inputSuccessStyle
                          : this.state.isEmailValid == false
                          ? this.inputErrorStyle
                          : {}
                      }
                    ></input>
                    <div className="redErrorMessage">
                      {this.state.emailValidationMessage}
                    </div>
                    <input
                      data-testid="login-password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="field input-login"
                      onBlur={async (event) =>
                        await this.validatePassword(event.target.value)
                      }
                      style={
                        this.state.isPasswordValid == true
                          ? this.inputSuccessStyle
                          : this.state.isPasswordValid == false
                          ? this.inputErrorStyle
                          : {}
                      }
                    ></input>
                    <div className="redErrorMessage">
                      {this.state.passwordValidationMessage}
                    </div>
                    <button
                      data-testid="login-submit"
                      type={
                        this.state.isEmailValid == true &&
                        this.state.isPasswordValid == true
                          ? 'submit'
                          : ''
                      }
                      value="login"
                      className="btn"
                      disabled={
                        !(
                          this.state.isEmailValid == true &&
                          this.state.isPasswordValid == true
                        )
                      }
                    >
                      Sign in
                    </button>
                  </form>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-xs-12">
                  <h5 className="header5">_________</h5>
                </div>
                <div className="col-xs-12 col-md-8">
                  <h5 className="header5">Or Sign in with:</h5>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: '10px',
                }}
              >
                <div style={{ paddingRight: '20px' }}>
                  <a
                    href={`${process.env.BASE_BACKEND_SERVER_URL}oauth/google`}
                  >
                    <FcGoogle style={{ fontSize: '40px', cursor: 'pointer' }} />
                  </a>
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  <a
                    href={`${process.env.BASE_BACKEND_SERVER_URL}/oauth/facebook`}
                  >
                    <ImFacebook
                      style={{
                        fontSize: '35px',
                        cursor: 'pointer',
                      }}
                    />
                  </a>
                </div>
              </div>
              <div className="row d-flex justify-content-center">
                <div className="col-xs-12 col-md-8">
                  <div className="pass-link">
                    <Link to="/recover">Lost your password?</Link>
                  </div>
                  <div className="pass-link">
                    <p>
                      Don't have an account?{' '}
                      <Link to="/register">Register</Link>
                    </p>
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

const mapStateToProps = (state) => ({
  token: state.auth.token,
  alert: state.alert,
});
const { login: LOGIN, logout: LOGOUT } = authActions;
export default connect(mapStateToProps, { LOGIN, LOGOUT })(LoginForm);
