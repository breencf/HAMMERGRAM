const express = require('express')
const asyncHandler = require('express-async-handler')
const db = require('../../db/models')
const { requireAuth } = require("../../utils/auth");
const router = express.Router()

router.get(
    "/",
    asyncHandler(async (req, res, next) => {
      const posts = await db.Post.findAll({
        include: [
          db.User
        ],
      });
      res.json(posts);
    })
  );

module.exports = router;
