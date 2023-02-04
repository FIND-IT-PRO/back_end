const User = require("../models/users");
const Post = require("../models/posts");
const PostsController = require("./posts");
// const PostsController = require("./posts");
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

//? Signup Handling
exports.updateMyInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    // const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    //   expiresIn: process.env.JWT_EXPIRES_IN,
    // });

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    console.log(token, user);

    if (!user && !token) {
      return res.status(401).json({
        status: "failed",
        message: "You cannot update your information account, Try to logging!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== user.id) {
      return res.status(401).json({
        status: "failed",
        message: "Something is wrong, Try to logging!",
      });
    }

    if (req.body.password || req.body.passwordConfirm) {
      return res.status(400).json({
        status: "failed",
        message:
          "Sorry cannot update the password, try to use this route /updateMyPassword !",
      });
    }

    user.name = req.body.name;
    user.email = req.body.email;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.updateMyPassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!user && !token) {
      return res.status(401).json({
        status: "failed",
        message: "You cannot update your information account, Try to logging!",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== user.id) {
      return res.status(401).json({
        status: "failed",
        message: "Something is wrong, Try to logging!",
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        status: "failed",
        message:
          "Sorry cannot update the info, try to use this route /updateMyInfo !",
      });
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save({ validateBeforeSave: true });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

exports.deleteMyAccount = async (req, res, next) => {
  try {
    ///////////////////////////!
    // const { jwt: token } = req.cookies;

    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.startsWith("Bearer")
    // ) {
    //   token = req.headers.authorization.split(" ")[1];
    // }

    // if (!token) {
    //   return res.status(401).json({
    //     status: "failed",
    //     message: "You didn't login yet, Try later!",
    //   });
    // }

    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // extracting the user id
    // const user_id = decoded.id;
    //////////////////////////////////////////////
    // console.log(
    //   "🚀 ~ file: userController.js:146 ~ exports.deleteMyAccount ~ user_id",
    //   decoded
    // );
    //  removing all posts and images and removing all comments reltaed to all my post
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Insert the email and password!",
      });
    }

    const user = await User.findOne({ email })?.select("+password");
    if (!user) throw new Error("Incorrect email or password!");
    const correctPassword = await user.correctPassword(password, user.password);
    if (!user || !correctPassword)
      throw new Error("Incorrect email or password!");
    const { _id: user_id } = user;
    const UserPostsIds = await Post.find(
      { user_id: new ObjectId(user_id) },
      { _id: 1 }
    );
    UserPostsIds.map(
      async (id) =>
        await PostsController.removePost(ObjectId(id).valueOf(), user_id)
    );

    await user.remove();

    res.status(200).json({
      status: "success",
      data: "deleted successfuly!",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};
