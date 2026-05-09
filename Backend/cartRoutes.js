const express = require("express");

const router = express.Router();

const db = require("./db");


// ==========================
// GET USER CART
// ==========================
router.get("/:userId", (req, res) => {

  const userId = req.params.userId;

  console.log("GET CART USER:", userId);

  const sql = `
    SELECT
      p.ProductId,
      p.ProductName,
      p.Price,
      p.Image,
      p.Model,
      p.Manufacturer,
      ci.Quantity
    FROM cart c
    JOIN cartitem ci
      ON c.CartId = ci.CartId
    JOIN product p
      ON ci.ProductId = p.ProductId
    WHERE c.UserId = ?
  `;

  db.query(sql, [userId], (err, result) => {

    if (err) {

      console.log("GET CART ERROR:");
      console.log(err);

      return res.status(500).json(err);
    }

    console.log("CART DATA:", result);

    res.json(result);
  });
});


// ==========================
// ADD TO CART
// ==========================
router.post("/add", (req, res) => {

  console.log("ADD TO CART BODY:");
  console.log(req.body);

  const { customerId, productId } = req.body;

  // FIND CART
  const cartSql =
    "SELECT * FROM cart WHERE UserId=?";

  db.query(
    cartSql,
    [customerId],
    (err, cartResult) => {

      if (err) {

        console.log("FIND CART ERROR:");
        console.log(err);

        return res.status(500).json(err);
      }

      console.log("CART RESULT:", cartResult);

      // ==========================
      // CART EXISTS
      // ==========================
      if (cartResult.length > 0) {

        const cartId =
          cartResult[0].CartId;

        console.log("CART ID:", cartId);

        // CHECK PRODUCT EXISTS
        const itemSql = `
          SELECT *
          FROM cartitem
          WHERE CartId=?
          AND ProductId=?
        `;

        db.query(
          itemSql,
          [cartId, productId],
          (err, itemResult) => {

            if (err) {

              console.log("CHECK ITEM ERROR:");
              console.log(err);

              return res.status(500).json(err);
            }

            console.log(
              "ITEM RESULT:",
              itemResult
            );

            // PRODUCT ALREADY EXISTS
            if (itemResult.length > 0) {

              const updateSql = `
                UPDATE cartitem
                SET Quantity = Quantity + 1
                WHERE CartId=?
                AND ProductId=?
              `;

              db.query(
                updateSql,
                [cartId, productId],
                (err, result) => {

                  if (err) {

                    console.log(
                      "UPDATE QUANTITY ERROR:"
                    );

                    console.log(err);

                    return res
                      .status(500)
                      .json(err);
                  }

                  console.log(
                    "QUANTITY UPDATED"
                  );

                  res.json({
                    message:
                      "Quantity updated",
                  });
                }
              );

            }

            // NEW PRODUCT
            else {

              const insertSql = `
                INSERT INTO cartitem
                (CartId, ProductId, Quantity)
                VALUES (?, ?, 1)
              `;

              db.query(
                insertSql,
                [cartId, productId],
                (err, result) => {

                  if (err) {

                    console.log(
                      "INSERT ITEM ERROR:"
                    );

                    console.log(err);

                    return res
                      .status(500)
                      .json(err);
                  }

                  console.log(
                    "NEW ITEM INSERTED"
                  );

                  res.json({
                    message:
                      "Product added",
                  });
                }
              );
            }
          }
        );
      }

      // ==========================
      // CREATE NEW CART
      // ==========================
      else {

        const newCartId =
          "C" + Math.floor(Math.random() * 100000000);

        console.log(
          "NEW CART:",
          newCartId
        );

        const createCartSql = `
          INSERT INTO cart
          (CartId, UserId)
          VALUES (?, ?)
        `;

        db.query(
          createCartSql,
          [newCartId, customerId],
          (err, result) => {

            if (err) {

              console.log(
                "CREATE CART ERROR:"
              );

              console.log(err);

              return res
                .status(500)
                .json(err);
            }

            console.log(
              "CART CREATED"
            );

            // INSERT FIRST ITEM
            const insertItemSql = `
              INSERT INTO cartitem
              (CartId, ProductId, Quantity)
              VALUES (?, ?, 1)
            `;

            db.query(
              insertItemSql,
              [newCartId, productId],
              (err, result) => {

                if (err) {

                  console.log(
                    "FIRST ITEM INSERT ERROR:"
                  );

                  console.log(err);

                  return res
                    .status(500)
                    .json(err);
                }

                console.log(
                  "FIRST ITEM INSERTED"
                );

                res.json({
                  message:
                    "Cart created",
                });
              }
            );
          }
        );
      }
    }
  );
});


// ==========================
// INCREASE QUANTITY
// ==========================
router.put("/increase", (req, res) => {

  console.log(req.body);

  const {
    userId,
    productId,
  } = req.body;

  const sql = `
    UPDATE cartitem ci
    JOIN cart c
      ON ci.CartId = c.CartId
    SET ci.Quantity = ci.Quantity + 1
    WHERE c.UserId=?
    AND ci.ProductId=?
  `;

  db.query(
    sql,
    [userId, productId],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);
      }

      console.log(
        "QUANTITY INCREASED"
      );

      res.json({
        message:
          "Quantity increased",
      });
    }
  );
});


// ==========================
// DECREASE QUANTITY
// ==========================
router.put("/decrease", (req, res) => {

  console.log(req.body);

  const {
    userId,
    productId,
  } = req.body;

  const sql = `
    UPDATE cartitem ci
    JOIN cart c
      ON ci.CartId = c.CartId
    SET ci.Quantity = ci.Quantity - 1
    WHERE c.UserId=?
    AND ci.ProductId=?
    AND ci.Quantity > 1
  `;

  db.query(
    sql,
    [userId, productId],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);
      }

      console.log(
        "QUANTITY DECREASED"
      );

      res.json({
        message:
          "Quantity decreased",
      });
    }
  );
});


// ==========================
// REMOVE ITEM
// ==========================
router.delete("/remove", (req, res) => {

  console.log(req.body);

  const {
    userId,
    productId,
  } = req.body;

  const sql = `
    DELETE ci
    FROM cartitem ci
    JOIN cart c
      ON ci.CartId = c.CartId
    WHERE c.UserId=?
    AND ci.ProductId=?
  `;

  db.query(
    sql,
    [userId, productId],
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);
      }

      console.log(
        "ITEM REMOVED"
      );

      res.json({
        message:
          "Item removed",
      });
    }
  );
});

module.exports = router;