const userServices = require('../services/userServices');
const { decodeToken } = require('../utils/verifyToken');

module.exports = {
  getAll: async (_req, res, next) => {
    try {
      const users = await userServices.getAll();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await userServices.getById(id);
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  createUser: async (req, res, next) => {
    try {
      const newUser = await userServices.createUser(req.body);
      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  removeUser: async (req, res, next) => {
    const { authorization } = req.headers;
    const { id } = decodeToken(authorization);  
    try {
      await userServices.removeUser(id);
      return res.status(204).end();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};