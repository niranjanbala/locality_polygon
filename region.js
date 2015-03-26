var express = require('express');

var router = express.Router();
router.get('/locality/:localityId/polygon.json',function(req,res) {
	res.jsonp({
		localityId: req.params.localityId
	});
});
module.exports = router;

