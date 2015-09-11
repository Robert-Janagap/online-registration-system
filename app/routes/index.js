var express = require('express');
var router = express.Router();

router.post('/', function( req, res) {
	console.log(req.body);
	console.log('ok dokie');
});

module.exports = router;