const express = require("express");
const asyncHandler = require("express-async-handler");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Follow } = require("../../db/models");

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
    const userWithFollowing = await User.findByPk(user.id, {
      include: {
        model: Follow,
        as: "Followings",
        where: { followingUserId: user.id },
      },
    });
    console.log("====================");
    console.log(user);
    console.log("====================");
    console.log(userWithFollowing.Followings);
    console.log("====================");
    return res.json({ user: userWithFollowing });
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

router.get(
  "/",
  restoreUser,
  asyncHandler(async (req, res) => {
    const { user } = req;
    if (user) {
      const userWithFollowing = await User.findByPk(user.id, {
        include: {
          model: Follow,
          as: "Followings",
          where: { followingUserId: user.id },
        },
      });
      return res.json({
        // user: user.toSafeObject(),
        user: userWithFollowing,
      });
    } else return res.json({});
  })
);

module.exports = router;
