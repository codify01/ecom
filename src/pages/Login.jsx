import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/toast';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setUser } from '../redux/userSlice';

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // For camera
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form data
  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post('https://ecom-backend-0gg0.onrender.com/api/login', formData);
      const { token, message } = response.data;
      showSuccess(message);
      localStorage.setItem('user', JSON.stringify(response.data));
      dispatch(setUser(response.data.user));
      localStorage.setItem('authToken', token);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while logging in. Please check your connection.';
      setApiError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle camera toggle
  const toggleCamera = () => {
    setIsCameraOpen(!isCameraOpen);
    if (!isCameraOpen) {
      startCamera();
    }
  };

  // Start the camera
  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error('Error accessing the camera: ', err);
        showError('Error accessing the camera. Please check your device permissions.');
      });
  };

  // Capture the image from the video stream
  const captureImage = () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageData = canvasRef.current.toDataURL('image/png');
    setCapturedImage(imageData);
    setIsCameraOpen(false);
  };

  // Submit captured image for face verification login
  const handleFaceLogin = async () => {
    if (!capturedImage) {
      showError('No image captured for face login.');
      return;
    }
    setIsLoading(true);

    const formData = new FormData();
    formData.append('image', capturedImage)

    try {
      const response = await axios.post('https://ecom-backend-0gg0.onrender.com/api/login-with-face', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { token, user, message } = response.data;
      showSuccess(message);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user));
      localStorage.setItem('authToken', token);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Face login failed. Please try again.';
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Login</h1>

      {/* Traditional Login Form */}
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
          className="w-full bg-pry text-white py-2 px-4 rounded-md hover:bg-pry/90"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{' '}
          <Link to="/signup" className="text-pry hover:text-pry/90">
            Sign Up
          </Link>
        </p>
      </form>

      {/* Face Login Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold text-center">Or Login with Face Recognition</h2>
        <div className="mt-4 flex justify-center">
          {isCameraOpen ? (
            <div>
              <video ref={videoRef} width="640" height="480" autoPlay className="border border-gray-300"></video>
              <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }}></canvas>
              <button
                onClick={captureImage}
                className="mt-4 bg-pry text-white py-2 px-4 rounded-md hover:bg-pry/90"
              >
                Capture Image
              </button>
            </div>
          ) : (
            <button
              onClick={toggleCamera}
              className="bg-pry text-white py-2 px-4 rounded-md hover:bg-pry/90"
            >
              {isCameraOpen ? 'Close Camera' : 'Open Camera'}
            </button>
          )}
        </div>

        {/* Display captured image and login */}
        {capturedImage && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Captured Image:</h3>
            <img src={capturedImage} alt="Captured" className="mx-auto mt-2" />
            <button
              onClick={handleFaceLogin}
              className="mt-4 bg-pry text-white py-2 px-4 rounded-md hover:bg-pry/90"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying Face...' : 'Login with Face'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
