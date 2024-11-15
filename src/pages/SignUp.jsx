import axios from 'axios';
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/toast';

const SignUpPage = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		phoneNumber: '',
		email: '',
		password: '',
		confirmPassword: '',
		image: null, // New state for face image upload
	});

	const [errors, setErrors] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isCameraOpen, setIsCameraOpen] = useState(false); // State for controlling camera
	const [capturedImage, setCapturedImage] = useState(null); // To store captured image from the camera
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const navigate = useNavigate();
	const { showSuccess, showError } = useToast();

	// Handle input changes
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	// Handle file changes for face image
	const handleFileChange = (e) => {
		setFormData({ ...formData, image: e.target.files[0] });
	};

	// Validate form data
	const validate = () => {
		const newErrors = {};

		if (!formData.firstName.trim())
			newErrors.firstName = 'First name is required';
		if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
		if (!formData.phoneNumber.trim())
			newErrors.phoneNumber = 'Phone number is required';
		if (!/^[\d\s]+$/.test(formData.phoneNumber.trim()))
			newErrors.phoneNumber = 'Invalid phone number format';
		if (!formData.email.trim()) newErrors.email = 'Email is required';
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
			newErrors.email = 'Invalid email format';
		if (!formData.password.trim()) newErrors.password = 'Password is required';
		if (formData.password !== formData.confirmPassword)
			newErrors.confirmPassword = 'Passwords do not match';

		return newErrors;
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
				console.error('Error accessing the camera:', err);
				showError('Error accessing the camera. Please allow camera access.');
			});
	};

	// Capture the image from the video stream
	const captureImage = () => {
		const context = canvasRef.current.getContext('2d');
		context.drawImage(videoRef.current, 0, 0, 640, 480); // Capture the current frame
		const imageData = canvasRef.current.toDataURL('image/png'); // Get the image data as base64
		setCapturedImage(imageData);
		setIsCameraOpen(false); // Close the camera feed after capturing
	};

	// Toggle camera
	const toggleCamera = () => {
		if (!isCameraOpen) {
			startCamera();
		}
		setIsCameraOpen(!isCameraOpen);
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		const validationErrors = validate();

		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors);
			Object.values(validationErrors).forEach((error) => showError(error)); // Show errors as toast
			return;
		}

		setIsLoading(true);
		// Prepare form data for the request (including the face image)
		const data = new FormData();
		data.append('firstName', formData.firstName);
		data.append('lastName', formData.lastName);
		data.append('phoneNumber', formData.phoneNumber);
		data.append('email', formData.email);
		data.append('password', formData.password);

		// If a face image was uploaded manually, attach it
		if (formData.image) {
			data.append('image', formData.image);
		}

		// If a face image was captured via the camera, convert the captured image to a blob and attach it
		if (capturedImage) {
			const blob = await fetch(capturedImage).then((res) => res.blob());
			data.append('image', blob, 'capturedImage.png');
		}
		try {
			const response = await axios.post(
				`https://ecom-backend-0gg0.onrender.com/api/register`,
				data,
				{
					headers: { 'Content-Type': 'multipart/form-data' },
				}
			);
			showSuccess('Signup successful!');
			navigate('/login');
		} catch (error) {
			console.log(error);
			const errorMessage = error.response?.data?.message || error.message;
			showError(errorMessage);
			console.error('Error signing up:', error.response?.data || error);
		}
  }
		return (
			<div className="signup-page container mx-auto my-10 px-4">
				<h1 className="text-4xl font-bold mb-6 text-center">Sign Up</h1>
				<form
					onSubmit={handleSubmit}
					className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg"
				>
					{/* First Name */}
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="firstName">
							First Name
						</label>
						<input
							type="text"
							id="firstName"
							name="firstName"
							value={formData.firstName}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							disabled={isLoading}
						/>
						{errors.firstName && (
							<p className="text-red-500 text-sm">{errors.firstName}</p>
						)}
					</div>

					{/* Last Name */}
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="lastName">
							Last Name
						</label>
						<input
							type="text"
							id="lastName"
							name="lastName"
							value={formData.lastName}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							disabled={isLoading}
						/>
						{errors.lastName && (
							<p className="text-red-500 text-sm">{errors.lastName}</p>
						)}
					</div>

					{/* Phone Number */}
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="phoneNumber">
							Phone Number
						</label>
						<input
							type="text"
							id="phoneNumber"
							name="phoneNumber"
							value={formData.phoneNumber}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							disabled={isLoading}
						/>
						{errors.phoneNumber && (
							<p className="text-red-500 text-sm">{errors.phoneNumber}</p>
						)}
					</div>

					{/* Email */}
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="email">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							disabled={isLoading}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm">{errors.email}</p>
						)}
					</div>

					{/* Password */}
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="password">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							disabled={isLoading}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm">{errors.password}</p>
						)}
					</div>

					{/* Confirm Password */}
					<div className="mb-4">
						<label
							className="block text-gray-700 mb-2"
							htmlFor="confirmPassword"
						>
							Confirm Password
						</label>
						<input
							type="password"
							id="confirmPassword"
							name="confirmPassword"
							value={formData.confirmPassword}
							onChange={handleChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							disabled={isLoading}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm">{errors.confirmPassword}</p>
						)}
					</div>

					{/* Image Upload for Face Recognition */}
					<div className="mb-4">
						<label className="block text-gray-700 mb-2" htmlFor="image">
							Upload Face Image (optional)
						</label>
						<input
							type="file"
							id="image"
							name="image"
							accept="image/*"
							onChange={handleFileChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md"
							disabled={isLoading}
						/>
					</div>

					{/* Camera for Face Recognition */}
					<div className="mb-4">
						<button
							type="button"
							className="w-full bg-pry text-white py-2 px-4 rounded-md hover:bg-pry/90"
							onClick={toggleCamera}
							disabled={isLoading}
						>
							{isCameraOpen ? 'Close Camera' : 'Open Camera'}
						</button>
						{isCameraOpen && (
							<div>
								<video
									ref={videoRef}
									width="640"
									height="480"
									autoPlay
									className="mt-4 mx-auto"
								></video>
								<canvas
									ref={canvasRef}
									width="640"
									height="480"
									style={{ display: 'none' }}
								></canvas>
								<button
									type="button"
									className="mt-4 bg-pry text-white py-2 px-4 rounded-md hover:bg-pry/90"
									onClick={captureImage}
								>
									Capture Image
								</button>
							</div>
						)}
					</div>

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full bg-pry text-white py-2 px-4 rounded-md hover:bg-pry/90"
						disabled={isLoading}
					>
						{isLoading ? 'Signing Up...' : 'Sign Up'}
					</button>
				</form>

				{/* Display Captured Image */}
				{capturedImage && (
					<div className="mt-4 text-center">
						<h3 className="text-lg font-semibold">Captured Image Preview:</h3>
						<img src={capturedImage} alt="Captured" className="mx-auto mt-2" />
					</div>
				)}
			</div>
		);
};

export default SignUpPage;
