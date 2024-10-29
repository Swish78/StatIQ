import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfileUpdate = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch user profile data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/profile/update'); // Adjust the API endpoint as necessary
                setFormData(response.data); // Ensure response data matches your expected structure
                setLoading(false);
            } catch (err) {
                setError('Failed to load profile data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put('/api/profile/update/', formData); // Adjust the API endpoint as necessary
            alert('Profile updated successfully!');
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    if (loading) {
        return <div>Loading...</div>; // You might want to use a spinner or loader component
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Update Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="first_name">First Name</label>
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={formData.first_name || ''} // Safeguard against undefined
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="last_name">Last Name</label>
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={formData.last_name || ''} // Safeguard against undefined
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ''} // Safeguard against undefined
                        onChange={handleChange}
                        className="border rounded p-2 w-full"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default ProfileUpdate;
