const express = require("express");
const { default: mongoose } = require("mongoose");
const { authGard } = require("../controllers/authorization");
const router = express.Router();
const reactionsController = require("../controllers/reactions");
//todo const authGard = require("../middleware/authGard");

// check if the body container or not the wanted fileds
// router.use(bodyGard);
//check if the user is logedin in and add its id as a user_id to the req object
router.use(authGard);
// ! protocted routes
router.post("/", async (req, res) => {
  try {
    const { reaction } = req.body;
    if (!reaction) throw new Error("reaction is required");
    const newReaction = await reactionsController.createReaction({
      ...reaction,
      user_id: res.user_id,
    });
    res.status(201).json({ status: "success", data: newReaction });
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
    const reaction = await reactionsController.removeReaction({
      id: id,
      user_id: res.user_id,
    });
    // console.log(
    //   "🚀 ~ file: reactions.js:33 ~ router.delete ~ reaction",
    //   res.user_id
    // );
    if (!reaction || !reaction.deletedCount)
      throw new Error("reaction not found");
    res.status(200).json({ status: "success", data: reaction });
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
    const { reactionUpdateFileds } = req.body;
    const { reaction_type } = { ...reactionUpdateFileds };
    if (!reactionUpdateFileds)
      throw new Error(
        "reactionUpdateFileds is required and must containe only reaction_type"
      );
    const reaction = await reactionsController.editReaction(
      id,
      res.user_id,
      reaction_type
    );
    if (!reaction) throw new Error("reaction not found");
    res.status(200).json({ status: "success", data: reaction });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
});

module.exports = router;
