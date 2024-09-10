import axios from 'axios';




export const updateCartOnServer = async (cart, userId) => {
  try {
    await axios.post(`https://ecom-backend-0gg0.onrender.com/api/cart/${userId}/add`, { cart })
    console.log('posted');
    
  } catch (error) {
    console.error('Failed to update cart on server', error.message);
  }
};
