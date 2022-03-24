require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = {
  expiresIn: '60m',
  algorithm: 'HS256',
};

module.exports = (user) => {
  const { password: dbPass, ...newUser } = user;
  const token = jwt.sign(newUser, JWT_SECRET, JWT_CONFIG);
  return token;
};
