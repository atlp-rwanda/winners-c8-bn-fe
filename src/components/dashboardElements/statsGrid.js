import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatsCard from './statsCard';
import * as statsAction from '../../redux/actions/tripStatsActions';
import Loader from '../Loader';

class StatsGrid extends Component {
  componentDidMount() {
    this.props.getTripStats(this.props.selectedOption);
  }

  render() {
    const data = this.props.tripStats;
    const { isLoading, isLoaded } = this.props;
    if (isLoading) return <Loader />;
    if (!isLoaded || !data) return null;

    const keys = ['Approved', 'Rejected', 'pending'];

    keys.forEach((key) => {
      if (data[key] === undefined) {
        data[key] = 0;
      }
    });
    const cards = Object.keys(data).map((key) => (
      <StatsCard
        key={key}
        data={{ title: key.toLocaleLowerCase(), content: data[key] }}
      />
    ));

    return <div className="stats-grid">{cards}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    tripStats: state.tripStats.stats,
    selectedOption: state.tripStats.selected,
    period: state.tripStats.period,
    isLoaded: state.tripStats.isLoaded,
    isLoading: state.tripStats.isLoading,
  };
};

const { getTripStats, changeOption, changePeriod } = statsAction;

export default connect(mapStateToProps, {
  getTripStats,
  changeOption,
  changePeriod,
})(StatsGrid);
