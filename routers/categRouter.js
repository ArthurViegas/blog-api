const express = require('express');
const categController = require('../controllers/categController');
const categValidations = require('../middlewares/fieldValidations');

const validations = [
  categValidations.checkToken,
];

const router = express.Router();

router.get('/', categValidations.checkToken, categController.getAll);
router.post('/', validations, categController.createCateg);

module.exports = router;
