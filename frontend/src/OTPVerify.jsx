import React, { useState } from 'react';
import axios from 'axios';

const OTPVerify = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/otp/verify/', { otp });
            alert('OTP verified successfully! You are now logged in.');
            // Redirect or navigate to the profile or home page
        } catch (error) {
            console.error('OTP verification failed', error);
            setError('Invalid OTP. Please try again.');
        }
    };

    return (
        <div className="container mx-auto my-10">
            <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
            <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg shadow-md">
                <input
                    type="text"
                    placeholder="Enter your OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="block w-full p-2 mb-4 border border-gray-400 rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Verify OTP
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default OTPVerify;
