import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const server_ip = `http://${window.location.hostname}:3001`;

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate("/");
      return;
    }

    const fetchProfileData = async () => {
      try {
        // Fetch User Info
        const userRes = await axios.get(`${server_ip}/api/users/${userId}`);
        setUser(userRes.data);

        // Fetch User Orders
        const ordersRes = await axios.get(`${server_ip}/api/orders/user/${userId}`);
        setOrders(ordersRes.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [userId, navigate]);

  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading Profile...</h2>;
  }

  if (!user) {
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>User not found.</h2>;
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>Your Account</h1>
        
        <div style={styles.grid} className="user-profile-grid">
          {/* Account Details Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Profile Details</h2>
            <div style={styles.avatarContainer}>
              <div style={styles.avatar}>
                {user.CustomerName ? user.CustomerName.charAt(0).toUpperCase() : "U"}
              </div>
            </div>
            <div style={styles.detailsList}>
              <p><b>Name:</b> {user.CustomerName}</p>
              <p><b>Email:</b> {user.Email}</p>
              <p><b>Phone:</b> {user.Phone || "N/A"}</p>
              <p><b>Address:</b> {user.Address || "N/A"}</p>
            </div>
          </div>

          {/* Order History Card */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Order History</h2>
            {orders.length === 0 ? (
              <p style={{ color: "var(--text-muted)", marginTop: "20px" }}>You have no past orders.</p>
            ) : (
              <div style={styles.ordersList}>
                {orders.map((order) => (
                  <div key={order.orderId} style={styles.orderItem}>
                    <div style={styles.orderHeader} className="user-profile-order-header">
                      <b>Order ID:</b> {order.orderId}
                      <span style={styles.orderTotal}>Total: ₹{order.orderTotal.toLocaleString()}</span>
                    </div>
                    <div style={styles.productsGrid}>
                      {order.items.map((item, index) => (
                        <div key={index} style={styles.productRow}>
                          <img src={item.image} alt={item.productName} style={styles.productImg} onError={(e) => { e.target.src = "https://via.placeholder.com/50"; }} />
                          <div style={styles.productInfo}>
                            <p style={styles.productName}>{item.productName}</p>
                            <p style={styles.productQty}>Qty: {item.quantity} | ₹{item.price.toLocaleString()} each</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "var(--background)",
    minHeight: "80vh",
    padding: "40px 20px",
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },
  pageTitle: {
    fontSize: "2rem",
    marginBottom: "30px",
    color: "var(--text-main)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    gap: "30px",
  },
  card: {
    backgroundColor: "var(--surface)",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    height: "fit-content",
  },
  cardTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "var(--text-main)",
    borderBottom: "1px solid var(--border)",
    paddingBottom: "10px",
  },
  avatarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    backgroundColor: "var(--primary)",
    color: "white",
    fontSize: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  detailsList: {
    fontSize: "1rem",
    color: "var(--text-main)",
    lineHeight: "1.8",
  },
  ordersList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginTop: "20px",
  },
  orderItem: {
    border: "1px solid var(--border)",
    borderRadius: "8px",
    padding: "15px",
    backgroundColor: "var(--background)",
  },
  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontSize: "1.1rem",
    color: "var(--text-main)",
    borderBottom: "1px solid var(--border)",
    paddingBottom: "10px",
  },
  orderTotal: {
    color: "var(--primary)",
    fontWeight: "bold",
  },
  productsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  productRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  productImg: {
    width: "50px",
    height: "50px",
    objectFit: "contain",
    backgroundColor: "var(--surface)",
    borderRadius: "4px",
    padding: "5px",
    border: "1px solid var(--border)",
  },
  productInfo: {
    display: "flex",
    flexDirection: "column",
  },
  productName: {
    margin: "0 0 5px 0",
    fontSize: "1rem",
    fontWeight: "500",
    color: "var(--text-main)",
  },
  productQty: {
    margin: 0,
    fontSize: "0.9rem",
    color: "var(--text-muted)",
  }
};

export default UserProfile;
