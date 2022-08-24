import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import '../../public/styles/RegisterForm/index.css';
import { connect } from 'react-redux';
import { userActions } from '../redux/actions/registerActions';
import { errorToast, successToast } from '../helpers/generateToast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { ImFacebook } from 'react-icons/im';

class UserRegisterForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confPassword: '',
      },
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  registering = this.props.registration;
  handleChange(event) {
    /* istanbul ignore next */
    this.props.alert.message_error = '';
    this.props.alert.message_success = '';
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      ...this.state,
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    // this.setState({ submitted: true});
    const { user } = this.state;

    if (
      user.firstName &&
      user.lastName &&
      user.email &&
      user.password &&
      user.confPassword
    ) {
      if (user.confPassword === user.password) {
        this.props.register(user);

        // this.setState ({
        //     user: {
        //         firstName: '',
        //         lastName: '',
        //         email: '',
        //         password: '',
        //         confPassword: ''
        //     },
        //     submitted: false
        // });
      } else {
        errorToast('Passwords need to be the same!');
      }
    } else {
      errorToast('All fields are required!');
    }
  }

  render() {
    const { registering } = this.props.registration;
    const { user, submitted } = this.state;
    let { message_error, message_success } = this.props.alert;

    return (
      <div className="register-section pt-100 pb-100 md-pt-80 md-pb-80">
        {this.submitted && (
          <Navigate to="/login" replace={true} message="Registration ok" />
        )}

        <div>
          <>
            <ToastContainer></ToastContainer>
          </>
        </div>

        <div className="registration">
          <div className="register-box">
            <div className="sec-title text-center mb-30">
              <h5 className="title 200 mb-10">Create New Account.</h5>
            </div>
            {message_error && <p>{errorToast(message_error)}</p>}
            {message_success && (
              <p>
                {successToast(message_success)}
                {(this.submitted = true)}
              </p>
            )}
            <div className="styled-form">
              <div id="form-messages"></div>
              <form
                id="register-form"
                method="post"
                onSubmit={this.handleSubmit}
              >
                <div className="row clearfix">
                  <div className="form-group col-lg-12 mb-25">
                    <input
                      type="text"
                      id="Name"
                      name="firstName"
                      className="field"
                      value={user.firstName}
                      onChange={this.handleChange}
                      placeholder="First Name"
                    />
                  </div>
                  <div className="form-group col-lg-12">
                    <input
                      type="text"
                      id="last"
                      name="lastName"
                      className="field"
                      value={user.lastName}
                      onChange={this.handleChange}
                      placeholder="Last Name"
                    />
                  </div>
                  <div className="form-group col-lg-12">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="field"
                      value={user.email}
                      onChange={this.handleChange}
                      placeholder="Email address"
                    />
                  </div>
                  <div className="form-group col-lg-12">
                    <input
                      type="password"
                      id="puser"
                      name="password"
                      className="field"
                      value={user.password}
                      onChange={this.handleChange}
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group col-lg-12">
                    <input
                      type="password"
                      id="Confirm"
                      name="confPassword"
                      className="field"
                      value={user.confPassword}
                      onChange={this.handleChange}
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="form-group col-lg-12 col-md-12 col-sm-12 text-center">
                    {registering && (
                      <div>
                        <input
                          value="Registering..."
                          className="btn"
                          disabled
                        ></input>
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                      </div>
                    )}
                    {!registering && (
                      <div>
                        <input
                          type="submit"
                          value="Sign Up"
                          className="btn"
                        ></input>
                      </div>
                    )}
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-xs-12">
                      <h5 className="header5">_________</h5>
                    </div>
                    <div className="col-xs-12 col-md-8">
                      <h5 className="header5">Or Sign Up with:</h5>
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
                      <a href="https://winners-c8-bn-be-staging.herokuapp.com/api/oauth/google">
                        <FcGoogle
                          style={{
                            fontSize: '40px',
                            cursor: 'pointer',
                          }}
                        />
                      </a>
                    </div>
                    <div style={{ paddingLeft: '20px' }}>
                      <a href="https://winners-c8-bn-be-staging.herokuapp.com/api/oauth/facebook">
                        <ImFacebook
                          style={{
                            fontSize: '35px',
                            cursor: 'pointer',
                          }}
                        />
                      </a>
                    </div>
                  </div>

                  <div className="form-group col-lg-12 col-md-12 col-sm-12">
                    <div className="notify">
                      Already have an account? <Link to="/login">Sign In</Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { registration, error } = state.registration;

  return { registration: state.registration, alert: state.alert };
}

const actionCreators = {
  register: userActions.register,
};

export default connect(mapState, actionCreators)(UserRegisterForm);
