import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setUpdatedUser({ ...user }); // Initialize updatedUser with current user data
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.put(`https://db-group5-452710.wl.r.appspot.com/users/${user.user_id}`, updatedUser); // Replace with your update user API endpoint
      // Update user context or refetch user data to reflect changes
      logout(); // Temporary solution: Force logout to refresh user data
      navigate('/login'); // Redirect to login to force refresh
    } catch (err) {
      setError(err.message || 'Could not update profile.');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {editing ? (
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={updatedUser.username}
              onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={updatedUser.email}
              onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
              required
            />
          </div>
          {/* Add other fields as needed (e.g., password) */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Add other user details here */}
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;