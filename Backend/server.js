const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(cors());
app.use(bodyParser.json());

/* STATIC IMAGES FOLDER */
app.use(
  "/images",
  express.static(
    path.join(__dirname, "images")
  )
);

/* ROUTES */
const productRoutes = require("./productRoutes");
const userRoutes = require("./userRoutes");
const orderRoutes = require("./orderRoutes");
const cartRoutes =
  require("./cartRoutes");

app.use(
  "/api/cart",
  cartRoutes
);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

app.listen(3001, "0.0.0.0", () => {
  console.log("Server running on port 3001 on all interfaces");
});