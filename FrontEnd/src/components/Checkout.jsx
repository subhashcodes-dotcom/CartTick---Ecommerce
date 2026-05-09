import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const server_ip = `http://${window.location.hostname}:3001`;

const Checkout = () => {
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }
    fetchCartSummary();
  }, [userId, navigate]);

  const fetchCartSummary = async () => {
    try {
      const res = await axios.get(`${server_ip}/api/cart/${userId}`);
      setCartItems(res.data);
      let grandTotal = 0;
      res.data.forEach((item) => {
        grandTotal += item.Price * item.Quantity;
      });
      setTotal(grandTotal);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleConfirmOrder = async () => {
    setProcessing(true);
    try {
      await axios.post(`${server_ip}/api/orders/checkout`, {
        userId: userId,
      });
      setOrderPlaced(true);
      setProcessing(false);
      // Wait a few seconds then navigate to product page or home
      setTimeout(() => {
        navigate("/product");
      }, 3000);
    } catch (err) {
      console.log(err);
      setProcessing(false);
      alert("Failed to place order. Please try again.");
    }
  };

  if (loading) {
    return <div className="checkout-loading">Loading your order details...</div>;
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <header className="checkout-header">
          <div className="checkout-header-logo">CartTick</div>
        </header>
        <div className="checkout-success">
          <div className="success-icon">✅</div>
          <h2 style={{color: '#007600'}}>Order placed, thank you!</h2>
          <p>Confirmation will be sent to your email.</p>
          <p style={{color: '#555', fontSize: '14px', marginTop: '20px'}}>Redirecting to products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <a href="/product" className="checkout-header-logo">CartTick</a>
        <div className="checkout-header-secure">Checkout ( {cartItems.reduce((a,c) => a + c.Quantity, 0)} items )</div>
        <div>🔒</div>
      </header>

      <div className="checkout-container">
        <div className="checkout-main">
          
          <div className="checkout-section">
            <h2 className="checkout-title">Review items and shipping</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.ProductId} className="summary-item">
                  <img src={item.Image} alt={item.ProductName} className="summary-image" />
                  <div className="summary-details">
                    <h3>{item.ProductName}</h3>
                    <p className="summary-price">₹{item.Price.toLocaleString()}</p>
                    <p style={{fontSize: "13px"}}>Quantity: {item.Quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="checkout-sidebar">
          <div className="checkout-sidebar-box">
            <button 
              className="confirm-btn" 
              onClick={handleConfirmOrder}
              disabled={processing || cartItems.length === 0}
            >
              {processing ? "Processing..." : "Place your order"}
            </button>
            <p style={{fontSize: "12px", textAlign: "center", color: "#555"}}>
              By placing your order, you agree to CartTick's privacy notice and conditions of use.
            </p>

            <hr style={{borderColor: "#eee", margin: "15px 0"}} />
            
            <h3 style={{fontSize: "16px", margin: "0 0 10px 0"}}>Order Summary</h3>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "5px"}}>
              <span>Items:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", fontSize: "13px"}}>
              <span>Delivery:</span>
              <span>₹0</span>
            </div>

            <hr style={{borderColor: "#eee", margin: "15px 0"}} />
            
            <div className="order-total-row">
              <span>Order Total:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
