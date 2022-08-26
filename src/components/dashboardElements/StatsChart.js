import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as statsAction from '../../redux/actions/tripStatsActions';
import Loader from '../Loader';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  BarElement,
  Tooltip,
  Legend
);

class StatsChart extends Component {
  componentDidMount() {
    this.props.getChartStats();
  }

  render() {
    const { isLoading, isLoaded, chartStats } = this.props;

    if (isLoading) return <Loader />;
    if (!isLoaded || !chartStats) return null;

    const dataSets = {
      approved: [],
      rejected: [],
      pending: [],
    };
    console.log('fe', chartStats);
    chartStats.forEach((element) => {
      Object.keys(dataSets).forEach((key) => {
        if (element) {
          if (element[key]) {
            dataSets[key].push(element[key]);
          } else {
            dataSets[key].push(0);
          }
        }
      });
    });
    console.log('data', dataSets);

    const data = {
      labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],

      datasets: [
        {
          label: 'Pending',
          data: dataSets.pending,
          borderRadius: 9,
          backgroundColor: '#284046',
          borderColor: '#284046',
        },
        {
          label: 'Approved',
          data: dataSets.approved,
          borderRadius: 9,
          backgroundColor: '#7DCFBF',
          borderColor: '#7DCFBF',
        },
        {
          label: 'Rejected',
          data: dataSets.rejected,
          backgroundColor: '#A5C9CA',
          borderColor: '#A5C9CA',
          borderRadius: 9,
        },
      ],
    };

    const options = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        display: true,
      },
    };

    return <Line data={data} options={options} data-testid="stats-chart" />;
  }
}

const mapStateToProps = ({ chartTripStats }) => {
  return {
    chartStats: chartTripStats.chartStats,
    isLoaded: chartTripStats.isLoaded,
    isLoading: chartTripStats.isLoading,
  };
};

const { getChartStats } = statsAction;

export default connect(mapStateToProps, { getChartStats })(StatsChart);
