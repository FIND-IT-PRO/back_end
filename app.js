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

const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

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

const port = process.env.PORT || 8080;

//! listening
app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${port}...`);
});
