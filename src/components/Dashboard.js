import React from "react";
import { connect } from "react-redux";
import "../../public/styles/DashBoard/index.scss";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import StatsChart from "./Dashboard/statsChart.js";
import StatsGrid from "./Dashboard/statsGrid.js";
import TimeFrame from "./Dashboard/TimeFrame.js";

const Dashboard = (props) => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="main">
          <TimeFrame />
          <StatsGrid />
          <div className="trips-chart">
            <header className="chart-header">TRIP REQUESTS STATS</header>
            <div className="chart-container">
              <StatsChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  selectedOption: state.tripStats.selected,
});
export default connect(mapStateToProps)(Dashboard);
// export default Dashboard;
