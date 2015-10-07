var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentSchoolInfo = mongoose.model('studentSchoolInfo');
var studentList = mongoose.model('studentList');
var classSchedules = mongoose.model('classSchedules');
var users = mongoose.model('users');

//add grades

router.get('/class-schedules/:id', function(req, res){
	users.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

router.get('/student-list/:id', function(req, res){
	users.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

router.get('/find-teacher/:id', function(req, res){
	users.findOne({username: req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

module.exports = router;