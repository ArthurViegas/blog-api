const { Category } = require('../models');

module.exports = {
  getAll: async () => {
    try {
      const categories = await Category.findAll();
      return categories;
    } catch (error) {
      const newError = { status: 500, message: 'Erro no interno' };
      throw newError;
    }
  },
  createCateg: async (categData) => {
    const { name } = categData;
    if (!name) {
      const nameErr = { status: 400, message: '"name" is required' }; 
      throw nameErr;
    }
    try {
      const checkDuplicated = await Category.findOne({ where: { name } });
      
      if (checkDuplicated) {
        const emailError = { status: 409, message: 'Category already registered' };
        throw emailError;
      }

      const newCateg = await Category.create({ name });
      
      return newCateg;
    } catch (error) {
      const newError = { status: error.status, message: error.message };
      throw newError;
    }
  },
};
