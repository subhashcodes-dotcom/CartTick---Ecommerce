import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "./context/productContext";
import "./Product.css";
import electronics from "../images/electronics.png";
import fashion from "../images/fashion.png";
import books from "../images/books.png";
import grocery from "../images/grocery.png";
import sports from "../images/sports.png";
import furniture from "../images/furniture.png";
import beauty from "../images/beauty.png";
import kitchen from "../images/kitchen.png";
import gaming from "../images/gaming.png";
import homeAppliances from "../images/home_appliances.png";

const server_ip = `http://${window.location.hostname}:3001`;
const getImage = (category) => {

  switch (category) {

    case "Electronics":
      return electronics;

    case "Fashion":
      return fashion;

    case "Books":
      return books;

    case "Grocery":
      return grocery;

    case "Sports":
      return sports;

    case "Furniture":
      return furniture;

    case "Beauty":
      return beauty;

    case "Kitchen":
      return kitchen;

    case "Gaming":
      return gaming;

    case "Home Appliances":
      return homeAppliances;

    default:
      return electronics;
  }
}

const Product = () => {

  const userId =
    sessionStorage.getItem("userId") || "1";

  const { products, fetchCartCount } = useContext(ProductContext);

  const [search, setSearch] = useState("");

  // SEARCH
  const filtered = products.filter((p) =>
    p.ProductName.toLowerCase().includes(
      search.toLowerCase()
    )
  );

  // ADD TO CART
  const handleCart = async (productId) => {

    if (userId === "1") {
      alert("Please sign in to add items to your cart.");
      return;
    }

    try {

      await axios.post(
        `${server_ip}/api/cart/add`,
        {
          customerId: userId,
          productId: productId,
        }
      );

      fetchCartCount(); // Update global cart count
      alert("Added to cart ✅");

    } catch (err) {

      console.error(err);

      alert("Cart error ❌");
    }
  };

  return (
    <div style={{ padding: "0" }}>
      <div className="local-search-container">
        <input
          type="text"
          className="local-search-input"
          placeholder="Filter products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {products.length === 0 && (
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>Loading products...</h2>
      )}

      <div className="products-container">
        {filtered.map((product) => (
          <div key={product.ProductId} className="product-card">
            <div className="product-image-container">
              <Link to={`/productDetails/${product.ProductId}`}>
                <img
                  src={product.Image}
                  alt={product.ProductName}
                  className="product-image"
                  onError={(e) => (e.target.src = getImage(product.Category))}
                />
              </Link>
            </div>

            <Link to={`/productDetails/${product.ProductId}`}>
              <h3>{product.ProductName}</h3>
            </Link>

            <p className="price">₹{product.Price.toLocaleString()}</p>
            <p><b>Brand:</b> {product.Manufacturer}</p>
            <p><b>Model:</b> {product.Model}</p>

            <div className="btn-group">
              <button
                className="cart-btn"
                onClick={() => handleCart(product.ProductId)}
              >
                Add to Cart
              </button>
              <Link to={`/productDetails/${product.ProductId}`}>
                <button className="view-btn">View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;