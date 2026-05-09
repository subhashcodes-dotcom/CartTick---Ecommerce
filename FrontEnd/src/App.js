import React from 'react';
import './App.css';
import Navigation from './components/Navigation';
import Product from './components/Product';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import Login from './components/Login';
import ProductDetails from './components/ProductDetails';
import Registeration from './components/Registeration';
import AdminProduct from './components/adminProduct';
import Cart from './components/cart';
import Checkout from './components/Checkout';
import About from './components/About';
import Contact from './components/Contact';
import Category from './components/Category';
import UserProfile from './components/UserProfile';
import { ProductProvider } from './components/context/productContext'; 
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <div className="App">
          
          <style>
            {`
              body::after {
                background-image: url('http://${window.location.hostname}:3000/brand_logo.png');
              }
            `}
          </style>
          <Navigation />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/product" element={<Product />} />
            <Route path="/addProduct" element={<AddProduct />} />
            <Route path="/editProduct/:id" element={<EditProduct />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/registeration" element={<Registeration />} />
            <Route path="/adminProduct" element={<AdminProduct />}/>

            <Route path='/cartItems' element={<Cart />}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/category/:categoryName' element={<Category />} />
            <Route path='/profile' element={<UserProfile />} />
          </Routes>
        </div>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
