import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {configureStore} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import cartReducer from './redux/cartSlice.js'
const store = configureStore({
	reducer:{
		cart: cartReducer,
	}
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </StrictMode>,
)
