var express = require("express");
var router = express.Router();
var request = require("request");
var cors = require("cors");
var Twitter = require("twitter");
var keysToSuccess = require("../majorKeys");

var client = new Twitter(keysToSuccess);


router.get("/tweets", cors(), function(req, res){
  var query = req.query.hashtag
  client.get('search/tweets', {q: req.query.hashtag}, function(error, tweets, response) {
    if (!error) {
      res.send(tweets);
    }
  });
});

module.exports = router;