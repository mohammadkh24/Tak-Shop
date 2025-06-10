const { body } = require("express-validator");

const sentOtpValidator = [
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone number must be a string")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits")
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .withMessage("Invalid phone number format"),
];
const otpVerifyValidator = [
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isString()
    .withMessage("Phone number must be a string")
    .isLength({ min: 11, max: 11 })
    .withMessage("Phone number must be 11 digits")
    .matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)
    .withMessage("Invalid phone number format"),

  body("otp")
    .notEmpty()
    .withMessage("Otp is required")
    .isString()
    .withMessage("Otp must be a string")
    .withMessage("Invalid Otp format"),
];

module.exports = {sentOtpValidator, otpVerifyValidator};
