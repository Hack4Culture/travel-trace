'use strict';
module.exports = function(sequelize, DataTypes) {
  var Image = sequelize.define('Image', {
    public_id: DataTypes.STRING,
    version: DataTypes.BIGINT,
    signature: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    format: DataTypes.STRING,
    resource_type: DataTypes.STRING,
    url: DataTypes.STRING,
    secure_url: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Image.belongsTo(models.User, {
          foreignKey: 'UserId'
        });
      }
    }
  });
  return Image;
};
