const express = require("express");
const router = express.Router();
const commentsController = require("../controllers/comments");
//todo const authGard = require("../middleware/authGard");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await commentsController.getCommentsByPostId(id);
    if (!comments) throw new Error("comments not found");
    res.status(200).json({ status: "success", data: comments });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { comment } = req.body;
    if (!comment) throw new Error("comment is required");
    const newComment = await commentsController.createComment(comment);
    res.status(201).json({ status: "succes", data: newComment });
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
    const comment = await commentsController.removeComment(id);
    if (!comment) throw new Error("comment not found");
    res.status(200).json({ status: "succes", data: comment });
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
    const comment = await commentsController.editComment({
      _id: id,
      ...commentUpdateFileds,
    });
    if (!comment) throw new Error("comment not found");
    res.status(200).json({ status: "succes", data: comment });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

module.exports = router;
