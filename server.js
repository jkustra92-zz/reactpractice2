//==============
// REQUIREMENTS
//==============

// node.js framework
var express = require("express");
var app = express();
// parses incoming request bodies under "req.body" property.
var bodyParser = require("body-parser");
// see what types of requests are being sent
var logger = require("morgan");
// for scalabilty purposes. if the server this is deployed on has a different port, use it.
// if not, use 3000.
var port = process.env.PORT || 3001;

//============
// MIDDLEWARE
//============

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//============
// CONTROLLER
//============

var apiController = require("./controllers/api.js");
// to access any of the endpoints, must include "/api" in the url
app.use("/api/", apiController);

//===============
// STATIC ASSETS
//===============

// might not even need this, but it's a good habit to include it.

app.use(express.static("public"));

//================
// HELLO, SERVER!
//================

// have express listening on whatever port was set.
app.listen(port);
console.log("the server is running on port " + port + ". cool.");