const User = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/mailing");
const crypto = require("crypto");
const { findById } = require("../models/users");

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

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
    };

    res.cookie("jwt", token, cookieOptions);

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

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: false,
    };

    res.cookie("jwt", token, cookieOptions);

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

//? Forget Password Handling
exports.forgetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({
        status: "failed",
        message: "There is no user with this email address!",
      });
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const text = `Forgot your password ? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Your password reset token (valid for 10 min)",
        text,
      });

      res.status(200).json({
        status: "sucess",
        message: "Token sent to email!",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.log(error);

      res.status(500).json({
        status: "failed",
        message: "There was an error sending the email. try again later!",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

//? Reset Password Handling
exports.resetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on the token
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token) // !!
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Token is invalid or has expired!",
      });
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    const cookieOptions = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
    };

    res.cookie("jwt", token, cookieOptions);

    res.status(200).json({
      status: "success",
      token: token,
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

//? Protecting the routes
exports.protectRoute = async (req, res, next) => {
  try {
    // const token = req.headers.Authorization.slice(" ")[1];

    // if (!token) {
    //   return res.status(401).json({
    //     status: "failed",
    //     message: "Try again later!",
    //   });
    // }

    const userToken = req.cookies.jwt;

    if (!userToken) {
      return res.status(401).json({
        status: "failed",
        message: "You are not logged in yet!",
      });
    }

    const decoded = jwt.verify(userToken, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    res.status(200).json({
      status: "success",
      message: "You have a permission to access this route",
      data: {
        currentUser,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

//? LogOut Handling
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt").send("You're logout successfuly!");
    // res.send("You're logout successfuly!");
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};
