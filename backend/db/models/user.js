"use strict";
const { Validator } = require("sequelize");
const bcrypt = require("bcryptjs");
const db = require("../models");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 50],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [3, 256] },
      },
      bio: { type: DataTypes.STRING },
      image: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue:
          "https://www.bu.edu/afam/files/2015/09/default-facebook-avatar-female.gif",
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: { attributes: { exclude: ["hashedPassword"] } },
        loginUser: { attributes: {} },
      },
    }
  );

  User.prototype.toSafeObject = function () {
    const { id, name, username, bio, image, email } = this; //context is the user instance
    return { id, name, username, bio, image, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };

  User.getCurrentUserById = async function (id) {
    return await User.scope("currentUser").findByPk(id);
  };

  User.login = async function (credential, password) {
    const userByEmail = await User.scope("loginUser").findOne({
      where: { email: credential },
    });
    const userByUsername = await User.scope("loginUser").findOne({
      where: { username: credential },
    });
    let user = null;
    if (userByEmail) user = userByEmail;
    if (userByUsername) user = userByUsername;
    if (user && user.validatePassword(password)) {
      return await User.scope("currentUser").findByPk(user.id);
    }
  };

  User.signup = async function ({ username, name, image, email, password }) {
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = await User.create({
      username,
      name,
      image,
      email,
      hashedPassword: hashedPassword,
    });
    return await User.scope("currentUser").findByPk(newUser.id);
  };

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: "userId" });
    User.hasMany(models.Comment, { foreignKey: "userId" });
    User.hasMany(models.Like, { foreignKey: "userId" });
    User.hasMany(models.Follow, {
      as: "Followers",
      foreignKey: "followedUserId",
    });
    User.hasMany(models.Follow, {
      as: "Followings",
      foreignKey: "followingUserId",
    });
  };
  return User;
};
