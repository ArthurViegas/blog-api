const { User } = require('../models');
const generateToken = require('../utils/generateToken');

module.exports = {
  login: async (userData) => {
    const { email, password } = userData;
    try {
      const user = await User.findOne({ where: { email } });

      if (!user || user.password !== password) {
        const fieldsError = { status: 400, message: 'Invalid fields' };
        throw fieldsError;
      }
      const token = generateToken(user.dataValues);
      
      return { token };
    } catch (error) {
      const newError = { status: error.status, message: error.message };
      throw newError;
    }
  },

};
