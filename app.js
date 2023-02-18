const { json } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const coockieParser = require("cookie-parser");
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const commentsRouter = require("./routes/comments.js");
const storagesRouter = require("./routes/storages.js");
const cors = require("cors");
const establishConnection = require("./connection/index.js");
const User = require("./models/users");
const mongoose = require("mongoose");

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

//OAuth for google API
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");
const session = require("express-session");
const sdk = require("api")("@ngpvan/v1.0#a28silbfd0kbi");
const flash = require("express-flash");
// require("./utils/passport");
// require("./utils/googleAPI");

// OAuth for Facebook API
// const passportFacebook = require("passport-facebook");
// const FacebookStrategy = passportFacebook.Strategy;

app.use(
  session({
    secret: "secr3t",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

//!establishing connection with mongodb database
establishConnection();
//! process.env will have all the variables listed in the .env file
require("dotenv").config();
//! logs the requests(tmp)
app.use(morgan("dev"));
//! grant acces to all website to use our resourse(tmp)
app.use(cors());
//! Serving static files located in /public
app.use(express.static("public"));
//! body parser
app.use(json());
//! coockie parser
app.use(coockieParser());

//?routers
const apiPrefix = "/api/v1/";
app.use(apiPrefix + "users/", usersRouter);
app.use(apiPrefix + "posts/", postsRouter);
app.use(apiPrefix + "comments/", commentsRouter);
app.use(apiPrefix + "uploads/", storagesRouter);

//! Attacks Handling
//? Data sanitization against XSS
app.use(xss());

//? Limit request from same API
// is to allow 50 IP request / 1 Hour
const limiter = rateLimit({
  max: 50,
  windowMs: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//? Data sanitization against NoSQL query injection
app.use(mongoSanitize());

//? Set Security HTTP Headers
app.use(helmet());

app.use(passport.initialize());
// app.use(passport.session());

// ! Add Flash Messages : With Passport.js we can communicate back to the user when their credentials are rejected using flash messages


// ? This will keep our passport configuration.
// passport.serializeUser(function (user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function (user, cb) {
//   cb(null, user);
// });

// app.get(
//   "/api/v1/users/login/google",
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// app.get(
//   "/api/v1/users/login/google/secrets",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect("/api/v1/posts");
//   }
// );


// Sign up with Facebook API


const port = process.env.PORT || 8080;

//! listening
app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${port}...`);
});
