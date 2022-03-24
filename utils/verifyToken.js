require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = {
  verifyToken: (token) => {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      const tokenError = { status: 401, message: 'Expired or invalid token' };
      throw tokenError;
    }
  },
  decodeToken: (token) => {
    try {
      const decoded = jwt.decode(token, JWT_SECRET);
      return decoded;
    } catch (error) {
      const tokenError = { status: 401, message: 'Expired or invalid token' };
      throw tokenError;
    }
  },
};