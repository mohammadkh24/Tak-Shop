const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser")
const docsRoutes = require("./document/swagger.routes")
const authRoutes = require("./src/modules/auth/auth.routes")
const usersRoutes = require("./src/modules/users/users.routes")
const categoriesRoutes = require("./src/modules/categories/categories.routes")
const productsRoutes = require("./src/modules/products/products.routes")

const app = express();

// Set Public
app.use(express.static(path.join(__dirname, "public")));

// Get req.body
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/doc" , docsRoutes);
app.use("/auth" , authRoutes);
app.use("/users" , usersRoutes);
app.use("/categories" , categoriesRoutes);
app.use("/products" , productsRoutes);

// Not-Found Page
app.use((req,res) => {
    return res.status(404).json({
        message : "Path Not-Found!"
    })
})

module.exports = app