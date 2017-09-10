module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('User', {
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false
    },

  });
  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: 'userId',
      as: 'posts',
    });
    User.hasMany(models.Trace, {
      foreignKey: 'userId',
      as: 'traces',
    });

    // User.hasMany(models.comment, {
    //   foreignKey: 'userId',
    //   as: 'post'
    // });
  }
  return User;
};