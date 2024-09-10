import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCartItem, addToCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Calculate total price
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length > 0) {
      alert('Thank you for shopping with us!');
      navigate('/checkout');
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <div className="cart-page container mx-auto my-10 px-3">
      <h2 className="text-4xl font-bold text-center mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-700 mb-4">Your cart is empty.</p>
          <button
            className="bg-pry text-white py-2 px-4 rounded hover:bg-pry/80"
            onClick={() => navigate('/products')}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map(item => (
              <div
                key={item.id}
                className="cart-item bg-gray-100 p-6 rounded-lg shadow-lg text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                <p className="text-lg text-slate-600 mb-2">
                  ${item.price} x {item.quantity}
                </p>
                <div className="flex justify-center items-center space-x-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    -
                  </button>
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={() => dispatch(clearCartItem(item.id))}
                  >
                    Remove
                  </button>
                  <button
                    className="bg-pry text-white px-4 py-2 rounded hover:bg-pry/80"
                    onClick={() => dispatch(addToCart(item))}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg mt-8">
            <h3 className="text-2xl font-bold mb-4">Cart Summary</h3>
            <p className="text-lg text-gray-700 mb-2">Total Items: {cart.length}</p>
            <p className="text-lg text-gray-700 mb-4">Total Price: ${cartTotal.toFixed(2)}</p>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 w-full"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
