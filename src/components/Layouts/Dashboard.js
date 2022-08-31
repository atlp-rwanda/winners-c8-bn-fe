import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import authActions from '../../redux/actions/authActions';
import {
  addNotification,
  fetchNotifications,
} from '../../redux/actions/notificationActions';
import { fetchUserProfile } from '../../redux/actions/userProfileAction';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import useSocket from '../../hooks/useSocket';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { socket, onlineStatus } = useSocket();
  console.log(socket, onlineStatus);
  const { notifications, user, unreadNotifications } = useSelector(
    ({
      notification: { notifications, unreadNotifications },
      userProfile: { user },
    }) => ({
      notifications,
      unreadNotifications,
      user,
    })
  );
  useEffect(() => {
    if (!dispatch(authActions.isLoggedIn())) navigate('/login');
    fetchUserProfile()(dispatch);
    dispatch(fetchNotifications());
  }, []);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar
          notifications={notifications}
          unreadNotifications={unreadNotifications}
          user={user?.user}
          socket={socket}
          onlineStatus={onlineStatus}
        />
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
