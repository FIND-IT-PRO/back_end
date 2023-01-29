const mongoose = require("mongoose");
const dateSchema = require("./dateSchema");
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
});
module.exports = mongoose.model("comments", CommentSchema);
