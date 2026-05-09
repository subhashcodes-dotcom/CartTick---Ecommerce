import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const server_ip = `http://${window.location.hostname}:3001`;

const ProductDetails = () => {

  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const userId =
    sessionStorage.getItem("userId") || "1";

  // FETCH PRODUCT
  useEffect(() => {

    axios
      .get(`${server_ip}/api/products`)
      .then((res) => {

        const foundProduct =
          res.data.find(
            (p) =>
              p.ProductId.toString() === id
          );

        setProduct(foundProduct);

        setLoading(false);
      })
      .catch((err) => {

        console.log(err);

        setLoading(false);
      });

  }, [id]);

  // ADD TO CART
  const handleAddToCart = async () => {

    try {

      await axios.post(
        `${server_ip}/api/cart/add`,
        {
          customerId: userId,
          productId: product.ProductId,
        }
      );

      alert("Added to cart ✅");

    } catch (err) {

      console.log(err);

      alert("Cart Error ❌");
    }
  };

  // LOADING
  if (loading) {

    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading...
      </h1>
    );
  }

  // PRODUCT NOT FOUND
  if (!product) {

    return (
      <h1
        style={{
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Product Not Found
      </h1>
    );
  }

  return (

    <div
      style={{
        display: "flex",
        gap: "50px",
        padding: "50px",
        alignItems: "center",
        background: "#f5f5f5",
        minHeight: "100vh",
      }}
    >

      {/* IMAGE */}
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >

        <img
          src={product.Image}
          alt={product.ProductName}
          style={{
            width: "400px",
            height: "400px",
            objectFit: "contain",
          }}
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400";
          }}
        />

      </div>

      {/* DETAILS */}
      <div
        style={{
          flex: 1,
          background: "white",
          padding: "40px",
          borderRadius: "10px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >

        <h1
          style={{
            marginBottom: "20px",
          }}
        >
          {product.ProductName}
        </h1>

        <h2
          style={{
            color: "#B12704",
            marginBottom: "20px",
          }}
        >
          ₹{product.Price}
        </h2>

        <p
          style={{
            marginBottom: "10px",
          }}
        >
          <b>Category:</b>
          {" "}
          {product.Category}
        </p>

        <p
          style={{
            marginBottom: "10px",
          }}
        >
          <b>Model:</b>
          {" "}
          {product.Model}
        </p>

        <p
          style={{
            marginBottom: "10px",
          }}
        >
          <b>Brand:</b>
          {" "}
          {product.Manufacturer}
        </p>

        <p
          style={{
            marginTop: "20px",
            color: "#555",
          }}
        >
          Premium quality product
          with latest features
          and warranty support.
        </p>

        <button
          onClick={handleAddToCart}
          style={{
            marginTop: "30px",
            padding: "15px 30px",
            border: "none",
            background: "#FFD814",
            borderRadius: "8px",
            fontSize: "16px",
            cursor: "pointer",
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default ProductDetails;