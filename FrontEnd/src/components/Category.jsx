import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from './context/productContext';
import './Product.css';

const Category = () => {
  const { categoryName } = useParams();
  const userId = sessionStorage.getItem("userId") || "1";
  const { products, fetchCartCount } = useContext(ProductContext);
  const server_ip = `http://${window.location.hostname}:3001`;

  // Filter products by category if it's not 'all'
  const filteredProducts = categoryName === 'all' 
    ? products 
    : products.filter(p => 
        p.Category && p.Category.toLowerCase() === categoryName.toLowerCase()
      );

  const categories = ['Electronics', 'Fashion', 'Home Appliances', 'Beauty'];

  const handleCart = async (productId) => {
    if (userId === "1") {
      alert("Please sign in to add items to your cart.");
      return;
    }
    try {
      // Need axios imported, assuming we'll add it or it's available. If not, use fetch.
      await fetch(`${server_ip}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: userId,
          productId: productId,
        })
      });
      if (fetchCartCount) fetchCartCount();
      alert("Added to cart ✅");
    } catch (err) {
      console.error(err);
      alert("Cart error ❌");
    }
  };

  return (
    <div style={{ padding: "0 24px" }}>
      <div className="category-header" style={styles.header}>
        <h2 style={styles.title}>
          {categoryName === 'all' ? 'All Categories' : `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Products`}
        </h2>
        <div style={styles.badgeList}>
          <Link to="/category/all" style={categoryName === 'all' ? styles.activeBadge : styles.badge}>All</Link>
          {categories.map(cat => (
            <Link 
              key={cat} 
              to={`/category/${cat.toLowerCase()}`} 
              style={categoryName === cat.toLowerCase() ? styles.activeBadge : styles.badge}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      <div className="products-container" style={{ padding: "24px 0" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.ProductId} className="product-card">
              <div className="product-image-container">
                <Link to={`/productDetails/${product.ProductId}`}>
                  <img
                    src={product.Image}
                    alt={product.ProductName}
                    className="product-image"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
                  />
                </Link>
              </div>
              
              <Link to={`/productDetails/${product.ProductId}`}>
                <h3>{product.ProductName}</h3>
              </Link>
              
              <p className="price">₹{product.Price ? product.Price.toLocaleString() : "N/A"}</p>
              {product.Manufacturer && <p><b>Brand:</b> {product.Manufacturer}</p>}
              {product.Model && <p><b>Model:</b> {product.Model}</p>}

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
          ))
        ) : (
          <div style={{gridColumn: '1 / -1', textAlign: 'center', padding: '4rem'}}>
            <h3>No products found in this category.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  header: {
    marginBottom: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  title: {
    margin: 0,
    color: 'var(--text-main)',
    fontSize: '2rem',
  },
  badgeList: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  badge: {
    padding: '0.5rem 1.2rem',
    backgroundColor: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: '50px',
    color: 'var(--text-main)',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'all 0.2s',
  },
  activeBadge: {
    padding: '0.5rem 1.2rem',
    backgroundColor: 'var(--primary)',
    border: '1px solid var(--primary)',
    borderRadius: '50px',
    color: 'white',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.2s',
  }
};

export default Category;
