import axios from 'axios';




export const updateCartOnServer = async (cart) => {
  try {
    await axios.post('https://ecom-backend-0gg0.onrender.com/cart/update', { cart });
  } catch (error) {
    console.error('Failed to update cart on server', error);
  }
};
