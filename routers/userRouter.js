const express = require('express');
const userController = require('../controllers/userController');
const fieldValidate = require('../middlewares/fieldValidations');
const { checkToken } = require('../middlewares/fieldValidations');

const validations = [
  fieldValidate.displayName,
  fieldValidate.checkPass,
  fieldValidate.email,
];

const router = express.Router();

router.get('/', checkToken, userController.getAll);
router.get('/:id', checkToken, userController.getById);
router.post('/', validations, userController.createUser);
router.delete('/me', checkToken, userController.removeUser);

module.exports = router;
