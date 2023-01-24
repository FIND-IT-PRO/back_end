const User = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // res.cookie('jwt', token, cookieOptions);

  // Remove password
  user.password = undefined;

  res.status(201).json({
    status: statusCode,
    token,
    data: {
      user,
    },
  });
};

//? SignUP Handling
exports.signup = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    // res.status(201).json({
    //   status: "sucess",
    //   message: "Your account is created successfuly !",
    // });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Remove password
    newUser.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        newUser,
      },
    });

    // createSendToken(newUser, 201, res);
  } catch (error) {
    console.log(error);
  }
};

//? Login Handling
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        message: "Insert the email and password!",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    const correctPassword = await user.correctPassword(password, user.password);

    if (!user || !correctPassword) {
      return res.status(401).json({
        status: "failed",
        message: "Incorrect email or password!",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Remove password
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });

  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};


