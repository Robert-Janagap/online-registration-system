var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var	preEnrolledStudents = mongoose.model('preEnrolledStudents');
var classSchedules = mongoose.model('classSchedules');
var studentList = mongoose.model('studentList');
var studentSchoolInfo = mongoose.model('studentSchoolInfo');

// get student list
router.get('/students', function( req, res) {
	studentList.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get student info
router.get('/student-info/:id', function( req,res ){
	studentList.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get student school info
router.get('/school-info/:id', function( req,res ){
	studentSchoolInfo.findOne({student_no:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// find section based on course, year, and term
router.get('/student-section/:course', function(req, res){
	classSchedules.find({course_name:req.params.course}, function( err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// find section schedules
router.get('/class-schedule/:id', function(req, res){
	classSchedules.findById(req.params.id, function( err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});


// set student Schedule
router.get('/studentSchedule/:id', function(req, res){
	studentList.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.get('/studentSubjectSchedule/:id', function(req, res){
	classSchedules.find({course_name:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});


module.exports = router;