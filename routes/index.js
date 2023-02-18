const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.get('/',controller.renderSignIn);
router.get('/sign-up',controller.renderSignUp);

module.exports = router;