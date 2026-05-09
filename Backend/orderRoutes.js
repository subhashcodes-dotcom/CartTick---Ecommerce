const express = require("express");
const router = express.Router();
const db = require("./db");

// Checkout Cart
router.post("/checkout", (req, res) => {
  const { userId } = req.body;

  if (!userId) return res.status(400).json({ error: "userId is required" });

  // 1. Get user's cart
  db.query("SELECT CartId FROM Cart WHERE UserId = ?", [userId], (err, cartResult) => {
    if (err) return res.status(500).json(err);
    if (cartResult.length === 0) return res.status(404).json({ error: "Cart not found" });

    const cartId = cartResult[0].CartId;
    const orderId = "O" + Date.now().toString().slice(-8); // Generate OrderId max 10 chars

    // 2. Create Order
    db.query(
      "INSERT INTO Orders (OrderId, UserId, CartId) VALUES (?, ?, ?)",
      [orderId, userId, cartId],
      (err2) => {
        if (err2) return res.status(500).json(err2);

        // 3. Move items from CartItem to OrderItem
        db.query(
          "INSERT INTO OrderItem (OrderId, ProductId, Quantity) SELECT ?, ProductId, Quantity FROM CartItem WHERE CartId = ?",
          [orderId, cartId],
          (err3) => {
            if (err3) return res.status(500).json(err3);

            // 4. Clear the cart
            db.query("DELETE FROM CartItem WHERE CartId = ?", [cartId], (err4) => {
              if (err4) return res.status(500).json(err4);

              res.json({ message: "Checkout successful", orderId });
            });
          }
        );
      }
    );
  });
});
// Get User's Orders
router.get("/user/:userId", (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      o.OrderId, 
      p.ProductId, 
      p.ProductName, 
      p.Image, 
      p.Price, 
      oi.Quantity,
      (p.Price * oi.Quantity) as TotalPrice
    FROM Orders o
    JOIN OrderItem oi ON o.OrderId = oi.OrderId
    JOIN Product p ON oi.ProductId = p.ProductId
    WHERE o.UserId = ?
  `;

  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    
    // Group items by OrderId
    const orders = result.reduce((acc, row) => {
      if (!acc[row.OrderId]) {
        acc[row.OrderId] = {
          orderId: row.OrderId,
          items: [],
          orderTotal: 0
        };
      }
      acc[row.OrderId].items.push({
        productId: row.ProductId,
        productName: row.ProductName,
        image: row.Image,
        price: row.Price,
        quantity: row.Quantity,
        totalPrice: row.TotalPrice
      });
      acc[row.OrderId].orderTotal += row.TotalPrice;
      return acc;
    }, {});

    res.json(Object.values(orders));
  });
});

module.exports = router;