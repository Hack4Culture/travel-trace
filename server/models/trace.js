module.exports = function(sequelize, DataTypes) {
  var Trace = sequelize.define('Trace', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    description: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  });
  Trace.associate = (models) => {
    Trace.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    })
  }
  return Trace;
};