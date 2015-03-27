var express = require('express');
var polygon=require('./model/polygon');
var router = express.Router();
router.get('/locality/:localityId/polygon.json',function(req,res) {
	polygon.findOne({
		"area_public_id":req.params.localityId
	}, function(err, polygonData){
		res.jsonp(polygonData);
	});
});
router.get('/locality/list', function(req, res){
	polygon.find({},function(err, localityList){
		res.jsonp(localityList);
	});
});
module.exports = router;