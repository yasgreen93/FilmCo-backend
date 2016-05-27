var express = require('express');
var router = express.Router();
var aws = require("../../node_modules/aws-lib/lib/aws");

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/films/api', function(req, res, next) {
  var prodAdv = aws.createProdAdvClient(yourAccessKeyId, yourSecretAccessKey, yourAssociateTag);
  var options = {IdType: "EAN", SearchIndex: "DVD", ItemId: req.barcodeNum};

  return prodAdv.call("ItemLookup", options, function(err, result) {
    res.json(result);
  });
});

module.exports = router;
