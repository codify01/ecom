import React from 'react';
import { PaystackButton } from 'react-paystack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import { useToast } from '../hooks/toast';

const PaymentPage = () => {
  const cartItems = useSelector((state) => state.cart.items)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { showSuccess, showError } = useToast()
  
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  )
  
  const user = JSON.parse(localStorage.getItem('user'))
  const userEmail = user?.user?.email || 'no-email@example.com'

  const config = {
    reference: new Date().getTime().toString(),
    email: userEmail,
    amount: totalAmount * 1630 * 100,
    publicKey: 'pk_test_ac7ee470295199c95d16da872f1b35717d9a851b',
  }

  const handlePaystackSuccessAction = (reference) => {
    showSuccess('Order placed successfully!')
    dispatch(clearCart());
    navigate('/');
    console.log(reference);
  }

  const handlePaystackCloseAction = () => {
    showError('Payment cancelled')
  }

  const componentProps = {
    ...config,
    text: 'Pay With Paystack',
    onSuccess: handlePaystackSuccessAction,
    onClose: handlePaystackCloseAction,
  }

  return (
    <div className="payment-page container mx-auto my-10 px-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Payment</h1>

      <div className="order-summary mb-6">
        <h2 className="text-2xl font-bold">Order Summary</h2>
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-bold mt-4">Total: ${totalAmount.toFixed(2)}</h3>
      </div>
      <PaystackButton
        {...componentProps}
        className="bg-pry px-3 py-2 text-white font-medium rounded"
      />
    </div>
  );
};

export default PaymentPage;
