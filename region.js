var express = require('express');
var polygon=require('./model/polygon');
var router = express.Router();
router.get('/locality/:localityId/polygon.json',function(req,res) {
	polygon.findOne({
		"area_public_id":req.params.localityId
	}, function(err, polygonData){
		console.log(err, polygonData);
		res.jsonp(polygonData);
	});
});
module.exports = router;