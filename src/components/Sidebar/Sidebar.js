import React from 'react';
import './sidebar.scss';
import logo from '../../../public/images/navbar/logo.png';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import StoreIcon from '@mui/icons-material/Store';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <img src={logo} alt="logo barefoot" className="logo" width={100} />
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/dashboard" style={{ textDecoration: 'none' }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <p className="title">PAGES</p>
          <Link to="/dashboard/accommodations" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Create locat&accom</span>
            </li>
          </Link>
          <Link to="/dashboard/assignRole" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Assign Roles</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Assign Managers</span>
          </li>
          <p className="title"></p>
          <Link to="/dashboard/trips" style={{ textDecoration: 'none' }}>
            <li>
              <InsertChartIcon className="icon" />
              <span>Trips</span>
            </li>
          </Link>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Widgets</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Maps</span>
          </li>
          <p className="title">SOCIAL</p>
          <li>
            <SettingsSystemDaydreamOutlinedIcon className="icon" />
            <span>Notifications</span>
          </li>
          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Chatting</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <p className="title">GENERAL</p>
          <Link to="/dashboard/userprofile" style={{ textDecoration: 'none' }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Profile</span>
            </li>
          </Link>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
