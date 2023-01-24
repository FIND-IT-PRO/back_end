const fs = require("fs");
const mongoose = require("mongoose");
const { create } = require("../../models/users");
const User = require("../../models/users");

// Connecting to DataBase
mongoose
  .connect(process.envCLUSTER_USERNAME, {
    // useUnifiedTopology: true,
    // useNewUrlParser: true,
    // mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("The database is connected successfuly!");
  })
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);

  });

//* Read the users json file
const users = JSON.parse(fs.readFileSync("public/data/users.json"), "utf-8");

//? Import the data into DB
const importData = async () => {
  try {
    
    await User.create(users, { validateBeforeSave: false });
    console.log("Data is successfuly loaded!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("Data is successfuly deleted!");
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
