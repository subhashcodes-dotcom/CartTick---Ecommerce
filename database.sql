-- ==============================
-- DATABASE CREATION
-- ==============================
CREATE DATABASE ecommerce_db;
USE ecommerce_db;

-- ==============================
-- CUSTOMER TABLE
-- ==============================
CREATE TABLE Customer (
    CustomerId VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Password VARCHAR(100)
);

-- ==============================
-- ADMIN TABLE
-- ==============================
CREATE TABLE Admin (
    AdminId VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Password VARCHAR(100)
);

-- ==============================
-- PRODUCT TABLE
-- ==============================
CREATE TABLE Product (
    ProductId INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Price INT,
    Image VARCHAR(255)
);

-- ==============================
-- CART TABLE
-- ==============================
CREATE TABLE Cart (
    CartId VARCHAR(10) PRIMARY KEY,
    UserId VARCHAR(10),
    FOREIGN KEY (UserId) REFERENCES Customer(CustomerId)
);

-- ==============================
-- CART ITEMS TABLE
-- ==============================
CREATE TABLE CartItem (
    CartId VARCHAR(10),
    ProductId INT,
    Quantity INT,
    PRIMARY KEY (CartId, ProductId),
    FOREIGN KEY (CartId) REFERENCES Cart(CartId),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);

-- ==============================
-- ORDERS TABLE
-- ==============================
CREATE TABLE Orders (
    OrderId VARCHAR(10) PRIMARY KEY,
    UserId VARCHAR(10),
    CartId VARCHAR(10),
    FOREIGN KEY (UserId) REFERENCES Customer(CustomerId),
    FOREIGN KEY (CartId) REFERENCES Cart(CartId)
);

-- ==============================
-- ORDER ITEMS TABLE
-- ==============================
CREATE TABLE OrderItem (
    OrderId VARCHAR(10),
    ProductId INT,
    Quantity INT,
    PRIMARY KEY (OrderId, ProductId),
    FOREIGN KEY (OrderId) REFERENCES Orders(OrderId),
    FOREIGN KEY (ProductId) REFERENCES Product(ProductId)
);

-- ==============================
-- INSERT DATA (FROM YOUR JSON)
-- ==============================

-- Customers
INSERT INTO Customer VALUES
('086f','saurabh','sk@capgemini.com','123'),
('d2f9','kishor','kk@capgemini.com','123'),
('ae14','saurabh','ak@capgemini.com','123');

-- Admin
INSERT INTO Admin VALUES
('23bd','admin','admin@capgemini.com','123');

-- Products
INSERT INTO Product VALUES
(1001,'Laptop',80000,'/images/LgTv.jpg'),
(1003,'TV',20000,'/images/tv1.jpg'),
(1004,'Laptop',40000,'/images/Lap.jpg'),
(1005,'Tablet',2200,'/images/tv1.jpg'),
(1006,'Mobile',80000,'/images/htc.jpg'),
(1007,'Redmi Mobile',20000,'/images/mobile8.jpg'),
(1008,'Redmi Mobile',60000,'/images/mobile6.jpg'),
(1009,'Redmi Mobile',25000,'/images/mobile4.jpg'),
(10010,'Redmi Mobile',10000,'/images/redmipro.jpg'),
(10011,'iPhone',40000,'/images/Redmi.webp'),
(10012,'Camera',2200,'/images/camra.jpg'),
(10013,'Camera',2200,'/images/camra2.jpg'),
(10014,'Camera2',28000,'/images/camra3.jpg'),
(10015,'Computer',2200,'/images/Computer.jpg'),
(10016,'Watch',6200,'/images/watch.jpg'),
(10017,'Watch2',7200,'/images/watch2.jpg'),
(10018,'Watch3',4200,'/images/watch3.jpg'),
(10019,'HeadPhone',7200,'/images/headPhone.jpg'),
(10020,'HeadPhone',7200,'/images/headPhone2.jpg'),
(10021,'HeadPhone',7200,'/images/headPhone3.jpg');

-- Cart
INSERT INTO Cart VALUES
('510f','086f'),
('f6f7',NULL);

-- Cart Items
INSERT INTO CartItem VALUES
('510f',1003,14),
('510f',1008,4),
('510f',1009,3),
('510f',10019,3),
('510f',1004,1),
('f6f7',10016,1);

-- Orders
INSERT INTO Orders VALUES
('ae69','086f','2c27'),
('24fd','086f','e996');

-- Order Items
INSERT INTO OrderItem VALUES
('ae69',10012,2),
('ae69',1003,1),
('24fd',1001,5),
('24fd',1007,9),
('24fd',10010,1);

-- ==============================
-- IMPORTANT QUERIES
-- ==============================

-- 1. View all products
SELECT * FROM Product;

-- 2. Get products below price
SELECT * FROM Product WHERE Price < 30000;

-- 3. Join query (Orders + Products)
SELECT o.OrderId, p.ProductName, oi.Quantity
FROM Orders o
JOIN OrderItem oi ON o.OrderId = oi.OrderId
JOIN Product p ON oi.ProductId = p.ProductId;

-- 4. Total price per order
SELECT oi.OrderId, SUM(p.Price * oi.Quantity) AS TotalAmount
FROM OrderItem oi
JOIN Product p ON oi.ProductId = p.ProductId
GROUP BY oi.OrderId;

-- ==============================
-- TRIGGER
-- ==============================
DELIMITER $$

CREATE TRIGGER reduce_stock_after_order
AFTER INSERT ON OrderItem
FOR EACH ROW
BEGIN
    UPDATE Product
    SET Price = Price -- (placeholder logic, since no stock column)
    WHERE ProductId = NEW.ProductId;
END$$

DELIMITER ;