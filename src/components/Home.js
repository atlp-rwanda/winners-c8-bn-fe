import React from "react";
import { connect } from "react-redux";
import "../../public/styles/Home/index.scss";
import PopularDestinations from "./popularDestinations";

const Home = (props) => {
  return (
    <div className="home-component">
      <h2>Welcome to Barefoot Nomad App!</h2>
      <br></br>
      <h3>
        {props.token == ""
          ? "You are not logged in"
          : "You are logged in with this token:"}
      </h3>
      <pre>{props.token}</pre>
      <PopularDestinations />
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});
export default connect(mapStateToProps)(Home);
