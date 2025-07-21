import React, { useState } from 'react';
import axios from "../axiosconfig.js"; // Ensure this path is correct
import { useNavigate,Link } from "react-router-dom";

function Reg() {
  const navigate = useNavigate(); // Renamed nav to navigate for clarity

  const [formData, setFormData] = useState({
    username: '',
    fname: '',
    lname: '',
    email: '',
    password: ''
  });

  // State for messages (success/error)
  const [message, setMessage] = useState(null); // { text: '', type: 'success' | 'error' }
  const [loading, setLoading] = useState(false); // State for loading indicator

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setMessage(null); // Clear any previous messages
    setLoading(true); // Set loading to true

    try {
      // Send POST request to backend
      const response = await axios.post(
        '/user/reg', // Make sure this endpoint matches your backend
        formData
      );

      console.log('Success response data:', response.data.msg);
      // Display success message from backend if available, otherwise a default
      setMessage({
        text: response.data.msg|| 'Registration successful! Please log in.',
        type: 'success'
      });

      // Navigate to login after a short delay to allow message to be seen
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Navigate after 2 seconds

      // Reset form after submission
      setFormData({
        username: '',
        fname: '',
        lname: '',
        email: '',
        password: ''
      });

    } catch (error) {
      console.error('Error:', error.response?.data.msg || error.message);

      // Extract error message from backend or provide a default
      const errorMessage = error.response?.data?.msg || 'Registration failed. Please try again.';
      setMessage({ text: errorMessage, type: 'error' });

    } finally {
      setLoading(false); // Always set loading to false after request completes
    }
  };

  return (
    <section style={{ padding: '20px', maxWidth: '500px', margin: 'auto', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit}> {/* Use onSubmit on the form tag */}
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

        <div>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder='username'
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label htmlFor="fname" style={{ display: 'block', marginBottom: '5px' }}>First Name:</label>
          <input
            type="text"
            id="fname"
            name="fname"
            value={formData.fname}
            onChange={handleChange}
            placeholder='firstname'
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
        <div>
          <label htmlFor="lname" style={{ display: 'block', marginBottom: '5px' }}>Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={formData.lname}
            onChange={handleChange}
            placeholder='lastname'
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
          />
        </div>
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    
      <br />
     
    </section>
  );
}

export default Reg;