import React from "react";
import { Link } from "react-router-dom";
import "../../public/styles/navbar/index.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Barefoot Nomad</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="login" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Login</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;