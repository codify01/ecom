import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/toast';
import axios from 'axios';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [apiError, setApiError] = useState(null)
  const {showSuccess, showError} = useToast()

  const handleSuccess = (message) => showSuccess(message)
  const handleError = (err) => showError(err)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://ecom-backend-0gg0.onrender.com/api/login', formData)
      const token = response.data.token
      setData(response.data)
      setApiError(null);
      handleSuccess(data.message)
      localStorage.setItem('authToken', token)
      navigate('/')
    } catch (error) {
      setApiError(error.response?.data?.message || 'An error occurred while logging in try checking your connection')
      handleError(apiError)
      console.error('Error logging in:', error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="login-page container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>
      
      {/* Display success or error message */}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-slate-600 text-white py-2 px-4 rounded-md hover:bg-slate-700"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-slate-600 hover:text-slate-800">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
