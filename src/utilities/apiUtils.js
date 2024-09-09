import axios from 'axios';




export const updateCartOnServer = async (cart,userId) => {
  try {
    await axios.post(`https://ecom-backend-0gg0.onrender.com/api/${userId}/add`, { cart });
  } catch (error) {
    console.error('Failed to update cart on server', error);
  }
};
