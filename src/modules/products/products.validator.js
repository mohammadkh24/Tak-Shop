const { body } = require("express-validator");

const createProductValidator = [
  body("title")
    .notEmpty()
    .withMessage("Product title is required")
    .isLength({ min: 3 })
    .withMessage("Title must be at least 3 characters long"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("discount")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100"),

  body("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .isMongoId()
    .withMessage("Invalid category ID format"),
];

module.exports = {
  createProductValidator,
};
