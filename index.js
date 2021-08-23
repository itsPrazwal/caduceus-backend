const express = require("express");
const app = express();
const path = require("path");
const apiRoute = require("./api.route");
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();

//setting port
app.set("port", process.env.PORT);

//loading database
require("./config/database");

//Loading Files
app.use(express.static("files"));
app.use("/file", express.static(path.join(__dirname, "uploads")));

//JSON Parser
app.use(express.json());

//Request Body Parser
app.use(express.urlencoded({ extended: true }));

//Access to cross origin server
app.use(cors());

//Routing
app.use("/api", apiRoute);

//Error handling Middleware
app.use(function (err, req, res, next) {
  console.log(err)
  res.status(err.status || 400).json({
    message: err.message || "Bad request.",
  });
});

//listening server
app.listen(app.get("port"), function (err, done) {
  if (err) {
    console.log("Error listening Log:", err);
  } else {
    console.log("Server listening at port:", app.get("port"));
  }
});
