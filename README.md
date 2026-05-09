# CartTick---Ecommerce
Ecommerce Shopping Website
# CartTick

CartTick is a full-stack e-commerce web application developed using React.js, Node.js, Express.js, and MySQL. The platform is designed to provide a modern and responsive online shopping experience with real-time cart management, secure authentication, category-based product browsing, and order management.

The project focuses on combining a clean user interface with efficient backend operations and database integration to simulate a real-world e-commerce workflow.

---

## Features

* User Registration and Login Authentication
* Product Catalog with Category Filtering
* Product Detail View
* Shopping Cart Management
* Increase and Decrease Product Quantity
* Remove Products from Cart
* Order History Tracking
* User Profile Section
* Responsive Design for Mobile and Desktop
* MySQL Database Integration
* REST API Communication using Axios
* Modern Navigation Bar and UI Design

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* CSS3

### Backend

* Node.js
* Express.js

### Database

* MySQL

---

## Project Structure

```bash
CartTick/
│
├── FrontEnd/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── images/
│   │   ├── App.js
│   │   └── index.js
│
├── Backend/
│   ├── routes/
│   ├── db.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/your-username/CartTick.git
```

### Navigate to the Project

```bash
cd CartTick
```

---

# Frontend Setup

### Move to Frontend Directory

```bash
cd FrontEnd
```

### Install Dependencies

```bash
npm install
```

### Start Frontend Server

```bash
npm start
```

Frontend will run on:

```bash
http://localhost:3000
```

---

# Backend Setup

### Move to Backend Directory

```bash
cd Backend
```

### Install Dependencies

```bash
npm install
```

### Start Backend Server

```bash
node server.js
```

Backend will run on:

```bash
http://localhost:3001
```

---

# Database Setup

### Create Database

```sql
CREATE DATABASE carttick;
```

### Use Database

```sql
USE carttick;
```

### Create Required Tables

Example:

```sql
CREATE TABLE customer (
    CustomerId VARCHAR(10) PRIMARY KEY,
    Name VARCHAR(100),
    Email VARCHAR(100),
    Password VARCHAR(100)
);
```

```sql
CREATE TABLE cartitem (
    CartId VARCHAR(10),
    ProductId INT,
    Quantity INT
);
```

Additional tables can be created for:

* Products
* Orders
* Categories
* Cart

---

## API Functionality

The backend APIs handle:

* User Authentication
* Product Retrieval
* Cart Operations
* Quantity Updates
* Order Management
* User Data Fetching

REST APIs are integrated with the React frontend using Axios.

---

## UI and Design

CartTick is designed with a modern e-commerce layout inspired by contemporary shopping platforms. The interface includes:

* Responsive Navbar
* Search Section
* Category Navigation
* Product Cards
* Interactive Cart System
* Mobile-Friendly Layout

The application is optimized for both desktop and mobile devices.

---

## Learning Outcomes

This project helped in gaining practical experience in:

* Full-Stack Web Development
* REST API Development
* React State Management
* MySQL Database Operations
* Frontend and Backend Integration
* Responsive Web Design
* Debugging and Error Handling

---

## Future Enhancements

* Payment Gateway Integration
* Wishlist Functionality
* Product Reviews and Ratings
* Admin Dashboard
* Live Product Search
* JWT Authentication
* Order Tracking System

---

## Author

Subhash Chandra
Full Stack Developer

---
###Images of Application

##Home Page
<img width="959" height="491" alt="image" src="https://github.com/user-attachments/assets/d8cf3d7f-b3eb-4327-9526-a14b4514c029" />



<img width="959" height="491" alt="image" src="https://github.com/user-attachments/assets/26918fda-5ca2-47c9-8ed2-34884863f581" />



<img width="959" height="479" alt="image" src="https://github.com/user-attachments/assets/05de44d2-6f7e-4c47-b1cd-25937f13f20a" />


##About Page
<img width="959" height="500" alt="image" src="https://github.com/user-attachments/assets/6ec41ae1-fcab-4393-a7aa-c03bf45ac554" />




##Cart
<img width="947" height="494" alt="image" src="https://github.com/user-attachments/assets/a8b4c524-155c-4987-a661-d44a1971db01" />




##Categories
<img width="952" height="517" alt="image" src="https://github.com/user-attachments/assets/8a173137-2cd6-4d64-9ca9-f54e41ec387a" />



##Profile
<img width="958" height="495" alt="image" src="https://github.com/user-attachments/assets/6ba15f61-e112-4067-b9be-558f335e1cd9" />




## License

This project is developed for educational and portfolio purposes.
