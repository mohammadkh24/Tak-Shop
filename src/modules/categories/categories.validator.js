const { body } = require("express-validator");

const categoryValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("slug")
    .notEmpty()
    .withMessage("Slug is required")
    .isString()
    .withMessage("Slug must be a string")
    .isSlug()
    .withMessage("Slug must be a valid slug"),
];

module.exports = categoryValidator;
