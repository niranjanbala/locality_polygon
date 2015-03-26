var express = require('express');
var querystring=require('querystring');
var router = express.Router();
router.get('/filter',function(req,res) {
	var STAGE_SEARCH_URL="http://stage.commonfloor.com/api/listing-v2/get-listings?";
	var qs=querystring.stringify(req.query);
	var url=req.url;
	url=url.replace('/filter','');
	var request = require("request");
	request(STAGE_SEARCH_URL+url, function(error, response, body) {
	  res.jsonp(JSON.parse(body));
	});
});
module.exports = router;