import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const CartIndicator = () => {
  const cartItems = useSelector((state) => state.cart.items);
  
  return (
		<Link to="/cart">
			{/* <span className="text-white bg-sec px-3 py-2 rounded-full">
				Cart ({cartItems.length})
			</span> */}
			<div className='relative'>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="size-7 text-pry"
				>
					<path d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
				</svg>
        <span className='bg-red-600 px-1 w-4.5 h-4.5 rounded-full text-[12px] text-white absolute -top-1 -right-1'>
        {cartItems.length}
        </span>
			</div>
		</Link>
	);
};

export default CartIndicator;