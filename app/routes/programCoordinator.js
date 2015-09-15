var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var curriculum = mongoose.model('curriculums');
var curriculumList = mongoose.model('curriculumList');

router.get('/curriculum', function(req, res){
	curriculum.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
router.get('/curriculum-list', function( req, res) {
	curriculumList.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.get('/curriculum-courses/:id', function(req, res){
	curriculum.find({school_year:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
router.get('/department-courses/:id', function(req, res){
	curriculum.find({_id:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	})
});
module.exports = router;