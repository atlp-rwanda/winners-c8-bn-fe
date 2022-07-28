import React from "react";
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import UserProfile from "./components/UserProfile/UserProfile"

const App = () => {
  return (
      <div className="App">
        <div className="content">
          <Routes>

            <Route exact path="/" element={<Home />} />
              
            <Route exact path="login" element={<LoginForm />} />

            <Route exact path="userprofile" element={<UserProfile />} />
              
          </Routes>
        </div>
      </div>
  );
};

export default App; 