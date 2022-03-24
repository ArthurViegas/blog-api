const express = require('express');
const loginController = require('../controllers/loginController');
const loginValidations = require('../middlewares/fieldValidations');

const validations = [
  loginValidations.email,
  loginValidations.checkPass,
];

const router = express.Router();

router.post('/', validations, loginController.login);

module.exports = router;
