const express = require("express");
const { authGard, bodyGard } = require("../controllers/authorization");
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
    res.status(200).json({ status: "success", data: posts });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

// AuthGard should be added
router.use(authGard); //check if the user is logedin in and add its id as a user_id to the req object
// post methode
router.post("/", async (req, res) => {
  try {
    const { post: Newpost } = req.body;
    if (!Newpost) throw new Error("post is required");
    const post = await postController.createPost({
      ...Newpost,
      user_id: res.user_id, //trust user id
    });
    res.status(201).json({ status: "success", data: post });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});
// Check the owenership of the resource
// router.use(ownershipGard);
// delete a post by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postController.removePost(id, res.user_id); // the res have the user_id because of the authGard
    if (!post || !post.deletedCount) throw new Error("post not found");

    res.status(200).json({ status: "success", data: post });
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
      ...postUpdateFileds,
      user_id: res.user_id,
      _id: id,
    });
    if (!post) throw new Error("post not found");
    res.status(200).json({ status: "success", data: post });
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
    const comments = await postController.removePostComments(id, res.user_id);
    if (!comments || !comments.deletedCount)
      throw new Error("comment not found");
    res.status(200).json({ status: "success", data: comments });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

module.exports = router;
