const express = require("express");
const asyncHandler = require("express-async-handler");
const db = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const router = express.Router();
const { singlePublicFileUpload, singleMulterUpload } = require("../../awss3");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get(
  "/feed/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const following = await db.Follow.findAll({
      where: { followingUserId: id },
    });

    idArr = following.map((follow) => follow.followedUserId);

    const posts = await db.Post.findAll({
      where: { userId: idArr },
      include: [db.User, db.Like, { model: db.Comment, include: [db.User] }],
    });

    const sortedPosts = posts.sort((a, b) => b.id - a.id);
    res.json(sortedPosts);
  })
);

router.get(
  "/random/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const postsFromStrangers = await db.Post.findAll({
      where: {
        [Op.not]: [{ userId: id }],
      },
      include: [db.User, db.Like, { model: db.Comment, include: [db.User] }],
    });

    const shuffleArray = (array) => {
      let curId = array.length;
      // There remain elements to shuffle
      while (0 !== curId) {
        // Pick a remaining element
        let randId = Math.floor(Math.random() * curId);
        curId -= 1;
        // Swap it with the current element.
        let tmp = array[curId];
        array[curId] = array[randId];
        array[randId] = tmp;
      }
      return array;
    };

    const shuffled = shuffleArray(postsFromStrangers);

    res.json(shuffled.slice(0, 18));
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const post = await db.Post.findByPk(id, {
      include: [
        db.User,
        { model: db.Like, include: [db.User] },
        { model: db.Comment, include: [db.User] },
      ],
    });
    res.json(post);
  })
);

router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const exists = await db.Post.findByPk(id);
    if (exists) {
      await db.Comment.destroy({ where: { postId: id } });
      await db.Like.destroy({ where: { postId: id } });
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
  "/",
  singleMulterUpload("image"),
  asyncHandler(async (req, res) => {
    const { id, caption, location } = req.body;
    const postImageURL = await singlePublicFileUpload(req.file);
    const post = await db.Post.create({
      userId: id,
      caption,
      image: postImageURL,
      location,
    });
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
      await db.Post.findByPk(postId);
      res.json("destroyed");
    } else {
      const like = await db.Like.create({ postId, userId });
      res.json(like);
    }
  })
);

// router.post(
//   "/:id/bookmark",
//   asyncHandler(async (req, res) => {
//     const { userId, postId } = req.body;
//     const exists = await db.Bookmark.findOne({
//       where: { postId, userId },
//     });
//     if (exists) {
//       await db.Bookmark.destroy({ where: { postId, userId } });
//       await db.Post.findByPk(postId);
//       res.json("destroyed");
//     } else {
//       const bm = await db.Bookmark.create({ postId, userId });
//       const bmWid = await db.Bookmark.findByPk(bm.id, { include: [db.Post] });
//       res.json(bmWid);
//     }
//   })
// );

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
