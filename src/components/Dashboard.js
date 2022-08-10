import React from "react";
import { connect } from "react-redux";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

const Dashboard = (props) => {
  return (
<<<<<<< HEAD
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="main">
          <h2 style={{color:"brown"}}><strong>This Is The DASHBOARD!</strong></h2>
          <br></br>
          <h3>{(props.token=="")? "--- Not logged in ---" : "You are logged in with this token:"}</h3>
          <pre style={{width:"70%"}}>{props.token}</pre>
          </div>

      </div>
=======
    <div>
      <h2 style={{color:"brown"}}><strong>This Is The DASHBOARD!</strong></h2>
      <br></br>
      <h3>{!localStorage.getItem('auth-token') ? "--- Not logged in ---" : "You are logged in with this token:"}</h3>
      <pre style={{width:"70%"}}>{localStorage.getItem('auth-token')}</pre>
>>>>>>> ce28806d4ca01cfdca8d3980d9f6ecfec37dc44c
    </div>
  );
}
 
const mapStateToProps = state => ({
  token: state.auth.token
});
export default connect(
  mapStateToProps
)(Dashboard);
// export default Dashboard;
