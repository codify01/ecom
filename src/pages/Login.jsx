import React, { useState, useRef, useEffect } from 'react';
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

  // Camera-related states and refs
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // State for manually uploaded image

  // Cleanup camera stream when the component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

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

  // Submit login form
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
      const { token, message, user } = response.data;

      showSuccess(message);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(setUser(user));
      localStorage.setItem('authToken', token);
      navigate('/');
    } catch (error) {
      console.log(error);
      
      const errorMessage = error.response?.data?.message || 'An error occurred while logging in. Please check your connection.';
      setApiError(errorMessage);
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle camera
  const toggleCamera = () => {
    setIsCameraOpen((prev) => !prev);
    if (!isCameraOpen) startCamera();
  };

  // Start the camera
  const startCamera = () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      showError('Your browser does not support camera access.');
      return;
    }

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

    // Stop the camera stream
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
    }
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result); // Save the uploaded image as a base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit captured or uploaded image for face verification login
  const handleFaceLogin = async () => {
    const imageToSend = capturedImage || uploadedImage;

    if (!imageToSend) {
        showError('No image provided for face login. Please capture or upload an image.');
        return;
    }

    setIsLoading(true);

    try {
        // Check if the image is base64 or a file
        const formData = new FormData();

        if (imageToSend.startsWith('data:image')) {
            // If base64, convert it to a Blob
            const byteString = atob(imageToSend.split(',')[1]);
            const mimeString = imageToSend.split(',')[0].split(':')[1].split(';')[0];
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: mimeString });
            formData.append('image', blob, 'face-image.png');
        } else {
            // If file, append directly
            formData.append('image', imageToSend);
        }

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
      console.log(error);
      
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
        <div className="mt-4 flex flex-col items-center">
          <div className="flex space-x-4">
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
          <div className="mt-4">
            <label className="block text-gray-700 mb-2">Upload Image</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
        </div>

        {/* Display captured or uploaded image */}
        {capturedImage || uploadedImage ? (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold">Preview Image:</h3>
            <img src={capturedImage || uploadedImage} alt="Preview" className="mx-auto mt-2" />
            <button
              onClick={handleFaceLogin}
              className="mt-4 bg-pry text-white py-2 px-4 rounded-md hover:bg-pry/90"
              disabled={isLoading}
            >
              {isLoading ? 'Verifying Image...' : 'Login with Face'}
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default LoginPage;
