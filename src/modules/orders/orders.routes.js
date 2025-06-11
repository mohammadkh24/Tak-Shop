const express = require("express");
const controller = require("./orders.controller");
const { auth } = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");

const router = express.Router();

router.get("/", auth, controller.userOrders);

router.get("/all", auth, isAdmin, controller.orders);

router.post("/checkout", auth, controller.checkout);
router.get("/checkout/verify", controller.verify);

module.exports = router;