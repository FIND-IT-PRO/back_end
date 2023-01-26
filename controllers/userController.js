const User = require("../models/users");

// class User {
//   constructor() {
//     this.collection = users; //users is a collection(model)
//   }
//   async getUser(id) {
//     // const test = await this.collection.insertMany([
//     //   { username: "users" },
//     //   { username: "test" },
//     // ]);
//     const test = await this.collection.find();
//     console.log(test);
//     return this.collection.findById(id);
//   }
// }

//? Signup Handling
exports.signup = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(401).json({
        status: "failed",
        message: "The email is already existed!",
      });
    }

    await User.create(user);

    res.status(200).json({
      status: "success",
      message: "The account is created successfuly!",
    });
  } catch (error) {
    console.log(error);
  }
};
