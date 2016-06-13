var express = require('express');
var router = express.Router();
var aws = require('../private/aws-lib/lib/aws');
require('dotenv').config();
var accessKeyId = process.env.AWS_ACCESS_KEY;
var secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
var associateTag = process.env.AWS_ASSOCIATE_TAG;

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/films/api', function(req, res, next) {
  var barcode = req.body.barcodeNum;
  var prodAdv = aws.createProdAdvClient(accessKeyId, secretAccessKey, associateTag);
  var options = {IdType: "EAN", SearchIndex: "DVD", ItemId: barcode};
  console.log("Called");
  return prodAdv.call("ItemLookup", options, function(err, result) {
  });
});

module.exports = router;
