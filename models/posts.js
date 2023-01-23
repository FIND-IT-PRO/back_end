const mongoose = require("mongoose");

const PostDateSchema = new mongoose.Schema(
  {
    creationDate: {
      type: Date,
      default: Date.now,
    },
    lastUpdateDate: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);
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

function isCoordantesValid(val) {
  console.log(val); //check the range of the coordinates
  if (val.length != 2) {
    return false;
  }
  if (val[0] < -180 || val[0] > 180) {
    return false; //2pi (phi of the sphere)
  }
  if (val[1] < -90 || val[1] > 90) {
    return false; //pi (teta of the  sphere)
  }
  return true;
}

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
    type: PostDateSchema,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    default: "active",
  },
  images: [
    {
      type: [String],
      required: false, //tmp
    },
  ],
  location: {
    type: pointSchema,
  },
});
module.exports = mongoose.model("posts", PostSchema);
