const express = require("express");
const controller = require("./users.controller");
const { auth } = require("../../middlewares/auth");
const isAdmin = require("../../middlewares/isAdmin");
const multer = require("multer");
const upload = require("../../utils/uploader");

const router = express.Router();

router
  .route("/")
  .get(auth, isAdmin, controller.getAll)
  .patch(auth, upload.single("avatar"), controller.edit);

router.route("/:userId").delete(auth, isAdmin, controller.remove).get(auth , isAdmin , controller.getOne)

router.route("/:userId/role").put(auth, isAdmin, controller.changeRole);

module.exports = router;
