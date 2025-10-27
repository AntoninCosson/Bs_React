require("dotenv").config();
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");

require("./models/connection");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var top3Router = require('./routes/top3');
var shopRouter = require('./routes/shop');


var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use('/top3', top3Router);
app.use('/shop', shopRouter);

module.exports = app;