import React from 'react';
import { connect } from 'react-redux';
import '../../public/styles/Home/index.scss';
import PageHeader from './Home/PageHeader';
import ServicesGrid from './Home/ServicesGrid';
import QuickChat from './Home/QuickChat';
import Partners from './Home/Partners';
import PopularDestinations from './popularDestinations';

const Home = (props) => {
  return (
    <div className="home-component">
      <PageHeader />
      <ServicesGrid />
      <PopularDestinations />
      <QuickChat />
      <Partners />
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});
export default connect(mapStateToProps)(Home);
