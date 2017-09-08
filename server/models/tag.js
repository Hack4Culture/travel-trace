module.exports = function(sequelize, DataTypes) {
  const Tag = sequelize.define('Tag', {
    title: DataTypes.STRING
  });
  return Tag;
};