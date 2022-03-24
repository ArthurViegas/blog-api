const categServices = require('../services/categServices');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const categs = await categServices.getAll(req.body);
      return res.status(200).json(categs);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  createCateg: async (req, res, next) => {
    try {
      const newCateg = await categServices.createCateg(req.body);
      return res.status(201).json(newCateg);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};