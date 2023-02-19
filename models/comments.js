const mongoose = require("mongoose");
const dateSchema = require("./dateSchema");
const { itemReaction } = require("./itemReaction");
const { defaultReactions } = require("./itemReaction");
const CommentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  content: {
    type: String,
    required: true,
    minLength: 3,
    maxLenght: 1000,
  },
  date: dateSchema,
  parent_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "comments",
    default: null,
  },
  reactions: { type: [itemReaction], default: defaultReactions, _id: false },
});
module.exports = mongoose.model("comments", CommentSchema);
