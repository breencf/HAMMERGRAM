"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      image: { type: DataTypes.TEXT, allowNull: false },
      location: DataTypes.STRING,
      lat: DataTypes.DECIMAL,
      lng: DataTypes.DECIMAL,
      userId: { type: DataTypes.INTEGER, allowNull: false },
      caption: DataTypes.STRING(400),
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.Like, {foreignKey:"postId"})
    Post.hasMany(models.Comment, {foreignKey:"postId"})

  };
  return Post;
};
