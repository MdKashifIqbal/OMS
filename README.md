# 🛒 MERN Order Management System

This is a MERN (MongoDB, Express, React, Node.js) stack-based Order Management System that supports user registration, login, order placement, and secure order viewing. Only authenticated users can view their own orders, and admins (if implemented) can view all orders.

---

## 📦 Features

- 🔐 User Authentication (via localStorage or session)
- 🧾 Create and fetch orders
- 👤 Users see only **their own** orders
- 🧑‍💼 Admins can view **all** orders (if implemented)
- 📊 Real-time order status: `PLACED`, `PICKED`, `SHIPPED`, `DELIVERED`
- 💰 Shows item-wise and total prices
- ⚡ Fast and responsive UI using Tailwind CSS

---

## 🧠 Tech Stack

| Layer      | Tech                  |
|------------|------------------------|
| Frontend   | React, React Router, TailwindCSS |
| Backend    | Node.js, Express.js   |
| Database   | MongoDB with Mongoose |
| Auth       | localStorage (JWT/session optional) |

```
project-root/
├── backend/
│ ├── controllers/
│ │ └── order.controller.js
│ ├── models/
│ │ ├── user.model.js
│ │ └── order.model.js
│ ├── routes/
│ │ └── order.route.js
│ └── server.js
│
├── client/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ │ └── Order.jsx
│ │ └── App.jsx
│ └── vite.config.js
│
└── .env
```

## ⚙️ Environment Setup

### 1. Backend `.env` file

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/orders-app

git clone https://github.com/your-username/mern-order-app.git
cd mern-order-app

# Backend
cd backend
npm install

# Frontend
cd ../client
npm install

# Backend
cd backend
npm run dev

# Frontend
cd ../client
npm run dev
