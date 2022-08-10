import React from "react";
import { connect } from "react-redux";

const Dashboard = (props) => {
  return (
    <div>
      <h2 style={{color:"brown"}}><strong>This Is The DASHBOARD!</strong></h2>
      <br></br>
      <h3>{!localStorage.getItem('auth-token') ? "--- Not logged in ---" : "You are logged in with this token:"}</h3>
      <pre style={{width:"70%"}}>{localStorage.getItem('auth-token')}</pre>
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
