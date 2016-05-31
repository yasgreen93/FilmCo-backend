var express = require('express');
var router = express.Router();
var aws = require("../private/aws-lib/lib/aws");
require('dotenv').config();
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
var associateTag = process.env.AWS_ASSOCIATE_TAG;

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/films/api', function(req, res, next) {
  var prodAdv = aws.createProdAdvClient(accessKeyId, secretAccessKey, associateTag);
  var options = {IdType: "EAN", SearchIndex: "DVD", ItemId: "5050582556148"};

  return prodAdv.call("ItemLookup", options, function(err, result) {
    console.log("Backend request...");
    console.log(req);
    res.send(result);
  });
});

module.exports = router;
