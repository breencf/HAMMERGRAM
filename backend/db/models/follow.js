"use strict";
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {
      followingUserId: { type: DataTypes.INTEGER, allowNull: false },
      followedUserId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {}
  );
  Follow.associate = function (models) {
    Follow.belongsTo(models.User, {
      as: "Followers",
      foreignKey: "followedUserId",
    });
    Follow.belongsTo(models.User, {
      as: "Followings",
      foreignKey: "followingUserId",
    });
  };
  return Follow;
};
