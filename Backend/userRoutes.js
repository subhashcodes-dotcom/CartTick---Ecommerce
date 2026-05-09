const express = require("express");

const router = express.Router();

const db = require("./db");


// ==========================
// LOGIN
// ==========================
router.post("/login", (req, res) => {

  console.log("LOGIN BODY:");
  console.log(req.body);

  const { email, password } = req.body;

  const sql = `
    SELECT *
    FROM customer
    WHERE Email = ?
    AND Password = ?
  `;

  console.log("SQL QUERY:");
  console.log(sql);

  db.query(
    sql,
    [email, password],
    (err, result) => {

      // SQL ERROR
      if (err) {

        console.log("LOGIN SQL ERROR:");
        console.log(err);

        return res.status(500).json(err);
      }

      console.log("LOGIN RESULT:");
      console.log(result);

      // LOGIN SUCCESS
      if (result.length > 0) {

        res.json({
          success: true,
          user: result[0],
        });

      }

      // LOGIN FAILED
      else {

        res.json({
          success: false,
          message:
            "Invalid credentials",
        });
      }
    }
  );
});


// ==========================
// REGISTER
// ==========================
router.post("/register", (req, res) => {

  console.log("REGISTER BODY:");
  console.log(req.body);

  const {
    customerId,
    customerName,
    email,
    password,
    phone,
    address,
  } = req.body;

  const sql = `
    INSERT INTO customer
    (
      CustomerId,
      CustomerName,
      Email,
      Password,
      Phone,
      Address
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customerId,
      customerName,
      email,
      password,
      phone,
      address,
    ],
    (err, result) => {

      if (err) {

        console.log(
          "REGISTER ERROR:"
        );

        console.log(err);

        return res.status(500).json(err);
      }

      console.log(
        "REGISTER SUCCESS"
      );

      res.json({
        success: true,
        message:
          "User Registered Successfully",
      });
    }
  );
});


// ==========================
// GET ALL USERS
// ==========================
router.get("/", (req, res) => {

  const sql =
    "SELECT * FROM customer";

  db.query(sql, (err, result) => {

    if (err) {

      console.log(err);

      return res.status(500).json(err);
    }

    console.log("ALL USERS:");
    console.log(result);

    res.json(result);
  });
});

// ==========================
// GET SINGLE USER
// ==========================
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT CustomerId, CustomerName, Email, Phone, Address FROM customer WHERE CustomerId = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result[0]);
  });
});

module.exports = router;