const loginServices = require('../services/loginServices');

module.exports = {
  login: async (req, res, next) => {
    console.log('entrou na controller login');
    const { email, password } = req.body;
    try {
      const token = await loginServices.login({ email, password });
      return res.status(200).json(token);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } };  