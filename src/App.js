import React from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetForm from './components/resetForm';
import LoginForm from './components/LoginForm';
import Request from './pages/Request';
import RecoveryForm from './components/recoveryForm';
import Userprofile from './components/UserProfile/UserProfile';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="request" element={<Request />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="recover" element={<RecoveryForm />} />
          <Route exact path="reset" element={<ResetForm />} />

          <Route exact path="userprofile" element={<Userprofile />} />

          <Route exact path="dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
