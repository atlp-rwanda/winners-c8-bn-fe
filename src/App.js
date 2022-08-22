import React from 'react';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import UserRegisterForm from './components/RegisterForm';
import RecoveryForm from './components/recoveryForm';
import ResetForm from './components/resetForm';
import LoginForm from './components/LoginForm';
import Userprofile from './components/UserProfile/UserProfile';
import Request from './pages/Request';
import Comments from './pages/Comments';
import Dashboard from './components/Dashboard';
import NotFound from './components/NotFound';
import UserRoleDash from "./components/AssignRole/UserRoleDash"
import { ToastContainer } from 'react-toastify';
import DashboardLayout from './components/Layouts/Dashboard';
import HomePageLayout from './components/Layouts/Home';

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
            <Route path="trips/trip" element={<Comments />} />
          <Route exact path='assignRole' element={<UserRoleDash />} />
            <Route exact path="userprofile" element={<Userprofile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route exact path="*" element={<NotFound />} />
        </Routes>
      </div>
      {/* <SocialAuth /> */}
    </div>
  );
};

export default App;
