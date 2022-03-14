"use strict";
const { Validator } = require("sequelize");
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
          exclude: ["passwordHash", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: { attributes: { exclude: ["passwordHash"] } },
        loginUser: { attributes: {} },
      },
    }
  );

  User.prototype.toSafeObject = function () {
    const { id, name, username, bio, image, email } = this; //context is the user instance
    return { id, name, username, bio, image, email };
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.passwordHash.toString());
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
    const passwordHash = bcrypt.hashSync(password);
    const newUser = await User.create({
      username,
      name,
      image,
      email,
      passwordHash: passwordHash,
    });
    return await User.scope("currentUser").findByPk(newUser.id);
  };

  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
