/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import "../../public/styles/navbar/index.css";
import { connect } from "react-redux";
import navbarActions from "../redux/actions/navbarActions";
import bnLogo from "../../public/images/navbar/logo.png"

const Navbar = (props) => {
  const buttonSelectedCSS ={ 
    color: 'white', 
    backgroundColor: '#3498DB',
    borderRadius: '8px' 
  };
  const buttonCSS ={};
  const logoStyle={
    padding: "0.5ex 50px 0.5ex 50px",
    width: "18ex"
  }
  const hideMenuStyle = {
    display: "none"
  }
  return (
    <nav className="navbar">
      <a className="navbar-brand">
        <img src={bnLogo} style={logoStyle}/>
      </a>
      <span className="links" style={(props.currentPage=="LOGIN_FORM")? hideMenuStyle : {}}>
        <Link to="/" style={buttonCSS} onClick={(event) => props.SET_PAGE("HOME")}>Home</Link>
        <Link to="login" data-testid="login-btn-1" style={buttonSelectedCSS} onClick={(event) => props.SET_PAGE("LOGIN_FORM")}>{(props.token=="")? "Login" : "Logout"}</Link>
      </span>
    </nav>
  );
}
const mapStateToProps = state => ({
  currentPage: state.navbar.currentPage,
  token: state.auth.token
});
const {setPage: SET_PAGE} = navbarActions;
export default connect(
  mapStateToProps,
  {SET_PAGE} 
)(Navbar); 
// export default Navbar;