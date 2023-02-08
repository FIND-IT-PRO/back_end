const express = require("express");
const { default: mongoose } = require("mongoose");
const { authGard } = require("../controllers/authorization");
const router = express.Router();
const commentsController = require("../controllers/comments");
//todo const authGard = require("../middleware/authGard");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await commentsController.getCommentsByPostId(id);
    // console.log("🚀 ~ file: comments.js:12 ~ router.get ~ comments", comments);
    if (!comments.length) throw new Error("comments not found");
    res.status(200).json({ status: "success", data: comments });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e.message,
    });
  }
});
// check if the body container or not the wanted fileds
// router.use(bodyGard);
//check if the user is logedin in and add its id as a user_id to the req object
router.use(authGard);
// ! protocted routes
router.post("/", async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) throw new Error("comment is required");
    const newComment = await commentsController.createComment({
      ...comment,
      user_id: res.user_id,
    });
    res.status(201).json({ status: "success", data: newComment });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await commentsController.removeComment(id, res.user_id);
    if (!comment || !comment.deletedCount) throw new Error("comment not found");
    res.status(200).json({ status: "success", data: comment });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { commentUpdateFileds } = req.body;
    if (!commentUpdateFileds)
      throw new Error("commentUpdateFileds is required");
    const comment = await commentsController.editComment(
      {
        _id: id,
        ...commentUpdateFileds,
      },
      res.user_id
    );
    if (!comment) throw new Error("comment not found");
    res.status(200).json({ status: "success", data: comment });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

module.exports = router;
