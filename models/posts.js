const mongoose = require("mongoose");
const coordantesSchema = require("./coordantesSchema");
const dateSchema = require("./dateSchema");
const { itemReaction } = require("./itemReaction");
// console.log("🚀 ~ file: posts.js:5 ~ itemReaction", itemReaction);
const { defaultReactions } = require("./itemReaction");
// console.log("🚀 ~ file: posts.js:6 ~ defaultReactions", defaultReactions);

// function arrayLimit(val,limit) {
//     return val.length <= limit;
//   }

const PostSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 100,
  },
  body: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 500,
  },
  date: {
    type: dateSchema,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  },
  images: {
    type: [String],
    required: true,
  },
  videos: {
    type: [String],
    required: true,
  },
  location: {
    type: coordantesSchema,
    required: [true, "Please provide location"],
  },
  reactions: { type: [itemReaction], default: defaultReactions, _id: false },
});
module.exports = mongoose.model("posts", PostSchema);
