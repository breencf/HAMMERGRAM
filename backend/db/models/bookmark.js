'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bookmark = sequelize.define('Bookmark', {
      postId: DataTypes.INTEGER,
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {});
  Bookmark.associate = function(models) {
    // associations can be defined here
    Bookmark.belongsTo(models.Post, { foreignKey: "postId" });
    Bookmark.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Bookmark;
};
