import React from 'react';
import Home from './components/Home';
import Accommodation from './components/ListAccomodations/Accomodations';
import { Route, Routes } from 'react-router-dom';
import UserRegisterForm from './components/RegisterForm';
import RecoveryForm from './components/recoveryForm';
import ResetForm from './components/resetForm';
import LoginForm from './components/LoginForm';
import Userprofile from './components/UserProfile/UserProfile';
import Request from './pages/Request';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import UserRoleDash from './components/AssignRole/UserRoleDash';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import DashboardLayout from './components/Layouts/Dashboard';
import SocialAuth from './components/SocialOAuth';
import HomePageLayout from './components/Layouts/Home';
import '../public/styles/App.scss';
import ChatPage from "./components/Chat/ChatPage";

const App = () => {
  return (
    <div className="App">
      <ToastContainer />
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePageLayout />}>
            <Route exact path="login" element={<LoginForm />} />
            <Route index element={<Home />} />
            <Route exact path="register" element={<UserRegisterForm />} />
            <Route exact path="recover" element={<RecoveryForm />} />
            <Route exact path="reset" element={<ResetForm />} />
          </Route>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route exact index element={<Dashboard />} />
            <Route path="trips" element={<Request />} />
            <Route exact path="assignRole" element={<UserRoleDash />} />
            <Route exact path="userprofile" element={<Userprofile />} />
            <Route exact path="chat" element={< ChatPage/>} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route exact path="*" element={<NotFound />} />
          <Route
            exact
            path="/dashboard/accommodations"
            element={<Accommodation />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
