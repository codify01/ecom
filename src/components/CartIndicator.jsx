import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartIndicator = () => {
  const cartItems = useSelector((state) => state.cart.items);
  
  return (
    <Link to="/cart" className="relative">
      <span className="text-white bg-sec px-3 py-2 rounded-full">
        Cart ({cartItems.length})
      </span>
    </Link>
  );
};

export default CartIndicator;