const User = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { promisify } = require("util");
const { findById } = require("../models/users");


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
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
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

