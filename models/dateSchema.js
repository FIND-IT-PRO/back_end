const mongoose = require("mongoose");
exports = new mongoose.Schema(
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
