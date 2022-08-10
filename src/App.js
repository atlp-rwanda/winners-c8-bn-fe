import React from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import UserRegisterForm from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import CreateAccomodation from "./components/CreateAccomodation"
import RecoveryForm from "./components/recoveryForm";
import ResetForm from "./components/resetForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Routes>

          <Route exact path="/" element={<Home />} />

          <Route exact path="/login" element={<LoginForm />} />
          
          <Route exact path="/register" element={<UserRegisterForm />} />
          
          <Route exact path="/dashboard" element={<Dashboard />} />

          <Route exact path="recover" element={<RecoveryForm />} />
          <Route exact path="/createAccomodation" element={<CreateAccomodation />} />

          <Route exact path="reset" element={<ResetForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
