import React, {
  useEffect,
  useState,
  useContext
} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ProductContext } from "./context/productContext";

import "./Cart.css";

import electronics from "../images/electronics.png";

const server_ip =
  `http://${window.location.hostname}:3001`;

const Cart = () => {

  const navigate = useNavigate();

  const userId =
    sessionStorage.getItem(
      "userId"
    );

  const { fetchCartCount } = useContext(ProductContext);

  const [cartItems,
    setCartItems] = useState([]);

  const [total,
    setTotal] = useState(0);

  // =====================
  // FETCH CART
  // =====================
  const fetchCart =
    async () => {

      try {

        const res =
          await axios.get(
            `${server_ip}/api/cart/${userId}`
          );

        setCartItems(
          res.data
        );

        let grandTotal = 0;

        res.data.forEach(
          (item) => {

            grandTotal +=
              item.Price *
              item.Quantity;
          }
        );

        setTotal(
          grandTotal
        );

      } catch (err) {

        console.log(err);
      }
    };

  useEffect(() => {

    fetchCart();

  }, []);

  // =====================
  // INCREASE
  // =====================
  const increaseQty =
    async (
      productId
    ) => {

      try {

        await axios.put(
          `${server_ip}/api/cart/increase`,
          {
            userId,
            productId
          }
        );

        fetchCart();
        fetchCartCount();

      } catch (err) {

        console.log(err);
      }
    };

  // =====================
  // DECREASE
  // =====================
  const decreaseQty =
    async (
      productId
    ) => {

      try {

        await axios.put(
          `${server_ip}/api/cart/decrease`,
          {
            userId,
            productId
          }
        );

        fetchCart();
        fetchCartCount();

      } catch (err) {

        console.log(err);
      }
    };

  // =====================
  // REMOVE
  // =====================
  const removeItem =
    async (
      productId
    ) => {

      try {

        await axios.delete(
          `${server_ip}/api/cart/remove`,
          {
            data: {
              userId,
              productId
            }
          }
        );

        fetchCart();
        fetchCartCount();

      } catch (err) {

        console.log(err);
      }
    };

  return (
    <div className="cart-page">
      <div className="cart-layout">
        <div className="cart-main">
          <h1 className="cart-title">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <h2 className="empty-cart">Your CartTick is empty.</h2>
          ) : (
            <div className="cart-list">
              {cartItems.map((item) => (
                <div key={item.ProductId} className="cart-item">
                  <img src={item.Image} alt={item.ProductName} className="cart-image" />
                  
                  <div className="cart-details">
                    <h2 onClick={() => navigate(`/productDetails/${item.ProductId}`)}>
                      {item.ProductName}
                    </h2>
                    <div className="price">₹{item.Price.toLocaleString()}</div>
                    <p>In stock</p>
                    <p style={{color: '#565959', fontSize: '12px', marginTop: '4px'}}>
                      <b>Brand:</b> {item.Manufacturer} | <b>Model:</b> {item.Model}
                    </p>

                    <div className="qty-section">
                      <button type="button" className="qty-btn" onClick={() => decreaseQty(item.ProductId)}>-</button>
                      <span className="qty-number">{item.Quantity}</span>
                      <button type="button" className="qty-btn" onClick={() => increaseQty(item.ProductId)}>+</button>
                    </div>

                    <div className="cart-actions">
                      <button type="button" className="remove-btn" onClick={() => removeItem(item.ProductId)}>
                        Delete
                      </button>
                      <span style={{color: '#ddd'}}>|</span>
                      <button type="button" className="buy-btn" onClick={() => navigate('/checkout')}>
                        Save for later
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-sidebar">
            <div className="sidebar-total">
              Subtotal ({cartItems.reduce((acc, item) => acc + item.Quantity, 0)} items): <b>₹{total.toLocaleString()}</b>
            </div>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>
              Proceed to Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;