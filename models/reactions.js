const mongoose = require("mongoose");
const reactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  item_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  reaction_type: {
    type: mongoose.Schema.Types.String,
    enum: ["like", "love", "deslike", "intersted", "sad", "happy"],
    required: true,
  },
  item_type: {
    type: mongoose.Schema.Types.String,
    enum: ["posts", "comments"],
    required: true,
  },
});
module.exports = mongoose.model("reactions", reactionSchema);
