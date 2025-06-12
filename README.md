# 🛍️ TakShop

TakShop is a minimalist and extensible **e-commerce backend** built with **Node.js**, **Express.js**, and **MongoDB**.  
It supports user authentication, product and order management, and integrates with **Zarinpal** for payment processing.

---

## 🚀 Features

- 🧾 **Product Management** – CRUD operations for products
- 👤 **User Authentication** – JWT-based secure auth
- 📦 **Order System** – Checkout & order verification
- 💳 **Payment Integration** – Zarinpal gateway
- 🛡️ **Admin Role Support** – Protect and manage endpoints
- 🔍 **Pagination & Filtering** – API query support
- 📄 **Swagger Documentation** – Ready for testing & development

---

## 🧪 API Documentation

Swagger UI is available at:  
[https://tak-shop.onrender.com/doc/]

All endpoints are documented, including request/response samples.

---

## ⚙️ Technologies

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- Zarinpal SDK
- Swagger (OpenAPI)

---

## 🧰 Setup Instructions

1. **Clone the repo**  
   git clone https://github.com/mohammadkh24/Tak-Shop
   cd takshop

2. **Install dependencies**  
   npm install

3. **Setup environment**  
   Create a `.env` file based on `.env.example` and configure your MongoDB, JWT, and Zarinpal credentials.

4. **Start the server**  
   npm run dev

---

## 📦 Example `.env`

PORT=5000
MONGO_URI=mongodb://localhost:27017/ToranjRefactor

JWT_SECRET=d9bd9dc9-0073-4ab7-b1cb-1579e73e66a2

Redis_URI= redis://localhost:6379	

# ZarinPal
ZARINPAL_MERCHANT_ID=cf74046c-b2bd-41b1-962f-a705af51a62c
ZARINPAL_PAYMENT_CALLBACK_URL=http://localhost:5000/orders/checkout/verify
ZARINPAL_PAYMENT_BASE_URL=https://sandbox.zarinpal.com/pg/StartPay/
ZARINPAL_API_BASE_URL=https://sandbox.zarinpal.com/pg/v4/payment

NODE_ENV= development

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first  
to discuss what you would like to change.

---

## 🧠 Author

**Created by:** [mohammadkh24]  
💬 Feedback & stars are appreciated!
