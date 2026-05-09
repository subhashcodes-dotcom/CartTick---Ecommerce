const express = require("express");
const router = express.Router();
const db = require("./db");

// Get all products
router.get("/", (req, res) => {
  db.query("SELECT * FROM Product", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// Add product
router.post("/", (req, res) => {
  const { ProductName, MRP, Stock } = req.body;
  db.query(
    "INSERT INTO Product (ProductName, MRP, Stock) VALUES (?, ?, ?)",
    [ProductName, MRP, Stock],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Product Added" });
    }
  );
});

module.exports = router;