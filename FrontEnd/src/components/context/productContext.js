import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ProductContext = createContext();

const BASE_URL = `http://${window.location.hostname}:3001`;

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCartCount = () => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      axios.get(`${BASE_URL}/api/cart/${userId}`)
        .then((res) => {
          const totalItems = res.data.reduce((acc, item) => acc + item.Quantity, 0);
          setCartCount(totalItems);
        })
        .catch((err) => console.log("Error fetching cart count:", err));
    } else {
      setCartCount(0);
    }
  };

  useEffect(() => {
    // Fetch products
    axios.get(`${BASE_URL}/api/products`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
      
    // Fetch initial cart count
    fetchCartCount();
  }, []);

  return (
    <ProductContext.Provider value={{ products, cartCount, fetchCartCount, searchQuery, setSearchQuery }}>
      {children}
    </ProductContext.Provider>
  );
};