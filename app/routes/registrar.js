var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var	preEnrolledStudents = mongoose.model('preEnrolledStudents');
var classSchedules = mongoose.model('classSchedules');
// get pre enrolled students
router.get('/preEnrolledStudents', function( req, res) {
	preEnrolledStudents.find({}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
// get student info
router.get('/student/:id', function( req,res ){
	preEnrolledStudents.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
/**
 * find the old student if none find the new student
 */
// set student Schedule
router.get('/studentSchedule/:id', function(req, res){
	preEnrolledStudents.findById(req.params.id, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});
router.get('/studentSubjectSchedule/:id', function(req, res){
	console.log(req.params.id);
	classSchedules.find({course_name:req.params.id}, function(err, data){
		if(err){
			return err;
		}
		res.json(data);
	});
});

module.exports = router;