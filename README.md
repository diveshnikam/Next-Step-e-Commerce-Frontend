
# 🛍️ Next Step – E-Commerce Shoe Platform (Frontend)

**Next Step** is a modern, fully responsive e-commerce platform for footwear built with **React**, **Bootstrap 5**, and **Context API**.
Users can explore products dynamically, search using a live search bar, add items to their cart or wishlist, manage addresses, and track past orders — all backed by a **Node.js + MongoDB REST API**.

---

## 📁 Project Structure

```
Next-Step-e-Commerce-Frontend/
├── public/                         # Static assets
├── src/
│   ├── assets/                     # Logos, banners, icons
│   ├── components/                 # Header, Footer, Filters, Cards, etc.
│   ├── context/                    # Global state (NextStepContext)
│   ├── customHooks/                # useFetch, useFetchSimilar
│   ├── pages/
│   │   ├── Products.jsx            # Product listing with filters
│   │   ├── ProductDetail.jsx       # Product details
│   │   ├── Cart.jsx                # Cart management
│   │   ├── Wishlist.jsx            # Wishlist management
│   │   ├── Checkout.jsx            # Address selection & order placement
│   │   ├── Orders.jsx              # Order history
│   │   └── UserProfile.jsx         # Static profile page
│   ├── App.jsx                     # Root component
│   ├── main.jsx                    # Entry point
│   └── App.css                     # Global styles
└── package.json
```

---

## ⚙️ Setup Instructions

```bash
git clone https://github.com/diveshnikam/Next-Step-e-Commerce-Frontend.git
cd Next-Step-e-Commerce-Frontend
npm install
npm run dev
```

Open → [http://localhost:5173](http://localhost:5173)

---

## 🌐 Backend Integration

**Base URL:** `https://next-step-ecommerce-backend.vercel.app`

---

## 🔗 API Overview (Detailed)

### 🩰 Product Routes

| Method | Endpoint                       | Description                                                      |
| ------ | ------------------------------ | ---------------------------------------------------------------- |
| `GET`  | `/shoes`                       | Fetch all shoes                                                  |
| `GET`  | `/shoe/id/:shoeId`             | Fetch product by ID                                              |
| `GET`  | `/shoes/category/:category`    | Fetch shoes by category                                          |
| `GET`  | `/homepage`                    | Fetch hot deals and trending products                            |
| `GET`  | `/products/similar/:productId` | Fetch similar products by category and gender                    |
| `GET`  | `/products/filter`             | Dynamic filter (category, gender, rating, discount, color, sort) |
| `GET`  | `/products/search?q=keyword`   | Search product by name or category                               |

---

### 🛒 Cart Routes

| Method   | Endpoint                           | Description                                             |
| -------- | ---------------------------------- | ------------------------------------------------------- |
| `GET`    | `/products/cart`                   | Fetch all cart items                                    |
| `POST`   | `/products/cart`                   | Add a product to cart (removes from wishlist if exists) |
| `POST`   | `/products/cart/increase/:id`      | Increase product quantity                               |
| `POST`   | `/products/cart/decrease/:id`      | Decrease product quantity (not below 1)                 |
| `DELETE` | `/products/cart/:id`               | Remove product from cart                                |
| `GET`    | `/products/cart/status/:productId` | Check if product exists in cart                         |

---

### 💖 Wishlist Routes

| Method   | Endpoint                               | Description                                                        |
| -------- | -------------------------------------- | ------------------------------------------------------------------ |
| `GET`    | `/products/wishlist`                   | Fetch all wishlist items                                           |
| `POST`   | `/products/wishlist`                   | Add/remove product from wishlist (toggle, removes from cart first) |
| `DELETE` | `/products/wishlist/:id`               | Delete product from wishlist                                       |
| `GET`    | `/products/wishlist/status/:productId` | Check if product exists in wishlist                                |

---

### 🏠 Address Routes

| Method   | Endpoint         | Description               |
| -------- | ---------------- | ------------------------- |
| `GET`    | `/addresses`     | Fetch all saved addresses |
| `POST`   | `/addresses`     | Add new address           |
| `POST`   | `/addresses/:id` | Edit (update) address     |
| `DELETE` | `/addresses/:id` | Delete address            |

---

### 📦 Order Routes

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| `POST` | `/products/orders` | Place a new order         |
| `GET`  | `/products/orders` | Fetch all previous orders |

---

## 🖥️ Features

### 🏷️ Product Listing & Filtering

* Dynamic product data from API
* Filter by **category**, **gender**, **rating**, **price**, **discount**, and **color**
* Real-time updates with responsive Bootstrap grid

### 🔍 Live Search Bar

* Integrated search bar in the header
* Automatically filters and displays products as you type
* Works seamlessly across all pages

### 👟 Product Details

* Displays image, title, price, MRP, and discount badge
* Add directly to cart or wishlist
* Similar products shown dynamically by category + gender

### 🛒 Cart Management

* Real-time quantity updates (increase/decrease)
* Remove items or move them to wishlist
* Dynamic subtotal + grand total calculation
* Cart count updates live in header
* Products remain saved in **cart** or **wishlist** — never both at the same time

### 💖 Wishlist

* Save favorites for later purchase
* One-click move between wishlist and cart
* Real-time badge count in header
* A product can exist in **either cart or wishlist**, not both simultaneously

### 🏠 Address Management

* View all saved addresses
* Add, edit, or delete addresses
* Used automatically during checkout

### 📦 Orders

* Displays full order history
* Includes product details, price, and date
* Auto-updates after each order placement

### 👤 User Profile

* Static profile page with name, email, phone, and address
* Buttons to “Add New Address” and “View Order History”

### 🧭 Header & Navigation

* Sticky navbar with live search bar and category links
* Cart 🛒 and Wishlist ❤️ icons show **real-time item counts**
* Fully responsive layout on all screen sizes

### 💬 Alerts & UX

* Toast-style success messages when adding/removing products
* Smooth transitions and hover effects throughout

---

## 🛠 Tech Stack

| Category             | Technology                              |
| -------------------- | --------------------------------------- |
| **Frontend**         | React 18, React Router DOM, Context API |
| **Styling**          | Bootstrap 5, Custom CSS                 |
| **State Management** | React Context API                       |
| **Data Fetching**    | Fetch API, Custom Hooks                 |
| **Backend**          | Node.js, Express.js                     |
| **Database**         | MongoDB Atlas                           |
| **Deployment**       | Vercel (Frontend + Backend)             |

---


🌍 [GitHub Profile](https://github.com/diveshnikam)
## 🌐 Live Demo
👉 [View Project Here](https://next-step-e-commerce-frontend-axqu.vercel.app/)

---

