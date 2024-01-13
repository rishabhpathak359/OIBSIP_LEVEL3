// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Cart from './pages/Cart';
import CustomPizza from './pages/CustomPizza';
import { store, persistor } from './utils/store';
import { Provider } from 'react-redux';
import Admin from './pages/Admin';
import PrivateRoute from './components/PrivateRoute'; 
import OrderPage from './components/Order';

axios.defaults.baseURL = 'https://pizzeria-vuhw.onrender.com/';
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <Provider store={store}>
      <>
        <Router>
          <Navbar />
          <Toaster position="bottom-right" toastOptions={{ duration: 3000 }} />
          <Routes>
           <Route path="/" element={<PrivateRoute element={<Home />} />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<PrivateRoute element={<Cart />} />} />
            <Route path="/custom" element={<PrivateRoute element={<CustomPizza />} />} />
            <Route path="/admin" element={<PrivateRoute element={<Admin />} />} />
            <Route path="/order" element={<PrivateRoute element={<OrderPage />} />} />
          </Routes>
        </Router>
      </>
    </Provider>
  );
};

export default App;
