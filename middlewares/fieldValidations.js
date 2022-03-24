const { verifyToken } = require('../utils/verifyToken');
const { Category } = require('../models');

module.exports = {
  displayName: (req, res, next) => {
    const { displayName } = req.body;

    if (displayName.length < 8) {
      return res.status(400)
        .json({ message: '"displayName" length must be at least 8 characters long' }); 
    }
    
    next();
  },
  checkPass: (req, res, next) => {
    const { password } = req.body;
    if (password === undefined) {
      return res.status(400).json({ message: '"password" is required' }); 
    }
    if (!password) {
      return res.status(400).json({ message: '"password" is not allowed to be empty' }); 
    }
    if (password.length !== 6) {
      return res.status(400)
        .json({ message: '"password" length must be 6 characters long' }); 
    }

    next();
  },
  postHeader: async (req, res, next) => {
    const { title, categoryIds, content } = req.body;

    if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' }); 
    if (!title) return res.status(400).json({ message: '"title" is required' }); 
    if (!content) return res.status(400).json({ message: '"content" is required' });
    
    next();
  },
  checkCategories: async (req, res, next) => {
    const { categoryIds } = req.body;

    const allCategs = await Category.findAll();
    const categsIds = allCategs.map(({ id }) => id);

    if (!categoryIds.every((category) => categsIds.includes(category))) {
      return res.status(400).json({ message: '"categoryIds" not found' });
    }
    next();
  },
  email: async (req, res, next) => {
    const { email } = req.body;
    // regex para validar email pego no stack overflow; LINK: https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (email === undefined) return res.status(400).json({ message: '"email" is required' });
    if (!email) return res.status(400).json({ message: '"email" is not allowed to be empty' });

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: '"email" must be a valid email' });
    }
  
    next();
  },
  checkToken: (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });
    
    verifyToken(authorization);

    next();
  },
  checkUpdateBody: (req, res, next) => {
    const { categoryIds, title, content } = req.body;
    if (categoryIds) return res.status(400).json({ message: 'Categories cannot be edited' });
    if (!title) return res.status(400).json({ message: '"title" is required' });
    if (!content) return res.status(400).json({ message: '"content" is required' });
    next();
  },
};