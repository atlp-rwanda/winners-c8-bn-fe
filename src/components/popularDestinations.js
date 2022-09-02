import React, { Component } from 'react';
import { connect } from 'react-redux';
import StatsCard from './dashboardElements/statsCard';
import * as PopularDestinationsActions from '../redux/actions/popularDestinationsActions';
import '../../public/styles/DashBoard/index.scss';
import '../../public/styles/Home/popularDestinations.scss';

class PopularDestinations extends Component {
  componentDidMount() {
    this.props.fetchPopularDestinations();
  }

  render() {
    const { data, isSuccess } = this.props.state;

    const cards = data.map((destination, index) => {
      return (
        <StatsCard
          key={index}
          data={{
            title: destination.Locations[0].city,
            content: destination.visitCount,
          }}
        />
      );
    });

    return (
      <div data-testid="popular-destinations" className="popular-destinations">
        <header>
          <h1>Top Destionations for you</h1>
          <span>
            Much places sweets your mind. Explore some where interesting and
            enjoy the vibe
          </span>
        </header>
        <div className="stats-grid">{cards}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    state: {
      data: state.PopularDestinations.data,
      isSuccess: state.PopularDestinations.isSuccess,
    },
  };
};

const { fetchPopularDestinations } = PopularDestinationsActions;
export default connect(mapStateToProps, { fetchPopularDestinations })(
  PopularDestinations
);
