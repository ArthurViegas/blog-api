const express = require('express');
const postController = require('../controllers/postController');
const postValidation = require('../middlewares/fieldValidations');
const { checkToken, checkUpdateBody } = require('../middlewares/fieldValidations');

const validations = [
  postValidation.checkToken,
  postValidation.postHeader,
  postValidation.checkCategories,
];

const router = express.Router();

router.get('/search', checkToken, postController.search);
router.get('/', checkToken, postController.getAll);
router.get('/:id', checkToken, postController.getById);
router.post('/', validations, postController.createPost);
router.put('/:id', checkToken, checkUpdateBody, postController.updatePost);
router.delete('/:id', checkToken, postController.removePost);

module.exports = router;
