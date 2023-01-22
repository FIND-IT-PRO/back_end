const mongoose = require("mongoose");
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.CLUSTER_USERNAME}/findit?retryWrites=true&w=majority`;
mongoose.set("strictQuery", true);
const establishConnection = () => {
  mongoose.connect(
    uri,
    () => {
      console.log("Database connected successfuly");
    },
    (e) => {
      console.error(e);
    }
  );
};

module.exports = establishConnection;
