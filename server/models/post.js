module.exports = function(sequelize, DataTypes) {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER
    },
    tags: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING
    },
    excerpt: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    }
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }
  return Post;
};