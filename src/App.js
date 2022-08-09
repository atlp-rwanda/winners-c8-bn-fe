import React from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResetForm from './components/resetForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import Request from './pages/Request';
import RecoveryForm from './components/recoveryForm';

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<LoginForm />} />
          <Route exact path="request" element={<Request />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="recover" element={<RecoveryForm />} />
          <Route exact path="reset" element={<ResetForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
