const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const {singlePublicFileUpload, singleMulterUpload} = require("../../awss3")

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const posts = await db.Post.findAll({
      include: [db.User, db.Like, { model: db.Comment, include: [db.User] }],
      order: [["createdAt", "DESC"]],
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
    const { location, caption } = req.body;
    const { id } = req.params;
    const exists = await db.Post.findByPk(id);
    if (exists) {
      await exists.update({
        location: location,
        lat: null,
        lng: null,
        caption: caption,
      });
      const postToReturn = await db.Post.findByPk(exists.id, {
        include: [db.User, db.Like, { model: db.Comment, include: [db.User] }],
      });
      res.json(postToReturn);
    } else res.json("The specified post couldn't be found");
  })
);

router.post(
  "/", singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { id, caption, location} = req.body;
    const postImageURL = await singlePublicFileUpload(req.file)
    const post = await db.Post.create({ userId: id, caption, image: postImageURL, location });
    const postToReturn = await db.Post.findByPk(post.id, {
      include: [db.User, db.Like, { model: db.Comment, include: [db.User] }],
    });
    res.json(postToReturn);
  })
);

router.post(
  "/:id/like",
  asyncHandler(async (req, res) => {
    const { userId, postId } = req.body;
    const exists = await db.Like.findOne({
      where: { postId, userId },
    });
    if (exists) {
      await db.Like.destroy({ where: { postId, userId } });
      await db.Post.findByPk(postId)
      res.json("destroyed");
    } else {
      const like = await db.Like.create({ postId, userId });
      res.json(like);
    }
  })
);

router.post(
  "/:id/comments",
  asyncHandler(async (req, res) => {
    const { userId, postId, content } = req.body;
    const comment = await db.Comment.create({
      userId,
      postId,
      content,
    });

    const newComment = await db.Comment.findByPk(comment.id, {
      include: [db.User],
    });
    res.json(newComment);
  })
);

router.delete(
  "/comments/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const exists = await db.Comment.findOne({
      where: { id },
    });
    if (exists) {
      await db.Comment.destroy({
        where: { id },
      });
      res.json(exists);
    }
  })
);


module.exports = router;
