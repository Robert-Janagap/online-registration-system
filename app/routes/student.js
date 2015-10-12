var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var studentSchoolInfo = mongoose.model('studentSchoolInfo');
var studentList = mongoose.model('studentList');
var assestments = mongoose.model('assestments');
var curriculums = mongoose.model('curriculums');
var classSchedules = mongoose.model('classSchedules');

// get student schedules
router.get('/studentSchedules/:id', function( req, res) {
	studentSchoolInfo.findOne({student_no:req.params.id },function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get course schedules
router.get('/course-schedules/:id', function( req, res) {
	classSchedules.find({year_level:req.params.id },function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// get student subjects
router.get('/studentSubjects/:id', function( req, res) {
	studentList.findOne({student_no:req.params.id },function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// get student assestment
router.get('/studentAssetment', function( req, res) {
	assestments.find({},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// get course years and terms
router.post('/course-yearsAndTerms/:id', function( req, res) {
	curriculums.find({school_year:req.params.id},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});

});
// save student request
router.post('/subjects-request/:id', function(req, res){
	studentSchoolInfo.update({student_no:req.params.id}, {$addToSet:{request:{
		section_name: req.body.section,
        subject_name: req.body.subject_name, 
        subject_des: req.body.subject_des,
        units: req.body.units,
        days: req.body.days,
        time: req.body.time,
        room: req.body.room,
        instructor: req.body.instructor
	}}},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});

});

// update student request
router.put('/subjects-request/:id', function(req, res){
	studentSchoolInfo.update({student_no:req.params.id}, {$addToSet:{request:{
		section_name: req.body.section,
        subject_name: req.body.subject_name, 
        subject_des: req.body.subject_des,
        units: req.body.units,
        days: req.body.days,
        time: req.body.time,
        room: req.body.room,
        instructor: req.body.instructor
	}}},function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});

});

// delete request
router.put('/request-delete/:id', function(req, res){
	studentSchoolInfo.update({student_no:req.params.id}, {$unset:{request:1}}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

// get student request list
router.get('/request-list/:id', function(req, res){
	studentSchoolInfo.findOne({student_no: req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

module.exports = router;