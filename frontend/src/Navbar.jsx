import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/profile');
            if (response.status === 200) {
                setIsAuthenticated(true);
                setUser(response.data.user);
            }
        } catch (error) {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('/logout/', { refresh: localStorage.getItem('refreshToken') });
            localStorage.removeItem('refreshToken'); // Remove token from local storage
            setIsAuthenticated(false);
            setUser(null);
        } catch (error) {
            console.error('Logout failed', error);
        }
    };


    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-lg font-bold">StatIQ</h1>
                <div>
                    <Link className="text-white px-4" to="/">Home</Link>
                    <Link className="text-white px-4" to="/about">About</Link>
                    {isAuthenticated ? (
                        <>
                            <Link className="text-white px-4" to="/profile">Profile</Link>
                            <button onClick={handleLogout} className="text-white px-4">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link className="text-white px-4" to="/login">Login</Link>
                            <Link className="text-white px-4" to="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
