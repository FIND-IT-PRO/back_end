const express = require("express");
const router = express.Router();
const postController = require("../controllers/posts"); //UsersController is the class (controller)

/* GET users listing. */
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postController.getPost(id);
    if (!post) throw new Error("post not found");
    res.status(200).json({ status: "success", data: post });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const n = +req.query.n;
    if (!n || n < 0 || n > 10 || typeof n != "number")
      throw new Error(
        "n is required and should be a postive number and less than 10"
      );
    const posts = await postController.getPosts(n);
    if (!posts) throw new Error("posts not found");
    res.status(200).json(posts);
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const { post: Newpost } = req.body;
    if (!Newpost) throw new Error("post is required");
    const post = await postController.createPost(Newpost);
    res.status(200).json({ status: "succes", data: post });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
//todo AuthGard should be added
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postController.removePost(id);
    if (!post) throw new Error("post not found");
    res.status(200).json({ status: "succes", data: post });
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
    const { postUpdateFileds } = req.body;
    if (!postUpdateFileds) throw new Error("postUpdateFileds is required");
    const post = await postController.editPost({
      _id: id,
      ...postUpdateFileds,
    });
    if (!post) throw new Error("post not found");
    res.status(200).json({ status: "succes", data: post });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
router.delete("/:id/comments/", async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await postController.removePostComments(id);
    if (!comments) throw new Error("comment not found");
    res.status(200).json({ status: "succes", data: comments });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

module.exports = router;
