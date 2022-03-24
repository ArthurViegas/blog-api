const postServices = require('../services/postServices');
const { decodeToken } = require('../utils/verifyToken');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const allPosts = await postServices.getAll();
      return res.status(200).json(allPosts);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  getById: async (req, res, next) => {
    try {
      const post = await postServices.getById(req.params.id);
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  search: async (req, res, next) => {
    try {
      const post = await postServices.search(req.query.q);
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  createPost: async (req, res, next) => {
    const { authorization } = req.headers;
    const { id } = decodeToken(authorization);
    try {
      const newPost = await postServices.createPost(req.body, id);
      return res.status(201).json(newPost);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  updatePost: async (req, res, next) => {
    const { authorization } = req.headers;
    const { id } = decodeToken(authorization);
    const { title, content } = req.body;
    try {
      const post = await postServices.updatePost(req.params.id, { title, content, id });
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  removePost: async (req, res, next) => {
    const { authorization } = req.headers;
    const { id } = decodeToken(authorization);
    try {
      await postServices.removePost(req.params.id, id);
      return res.status(204).end();
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
};