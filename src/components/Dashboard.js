import React from 'react';
import { connect } from 'react-redux';
import '../../public/styles/DashBoard/index.scss';
import StatsGrid from './dashboardElements/statsGrid.js';
import TimeFrame from './dashboardElements/TimeFrame.js';
import StatsChart from './dashboardElements/StatsChart';

const Dashboard = (props) => {
  return (
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
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
  selectedOption: state.tripStats.selected,
});
export default connect(mapStateToProps)(Dashboard);
// export default Dashboard;
