const express = require('express');
const controller = require('./commemts.controller');
const { auth } = require('../../middlewares/auth');
const validator = require('./comments.validator');
const validate = require('../../middlewares/validate');

const router = express.Router();

router.post('/', auth, validator, validate ,controller.createComment);

router.get('/:productId', controller.getCommentsByProduct);

router.delete('/:commentId', auth, controller.deleteComment);

module.exports = router;
