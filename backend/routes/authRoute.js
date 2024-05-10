
const express = require('express');
const router = express.Router();
const authController = require('../controllers/loginAdmin');

router.post('/login', authController.login);

module.exports = router;
