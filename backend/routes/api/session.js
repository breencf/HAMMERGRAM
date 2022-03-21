const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User } = require("../../db/models");
const db = require("../../db/models");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid password"),
  handleValidationErrors,
];
//login
router.post(
  "/",
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login(credential, password);

    if (!user) {
      const e = new Error("Login Failed");
      e.status = 401;
      e.title = "Login Failed";
      e.errors = ["The provided credentials were invalid"];
      return next(e);
    }

    await setTokenCookie(res, user);
    const following = await db.Follow.findAll({
      where: { followingUserId: user.id },
    });
    const likes = await db.Like.findAll({ where: { userId: user.id } });

    return res.json({ user, following, likes });
  })
);
//logout
router.delete(
  "/",
  asyncHandler(async (_req, res) => {
    res.clearCookie("token");
    return res.json({ message: "success" });
  })
);

//restore
router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (user) {
      const u = await User.findByPk(user.id);
      const following = await db.Follow.findAll({
        where: { followingUserId: u.id },
      });
      const likes = await db.Like.findAll({ where: { userId: u.id } });
      return res.json({
        user: u.toSafeObject(),
        following,
        likes,
      });
    } else return res.json({});
  })
);

module.exports = router;
