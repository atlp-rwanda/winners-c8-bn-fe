import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import authActions from '../../redux/actions/authActions';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!dispatch(authActions.isLoggedIn())) navigate('/login');
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div
          style={{
            padding: '50px 10px 50px',
            overflow: 'scroll',
            maxHeight: '100vh',
          }}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
