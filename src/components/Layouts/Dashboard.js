import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import authActions from '../../redux/actions/authActions';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/actions/userProfileAction';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => {
    return {
      user: state.userProfile?.user.user,
    };
  });
  useEffect(() => {
    fetchUserProfile()(dispatch);
    if (!dispatch(authActions.isLoggedIn())) navigate('/login');
  }, []);
  return (
    <div className="home">
      <Sidebar user={user} />
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
