import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from "../axiosconfig.js"; // Your configured axios instance

function Login() {
  const navigate = useNavigate();

  // 1. Correct formData for Login: only email and password
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState(null); // { text: '', type: 'success' | 'error' }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setMessage(null); // Clear any previous messages
    setLoading(true); // Set loading to true

    try {
      // Send POST request to backend for login
      const response = await axios.post(
        '/user/login', // Ensure this matches your backend login endpoint
        formData // Send only email and password
      );

      console.log('Login success response:', response.data);

      // --- IMPORTANT: Store the token ---
      // Assume your backend sends the token as response.data.token
      // And the message as response.data.msg
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', token); // Store the token in localStorage
        console.log('Authentication Token Stored:', token);
      } else {
        console.warn('Login successful, but no token received from backend!');
      }

      // Display success message from backend if available, otherwise a default
      setMessage({
        text: response.data.msg || 'Login successful!', // Use response.data.msg for success message
        type: 'success'
      });

      // Navigate to /home after a short delay to allow message to be seen
      setTimeout(() => {
        navigate("/home"); // Redirect to your home/dashboard page
      }, 1500); // Navigate after 1.5 seconds

      // Optional: Reset form after successful login
      setFormData({
        email: '',
        password: ''
      });

    } catch (error) {
      console.error('Login Error:', error.response?.data || error.message);

      // Extract error message from backend (using .msg property) or provide a default
      const errorMessage = error.response?.data?.msg || 'Login failed. Please check your credentials.';
      setMessage({ text: errorMessage, type: 'error' });

    } finally {
      setLoading(false); // Always set loading to false after request completes
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center' }}>
      <h2>Login</h2> {/* Added a heading for clarity */}

      {/* Message Display Area */}
      {message && (
        <div
          style={{
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '4px',
            backgroundColor: message.type === 'success' ? '#d4edda' : '#f8d7da',
            color: message.type === 'success' ? '#155724' : '#721c24',
            border: `1px solid ${message.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder='email'
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder='password'
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <button
          type='submit'
          disabled={loading} // Disable button while loading
          style={{
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? 'LOGIN...' : 'Login'}
        </button>
      
      </form>
   <Link to={'/reg'}>to Register</Link>
    </div>
  );
}

export default Login;