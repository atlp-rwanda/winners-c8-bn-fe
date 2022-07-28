import React from "react";
import Navbar from './components/Navbar';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SocialAuth from "./components/SocialOAuth";
import './social.css'


const App = () => {
  return (
		<div className='App'>
			<Navbar />
			<div className='content'>
				<Routes>
					<Route exact path='/' element={<Home />} />

					<Route exact path='login' element={<LoginForm />} />
				</Routes>
			</div>
			<SocialAuth/>
		</div>
  );
};

export default App; 