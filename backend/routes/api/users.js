const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const db = require("../../db/models");
const router = express.Router();

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
        db.Post,
      ],
    });
    res.json(user);
  })
);

router.post(
  "/:id/follow",
  asyncHandler(async (req, res) => {
    const { followerUserId, followingUserId  } = req.body;
    console.log(followerUserId, followingUserId)
    const exists = await db.Follow.findOne({
      where: { followerUserId, followingUserId },
    });
    console.log(exists)
    if (exists) {
      await db.Follow.destroy({ where: { followerUserId, followingUserId } });
      res.json("destroyed");
    } else {
      const follow = await db.Follow.create({ followerUserId, followingUserId });
      res.json(follow);
    }
  })
);

module.exports = router;
