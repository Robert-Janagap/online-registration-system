var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var assestments = mongoose.model('assestments');

router.get('/', function( req, res) {
	res.render('administrator');
});
//for assestments
router.get('/assestments', function( req, res) {
	assestments.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.get('/assestments/:id', function( req, res) {
	assestments.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.put('/assestments/:id', function( req, res) {
	if (req.body.status){
		assestments.findByIdAndUpdate(req.params.id,{$pull:{fees:{_id:req.body._id}}}, function(err, data){
			res.json(data);
		});
		console.log(req.body._id);
		console.log(req.params.id);
	}else{
		assestments.findByIdAndUpdate(req.params.id,{$addToSet:{fees:{fee_name:req.body.fee_name,amount:req.body.amount, data_created: new Date()}}}, function(err, data){
			if(err){
				return err;
			}
			res.json(data);
		});
	}
});
module.exports = router;