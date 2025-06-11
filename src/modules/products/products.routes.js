const express = require("express");
const controller = require("./products.controller");
const validate = require("../../middlewares/validate");
const { createProductValidator } = require("./products.validator");
const { auth } = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const upload = require("../../utils/uploader");

const router = express.Router();

router
  .route("/")
  .get(controller.getAll)
  .post(
    auth,
    isAdmin,
    upload.single("image"),
    createProductValidator,
    validate,
    controller.create
  );

router
  .route("/:productId")
  .get(controller.getOne)
  .post(
    auth,
    isAdmin,
    upload.single("image"),
    createProductValidator,
    validate,
    controller.update
  )
  .delete(auth, isAdmin, controller.remove);

module.exports = router;
