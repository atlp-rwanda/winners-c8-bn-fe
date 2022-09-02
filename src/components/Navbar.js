import React from 'react';
import { Link } from 'react-router-dom';
// import '../../public/styles/navbar/index.css';
import '../../public/styles/Home/navbar.scss';
import { connect } from 'react-redux';
import navbarActions from '../redux/actions/navbarActions';
import logo from '../../public/images/logo.png';

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="logo" />
      </div>

      <div className="navbar-options">
        {props.token !== '' ? (
          <ul>
            <li>
              <a href="/" className="navbar-link">
                Home
              </a>
            </li>
            <li>
              <a href="/dashboard" className="navbar-link">
                Dashboard
              </a>
            </li>

            <li>
              <Link
                to="login"
                className="navbar-link"
                data-testid="login-btn-1"
                onClick={(event) => props.SET_PAGE('LOGIN_FORM')}
              >
                {props.token == '' ? 'Login' : 'Logout'}
              </Link>
            </li>
          </ul>
        ) : (
          <a className="navbar-btn" href="/register">
            Sign Up
          </a>
        )}
      </div>
    </nav>
  );
};
const mapStateToProps = (state) => ({
  currentPage: state.navbar.currentPage,
  token: state.auth.token,
});
const { setPage: SET_PAGE } = navbarActions;
export default connect(mapStateToProps, { SET_PAGE })(Navbar);
