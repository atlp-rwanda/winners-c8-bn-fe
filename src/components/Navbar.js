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
    padding: "10px 50px 10px 50px",
  }
  return (
    <nav className="navbar">
      <a className="navbar-brand">
        <img src={bnLogo} style={logoStyle}/>
      </a>
      <span className="links">
        <Link to="/" style={(props.currentPage == "HOME")? buttonCSS : buttonSelectedCSS} onClick={(event) => props.SET_PAGE("HOME")}>Home</Link>
        <Link to="login" style={(props.currentPage == "LOGIN_FORM")? buttonCSS : buttonSelectedCSS} onClick={(event) => props.SET_PAGE("LOGIN_FORM")}>{(props.token=="")? "Login" : "Logout"}</Link>
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