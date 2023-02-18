const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.get('/home',controller.renderHome);

router.get('/signUp',controller.renderSignUp);

module.exports = router;