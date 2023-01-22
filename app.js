const { json } = require("express");
const express = require("express");
const app = express();
const morgan = require("morgan");
const coockieParser = require("cookie-parser");
const usersRouter = require("./routes/users.js");
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

// not found
app.use((_, res) => {
  res.status(404).json({
    status: "fail",
    message: "Not found",
  });
});

//! listening
app.listen(process.env.PORT, () => {
  console.log("listening in port ", process.env.PORT || 8080);
});
