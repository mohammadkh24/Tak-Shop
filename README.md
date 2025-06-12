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

## 📂 Project Structure

takshop/
├── models/               # Mongoose schemas
├── modules/              # Orders, users, products
├── services/             # Payment service (Zarinpal)
├── middlewares/          # Auth & Role checks
├── routes/               # Express route handlers
└── index.js              # App entry point

---

## 🧪 API Documentation

Swagger UI is available at:  
http://localhost:<PORT>/api-docs

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
   git clone https://github.com/your-username/takshop.git  
   cd takshop

2. **Install dependencies**  
   npm install

3. **Setup environment**  
   Create a `.env` file based on `.env.example` and configure your MongoDB, JWT, and Zarinpal credentials.

4. **Start the server**  
   npm run dev

---

## 📦 Example `.env`

PORT=3000  
MONGO_URI=mongodb://localhost:27017/takshop  
JWT_SECRET=your_jwt_secret  
ZARINPAL_MERCHANT_ID=your_zarinpal_merchant_id

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first  
to discuss what you would like to change.

---

## 📜 License

MIT

---

## 🧠 Author

**Created by:** [Your Name or GitHub Username]  
💬 Feedback & stars are appreciated!
