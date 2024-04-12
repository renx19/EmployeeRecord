import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false); // Track login status

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check if the password meets the minimum length requirement
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return; // Exit early if password is too short
    }

    try {
      const response = await axios.post('https://employeerecordcrud.onrender.com/login', formData);
      console.log('Login Successful:', response.data);
      // Set loggedIn to true upon successful login
      setLoggedIn(true);
    } catch (error) {
      console.error('Login Error:', error);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  if (loggedIn) {
    // Redirect to home page if logged in
    return <Navigate to="/home" />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="text-red-500 mb-4">{error}</div>} {/* Display error message */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter your email" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-4 text-center">
        <span className="text-gray-600 block mx-auto"> Don't have an account?</span>
          <Link to="/register" className="text-blue-500 hover:underline"> Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
