import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetailPage from './components/ProductDetailPage';
import ProductPage from './pages/IndividualProduct';
import CartPage from './pages/CartPage';
import Header from './components/Header';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import CheckoutPage from './pages/Checkout';
import Footer from './components/Footer';
import NotFound from './pages/NotFound';
import { Toaster } from 'react-hot-toast';
import PaystackPage from './payment/Paystack';
import ForgotPasswordPage from './pages/ForgetPassword';
import ResetPasswordPage from './pages/ResetPassword';
// import Cart from './pages/Cart';

function App() {
  return (
    <Router>
      <Header/>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/products/:id" element={<ProductPage />}/>
        <Route path="/cart" element={<CartPage />}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/checkout' element={<CheckoutPage/>}/>
        <Route path='/payment' element={<PaystackPage/>}/>
        <Route
          path="/forgot-password"
          element={
              <ForgotPasswordPage />
          }
        />
         <Route
          path="/reset-password/:token"
          element={
              <ResetPasswordPage />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
