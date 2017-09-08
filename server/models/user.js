'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          message: 'Name cannot be empty'
        }
      }
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: {
          message: 'Username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          message: 'Invalid email address!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [4, 100],
          message: 'Password too short!'
        }
      }
    },
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Image, {
          foreignKey: 'UserId'
        });
      }
    }
  });
  return User;
};
