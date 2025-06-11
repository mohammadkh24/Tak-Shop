const { body } = require('express-validator');

const commentValidator = [
  body('body')
    .trim()
    .notEmpty().withMessage('Comment body cannot be empty')
    .isLength({ min: 3 }).withMessage('Comment must be at least 3 characters long'),

  body('rating')
    .notEmpty().withMessage('Rating is required')
    .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
];

module.exports = commentValidator;
