import React from "react";
import { connect } from "react-redux";

const Home = (props) => {
  return (
    <div>
      <h2>Welcome to Barefoot Nomad App!</h2>
      <br></br>
      <h5>{(props.token=="")? "You are not logged in" : "You are logged in with this token:"}</h5>
      <pre>{props.token}</pre>
    </div>
  );
}
 
const mapStateToProps = state => ({
  token: state.auth.token
});
export default connect(
  mapStateToProps
)(Home);
// export default Home;
