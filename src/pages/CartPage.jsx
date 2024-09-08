import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCartItem } from '../redux/cartSlice';

const CartPage = () => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleCheck = () => {
    alert("Thank you for shopping with us!");
    console.log(cart);
  };

  return (
    <div className="cart-page container mx-auto my-10">
      <h2 className="text-4xl font-bold text-center mb-6">Your Cart</h2>
      {cart.length === 0 ? (
        <>
          <p className="text-center text-gray-700">Your cart is empty.</p>
          <button onClick={handleCheck}>Check</button>
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cart.map(item => (
            <div key={item.id} className="cart-item bg-gray-100 p-6 rounded-lg shadow-lg text-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-lg text-indigo-600 mb-2">${item.price} x {item.quantity}</p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
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
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                  onClick={() => dispatch(addToCart(item))}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
