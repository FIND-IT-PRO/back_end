const mongoose = require("mongoose");
module.exports.itemReaction = new mongoose.Schema({
  reaction_type: { type: mongoose.SchemaTypes.String },
  reaction_count: { type: mongoose.SchemaTypes.Number },
});

module.exports.defaultReactions = [
  { reaction_type: "like", reaction_count: 0 },
  { reaction_type: "love", reaction_count: 0 },
  { reaction_type: "deslike", reaction_count: 0 },
  { reaction_type: "happy", reaction_count: 0 },
  { reaction_type: "sad", reaction_count: 0 },
];
