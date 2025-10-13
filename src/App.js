import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Home from './pages/home';
import Products from './pages/products';
import AboutUs from './pages/aboutUs';
import ContactUs from './pages/contactUs';

import Purchase from './pages/purchase';
import PaymentEntry from './pages/paymentEntry';
import ShippingEntry from './pages/shippingEntry';
import ViewOrder from './pages/viewOrder';
import ViewConfirmation from './pages/viewConfirmation';


function App() {
  return (
    <div className="App">
      <Router>
        <div className = "content">
        <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        <Route path="/purchase" element={<Purchase />} />
        <Route path="/" element={<Navigate replace to="/purchase" />} />
        <Route path="/purchase/paymentEntry" element={<PaymentEntry />} />
        <Route path="/purchase/shippingEntry" element={<ShippingEntry />} />
        <Route path="/purchase/viewOrder" element={<ViewOrder />} />
        <Route path="/purchase/viewConfirmation" element={<ViewConfirmation />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
