const mongoose = require("mongoose");
const isCoordantesValid = require("../helpers/isCoordantesValid");
const dateSchema = require("./dateSchema");

const pointSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
      validtor: isCoordantesValid,
    },
  },
  { _id: false }
);

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
    required: true, //tmp
  },
  location: {
    type: pointSchema,
  },
});
module.exports = mongoose.model("posts", PostSchema);