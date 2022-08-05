import React from "react";
// import Navbar from './components/Navbar';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from "./components/Dashboard";
import Userprofile from "./components/UserProfile/UserProfile"

const App = () => {
  return (
      <div className="App">
        {/* <Navbar /> */}
        <div className="content">
          <Routes>

            <Route exact path="/" element={<Home />} />
              
            <Route exact path="/login" element={<LoginForm />} />
            
            <Route exact path="/dashboard" element={<Dashboard />} />

            <Route exact path="/userprofile" element={<Userprofile/>} />
              
          </Routes>
        </div>
      </div>
  );
};

export default App; 