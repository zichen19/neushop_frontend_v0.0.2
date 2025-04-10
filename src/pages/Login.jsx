import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState(''); // ✅ added state for user ID
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const baseUrl = "https://db-group5-452710.wl.r.appspot.com";

    try {
      await login(username, password); // ✅ login still checks credentials only
      console.log("Using user ID:", userId);

      const checkAdmin = await fetch(`${baseUrl}/admin/${userId}`);
      if (checkAdmin.ok) {
        console.log("✅ Admin role detected. Navigating to admin dashboard...");
        navigate('/admin-dashboard');
        return;
      }


      const checkSeller = await fetch(`${baseUrl}/seller/${userId}`);
      if (checkSeller.ok) {
        console.log("✅ Seller role detected. Navigating to seller dashboard...");
        navigate('/seller-dashboard');
        return;
      }

      const checkCustomer = await fetch(`${baseUrl}/customer/${userId}`);
      if (checkCustomer.ok) {
        console.log("✅ Customer role detected. Navigating to profile...");
        navigate('/profile'); // or /customer-dashboard
        return;
      }

      setError('User role not found. Please contact admin.');
    } catch (err) {
      console.error(err);
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">
            User ID (e.g., U3)
          </label>
          <input
            type="text"
            id="userId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
          <Link
            to="/register"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
