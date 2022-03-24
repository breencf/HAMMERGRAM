const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const db = require("../../db/models");
const router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const validateSignup = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email"),
  check("name").exists({ checkFalsy: true }).withMessage("A name is required."),
  check("username")
    .exists({ checkFalsy: true })
    .isLength({ min: 3 })
    .withMessage(
      "Please provide a username that is a minimum of 3 characters and on in use"
    ),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
  handleValidationErrors,
];

router.post(
  "/",
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, name, image, password, username } = req.body;
    const user = await User.signup({ email, name, image, password, username });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await db.User.findByPk(id, {
      include: [
        { model: db.Follow, as: "Followers" },
        { model: db.Follow, as: "Followings" },
        { model: db.Post, include: [db.Like, db.User] },
      ],
    });
    res.json(user);
  })
);

router.post(
  "/:id/follow",
  asyncHandler(async (req, res) => {
    const { followedUserId, followingUserId } = req.body;
    const exists = await db.Follow.findOne({
      where: { followedUserId, followingUserId },
    });
    if (exists) {
      await db.Follow.destroy({ where: { followedUserId, followingUserId } });
      res.json("destroyed");
    } else {
      const follow = await db.Follow.create({
        followedUserId,
        followingUserId,
      });
      res.json(follow);
    }
  })
);

router.get(
  "/:id/activity",
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const likes = await db.Like.findAll({
      include: [{ model: db.Post, where: { userId: id } }, db.User],
    });
    const comments = await db.Comment.findAll({
      include: [{ model: db.Post, where: { userId: id } }, db.User],
    });
    const follows = await db.Follow.findAll({
      where: { followedUserId: id },
      include: [{ model: db.User, as: "Followings" }],
    });

    const activities = [...likes, ...comments, ...follows].sort(
      (a, b) => b.createdAt - a.createdAt
    );

    res.json(activities);
  })
);

router.post(
  "/search",
  asyncHandler(async (req, res) => {
    const { value } = req.body;
    let data = await db.User.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${value}%` } },
          { username: { [Op.like]: `%${value}%` } },
        ],
      },
    });

    res.json(data);
  })
);

router.get(
  "/:id/followers",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const follows = await db.Follow.findAll({
      where: { followedUserId: id }
    });

    followersArr = follows.map((follow) => follow.followingUserId);
    const followers = await db.User.findAll({ where: {id: {[Op.in]: followersArr }}});

    res.json(followers);
  })
);

router.get(
  "/:id/following",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const followings = await db.Follow.findAll({
      where: { followingUserId: id }
    });

    followingsArr = followings.map((follow) => follow.followedUserId);
    const following = await db.User.findAll({ where: {id: {[Op.in]: followingsArr }}});

    res.json(following);
  })
);

module.exports = router;
