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

const port = process.env.PORT || 8080;

//! listening
app.listen(process.env.PORT, () => {
  console.log(`The server is listening on port ${port}...`);
});
