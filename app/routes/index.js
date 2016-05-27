var express = require('express');
var router = express.Router();
var aws = require("../../node_modules/aws-lib/lib/aws");
require('dotenv').config();
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
var associateTag = process.env.AWS_ASSOCIATE_TAG;

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/films/api', function(req, res, next) {
  console.log(req);
  var prodAdv = aws.createProdAdvClient(accessKeyId, secretAccessKey, associateTag);
  var options = {IdType: "EAN", SearchIndex: "DVD", ItemId: req.barcodeNum};

  return prodAdv.call("ItemLookup", options, function(err, result) {
    res.send(result);
  });
});

module.exports = router;
