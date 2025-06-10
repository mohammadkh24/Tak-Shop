const express = require("express");
const controller = require("./categories.controller");
const validate = require("../../middlewares/validate");
const validator = require("./categories.validator");
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
    validator,
    validate,
    controller.add
  );

router
  .route("/:categoryId")
  .get(controller.getOne)
  .patch(auth, isAdmin, upload.single("image"),controller.update)
  .delete(auth, isAdmin, controller.remove);

module.exports = router;
