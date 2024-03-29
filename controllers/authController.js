const User = require("../models/users");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const EmailClient = require("../helpers/mailing");
const crypto = require("crypto");
const { findById } = require("../models/users");


// const passport = require("passport");

// OAuth
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;


//? SignUP Handling
exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email or password missing.",
      });
    }
    const newUser = await User.create(req.body);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};


const passportFacebook = require("passport-facebook");
const FacebookStrategy = passportFacebook.Strategy;

//* Genrating Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

//* Creating and Sending the token to the User
const sendingToken = (user, status, res) => {
  const token = generateToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
  };

  res.cookie("jwt", token, cookieOptions);

  // Remove password
  user.password = undefined;

  res.status(status).json({
    status: "success",
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
    sendingToken(newUser, 201, res);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
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

    const user = await User.findOne({ email })?.select("+password");
    if (!user) throw new Error("Incorrect email or password!");
    const correctPassword = await user.correctPassword(password, user.password);
    if (!user || !correctPassword)
      throw new Error("Incorrect email or password!");

    sendingToken(user, 200, res);
  } catch (error) {
    // console.log(error);
    res.status(401).json({
      status: "error",
      message: error.message,
    });
  }
};

//? Forget Password Handling
exports.forgetPassword = async (req, res, next) => {
  try {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
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

    const text = `Forgot your password ? Submit a PATCH request with your new password and passwordConfirm to: <a href="${resetURL}">Click me</a>.\nIf you didn't forget your password, please ignore this email!`;

    try {
      const emailMessage = {
        sender: "DoNotReply@69e6f80d-9c24-4e0d-9008-752403853c13.azurecomm.net", //to be change after setting up the domain
        content: {
          subject: "Password Recuperation<Find it>.",
          html: `
          <h1>Welcome to find it </h1>
          <p>${text}</p>
          `,
        },
        recipients: {
          to: [
            {
              email: user.email,
            },
          ],
        },
      };
      const response = await EmailClient.send(emailMessage);
      // console.log(
      //   "🚀 ~ file: authController.js:146 ~ exports.forgetPassword= ~ response",
      //   response
      // );

      res.status(200).json({
        status: "sucess",
        message: "Token sent to email! retry if not recieved!",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      console.log(error);

      // res.status(500).json({
      //   status: "failed",
      //   message: "There was an error sending the email. try again later!",
      // });
      throw new Error("There was an error sending the email. try again later!");
    }
  } catch (error) {
    // console.log(error);
    res.status(400).json({
      status: "error",
      message: error.message,
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

    sendingToken(user, 200, res);
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

// //? LogOut Handling
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt").json({
      status: "success",
      message: "You're logout successfuly!",
    });
    // res.send("You're logout successfuly!");
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error,
    });
  }
};

exports.checkEmailAndPasswordExistence = async function (req, res, next) {
  const { email, password, passwordConfirm } = req.body;

  if (!email || !password || !passwordConfirm) {
    return res.status(400).send({
      message: "Email or password missing.",
    });
  }

  next();
};


// OAuth with Google API handling
// ? This will keep our passport configuration.

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const currentUser = await User.findOne({
    id,
  });
  done(null, currentUser);
});

// ? Google Passport
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: "http://www.example.com/auth/google/callback"
      callbackURL: "http://localhost:8080/api/v1/users/login/google/secrets",
      // callbackURL: "http://localhost:8080/auth/google/secrets",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // console.log(profile.emails);
      cb(null, profile);
      User.findOrCreate(
        {
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        },
        function (err) {
          return cb(err, profile);
        }
      );
    }
  )
);

// OAuth with Facebook API handling

// ? Facebook Passport
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8080/api/v1/users/login/facebook/secrets",
      profileFields: ["id", "displayName", "email"],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      User.findOrCreate(
        {
          name: profile.displayName,
          email: profile.emails[0].value,
          facebookId: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
