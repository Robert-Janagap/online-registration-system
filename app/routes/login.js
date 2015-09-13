var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/',passport.authenticate('local'), function( req, res) {
	res.json(req.user);
});

router.get('/loggedin',function( req, res) {
	res.send(req.isAuthenticated() ? req.user : '0');
});
module.exports = router;