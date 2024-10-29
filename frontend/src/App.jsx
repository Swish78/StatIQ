import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import UserRegistration from './UserRegistration';
import OTPVerify from './OTPVerify';
import ProfileUpdate from './ProfileUpdate';
import Login from "./Login.jsx";

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<UserRegistration />} />
                <Route path="/login" element={<Login/>} />
                <Route path="/otp" element={<OTPVerify />} />
                <Route path="/profile" element={<ProfileUpdate />} />
            </Routes>
            {/*<Footer />*/}
        </Router>
    );
};

export default App;
