import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "./context/productContext";
import "./navigation.css";
 
const Navbar = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isLoggedAdmin, setIsLoggedAdmin] = useState(false);
  const [theme, setTheme] = useState('light');
  const { cartCount, fetchCartCount, searchQuery, setSearchQuery } = useContext(ProductContext);
  const navigate = useNavigate();
 
  const [menuOpen, setMenuOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState("Select your address");

  const handleLogOut = () => {
    sessionStorage.clear();
    fetchCartCount(); // Reset cart count
    setMenuOpen(false);
    navigate('/');
  }

  const handleLocationClick = () => {
    const newLoc = window.prompt("Enter your delivery city name:", deliveryLocation !== "Select your address" ? deliveryLocation : "");
    if (newLoc && newLoc.trim() !== "") {
      setDeliveryLocation(newLoc);
    }
  };
 
  useEffect(() => {
    const userId = sessionStorage.getItem("userId");
    if (userId) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
    
    if (sessionStorage.getItem("admitId") || sessionStorage.getItem("adminId")) {
      setIsLoggedAdmin(true);
    } else {
      setIsLoggedAdmin(false);
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, [sessionStorage.getItem("userId"), sessionStorage.getItem("adminId")]);
 
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className="modern-header">
      <div className="nav-left">
        {/* Main Menu Links */}
        <div className="nav-menu">
          <Link to={isLogged ? "/product" : "/"} className="nav-menu-item active">Home</Link>
          <Link to="/product" className="nav-menu-item">Catalog</Link>
          <Link to="/category/all" className="nav-menu-item">Categories</Link>
          <Link to="/about" className="nav-menu-item">About</Link>
          <Link to="/contact" className="nav-menu-item">Contact</Link>
          {!isLogged && <Link to="/" className="nav-menu-item">Sign In</Link>}
        </div>
      </div>

      <div className="nav-center">
        <Link to={isLogged ? "/product" : "/"} className="brand-link">
          <img src="/brand_logo2.png" alt="CartTick Logo" className="nav-logo-img" />
        </Link>
      </div>

      <div className="nav-right">
        {/* Delivery Location Selector */}
        <div 
          onClick={handleLocationClick}
          className="nav-location"
          title="Update delivery location"
        >
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Deliver to</span>
          <span style={{ fontSize: '14px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <span style={{marginRight: '4px'}}>📍</span>
            {deliveryLocation}
          </span>
        </div>

        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle" title="Toggle Dark Mode">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        {/* Cart */}
        <Link to="/cartItems" className="nav-cart-wrapper">
          Cart
          <div className="cart-badge">{cartCount}</div>
        </Link>

        {/* Hamburger Menu with Dropdown */}
        <div style={{ position: "relative" }}>
          <button 
            className="hamburger-menu" 
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", color: "var(--header-text)", fontSize: "24px", cursor: "pointer" }}
          >
            ⋮
          </button>
          
          {menuOpen && isLogged && (
            <div style={{
              position: "absolute",
              top: "100%",
              right: "0",
              marginTop: "10px",
              backgroundColor: "var(--surface)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              padding: "10px 0",
              minWidth: "150px",
              zIndex: 100,
              display: "flex",
              flexDirection: "column"
            }}>
              <Link 
                to="/profile" 
                onClick={() => setMenuOpen(false)}
                style={{ padding: "10px 20px", textDecoration: "none", color: "var(--text-main)", display: "block" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "var(--background)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                Profile
              </Link>
              <div 
                onClick={handleLogOut}
                style={{ padding: "10px 20px", cursor: "pointer", color: "var(--text-main)", display: "block" }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "var(--background)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
              >
                Sign Out
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
 
export default Navbar;