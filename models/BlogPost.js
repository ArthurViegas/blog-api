module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  }, { createdAt: 'published', updatedAt: 'updated', timestamps: true });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      through: 'PostsCategories',
      as: 'categories',
    });
  };
  
  return BlogPost;
};
