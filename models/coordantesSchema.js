const mongoose = require("mongoose");
const isCoordantesValid = require("../helpers/isCoordantesValid");
exports = new mongoose.Schema(
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
