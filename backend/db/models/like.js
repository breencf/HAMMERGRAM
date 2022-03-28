"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      postId: DataTypes.INTEGER,
      commentId: DataTypes.INTEGER,
      userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Like.associate = function (models) {
    Like.belongsTo(models.Post, { foreignKey: "postId" });
    Like.belongsTo(models.User, { foreignKey: "userId" });
    Like.belongsTo(models.Comment, { foreignKey: "userId" });
  };
  return Like;
};
