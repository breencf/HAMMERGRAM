"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userId: { type: DataTypes.INTEGER, allowNull: false },
      postId: { type: DataTypes.INTEGER, allowNull: false },
      content: { type: DataTypes.TEXT, allowNull: false },
    },
    {}
  );
  Comment.associate = function (models) {
    Comment.belongsTo(models.Post, { foreignKey: "postId" });
    Comment.belongsTo(models.User, { foreignKey: "userId" });
    Comment.hasMany(models.Like, { foreignKey: "commentId" });
  };
  return Comment;
};
