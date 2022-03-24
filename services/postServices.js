const { Op } = require('sequelize');
const { BlogPost, Category, User } = require('../models');

module.exports = {
  getAll: async () => {
    try {
      const allPosts = await BlogPost.findAll({
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      return allPosts.map((post) => post.dataValues);
    } catch (error) {
      const newError = { status: error.status, message: error.message };
      throw newError;
    }
  },
  getById: async (id) => {
    try {
      const post = await BlogPost.findOne({
        where: { id },
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      if (post === null) {
        const postNull = { status: 404, message: 'Post does not exist' };
        throw postNull;
      }

      return post.dataValues;
    } catch (error) {
      const newError = { status: error.status, message: error.message };
      throw newError;
    }
  },
  search: async (query) => {
    try {
      if (!query) {
        const all = await module.exports.getAll();
        return all;
      }
      const post = await BlogPost.findAll({
        where: { [Op.or]: [{ title: query }, { content: query }] },
        include: [
          { model: User, as: 'user', attributes: { exclude: ['password'] } },
          { model: Category, as: 'categories', through: { attributes: [] } },
        ],
      });
      return post;
    } catch (error) {
      const newError = { status: error.status, message: error.message };
      throw newError;
    }
  },
  createPost: async (postData, userId) => {
    const { title, content, categoryIds } = postData;
    try {
      const newPost = await BlogPost.create({
        title,
        content,
        categoryIds,
        userId });
        
        return newPost;
      } catch (error) {
        const newError = { status: error.status, message: error.message };
        throw newError;
      }
  },
  updatePost: async (postId, { title, content, id }) => {
    try {
      const post = await BlogPost.findOne({
        where: { id: postId },
        include: [{ model: Category, as: 'categories', through: { attributes: [] } }] });
     
      if (post === null) {
        const postNull = { status: 404, message: 'Post does not exist' };
        throw postNull;
      }
      if (post.dataValues.id !== id) {
        const postNull = { status: 401, message: 'Unauthorized user' };
        throw postNull;
      }
      await post.update({ title, content });

      return post;
    } catch (error) {
      const newError = { status: error.status, message: error.message };
      throw newError;
    }
  },
  removePost: async (postId, userId) => {
    console.log(postId, userId);
    try {
      const post = await BlogPost.findByPk(postId);
      if (post === null) {
        const postNull = { status: 404, message: 'Post does not exist' };
        throw postNull;
      }
      if (post.dataValues.id !== userId) {
        const postNull = { status: 401, message: 'Unauthorized user' };
        throw postNull;
      }

      await post.destroy();

      return true;
    } catch (error) {
      const newError = { status: error.status, message: error.message };
      throw newError;
    }
  },
};
