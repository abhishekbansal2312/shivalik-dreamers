import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const navigate = useNavigate();

    // Fetch user profile function
    const fetchUserProfile = async () => {
        try {
            const token = Cookies.get('authtoken');
            if (!token) {
                setError('No token found, please log in.');
                navigate('/login');
                return;
            }

            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const { id } = tokenPayload;

            const response = await fetch(`http://localhost:4600/api/users/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
            setUser(data);
            setLoading(false);
        } catch (err) {
            setError(err.message || 'An error occurred');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, [navigate]);

    const handleEdit = () => {
        setEditMode(true);
        setUpdatedUser(user); // Pre-fill the form with current data
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({
            ...updatedUser,
            [name]: value,
        });
    };

    const handleUpdate = async () => {
        try {
            const token = Cookies.get('authtoken');
            if (!token) {
                setError('No token found, please log in.');
                navigate('/login');
                return;
            }

            const tokenPayload = JSON.parse(atob(token.split('.')[1]));
            const { id } = tokenPayload;

            const response = await fetch(`http://localhost:4600/api/users/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            // After updating, fetch the updated profile again
            await fetchUserProfile();
            setEditMode(false); // Exit edit mode
        } catch (err) {
            setError(err.message || 'An error occurred');
        }
    };

    // Function to generate initials from user's name
    const getInitials = (name) => {
        if (!name) return '';
        const nameArray = name.split(' ');
        const initials = nameArray.map((word) => word.charAt(0).toUpperCase()).join('');
        return initials;
    };

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex justify-center items-center p-4">
            {/* Full-screen flex container to center the card */}
            <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 max-w-lg mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-4xl font-bold text-center text-indigo-900 mb-6">Your Profile</h2>

                {/* Profile Picture or Initials */}
                <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-semibold">
                        {user ? getInitials(user.name) : 'N/A'}
                    </div>
                </div>

                {user && !editMode && (
                    <div className="space-y-6">
                        <div className="text-xl text-gray-700">
                            <strong className="font-semibold">Student ID:</strong> {user.studentId}
                        </div>
                        <div className="text-xl text-gray-700">
                            <strong className="font-semibold">Name:</strong> {user.name}
                        </div>
                        <div className="text-xl text-gray-700">
                            <strong className="font-semibold">Email:</strong> {user.email}
                        </div>
                        <div className="text-xl text-gray-700">
                            <strong className="font-semibold">Role:</strong> {user.role}
                        </div>

                        <button
                            onClick={handleEdit}
                            className="w-full py-2 bg-blue-600 text-white rounded-full shadow-md transition duration-300"
                        >
                            Edit Profile
                        </button>
                    </div>
                )}

                {editMode && (
                    <div className="space-y-6">
                        <div>
                            <label className="text-lg text-gray-700">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={updatedUser.name || ''}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-lg text-gray-700">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={updatedUser.email || ''}
                                onChange={handleChange}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <button
                            onClick={handleUpdate}
                            className="w-full py-2 bg-green-600 text-white rounded-full shadow-md transition duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
