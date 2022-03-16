const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const posts = await db.Post.findAll({
      include: [db.User, db.Like, { model: db.Comment, include: [db.User] }],
    });
    res.json(posts);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const post = await db.Post.findByPk(id, {
      include: [db.User, db.Like, { model: db.Comment, include: [db.User] }],
    });
    console.log(post);
    res.json(post);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const exists = await db.Post.findByPk(id);
    if (exists) {
      await db.Post.destroy({
        where: { id },
      });
      res.json(exists.id);
    }
  })
);

router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const post = req.body;
    const { id } = req.params;
    const exists = await db.Post.findByPk(id);
    if (exists) {
      await exists.update({
        image: post.image,
        location: post.location,
        lat: null,
        lng: null,
        caption: post.caption,
      });
      const postToReturn = await db.Post.findByPk(exists.id, {
        include: [db.User, db.Like, db.Comment],
      });
      res.json(postToReturn);
    } else res.json("The specified post couldn't be found");
  })
);

module.exports = router;
