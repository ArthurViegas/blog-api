const { User } = require('../models');
const generateToken = require('../utils/generateToken');

module.exports = {
  createUser: async (userData) => {
    const { displayName, email, password, image } = userData;
    try {
      const checkDuplicated = await User.findOne({ where: { email } });
      
      if (checkDuplicated) {
        const emailError = { status: 409, message: 'User already registered' };
        throw emailError;
      }

      const newUser = await User.create({ displayName, email, password, image });
      const token = generateToken(newUser);
      
      return ({
        token,
      });
    } catch (error) {
      const newError = { status: error.status, message: error.message };
      throw newError;
    }
  },
  getAll: async () => {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      const newError = { status: 500, message: 'Erro no interno' };
      throw newError;
    }
  },
  getById: async (id) => {
    try {
      const { dataValues } = await User
        .findOne({ where: { id }, attributes: { exclude: ['password'] } });
      return dataValues;
    } catch (error) {
      const newError = { status: 404, message: 'User does not exist' };
      throw newError;
    }
  },
  removeUser: async (id) => {
  try {
    const user = await User.findByPk(id);
    if (user.dataValues.id !== id) {
      const postNull = { status: 401, message: 'Unauthorized user' };
      throw postNull;
    }
    return true;
  } catch (error) {
    const newError = { status: 404, message: 'User does not exist' };
    throw newError;
  }
},
};
