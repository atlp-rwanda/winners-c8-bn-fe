import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';

const HomePageLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePageLayout;
