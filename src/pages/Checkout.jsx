import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/toast';

const CheckoutPage = () => {
  const cart = useSelector((state) => state.cart.items);
  const [shippingDetails, setShippingDetails] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const {showError} = useToast()
  useEffect(() => {
  const token = localStorage.getItem('authToken');

    if (!token) {
      showError('You need to be logged in to proceed with the checkout.')
      navigate('/login')
    }
  }, [navigate]);

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails({ ...shippingDetails, [name]: value });
  };

  const validateShippingDetails = () => {
    const newErrors = {};
    if (!shippingDetails.name) newErrors.name = 'Name is required';
    if (!shippingDetails.email) newErrors.email = 'Email is required';
    if (!shippingDetails.address) newErrors.address = 'Address is required';
    if (!shippingDetails.city) newErrors.city = 'City is required';
    if (!shippingDetails.state) newErrors.state = 'State is required';
    if (!shippingDetails.zip) newErrors.zip = 'ZIP Code is required';
    return newErrors;
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    const validationErrors = validateShippingDetails();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment')
    }, 2000)
  };

  return (
    <div className="checkout-page container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Checkout</h1>

      <form onSubmit={handleCheckout} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Information */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.email && <p className="text-red-500">{errors.email}</p>}
          <input
            type="text"
            placeholder="Address"
            name="address"
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.address && <p className="text-red-500">{errors.address}</p>}
          <input
            type="text"
            placeholder="City"
            name="city"
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.city && <p className="text-red-500">{errors.city}</p>}
          <input
            type="text"
            placeholder="State"
            name="state"
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.state && <p className="text-red-500">{errors.state}</p>}
          <input
            type="text"
            placeholder="ZIP Code"
            name="zip"
            onChange={handleInputChange}
            className="w-full p-2 mb-4 border rounded"
          />
          {errors.zip && <p className="text-red-500">{errors.zip}</p>}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          {cart.map((item) => (
            <div key={item.id} className="mb-4">
              <div className="flex justify-between">
                <p>{item.name} (x{item.quantity})</p>
                <p>${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
          <hr className="my-4" />
          <div className="flex justify-between">
            <p>Total</p>
            <p>${cartTotal.toFixed(2)}</p>
          </div>

          {/* Simulated Payment Section */}
          <div className="my-4">
            <p>Payment Information (simulated)</p>
          </div>
          <button
            type="submit"
            className="w-full bg-pry text-white py-2 px-4 rounded hover:bg-pry/90"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Proceed to payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
